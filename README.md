# NusaNews CMS

Portal berita dan dashboard CMS multi-role berbasis React, Vite, Bootstrap 5, React Router DOM, React Hook Form, SweetAlert2, Chart.js, dan Supabase.

## Fitur

- Publik: beranda, daftar berita, detail berita, kategori, pencarian, trending, terbaru, populer, profil wartawan, tentang kami, kontak.
- Member: login/register, profil saya, ubah profil, favorit, komentar, like, riwayat komentar, logout.
- Wartawan: dashboard, tambah/edit/hapus berita sendiri, upload thumbnail, kelola artikel, profil, statistik, komentar artikel.
- Admin: dashboard, berita, kategori, wartawan, member, komentar, banner, tentang kami, kontak, SEO, setting website, trending, iklan, laporan.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Salin `.env.example` menjadi `.env` lalu isi:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Jika `.env` belum diisi, aplikasi berjalan dalam mode demo lokal.

## Supabase

1. Buat project Supabase.
2. Jalankan `supabase/schema.sql` di SQL Editor.
3. Buat bucket storage bernama `article-thumbnails`.
4. Tambahkan metadata `role` pada user Supabase Auth: `member`, `journalist`, atau `admin`.

## Deployment

- Frontend: deploy ke Vercel dengan build command `npm run build` dan output `dist`.
- Backend: Supabase hosted project.
- Environment Vercel: isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
