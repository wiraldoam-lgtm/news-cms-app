export const categories = ['Nasional', 'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Lifestyle'];

export const journalists = [
  { id: 1, name: 'Raka Pradana', beat: 'Politik', articles: 128, avatar: 'RP' },
  { id: 2, name: 'Sinta Maharani', beat: 'Teknologi', articles: 94, avatar: 'SM' },
  { id: 3, name: 'Dimas Haryanto', beat: 'Ekonomi', articles: 76, avatar: 'DH' },
];

export const articles = [
  {
    id: 1,
    title: 'Transformasi Digital Pelayanan Publik Makin Cepat',
    slug: 'transformasi-digital-pelayanan-publik',
    category: 'Teknologi',
    author: 'Sinta Maharani',
    date: '12 Juni 2026',
    excerpt: 'Pemerintah daerah mulai mengintegrasikan layanan publik dengan dashboard data terpadu.',
    content:
      'Transformasi digital pelayanan publik memasuki fase baru. Integrasi data lintas instansi membuat proses administrasi lebih singkat, transparan, dan mudah dipantau masyarakat.',
    views: 12840,
    likes: 342,
    comments: 48,
    trending: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Pasar Modal Menguat Ditopang Optimisme Investor',
    slug: 'pasar-modal-menguat',
    category: 'Ekonomi',
    author: 'Dimas Haryanto',
    date: '11 Juni 2026',
    excerpt: 'Sektor perbankan dan teknologi menjadi pendorong utama penguatan indeks pekan ini.',
    content:
      'Pelaku pasar menilai stabilitas kebijakan moneter dan kinerja emiten kuartalan memberi sinyal positif bagi arus modal domestik.',
    views: 9340,
    likes: 221,
    comments: 31,
    trending: true,
    popular: false,
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Liga Nasional Masuki Pekan Penentuan',
    slug: 'liga-nasional-pekan-penentuan',
    category: 'Olahraga',
    author: 'Raka Pradana',
    date: '10 Juni 2026',
    excerpt: 'Persaingan papan atas kian ketat menjelang akhir musim kompetisi.',
    content:
      'Dua klub teratas hanya terpaut satu poin. Rotasi pemain dan kedalaman skuad akan menjadi faktor penting dalam tiga pertandingan terakhir.',
    views: 15420,
    likes: 410,
    comments: 66,
    trending: false,
    popular: true,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Kebijakan Transportasi Hijau Diperluas ke Kota Satelit',
    slug: 'transportasi-hijau-kota-satelit',
    category: 'Nasional',
    author: 'Raka Pradana',
    date: '9 Juni 2026',
    excerpt: 'Insentif kendaraan rendah emisi dan koridor angkutan massal akan diperluas.',
    content:
      'Pemerintah menyiapkan insentif fiskal dan regulasi pendukung agar transisi transportasi rendah emisi bisa diterapkan di wilayah penyangga metropolitan.',
    views: 7210,
    likes: 188,
    comments: 19,
    trending: false,
    popular: false,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
];

export const comments = [
  { id: 1, article: 'Transformasi Digital Pelayanan Publik Makin Cepat', member: 'Maya Lestari', body: 'Semoga integrasinya juga sampai ke kecamatan.', status: 'approved' },
  { id: 2, article: 'Pasar Modal Menguat Ditopang Optimisme Investor', member: 'Andi Firmansyah', body: 'Analisisnya membantu untuk investor pemula.', status: 'pending' },
  { id: 3, article: 'Liga Nasional Masuki Pekan Penentuan', member: 'Nadia Putri', body: 'Pertandingan pekan depan wajib ditonton.', status: 'approved' },
];

export const banners = [
  { id: 1, title: 'Headline Nasional', placement: 'Homepage Hero', active: true },
  { id: 2, title: 'Promo Langganan', placement: 'Sidebar', active: true },
];

export const ads = [
  { id: 1, brand: 'Bank Nusantara', slot: 'Top leaderboard', status: 'active' },
  { id: 2, brand: 'Traveloka Lokal', slot: 'Article inline', status: 'scheduled' },
];
