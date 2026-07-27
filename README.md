# Web Portofolio Developer Personal Branding

Website portofolio developer publik yang modern, responsif, cepat, ramah SEO, dan berorientasi pada personal branding. Didevelop menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **MDX**, dan **Resend**.

---

## 🚀 Stack Teknologi

* **Framework:** Next.js (App Router)
* **Bahasa:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS (Mode Gelap/Terang via `next-themes`)
* **Studi Kasus Proyek:** MDX (`next-mdx-remote`)
* **Ikon & Micro-Interactions:** Lucide React & Framer Motion
* **Validasi & Formulir Kontak:** Zod & Resend API
* **Deployment:** Vercel

---

## 🛠️ Prasyarat

* **Node.js:** v18.x atau yang lebih baru
* **npm:** v9.x atau yang lebih baru

---

## 📦 Instalasi & Menjalankan Lokal

1. **Clone repository & masuk ke direktori proyek:**
   ```bash
   cd porto
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:3000`.

---

## ⚙️ Perintah Validasi & Build

```bash
# Pengujian Tipe Data TypeScript
npm run typecheck

# Pengujian Linting ESLint
npm run lint

# Kompilasi Production Build
npm run build

# Menjalankan Build Produksi Secara Lokal
npm run start
```

---

## 📝 Cara Memperbarui Konten

### 1. Mengubah Data Profil & Sosmed
Edit file `src/data/profile.ts`:
```ts
export const profileData = {
  name: "Arif Faishal Nugraha",
  role: "Junior Software Developer",
  email: "email@anda.com",
  socialLinks: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
  },
};
```

### 2. Mengubah / Menambah Keahlian (Skills)
Edit file `src/data/skills.ts` untuk mengelompokkan skill berdasarkan kategori (`Frontend`, `Backend`, `Mobile`, `Database`, `Tools`, `Concepts`).

### 3. Menambah Proyek Baru
1. Tambahkan item proyek di `src/data/projects.ts`.
2. Buat file studi kasus berformat `.mdx` di direktori `src/content/projects/[slug].mdx`.

### 4. Mengganti CV & Foto Avatar
* Letakkan file CV format PDF di `public/cv/cv.pdf`.
* Letakkan foto profil atau gambar pendukung di direktori `public/images/`.

---

## 🌐 Deployment ke Vercel

1. Push repository ini ke akun GitHub Anda.
2. Buka dashboard [Vercel](https://vercel.com) dan buat proyek baru dari repository ini.
3. Masukkan Environment Variables di Vercel Settings:
   * `NEXT_PUBLIC_SITE_URL` = URL domain publik Vercel Anda.
   * `RESEND_API_KEY` = API Key resmi dari [Resend.com](https://resend.com).
   * `RESEND_FROM_EMAIL` = Email pengirim terverifikasi (atau `onboarding@resend.dev`).
   * `CONTACT_EMAIL` = Email tujuan penerima pesan formulir kontak.
4. Klik **Deploy**.
