import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import StatCard from '../../components/StatCard';
import { articles, comments } from '../../data/mockData';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function JournalistDashboard() {
  const [myArticles, setMyArticles] = useState(articles);
  const [moderationQueue, setModerationQueue] = useState(comments);

  const chartData = {
    labels: myArticles.map((article) => article.category),
    datasets: [{ label: 'Views', data: myArticles.map((article) => article.views), backgroundColor: '#0f766e' }],
  };

  const totalViews = useMemo(() => myArticles.reduce((total, article) => total + article.views, 0), [myArticles]);

  const showArticleForm = async (title, article = {}) => {
    const { value } = await Swal.fire({
      title,
      html: `
        <input id="title" class="swal2-input" placeholder="Judul" value="${article.title || ''}">
        <input id="category" class="swal2-input" placeholder="Kategori" value="${article.category || ''}">
        <input id="excerpt" class="swal2-input" placeholder="Ringkasan" value="${article.excerpt || ''}">
        <input id="thumbnail" class="swal2-input" placeholder="URL Thumbnail" value="${article.image || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => ({
        title: document.getElementById('title').value.trim(),
        category: document.getElementById('category').value.trim(),
        excerpt: document.getElementById('excerpt').value.trim(),
        image: document.getElementById('thumbnail').value.trim(),
      }),
    });

    if (!value) return null;
    if (!value.title || !value.category || !value.excerpt) {
      await Swal.fire('Data belum lengkap', 'Judul, kategori, dan ringkasan wajib diisi.', 'warning');
      return null;
    }
    return value;
  };

  const handleCreate = async () => {
    const value = await showArticleForm('Tambah Berita');
    if (!value) return;
    setMyArticles((currentArticles) => [{
      id: Date.now(),
      slug: value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      author: 'Raka Pradana',
      date: 'Draft baru',
      content: value.excerpt,
      views: 0,
      likes: 0,
      comments: 0,
      trending: false,
      popular: false,
      image: value.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
      ...value,
    }, ...currentArticles]);
    await Swal.fire('Berhasil', 'Draft berita berhasil dibuat.', 'success');
  };

  const handleEdit = async (articleId) => {
    const article = myArticles.find((item) => item.id === articleId);
    const value = await showArticleForm('Edit Berita', article);
    if (!value) return;
    setMyArticles((currentArticles) => currentArticles.map((item) => (item.id === articleId ? { ...item, ...value } : item)));
    await Swal.fire('Berhasil', 'Artikel berhasil diperbarui.', 'success');
  };

  const handleDelete = async (articleId) => {
    const article = myArticles.find((item) => item.id === articleId);
    const result = await Swal.fire({
      title: 'Hapus artikel?',
      text: article.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });
    if (!result.isConfirmed) return;
    setMyArticles((currentArticles) => currentArticles.filter((item) => item.id !== articleId));
    await Swal.fire('Terhapus', 'Artikel berhasil dihapus dari daftar.', 'success');
  };

  const handleModerate = async (commentId, status) => {
    setModerationQueue((currentComments) => currentComments.map((comment) => (
      comment.id === commentId ? { ...comment, status } : comment
    )));
    await Swal.fire('Komentar diperbarui', `Status komentar menjadi ${status}.`, 'success');
  };

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Wartawan</span>
          <h1>Dashboard Wartawan</h1>
          <p className="text-secondary">Tambah berita, edit artikel sendiri, upload thumbnail, dan moderasi komentar artikel.</p>
        </div>
        <button className="btn btn-brand" onClick={handleCreate}>
          Tambah Berita
        </button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard label="Artikel Saya" value={myArticles.length} /></div>
        <div className="col-md-4"><StatCard label="Total Views" value={totalViews.toLocaleString('id-ID')} tone="green" /></div>
        <div className="col-md-4"><StatCard label="Komentar" value={moderationQueue.length} tone="orange" /></div>
      </div>
      <div className="row g-4">
        <div className="col-lg-7">
          <section className="content-panel">
            <h2 className="h5">Statistik Artikel</h2>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </section>
        </div>
        <div className="col-lg-5">
          <section className="content-panel">
            <h2 className="h5">Kelola Artikel</h2>
            <div className="table-responsive">
              <table className="table align-middle">
                <tbody>
                  {myArticles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td><span className="badge text-bg-light">{article.category}</span></td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => handleEdit(article.id)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(article.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <section className="content-panel mt-4">
        <h2 className="h5">Kelola Komentar Artikel</h2>
        <div className="table-responsive">
          <table className="table align-middle">
            <tbody>
              {moderationQueue.map((comment) => (
                <tr key={comment.id}>
                  <td>
                    <strong>{comment.member}</strong>
                    <div className="small text-secondary">{comment.body}</div>
                  </td>
                  <td><span className="badge text-bg-light">{comment.status}</span></td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-success me-1" onClick={() => handleModerate(comment.id, 'approved')}>Approve</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleModerate(comment.id, 'rejected')}>Reject</button>
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
