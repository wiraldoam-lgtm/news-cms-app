import Swal from 'sweetalert2';
import ArticleCard from '../../components/ArticleCard';
import StatCard from '../../components/StatCard';
import { articles, comments } from '../../data/mockData';
import { useAuth } from '../../lib/auth';

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Member</span>
          <h1>Profil Saya</h1>
          <p className="text-secondary">Kelola profil, favorit, komentar, dan like berita.</p>
        </div>
        <button className="btn btn-brand" onClick={() => Swal.fire('Profil diperbarui', 'Perubahan profil demo tersimpan.', 'success')}>
          Ubah Profil
        </button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard label="Favorit" value="12" /></div>
        <div className="col-md-4"><StatCard label="Komentar" value={comments.length} tone="green" /></div>
        <div className="col-md-4"><StatCard label="Like" value="38" tone="orange" /></div>
      </div>
      <section className="content-panel mb-4">
        <h2 className="h5">Data Profil</h2>
        <div className="row g-3">
          <div className="col-md-6"><input className="form-control" value={user?.name || ''} readOnly /></div>
          <div className="col-md-6"><input className="form-control" value={user?.email || ''} readOnly /></div>
        </div>
      </section>
      <section className="content-panel mb-4">
        <h2 className="h5">Simpan Berita Favorit</h2>
        <div className="row g-4">
          {articles.slice(0, 2).map((article) => (
            <div className="col-md-6" key={article.id}><ArticleCard article={article} compact /></div>
          ))}
        </div>
      </section>
      <section className="content-panel">
        <h2 className="h5">Riwayat Komentar</h2>
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <strong>{comment.article}</strong>
            <p>{comment.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
