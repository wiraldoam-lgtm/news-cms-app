import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ads, articles, banners, categories, comments, journalists } from '../../data/mockData';

const sectionConfig = {
  berita: { title: 'Kelola Berita', columns: ['Judul', 'Kategori', 'Penulis'], rows: articles.map((item) => [item.title, item.category, item.author]) },
  kategori: { title: 'Kelola Kategori', columns: ['Nama Kategori', 'Status'], rows: categories.map((item) => [item, 'Aktif']) },
  wartawan: { title: 'Kelola Wartawan', columns: ['Nama', 'Desk', 'Artikel'], rows: journalists.map((item) => [item.name, item.beat, item.articles]) },
  member: { title: 'Kelola Member', columns: ['Nama', 'Email', 'Status'], rows: [['Maya Lestari', 'maya@email.com', 'Aktif'], ['Andi Firmansyah', 'andi@email.com', 'Aktif']] },
  komentar: { title: 'Kelola Komentar', columns: ['Artikel', 'Member', 'Status'], rows: comments.map((item) => [item.article, item.member, item.status]) },
  banner: { title: 'Kelola Banner', columns: ['Judul', 'Placement', 'Status'], rows: banners.map((item) => [item.title, item.placement, item.active ? 'Aktif' : 'Nonaktif']) },
  tentang: { title: 'Kelola Halaman Tentang Kami', columns: ['Section', 'Konten', 'Status'], rows: [['Profil Redaksi', 'Ruang redaksi digital untuk berita akurat', 'Published'], ['Misi', 'Akurat, cepat, dan berdampak publik', 'Published']] },
  kontak: { title: 'Kelola Kontak', columns: ['Field', 'Nilai', 'Status'], rows: [['Email', 'redaksi@nusanews.id', 'Aktif'], ['Telepon', '+62 812 0000 2026', 'Aktif'], ['Alamat', 'Jakarta, Indonesia', 'Aktif']] },
  seo: { title: 'Kelola SEO', columns: ['Halaman', 'Meta Title', 'Status'], rows: [['Beranda', 'NusaNews - Portal Berita', 'Lengkap'], ['Berita', 'Daftar Berita Terbaru', 'Lengkap']] },
  setting: { title: 'Kelola Setting Website', columns: ['Setting', 'Nilai', 'Status'], rows: [['Nama Website', 'NusaNews', 'Aktif'], ['Email Redaksi', 'redaksi@nusanews.id', 'Aktif']] },
  trending: { title: 'Kelola Trending News', columns: ['Judul', 'Kategori', 'Trending'], rows: articles.map((item) => [item.title, item.category, item.trending ? 'Ya' : 'Tidak']) },
  iklan: { title: 'Kelola Iklan', columns: ['Brand', 'Slot', 'Status'], rows: ads.map((item) => [item.brand, item.slot, item.status]) },
  laporan: { title: 'Laporan Berita, Member, Wartawan', columns: ['Laporan', 'Periode', 'Export'], rows: [['Berita', 'Bulanan', 'CSV/PDF'], ['Member', 'Bulanan', 'CSV/PDF'], ['Wartawan', 'Bulanan', 'CSV/PDF']] },
};

export default function AdminManagement() {
  const { section } = useParams();
  const config = sectionConfig[section] || sectionConfig.berita;

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Admin CMS</span>
          <h1>{config.title}</h1>
          <p className="text-secondary">CRUD, moderasi, dan laporan siap dihubungkan ke tabel Supabase.</p>
        </div>
        <button className="btn btn-brand" onClick={() => Swal.fire('Form siap', 'Aksi tambah/edit demo berhasil dibuka.', 'success')}>
          Tambah Data
        </button>
      </div>
      <section className="content-panel">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                {config.columns.map((column) => <th key={column}>{column}</th>)}
                <th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {config.rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell) => <td key={cell}>{cell}</td>)}
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
