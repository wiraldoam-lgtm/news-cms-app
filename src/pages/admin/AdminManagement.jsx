import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useContent } from '../../lib/content';

const localSections = {
  member: { title: 'Kelola Member', columns: ['Nama', 'Email', 'Status'], rows: [['Maya Lestari', 'maya@email.com', 'Aktif'], ['Andi Firmansyah', 'andi@email.com', 'Aktif']] },
  tentang: { title: 'Kelola Halaman Tentang Kami', columns: ['Section', 'Konten', 'Status'], rows: [['Profil Redaksi', 'Ruang redaksi digital untuk berita akurat', 'Published'], ['Misi', 'Akurat, cepat, dan berdampak publik', 'Published']] },
  kontak: { title: 'Kelola Kontak', columns: ['Field', 'Nilai', 'Status'], rows: [['Email', 'redaksi@nusanews.id', 'Aktif'], ['Telepon', '+62 812 0000 2026', 'Aktif'], ['Alamat', 'Jakarta, Indonesia', 'Aktif']] },
  seo: { title: 'Kelola SEO', columns: ['Halaman', 'Meta Title', 'Status'], rows: [['Beranda', 'NusaNews - Portal Berita', 'Lengkap'], ['Berita', 'Daftar Berita Terbaru', 'Lengkap']] },
  setting: { title: 'Kelola Setting Website', columns: ['Setting', 'Nilai', 'Status'], rows: [['Nama Website', 'NusaNews', 'Aktif'], ['Email Redaksi', 'redaksi@nusanews.id', 'Aktif']] },
  laporan: { title: 'Laporan Berita, Member, Wartawan', columns: ['Laporan', 'Periode', 'Export'], rows: [['Berita', 'Bulanan', 'CSV/PDF'], ['Member', 'Bulanan', 'CSV/PDF'], ['Wartawan', 'Bulanan', 'CSV/PDF']] },
};

function createConfig(section, content) {
  const configs = {
    berita: { title: 'Kelola Berita', columns: ['Judul', 'Kategori', 'Penulis'], rows: content.articles.map((item) => [item.title, item.category, item.author]), ids: content.articles.map((item) => item.id) },
    kategori: { title: 'Kelola Kategori', columns: ['Nama Kategori', 'Status'], rows: content.categories.map((item) => [item, 'Aktif']) },
    wartawan: { title: 'Kelola Wartawan', columns: ['Nama', 'Desk', 'Artikel'], rows: content.journalists.map((item) => [item.name, item.beat, item.articles]), ids: content.journalists.map((item) => item.id) },
    komentar: { title: 'Kelola Komentar', columns: ['Artikel', 'Member', 'Status'], rows: content.comments.map((item) => [item.article, item.member, item.status]), ids: content.comments.map((item) => item.id) },
    banner: { title: 'Kelola Banner', columns: ['Judul', 'Placement', 'Status'], rows: content.banners.map((item) => [item.title, item.placement, item.active ? 'Aktif' : 'Nonaktif']), ids: content.banners.map((item) => item.id) },
    trending: { title: 'Kelola Trending News', columns: ['Judul', 'Kategori', 'Trending'], rows: content.articles.map((item) => [item.title, item.category, item.trending ? 'Ya' : 'Tidak']), ids: content.articles.map((item) => item.id) },
    iklan: { title: 'Kelola Iklan', columns: ['Brand', 'Slot', 'Status'], rows: content.ads.map((item) => [item.brand, item.slot, item.status]), ids: content.ads.map((item) => item.id) },
    ...localSections,
  };

  return configs[section] || configs.berita;
}

export default function AdminManagement() {
  const { section } = useParams();
  const content = useContent();
  const config = useMemo(() => createConfig(section, content), [section, content]);
  const [rows, setRows] = useState(config.rows);

  useEffect(() => {
    setRows(config.rows);
  }, [config]);

  const showRowForm = async (title, initialValues = []) => {
    const { value } = await Swal.fire({
      title,
      html: config.columns.map((column, index) => (
        `<input id="field-${index}" class="swal2-input" placeholder="${column}" value="${initialValues[index] || ''}">`
      )).join(''),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => config.columns.map((_, index) => document.getElementById(`field-${index}`).value.trim()),
    });

    if (!value) return null;
    if (value.some((item) => !item)) {
      await Swal.fire('Data belum lengkap', 'Semua field wajib diisi.', 'warning');
      return null;
    }
    return value;
  };

  const handleCreate = async () => {
    const value = await showRowForm(`Tambah ${config.title}`);
    if (!value) return;
    if (section === 'berita') {
      content.createArticle({ title: value[0], category: value[1], author: value[2], trending: false, popular: false });
      await Swal.fire('Berhasil', 'Berita baru muncul di halaman utama.', 'success');
      return;
    }
    if (section === 'kategori') {
      content.setCollection('categories', (current) => [value[0], ...current]);
      await Swal.fire('Berhasil', 'Kategori baru muncul di halaman kategori dan filter berita.', 'success');
      return;
    }
    if (section === 'wartawan') {
      content.setCollection('journalists', (current) => [{ id: Date.now(), name: value[0], beat: value[1], articles: Number(value[2]) || 0, avatar: value[0].slice(0, 2).toUpperCase() }, ...current]);
      await Swal.fire('Berhasil', 'Data wartawan berhasil ditambahkan.', 'success');
      return;
    }
    if (section === 'komentar') {
      content.setCollection('comments', (current) => [{ id: Date.now(), article: value[0], member: value[1], status: value[2], body: 'Komentar admin.' }, ...current]);
      await Swal.fire('Berhasil', 'Komentar berhasil ditambahkan.', 'success');
      return;
    }
    if (section === 'banner') {
      content.setCollection('banners', (current) => [{ id: Date.now(), title: value[0], placement: value[1], active: value[2].toLowerCase() === 'aktif' }, ...current]);
      await Swal.fire('Berhasil', 'Banner berhasil ditambahkan.', 'success');
      return;
    }
    if (section === 'iklan') {
      content.setCollection('ads', (current) => [{ id: Date.now(), brand: value[0], slot: value[1], status: value[2] }, ...current]);
      await Swal.fire('Berhasil', 'Iklan berhasil ditambahkan.', 'success');
      return;
    }
    setRows((currentRows) => [value, ...currentRows]);
    await Swal.fire('Berhasil', 'Data baru berhasil ditambahkan.', 'success');
  };

  const handleEdit = async (rowIndex) => {
    const value = await showRowForm(`Edit ${config.title}`, rows[rowIndex]);
    if (!value) return;
    const id = config.ids?.[rowIndex];
    if (section === 'berita') {
      content.updateArticle(id, { title: value[0], category: value[1], author: value[2] });
      await Swal.fire('Berhasil', 'Perubahan berita muncul di halaman utama.', 'success');
      return;
    }
    if (section === 'trending') {
      content.updateArticle(id, { title: value[0], category: value[1], trending: value[2].toLowerCase() === 'ya' });
      await Swal.fire('Berhasil', 'Status trending diperbarui di halaman utama.', 'success');
      return;
    }
    if (section === 'kategori') {
      content.setCollection('categories', (current) => current.map((item, index) => (index === rowIndex ? value[0] : item)));
      await Swal.fire('Berhasil', 'Kategori berhasil diperbarui.', 'success');
      return;
    }
    if (section === 'wartawan') {
      content.setCollection('journalists', (current) => current.map((item) => (item.id === id ? { ...item, name: value[0], beat: value[1], articles: Number(value[2]) || 0 } : item)));
      await Swal.fire('Berhasil', 'Data wartawan berhasil diperbarui.', 'success');
      return;
    }
    if (section === 'komentar') {
      content.setCollection('comments', (current) => current.map((item) => (item.id === id ? { ...item, article: value[0], member: value[1], status: value[2] } : item)));
      await Swal.fire('Berhasil', 'Komentar berhasil diperbarui.', 'success');
      return;
    }
    if (section === 'banner') {
      content.setCollection('banners', (current) => current.map((item) => (item.id === id ? { ...item, title: value[0], placement: value[1], active: value[2].toLowerCase() === 'aktif' } : item)));
      await Swal.fire('Berhasil', 'Banner berhasil diperbarui.', 'success');
      return;
    }
    if (section === 'iklan') {
      content.setCollection('ads', (current) => current.map((item) => (item.id === id ? { ...item, brand: value[0], slot: value[1], status: value[2] } : item)));
      await Swal.fire('Berhasil', 'Iklan berhasil diperbarui.', 'success');
      return;
    }
    setRows((currentRows) => currentRows.map((row, index) => (index === rowIndex ? value : row)));
    await Swal.fire('Berhasil', 'Data berhasil diperbarui.', 'success');
  };

  const handleDelete = async (rowIndex) => {
    const result = await Swal.fire({
      title: 'Hapus data?',
      text: rows[rowIndex].join(' - '),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) return;
    const id = config.ids?.[rowIndex];
    if (section === 'berita' || section === 'trending') {
      content.deleteArticle(id);
      await Swal.fire('Terhapus', 'Berita dihapus dan hilang dari halaman utama.', 'success');
      return;
    }
    if (section === 'kategori') {
      content.setCollection('categories', (current) => current.filter((_, index) => index !== rowIndex));
      await Swal.fire('Terhapus', 'Kategori berhasil dihapus.', 'success');
      return;
    }
    if (section === 'wartawan') {
      content.setCollection('journalists', (current) => current.filter((item) => item.id !== id));
      await Swal.fire('Terhapus', 'Data wartawan berhasil dihapus.', 'success');
      return;
    }
    if (section === 'komentar') {
      content.setCollection('comments', (current) => current.filter((item) => item.id !== id));
      await Swal.fire('Terhapus', 'Komentar berhasil dihapus.', 'success');
      return;
    }
    if (section === 'banner') {
      content.setCollection('banners', (current) => current.filter((item) => item.id !== id));
      await Swal.fire('Terhapus', 'Banner berhasil dihapus.', 'success');
      return;
    }
    if (section === 'iklan') {
      content.setCollection('ads', (current) => current.filter((item) => item.id !== id));
      await Swal.fire('Terhapus', 'Iklan berhasil dihapus.', 'success');
      return;
    }
    setRows((currentRows) => currentRows.filter((_, index) => index !== rowIndex));
    await Swal.fire('Terhapus', 'Data berhasil dihapus dari daftar.', 'success');
  };

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Admin CMS</span>
          <h1>{config.title}</h1>
          <p className="text-secondary">CRUD, moderasi, dan laporan siap dihubungkan ke tabel Supabase.</p>
        </div>
        <button className="btn btn-brand" onClick={handleCreate}>
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
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join('-')}-${rowIndex}`}>
                  {row.map((cell) => <td key={cell}>{cell}</td>)}
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => handleEdit(rowIndex)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(rowIndex)}>Hapus</button>
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
