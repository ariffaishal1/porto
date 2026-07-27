import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(80, "Nama maksimal 80 karakter"),
  email: z
    .string()
    .email("Format email tidak valid")
    .max(120, "Email maksimal 120 karakter"),
  subject: z
    .string()
    .min(3, "Subjek minimal 3 karakter")
    .max(120, "Subjek maksimal 120 karakter"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
