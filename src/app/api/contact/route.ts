import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side Zod validation
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Data formulir tidak valid", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = validation.data;

    // Check Honeypot spam protection
    if (honeypot && honeypot.trim() !== "") {
      // Quietly reject spam submissions
      return NextResponse.json(
        { message: "Pesan berhasil dikirim (Spam Check)" },
        { status: 200 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "ariffaishal.dev@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Graceful fallback if Resend API key is not configured locally yet
    if (!resendApiKey || resendApiKey.trim() === "") {
      console.log("[SIMULATION ONLY - NO RESEND API KEY] New Contact Form Message:", {
        name,
        email,
        subject,
        message,
      });

      return NextResponse.json(
        {
          message:
            "Pesan Anda berhasil diterima (Mode Simulasi). Terima kasih telah menghubungi saya!",
        },
        { status: 200 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(resendApiKey);

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      subject: `[Portofolio] ${subject} - ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
          <h2 style="color: #059669;">Pesan Baru dari Portofolio</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subjek:</strong> ${subject}</p>
          <h3 style="margin-top: 20px;">Pesan:</h3>
          <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #059669; border-radius: 4px;">
            ${message.replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend API Error:", emailResponse.error);
      return NextResponse.json(
        { error: "Gagal mengirim email melalui layanan pengirim." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Pesan Anda berhasil dikirim! Saya akan segera merespons." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
