"use client";

import React, { useState } from "react";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import { profileData } from "@/data/profile";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "Halo dari Terminal Portofolio",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setErrors({});

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: data.message || `Pesan berhasil dikirim ke ${profileData.email}. Terima kasih!`,
        });
        setFormData({
          name: "",
          email: "",
          subject: "Halo dari Terminal Portofolio",
          message: "",
          honeypot: "",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Gagal mengirim pesan. Silakan coba lagi.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Terjadi kesalahan koneksi jaringan. Silakan coba lagi nanti.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col gap-2 pt-4 border-t border-[var(--terminal-border)]">
      {/* Command prompt */}
      <div className="flex items-baseline flex-wrap gap-0 text-sm font-medium">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="text-[var(--terminal-text-bright)]">./contact</span>
        <span className="ml-1 text-[var(--terminal-amber)]">--interactive</span>
      </div>

      <div className="text-xs text-[var(--terminal-text-dim)] pt-1">
        Starting interactive contact prompt...
      </div>
      <div className="text-xs text-[var(--terminal-accent)] font-medium">
        ? Isi form di bawah ini untuk mengirim pesan langsung
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2 max-w-xl">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        {/* Nama Input */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <label htmlFor="cf-name" className="text-xs font-semibold text-[var(--terminal-amber)] sm:w-20 shrink-0">
            nama:
          </label>
          <div className="flex-1 flex flex-col">
            <input
              id="cf-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              required
              className="bg-transparent border-0 border-b border-[var(--terminal-border)] text-xs sm:text-[13px] text-[var(--terminal-text-bright)] py-1 focus:outline-none focus:border-[var(--terminal-accent)] transition-colors placeholder:text-[var(--terminal-text-dim)] placeholder:italic"
            />
            {errors.name && <span className="text-[11px] text-[var(--terminal-rose)] mt-0.5">{errors.name}</span>}
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <label htmlFor="cf-email" className="text-xs font-semibold text-[var(--terminal-amber)] sm:w-20 shrink-0">
            email:
          </label>
          <div className="flex-1 flex flex-col">
            <input
              id="cf-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@example.com"
              required
              className="bg-transparent border-0 border-b border-[var(--terminal-border)] text-xs sm:text-[13px] text-[var(--terminal-text-bright)] py-1 focus:outline-none focus:border-[var(--terminal-accent)] transition-colors placeholder:text-[var(--terminal-text-dim)] placeholder:italic"
            />
            {errors.email && <span className="text-[11px] text-[var(--terminal-rose)] mt-0.5">{errors.email}</span>}
          </div>
        </div>

        {/* Pesan Input */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
          <label htmlFor="cf-message" className="text-xs font-semibold text-[var(--terminal-amber)] sm:w-20 shrink-0 pt-1">
            pesan:
          </label>
          <div className="flex-1 flex flex-col">
            <textarea
              id="cf-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesan Anda di sini..."
              required
              className="bg-transparent border border-[var(--terminal-border)] rounded p-2 text-xs sm:text-[13px] text-[var(--terminal-text-bright)] focus:outline-none focus:border-[var(--terminal-accent)] transition-colors placeholder:text-[var(--terminal-text-dim)] placeholder:italic resize-y"
            />
            {errors.message && <span className="text-[11px] text-[var(--terminal-rose)] mt-0.5">{errors.message}</span>}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start mt-2 bg-[var(--terminal-accent)] text-[var(--terminal-bg)] font-bold text-xs px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
        >
          {isSubmitting ? "⏳ sending..." : "$ send --submit"}
        </button>

        {/* Status Message Display */}
        {statusMessage && (
          <div
            className={`text-xs p-2.5 rounded border mt-2 ${
              statusMessage.type === "success"
                ? "bg-[var(--terminal-accent-dim)] border-[var(--terminal-accent)] text-[var(--terminal-green)]"
                : "bg-red-500/10 border-[var(--terminal-rose)] text-[var(--terminal-rose)]"
            }`}
          >
            {statusMessage.type === "success" ? "✓ " : "✗ "}
            {statusMessage.text}
          </div>
        )}
      </form>

      {/* Social Links Direct */}
      <div className="flex flex-wrap items-center gap-3 text-xs pt-4 text-[var(--terminal-text-dim)]">
        <span>Atau hubungi langsung →</span>
        {profileData.socialLinks.github && (
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] transition-colors"
          >
            github
          </a>
        )}
        {profileData.socialLinks.linkedin && (
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] transition-colors"
          >
            linkedin
          </a>
        )}
        <a
          href={`mailto:${profileData.email}`}
          className="text-[var(--terminal-blue)] hover:text-[var(--terminal-accent)] transition-colors"
        >
          email
        </a>
      </div>

      {/* Trailing active prompt cursor */}
      <div className="flex items-baseline gap-0 text-sm font-medium pt-6 pb-2">
        <span className="text-[var(--terminal-accent)] font-semibold">arif</span>
        <span className="text-[var(--terminal-text-dim)]">@</span>
        <span className="text-[var(--terminal-blue)]">portfolio</span>
        <span className="text-[var(--terminal-amber)] font-bold mr-2 ml-0.5">$</span>
        <span className="terminal-cursor" />
      </div>
    </section>
  );
}
