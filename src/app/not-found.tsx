import { ArrowLeft, FileQuestion } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16">
      <Container className="text-center space-y-6 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Maaf, halaman atau studi kasus proyek yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/" variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Button>
        </div>
      </Container>
    </div>
  );
}
