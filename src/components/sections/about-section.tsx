import React from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { MapPin, Code2, Rocket, HeartHandshake } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-neutral-50/50 dark:bg-neutral-950/50">
      <Container>
        <SectionHeading
          badge="Tentang Saya"
          title="Mengenal Lebih Dekat"
          subtitle="Ringkasan profil profesional, latar belakang pengembangan, dan nilai-nilai kerja saya."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Content */}
          <div className="lg:col-span-8 space-y-6">
            <Card hoverEffect={false} className="space-y-4 leading-relaxed">
              {profileData.fullBio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base text-neutral-700 dark:text-neutral-300"
                >
                  {paragraph}
                </p>
              ))}
            </Card>

            {/* Core Values Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="space-y-2 p-5">
                <Code2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                  Clean Code
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Menulis kode yang rapi, terstruktur, serta mudah dipelihara oleh tim.
                </p>
              </Card>

              <Card className="space-y-2 p-5">
                <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                  Performa Tinggi
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Mengutamakan waktu muat yang cepat dan optimasi SEO terukur.
                </p>
              </Card>

              <Card className="space-y-2 p-5">
                <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                  Kolaboratif
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Siap berkomunikasi secara transparan dan adaptif terhadap kebutuhan.
                </p>
              </Card>
            </div>
          </div>

          {/* Sidebar Info Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="space-y-4">
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base border-b border-neutral-200 dark:border-neutral-800 pb-3">
                Informasi Ringkas
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Nama Lengkap
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                    {profileData.name}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Spesialisasi Utama
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                    {profileData.role}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Lokasi
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    {profileData.location}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                    Status Ketersediaan
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {profileData.availability}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
