"use client";

import React from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Subtle Radial Gradient Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Availability Badge */}
            {profileData.availability && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {profileData.availability}
              </div>
            )}

            {/* Main Greeting & Headline */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400">
                Halo, saya {profileData.shortName || profileData.name} 👋
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15]">
                {profileData.role}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto lg:mx-0">
                {profileData.headline}
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profileData.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button href="#projects" size="lg" variant="primary">
                Lihat Proyek
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button href="#contact" size="lg" variant="outline">
                <Mail className="w-4 h-4" />
                Hubungi Saya
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 w-fit mx-auto lg:mx-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Tautan Sosial:
              </span>
              {profileData.socialLinks.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profil"
                  className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {profileData.socialLinks.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profil"
                  className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Avatar / Visual Element Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative Frame Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500 to-emerald-300 dark:from-emerald-600 dark:to-emerald-800 opacity-20 blur-xl transform rotate-6 scale-95" />
              
              {/* Main Avatar Container */}
              <div className="relative w-full h-full rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-3xl sm:text-4xl shadow-inner">
                    AN
                  </div>
                  <div>
                    <h2 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">
                      {profileData.name}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {profileData.role}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40">
                    <Sparkles className="w-3.5 h-3.5" /> Ready for Impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
