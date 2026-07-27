import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { profileData } from "@/data/profile";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-900 py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-900">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {profileData.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {profileData.role} &bull; {profileData.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {profileData.socialLinks.github && (
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil GitHub"
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {profileData.socialLinks.linkedin && (
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn"
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${profileData.email}`}
              aria-label="Kirim Email"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            &copy; {currentYear} {profileData.name}. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <span className="font-semibold text-neutral-700 dark:text-neutral-300">Next.js App Router</span> &amp; <span className="font-semibold text-neutral-700 dark:text-neutral-300">Tailwind CSS</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
