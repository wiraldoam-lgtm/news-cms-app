import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { articles, comments } from '../../data/mockData';
import { useAuth } from '../../lib/auth';

export default function ArticleDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const article = articles.find((item) => item.slug === slug) || articles[0];

  const onComment = async () => {
    if (!user) {
      await Swal.fire('Login dibutuhkan', 'Silakan login member untuk berkomentar.', 'info');
      return;
    }
    reset();
    await Swal.fire('Komentar terkirim', 'Komentar masuk ke moderasi redaksi.', 'success');
  };

  const onFavorite = async () => {
    if (!user) {
      await Swal.fire('Login dibutuhkan', 'Silakan login member untuk menyimpan favorit.', 'info');
      return;
    }
    await Swal.fire('Disimpan', 'Berita masuk ke favorit Anda.', 'success');
  };

  return (
    <main className="article-detail">
      <div className="article-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,31,51,.86), rgba(11,31,51,.35)), url(${article.image})` }}>
        <div className="container">
          <span className="badge text-bg-light mb-3">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.author} - {article.date}</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-5">
          <article className="col-lg-8">
            <p className="lead">{article.excerpt}</p>
            <p>{article.content}</p>
            <p>
              Redaksi memprioritaskan akurasi, konteks, dan dampak publik dalam setiap laporan.
              Data artikel dapat dihubungkan langsung ke tabel Supabase untuk workflow produksi.
            </p>
            <div className="d-flex gap-2 my-4">
              <button className="btn btn-brand" onClick={onFavorite}>Simpan Favorit</button>
              <button className="btn btn-outline-secondary" onClick={() => Swal.fire('Terima kasih', 'Like Anda tercatat.', 'success')}>
                Like Berita
              </button>
            </div>
            <section className="mt-5">
              <h2 className="h4">Komentar Berita</h2>
              <form className="comment-box" onSubmit={handleSubmit(onComment)}>
                <textarea className="form-control" rows="4" placeholder="Tulis komentar..." {...register('comment', { required: true })} />
                <button className="btn btn-brand mt-3">Kirim Komentar</button>
              </form>
              <div className="mt-4">
                {comments.map((comment) => (
                  <div className="comment-item" key={comment.id}>
                    <strong>{comment.member}</strong>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
          <aside className="col-lg-4">
            <div className="side-panel">
              <h2 className="h5">Berita Terkait</h2>
              {articles.filter((item) => item.id !== article.id).slice(0, 3).map((item) => (
                <Link className="related-link" to={`/berita/${item.slug}`} key={item.id}>{item.title}</Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
