import { Link } from 'react-router-dom';

export default function ArticleCard({ article, compact = false }) {
  return (
    <article className={`article-card ${compact ? 'article-card-compact' : ''}`}>
      <img src={article.image} alt={article.title} />
      <div className="p-3">
        <div className="d-flex justify-content-between gap-2 mb-2 small">
          <span className="badge text-bg-light">{article.category}</span>
          <span className="text-secondary">{article.date}</span>
        </div>
        <h2 className="h5 mb-2">
          <Link to={`/berita/${article.slug}`}>{article.title}</Link>
        </h2>
        {!compact && <p className="text-secondary mb-3">{article.excerpt}</p>}
        <div className="small text-secondary">
          {article.author} - {article.views.toLocaleString('id-ID')} dibaca - {article.likes || 0} like - {article.comments || 0} komentar
        </div>
      </div>
    </article>
  );
}
