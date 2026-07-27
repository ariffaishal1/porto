# Product Requirements Document

## Web Portofolio Developer untuk Personal Branding

**Versi:** 1.1
**Status:** Siap diimplementasikan
**Target implementasi:** Coding agent AI
**Jenis produk:** Website portofolio publik
**Bahasa antarmuka awal:** Bahasa Indonesia
**Target perangkat:** Desktop, tablet, dan mobile

---

# 1. Ringkasan Produk

Produk yang akan dibuat adalah website portofolio personal untuk seorang developer atau programmer.

Website berfungsi sebagai pusat identitas profesional yang menampilkan:

* Profil pemilik.
* Keahlian teknis.
* Pengalaman.
* Proyek dan karya.
* Studi kasus proyek.
* CV.
* Tautan profesional.
* Informasi kontak.

Website harus memiliki tampilan modern, profesional, minimalis, cepat, responsif, mudah dipelihara, dan ramah mesin pencari.

Fokus utama produk adalah personal branding serta penyajian profil dan karya developer.

---

# 2. Tujuan Produk

Website harus mencapai tujuan berikut:

1. Memperkenalkan identitas profesional pemilik portofolio.
2. Menampilkan keahlian dan teknologi yang dikuasai.
3. Menampilkan proyek terbaik dalam bentuk kartu dan studi kasus.
4. Meningkatkan kredibilitas sebagai developer.
5. Memudahkan recruiter, calon klien, dan rekan profesional memahami kemampuan pemilik.
6. Memudahkan pengunjung mengunduh CV.
7. Memudahkan pengunjung menghubungi pemilik.
8. Menjadi URL utama yang dapat dibagikan melalui CV, GitHub, LinkedIn, dan media sosial.

---

# 3. Target Pengguna

## 3.1 Pengguna utama

* Recruiter.
* Human Resources.
* Hiring manager.
* Engineering manager.
* Technical lead.
* Calon klien freelance.
* Rekan developer.
* Komunitas teknologi.
* Pengunjung umum yang ingin melihat profil dan karya pemilik.

## 3.2 Kebutuhan pengguna

Pengunjung harus dapat menemukan informasi berikut dengan cepat:

* Nama pemilik.
* Posisi atau spesialisasi.
* Ringkasan profil.
* Keahlian teknis.
* Pengalaman.
* Proyek unggulan.
* Peran pemilik pada setiap proyek.
* Teknologi yang digunakan.
* Tautan live demo.
* Tautan repository.
* CV.
* Cara menghubungi pemilik.

---

# 4. Keputusan Teknologi

Coding agent AI harus menggunakan stack berikut.

## 4.1 Stack utama

* Framework: Next.js.
* Router: Next.js App Router.
* Bahasa: TypeScript.
* Styling: Tailwind CSS.
* Konten studi kasus: MDX.
* Animasi: Motion.
* Ikon: Lucide React.
* Deployment: Vercel.
* Analytics: Vercel Analytics.
* Formulir kontak: Resend melalui Next.js Route Handler.
* Validasi formulir: Zod.
* Package manager: npm.

## 4.2 Versi teknologi

Gunakan versi stabil terbaru yang kompatibel pada saat implementasi.

Coding agent tidak boleh menggunakan versi beta, canary, experimental, atau release candidate kecuali diperlukan dan dinyatakan secara eksplisit.

## 4.3 Teknologi yang tidak digunakan

Versi awal tidak menggunakan:

* Flutter Web.
* Database.
* Dashboard admin.
* Headless CMS.
* Autentikasi.
* Redux.
* Backend terpisah.
* GraphQL.
* Sistem komentar.
* Sistem pembayaran.

## 4.4 Alasan pemilihan stack

Next.js dipilih karena mendukung:

* Static generation.
* Server rendering jika dibutuhkan.
* Metadata SEO.
* Image optimization.
* Route Handler.
* Dynamic routing.
* Deployment sederhana melalui Vercel.

TypeScript digunakan untuk menjaga konsistensi struktur data dan mengurangi kesalahan implementasi.

Tailwind CSS digunakan untuk mempercepat pembuatan antarmuka responsif dan menjaga konsistensi desain.

MDX digunakan agar studi kasus proyek dapat ditulis seperti dokumen tetapi tetap dapat menggunakan komponen React.

Tidak diperlukan database pada versi awal karena konten profil, skill, pengalaman, dan proyek dapat disimpan secara lokal di repository.

---

# 5. Arsitektur Produk

Website menggunakan arsitektur statis dengan konten lokal.

## 5.1 Sumber data

Gunakan sumber data berikut:

* Profil disimpan dalam file TypeScript.
* Daftar skill disimpan dalam file TypeScript.
* Pengalaman disimpan dalam file TypeScript.
* Data ringkas proyek disimpan dalam file TypeScript.
* Isi studi kasus proyek disimpan dalam file MDX.
* Gambar disimpan di direktori public.
* CV disimpan sebagai PDF di direktori public.

## 5.2 Rendering

* Halaman utama dirender secara statis.
* Halaman proyek dirender secara statis berdasarkan slug.
* Halaman detail proyek menggunakan dynamic route.
* Formulir kontak menggunakan server-side Route Handler.
* Komponen client hanya digunakan untuk fitur interaktif.

## 5.3 Prinsip arsitektur

Coding agent harus:

* Menggunakan Server Component secara default.
* Menggunakan Client Component hanya jika diperlukan.
* Memisahkan data, komponen, dan utilitas.
* Menghindari duplikasi kode.
* Membuat komponen yang dapat digunakan ulang.
* Menghindari ketergantungan berlebihan.
* Tidak menambahkan library tanpa kebutuhan yang jelas.

---

# 6. Struktur Direktori

Gunakan struktur dasar berikut:

```text
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── contact/
│   ├── layout/
│   ├── projects/
│   ├── sections/
│   ├── theme/
│   └── ui/
│
├── content/
│   └── projects/
│       ├── project-one.mdx
│       └── project-two.mdx
│
├── data/
│   ├── experience.ts
│   ├── navigation.ts
│   ├── profile.ts
│   ├── projects.ts
│   └── skills.ts
│
├── lib/
│   ├── mdx.ts
│   ├── metadata.ts
│   ├── utils.ts
│   └── validations.ts
│
└── types/
    ├── experience.ts
    ├── project.ts
    ├── profile.ts
    └── skill.ts

public/
├── cv/
│   └── cv.pdf
├── images/
│   ├── avatar/
│   ├── projects/
│   └── social/
├── favicon.ico
└── og-image.jpg
```

Coding agent boleh menambah direktori apabila diperlukan, tetapi tidak boleh mengubah pola arsitektur utama tanpa alasan teknis yang jelas.

---

# 7. Halaman dan Bagian Website

## 7.1 Halaman utama

URL:

```text
/
```

Halaman utama terdiri dari:

1. Navigation bar.
2. Hero.
3. About.
4. Skills.
5. Featured Projects.
6. Experience.
7. Contact.
8. Footer.

---

## 7.2 Navigation Bar

Navigation bar harus menampilkan:

* Nama atau logo pemilik.
* Home.
* About.
* Skills.
* Projects.
* Experience.
* Contact.
* Tombol pengubah tema.
* Tombol Download CV.

Perilaku:

* Navigation bar tetap terlihat ketika halaman di-scroll.
* Background dapat berubah menjadi lebih solid setelah pengguna melakukan scroll.
* Menu aktif menyesuaikan section yang sedang dilihat.
* Klik menu melakukan smooth scroll.
* Mobile menggunakan hamburger menu.
* Menu mobile harus dapat ditutup dengan tombol, klik menu, atau tombol Escape.
* Scroll halaman harus terkunci ketika menu mobile terbuka.

---

## 7.3 Hero Section

Hero harus menjadi bagian pertama yang terlihat.

Konten wajib:

* Sapaan singkat.
* Nama lengkap.
* Job title.
* Ringkasan profesional.
* Tombol Lihat Proyek.
* Tombol Hubungi Saya.
* Tautan GitHub.
* Tautan LinkedIn.
* Foto, avatar, atau ilustrasi.

Contoh struktur konten:

```text
Halo, saya [Nama]

[Job Title]

Saya membangun aplikasi web dan mobile yang cepat, mudah digunakan,
dan memiliki struktur kode yang dapat dipelihara.
```

Perilaku:

* Tombol Lihat Proyek menuju section Projects.
* Tombol Hubungi Saya menuju section Contact.
* Tautan eksternal dibuka pada tab baru.
* Ikon tautan eksternal memiliki accessible label.

Kriteria penerimaan:

* Nama dan profesi terlihat tanpa scroll pada desktop.
* Identitas pemilik dapat dipahami dalam waktu sekitar lima detik.
* Tombol utama terlihat jelas.
* Layout tetap rapi pada layar dengan lebar 320 piksel.

---

## 7.4 About Section

Konten wajib:

* Deskripsi profil.
* Latar belakang singkat.
* Fokus pengembangan.
* Cara bekerja.
* Tujuan profesional.
* Status ketersediaan.
* Lokasi umum jika tersedia.

Bagian ini tidak boleh terlalu panjang.

Target panjang konten:

* Dua hingga empat paragraf singkat.
* Maksimal sekitar 400 kata.

---

## 7.5 Skills Section

Skill dikelompokkan berdasarkan kategori.

Kategori awal:

* Frontend.
* Backend.
* Mobile.
* Database.
* Tools.
* Concepts.

Data setiap skill:

```ts
type Skill = {
  name: string;
  category: string;
  icon?: string;
  featured?: boolean;
};
```

Ketentuan:

* Jangan gunakan persentase penguasaan.
* Jangan gunakan progress bar kemampuan.
* Setiap skill ditampilkan sebagai badge atau kartu kecil.
* Tampilan harus mudah dipindai.
* Ikon bersifat opsional.
* Agent harus menyediakan placeholder data yang mudah diganti.

---

## 7.6 Projects Section

Projects merupakan bagian utama website.

Bagian ini harus menampilkan:

* Judul section.
* Deskripsi singkat.
* Daftar proyek.
* Filter kategori.
* Penanda proyek unggulan.
* Tautan ke semua proyek jika jumlah proyek bertambah.

Data ringkas proyek:

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  role: string;
  year: number;
  featured: boolean;
  status: "completed" | "in-progress" | "archived";
  demoUrl?: string;
  repositoryUrl?: string;
};
```

Kartu proyek harus menampilkan:

* Thumbnail.
* Nama proyek.
* Deskripsi singkat.
* Daftar teknologi utama.
* Kategori.
* Tahun.
* Tombol Detail.
* Tombol Demo jika tersedia.
* Tombol Repository jika tersedia.

Perilaku:

* Proyek unggulan tampil lebih dahulu.
* Filter kategori tidak melakukan reload halaman.
* Filter memiliki pilihan Semua.
* Proyek yang tidak memiliki demo tidak menampilkan tombol demo.
* Proyek yang tidak memiliki repository tidak menampilkan tombol repository.
* Klik kartu atau tombol Detail membuka halaman detail proyek.

---

## 7.7 Halaman Detail Proyek

URL:

```text
/projects/[slug]
```

Halaman menggunakan konten MDX.

Konten wajib:

1. Nama proyek.
2. Deskripsi singkat.
3. Gambar utama.
4. Informasi proyek.
5. Latar belakang.
6. Masalah.
7. Tujuan.
8. Solusi.
9. Peran pemilik.
10. Teknologi.
11. Fitur utama.
12. Tantangan.
13. Hasil.
14. Pembelajaran.
15. Galeri.
16. Tautan demo jika tersedia.
17. Tautan repository jika tersedia.

Informasi ringkas proyek harus memuat:

* Tahun.
* Kategori.
* Status.
* Peran.
* Teknologi.

Ketentuan:

* Slug yang tidak ditemukan menampilkan halaman 404.
* Setiap halaman proyek memiliki metadata yang berbeda.
* Setiap halaman memiliki Open Graph metadata.
* Gambar harus menggunakan Next.js Image.
* Konten harus nyaman dibaca.
* Lebar area teks tidak boleh terlalu lebar.
* Heading MDX harus memiliki hierarchy yang benar.

---

## 7.8 Experience Section

Gunakan tampilan timeline.

Data pengalaman:

```ts
type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};
```

Konten setiap item:

* Nama perusahaan atau organisasi.
* Jabatan.
* Periode.
* Lokasi atau tipe kerja jika tersedia.
* Deskripsi.
* Pencapaian.
* Teknologi.

Jika belum memiliki pengalaman kerja formal, data dapat berisi:

* Freelance.
* Magang.
* Organisasi.
* Open-source.
* Proyek independen.

---

## 7.9 Contact Section

Contact section harus menampilkan:

* Judul.
* Call-to-action.
* Alamat email.
* GitHub.
* LinkedIn.
* Formulir kontak.

Field formulir:

* Nama.
* Email.
* Subjek.
* Pesan.

Schema validasi:

```ts
const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(2000),
});
```

Perilaku formulir:

* Tombol menampilkan loading state.
* Tombol dinonaktifkan selama pengiriman.
* Kesalahan validasi ditampilkan di bawah field terkait.
* Pesan sukses ditampilkan setelah pengiriman berhasil.
* Pesan error ditampilkan jika pengiriman gagal.
* Field dibersihkan setelah berhasil.
* Formulir tidak boleh mengirim data jika validasi gagal.
* Validasi dilakukan pada client dan server.
* API key Resend hanya disimpan di environment variable.

Environment variable:

```text
RESEND_API_KEY=
CONTACT_EMAIL=
RESEND_FROM_EMAIL=
```

Ketentuan keamanan:

* Jangan mengekspos API key ke client.
* Sanitasi dan validasi semua input.
* Tambahkan honeypot field untuk perlindungan spam dasar.
* Berikan respons server yang aman dan tidak mengekspos detail internal.
* Tambahkan rate limiting jika deployment mendukungnya.

---

## 7.10 Footer

Footer menampilkan:

* Nama pemilik.
* Tahun berjalan.
* Tautan GitHub.
* Tautan LinkedIn.
* Email.
* Tautan navigasi singkat.
* Informasi teknologi yang digunakan.

Tahun harus dibuat secara dinamis.

---

# 8. Tema Gelap dan Terang

Website harus mendukung:

* Light theme.
* Dark theme.
* System theme.

Ketentuan:

* Tema default mengikuti pengaturan sistem.
* Preferensi disimpan pada browser.
* Tidak boleh terjadi flash tema yang salah saat halaman dimuat.
* Tombol tema memiliki accessible label.
* Semua komponen harus terlihat jelas pada kedua tema.
* Kontras warna harus memenuhi standar aksesibilitas dasar.

Implementasi dapat menggunakan `next-themes`.

---

# 9. Desain Antarmuka

## 9.1 Gaya visual

Gaya yang diinginkan:

* Modern.
* Minimalis.
* Profesional.
* Bersih.
* Berorientasi teknologi.
* Memiliki ruang kosong yang cukup.
* Tidak terlalu dekoratif.

## 9.2 Prinsip desain

* Konten menjadi fokus utama.
* Proyek harus lebih menonjol daripada dekorasi.
* Gunakan maksimal satu warna aksen utama.
* Hindari terlalu banyak gradient.
* Hindari animasi berlebihan.
* Hindari background yang mengganggu keterbacaan.
* Gunakan radius, spacing, border, dan shadow secara konsisten.
* Pastikan semua elemen interaktif memiliki hover dan focus state.

## 9.3 Tipografi

Gunakan font web yang mudah dibaca.

Rekomendasi:

* Geist.
* Inter.
* Plus Jakarta Sans.

Gunakan satu keluarga font utama dan satu font monospace bila diperlukan untuk elemen teknis.

---

# 10. Responsive Design

Breakpoints mengikuti standar Tailwind CSS.

Website harus diuji minimal pada:

* 320 × 568.
* 375 × 667.
* 390 × 844.
* 768 × 1024.
* 1024 × 768.
* 1280 × 800.
* 1440 × 900.

Ketentuan:

* Tidak boleh ada horizontal overflow.
* Navigation mobile harus berfungsi.
* Grid proyek menyesuaikan ukuran layar.
* Ukuran teks tidak terlalu kecil.
* Tombol dapat ditekan dengan nyaman pada perangkat sentuh.
* Gambar tidak keluar dari container.
* Formulir menggunakan lebar penuh pada mobile.

---

# 11. Animasi

Gunakan Motion hanya untuk animasi yang memiliki fungsi visual jelas.

Animasi yang diperbolehkan:

* Fade in section.
* Slide ringan ketika elemen masuk viewport.
* Hover kartu.
* Transisi menu mobile.
* Transisi penggantian tema.
* Feedback tombol.

Ketentuan:

* Durasi ideal antara 150 hingga 500 milidetik.
* Hindari parallax berat.
* Hindari animasi terus-menerus.
* Hindari animasi yang mengganggu pembacaan.
* Hormati preferensi `prefers-reduced-motion`.
* Animasi tidak boleh menyebabkan layout shift.

---

# 12. SEO

Coding agent harus mengimplementasikan:

* Metadata global.
* Metadata per halaman proyek.
* Title template.
* Meta description.
* Canonical URL.
* Open Graph.
* Twitter Card.
* Sitemap.
* Robots.txt.
* Favicon.
* Web manifest jika relevan.
* Structured data JSON-LD.

Structured data yang digunakan:

* `Person`.
* `WebSite`.
* `CreativeWork` atau `SoftwareApplication` untuk proyek jika relevan.

Format title:

```text
Halaman | Nama Pemilik
```

Contoh:

```text
Flutter Expense Tracker | Nama Pemilik
```

---

# 13. Performa

Target Lighthouse pada build produksi:

* Performance: minimal 90.
* Accessibility: minimal 90.
* Best Practices: minimal 90.
* SEO: minimal 90.

Optimasi wajib:

* Gunakan Next.js Image.
* Tentukan ukuran gambar.
* Gunakan WebP atau AVIF jika memungkinkan.
* Gunakan lazy loading untuk gambar di bawah viewport.
* Jangan mengimpor JavaScript yang tidak diperlukan.
* Jangan membuat seluruh halaman sebagai Client Component.
* Minimalkan third-party script.
* Gunakan font optimization dari Next.js.
* Hindari cumulative layout shift.
* Gunakan static generation selama memungkinkan.

---

# 14. Aksesibilitas

Website harus memenuhi ketentuan berikut:

* Menggunakan elemen HTML semantik.
* Memiliki satu elemen `h1` utama per halaman.
* Heading tersusun berurutan.
* Semua gambar memiliki alt text.
* Gambar dekoratif menggunakan alt kosong.
* Semua field formulir memiliki label.
* Semua tombol memiliki nama yang dapat dibaca screen reader.
* Seluruh fitur dapat digunakan dengan keyboard.
* Focus state terlihat jelas.
* Menu mobile dapat ditutup dengan Escape.
* Warna bukan satu-satunya indikator status.
* Kontras teks memadai.
* Mendukung reduced motion.
* Tautan eksternal diberi indikator yang sesuai.

---

# 15. Keamanan

Ketentuan wajib:

* Gunakan HTTPS pada produksi.
* Jangan menyimpan secret di source code.
* Jangan melakukan commit file `.env`.
* Sediakan `.env.example`.
* Validasi input di server.
* Jangan merender input pengguna sebagai HTML.
* Jangan menggunakan `dangerouslySetInnerHTML` untuk input pengguna.
* Gunakan dependency resmi dan terawat.
* Hindari library yang tidak diperlukan.
* Jangan mengekspos stack trace melalui response API.

---

# 16. Model Data Profil

Gunakan struktur berikut:

```ts
type Profile = {
  name: string;
  shortName?: string;
  role: string;
  headline: string;
  shortBio: string;
  fullBio: string[];
  location?: string;
  availability?: string;
  email: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
};
```

Semua konten contoh harus dipisahkan dari komponen agar mudah diganti.

---

# 17. Konten Placeholder

Jika data asli belum tersedia, coding agent harus:

* Menggunakan placeholder yang jelas.
* Tidak membuat klaim pengalaman palsu.
* Tidak membuat nama perusahaan fiktif seolah-olah nyata.
* Tidak membuat statistik pencapaian palsu.
* Memberi tanda `TODO` pada konten yang perlu diganti.
* Mengumpulkan seluruh konten utama di direktori `data`.

Contoh:

```ts
export const profile = {
  name: "Nama Lengkap",
  role: "Software Developer",
  headline: "Membangun produk digital yang cepat dan mudah digunakan.",
  shortBio: "TODO: Tambahkan ringkasan profil.",
};
```

---

# 18. Fitur Berdasarkan Prioritas

## 18.1 Must Have

* Next.js App Router.
* TypeScript.
* Tailwind CSS.
* Halaman utama.
* Navigation bar.
* Hero.
* About.
* Skills.
* Projects.
* Detail proyek berbasis MDX.
* Experience.
* Contact.
* Footer.
* Responsive design.
* Dark mode.
* Download CV.
* GitHub dan LinkedIn.
* Metadata SEO.
* Sitemap.
* Robots.txt.
* Formulir kontak.
* Validasi client dan server.
* Halaman 404.

## 18.2 Should Have

* Filter proyek.
* Animasi Motion.
* Vercel Analytics.
* Structured data.
* Galeri proyek.
* Status availability.
* Toast atau inline notification.
* Active navigation state.

## 18.3 Could Have

* Blog.
* Bahasa Inggris.
* Halaman seluruh proyek.
* Testimoni.
* Statistik GitHub.
* RSS feed.
* Newsletter.
* Halaman tools atau setup.
* Command palette.
* Search proyek.

## 18.4 Tidak termasuk versi awal

* Dashboard admin.
* Login.
* Registrasi.
* Database.
* Pembayaran.
* Komentar.
* Chat real-time.
* Marketplace.
* CMS eksternal.
* Aplikasi Flutter Web sebagai website utama.

---

# 19. Perintah Implementasi untuk Coding Agent

Coding agent harus mengikuti aturan berikut:

1. Baca seluruh PRD sebelum menulis kode.
2. Buat rencana implementasi singkat.
3. Implementasikan fitur sesuai urutan prioritas.
4. Jangan menambahkan fitur di luar scope.
5. Gunakan TypeScript strict mode.
6. Hindari penggunaan tipe `any`.
7. Gunakan Server Component secara default.
8. Pisahkan komponen besar menjadi komponen kecil.
9. Simpan konten di file data, bukan hard-coded di JSX.
10. Gunakan semantic HTML.
11. Buat antarmuka yang responsif sejak awal.
12. Pastikan light mode dan dark mode berfungsi.
13. Gunakan reusable component untuk button, section heading, badge, dan project card.
14. Tampilkan loading, success, dan error state pada formulir.
15. Jangan menggunakan data palsu yang terlihat seperti fakta.
16. Tambahkan komentar hanya pada logika yang tidak jelas.
17. Jangan menambahkan dependency jika dapat diselesaikan dengan fitur bawaan.
18. Pastikan tidak ada error TypeScript.
19. Pastikan tidak ada error lint.
20. Pastikan production build berhasil.
21. Buat README berisi cara instalasi, konfigurasi, dan deployment.
22. Buat `.env.example`.
23. Jangan menyertakan secret pada repository.
24. Buat komponen yang mudah diubah oleh manusia maupun agent AI berikutnya.

---

# 20. Perintah yang Harus Berhasil

Coding agent harus memastikan perintah berikut berhasil:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Jika tersedia, tambahkan:

```bash
npm run typecheck
```

Script yang direkomendasikan:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

---

# 21. Environment Variables

Sediakan file `.env.example`:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_EMAIL=
```

Ketentuan:

* Website harus tetap dapat dijalankan tanpa Resend.
* Jika konfigurasi email belum tersedia, UI tetap tampil.
* API harus mengembalikan pesan konfigurasi yang aman.
* Jangan menampilkan nilai environment variable pada client.

---

# 22. README

README wajib memuat:

1. Ringkasan proyek.
2. Screenshot atau preview.
3. Stack teknologi.
4. Prasyarat.
5. Instalasi.
6. Menjalankan development server.
7. Konfigurasi environment variable.
8. Cara mengganti data profil.
9. Cara menambahkan proyek.
10. Cara menambahkan studi kasus MDX.
11. Cara mengganti CV.
12. Cara mengganti gambar.
13. Cara menjalankan lint dan build.
14. Cara deploy ke Vercel.

---

# 23. Definition of Done

Produk dianggap selesai jika:

* Seluruh fitur Must Have tersedia.
* Website dapat dijalankan secara lokal.
* Production build berhasil.
* Tidak ada error TypeScript.
* Tidak ada error lint.
* Tidak ada error console pada penggunaan normal.
* Navigation berfungsi pada desktop dan mobile.
* Semua section dapat diakses.
* Minimal tiga proyek placeholder tersedia.
* Detail proyek dapat dibuka berdasarkan slug.
* Slug yang tidak tersedia menampilkan 404.
* Dark mode dan light mode berfungsi.
* Preferensi tema tersimpan.
* Formulir memiliki validasi.
* Formulir menampilkan loading, sukses, dan gagal.
* CV dapat dibuka atau diunduh.
* Tautan eksternal berfungsi.
* Website tidak memiliki horizontal overflow.
* Metadata SEO tersedia.
* Sitemap dan robots.txt dapat diakses.
* Website memiliki Open Graph image.
* Semua gambar menggunakan optimasi yang sesuai.
* Website dapat digunakan dengan keyboard.
* README tersedia.
* `.env.example` tersedia.
* Website siap di-deploy ke Vercel.

---

# 24. Kriteria Penerimaan per Fitur

## Navigation

* Menu desktop terlihat pada layar besar.
* Hamburger menu terlihat pada mobile.
* Semua menu menuju section yang benar.
* Menu mobile tertutup setelah navigasi.
* Tombol tema dapat digunakan.
* Tombol CV dapat digunakan.

## Hero

* Nama, role, dan headline terlihat jelas.
* Terdapat tombol menuju proyek.
* Terdapat tombol menuju kontak.
* GitHub dan LinkedIn dapat dibuka.
* Tampilan tidak rusak pada mobile.

## Projects

* Daftar proyek berasal dari file data.
* Featured project tampil lebih dahulu.
* Filter berfungsi tanpa reload.
* Setiap kartu memiliki informasi minimum.
* Detail proyek dapat dibuka.
* Tombol demo hanya muncul jika URL tersedia.
* Tombol repository hanya muncul jika URL tersedia.

## Project Detail

* Konten berasal dari MDX.
* Metadata dibuat berdasarkan proyek.
* Data proyek ditampilkan dengan benar.
* Galeri responsif.
* Halaman yang tidak ditemukan menampilkan 404.

## Contact

* Field wajib divalidasi.
* Email tidak valid ditolak.
* Pesan terlalu pendek ditolak.
* Loading state terlihat.
* Tombol tidak dapat diklik berulang saat mengirim.
* Success state terlihat.
* Error state terlihat.
* API key tidak berada di client.

## Theme

* Light mode tersedia.
* Dark mode tersedia.
* System mode tersedia.
* Preferensi disimpan.
* Tidak ada flash tema yang mengganggu.

---

# 25. Pengembangan Berikutnya

Setelah versi awal stabil, pengembangan dapat dilanjutkan ke:

1. Blog berbasis MDX.
2. Versi Bahasa Inggris.
3. CMS.
4. Search.
5. Newsletter.
6. Integrasi GitHub API.
7. Halaman seluruh proyek.
8. Testimoni.
9. Statistik kunjungan.
10. Subdomain khusus untuk demo Flutter Web.

Contoh arsitektur masa depan:

```text
www.domain.com
Website portofolio Next.js

demo.domain.com
Demo aplikasi Flutter Web

blog.domain.com
Blog atau dialihkan ke www.domain.com/blog
```

---

# 26. Hasil Akhir yang Diharapkan

Hasil akhir berupa website portofolio developer dengan karakteristik:

* Cepat.
* Responsif.
* Modern.
* Profesional.
* Mudah dipahami recruiter.
* Mudah diperbarui.
* Ramah SEO.
* Ramah aksesibilitas.
* Memiliki studi kasus proyek.
* Dapat dikembangkan secara bertahap.
* Mudah dipelihara oleh manusia maupun agent AI.
* Siap di-deploy menggunakan Vercel.
