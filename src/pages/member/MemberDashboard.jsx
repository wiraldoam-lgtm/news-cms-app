import Swal from 'sweetalert2';
import { useMemo, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import StatCard from '../../components/StatCard';
import { articles, comments } from '../../data/mockData';
import { useAuth } from '../../lib/auth';

export default function MemberDashboard() {
  const { user, setUser } = useAuth();
  const [favoriteArticles, setFavoriteArticles] = useState(articles.slice(0, 2));
  const [myComments, setMyComments] = useState(comments);
  const [likedArticleIds, setLikedArticleIds] = useState([articles[0].id, articles[2].id]);

  const availableArticles = useMemo(() => (
    articles.filter((article) => !favoriteArticles.some((favorite) => favorite.id === article.id))
  ), [favoriteArticles]);

  const handleUpdateProfile = async () => {
    const { value } = await Swal.fire({
      title: 'Ubah Profil',
      html: `
        <input id="name" class="swal2-input" placeholder="Nama" value="${user?.name || ''}">
        <input id="email" class="swal2-input" placeholder="Email" value="${user?.email || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => ({
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
      }),
    });

    if (!value) return;
    if (!value.name || !value.email) {
      await Swal.fire('Data belum lengkap', 'Nama dan email wajib diisi.', 'warning');
      return;
    }
    setUser((currentUser) => ({ ...currentUser, ...value }));
    await Swal.fire('Profil diperbarui', 'Perubahan profil demo tersimpan.', 'success');
  };

  const handleAddFavorite = async () => {
    if (!availableArticles.length) {
      await Swal.fire('Semua tersimpan', 'Semua berita demo sudah ada di favorit.', 'info');
      return;
    }

    const { value } = await Swal.fire({
      title: 'Tambah Favorit',
      input: 'select',
      inputOptions: Object.fromEntries(availableArticles.map((article) => [article.id, article.title])),
      inputPlaceholder: 'Pilih berita',
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
    });

    if (!value) return;
    const article = articles.find((item) => String(item.id) === String(value));
    setFavoriteArticles((currentArticles) => [article, ...currentArticles]);
    await Swal.fire('Disimpan', 'Berita ditambahkan ke favorit.', 'success');
  };

  const handleRemoveFavorite = async (articleId) => {
    setFavoriteArticles((currentArticles) => currentArticles.filter((article) => article.id !== articleId));
    await Swal.fire('Dihapus', 'Berita dihapus dari favorit.', 'success');
  };

  const handleToggleLike = async (articleId) => {
    const isLiked = likedArticleIds.includes(articleId);
    setLikedArticleIds((currentIds) => (
      isLiked ? currentIds.filter((id) => id !== articleId) : [articleId, ...currentIds]
    ));
    await Swal.fire(isLiked ? 'Like dibatalkan' : 'Like tersimpan', 'Status like berhasil diperbarui.', 'success');
  };

  const handleEditComment = async (commentId) => {
    const comment = myComments.find((item) => item.id === commentId);
    const { value } = await Swal.fire({
      title: 'Edit Komentar',
      input: 'textarea',
      inputValue: comment.body,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
    });

    if (!value) return;
    setMyComments((currentComments) => currentComments.map((item) => (
      item.id === commentId ? { ...item, body: value } : item
    )));
    await Swal.fire('Komentar diperbarui', 'Riwayat komentar berhasil diubah.', 'success');
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: 'Hapus komentar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });
    if (!result.isConfirmed) return;
    setMyComments((currentComments) => currentComments.filter((comment) => comment.id !== commentId));
    await Swal.fire('Terhapus', 'Komentar dihapus dari riwayat.', 'success');
  };

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Member</span>
          <h1>Profil Saya</h1>
          <p className="text-secondary">Kelola profil, favorit, komentar, dan like berita.</p>
        </div>
        <button className="btn btn-brand" onClick={handleUpdateProfile}>
          Ubah Profil
        </button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard label="Favorit" value={favoriteArticles.length} /></div>
        <div className="col-md-4"><StatCard label="Komentar" value={myComments.length} tone="green" /></div>
        <div className="col-md-4"><StatCard label="Like" value={likedArticleIds.length} tone="orange" /></div>
      </div>
      <section className="content-panel mb-4">
        <h2 className="h5">Data Profil</h2>
        <div className="row g-3">
          <div className="col-md-6"><input className="form-control" value={user?.name || ''} readOnly /></div>
          <div className="col-md-6"><input className="form-control" value={user?.email || ''} readOnly /></div>
        </div>
      </section>
      <section className="content-panel mb-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
          <h2 className="h5 mb-0">Simpan Berita Favorit</h2>
          <button className="btn btn-sm btn-brand" onClick={handleAddFavorite}>Tambah Favorit</button>
        </div>
        <div className="row g-4">
          {favoriteArticles.map((article) => (
            <div className="col-md-6" key={article.id}>
              <ArticleCard article={article} compact />
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleToggleLike(article.id)}>
                  {likedArticleIds.includes(article.id) ? 'Batalkan Like' : 'Like'}
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveFavorite(article.id)}>Hapus Favorit</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="content-panel">
        <h2 className="h5">Riwayat Komentar</h2>
        {myComments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <strong>{comment.article}</strong>
            <p>{comment.body}</p>
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditComment(comment.id)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteComment(comment.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
