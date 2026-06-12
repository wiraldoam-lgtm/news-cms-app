import { Link } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard';
import { useContent } from '../../lib/content';

export default function Home() {
  const { articles, categories } = useContent();
  const [headline, ...latest] = articles;
  const trending = articles.filter((article) => article.trending);
  const popular = articles.filter((article) => article.popular);

  if (!headline) {
    return <main className="container py-5"><h1>Belum ada berita.</h1></main>;
  }

  return (
    <main>
      <section className="hero-news">
        <div className="container">
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <span className="badge text-bg-danger mb-3">Trending News</span>
              <h1>{headline.title}</h1>
              <p>{headline.excerpt}</p>
              <Link className="btn btn-brand" to={`/berita/${headline.slug}`}>Baca Selengkapnya</Link>
            </div>
            <div className="col-lg-5">
              <div className="headline-panel">
                <img src={headline.image} alt={headline.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-heading">
          <div>
            <span className="text-brand fw-semibold">Berita Terbaru</span>
            <h2>Update redaksi hari ini</h2>
          </div>
          <Link to="/berita" className="btn btn-outline-secondary btn-sm">Semua Berita</Link>
        </div>
        <div className="row g-4">
          {latest.map((article) => (
            <div className="col-md-6 col-lg-4" key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      <section className="soft-band py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h2 className="h4">Daftar Kategori</h2>
              <div className="category-grid">
                {categories.map((category) => (
                  <Link to={`/berita?category=${category}`} key={category}>{category}</Link>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <h2 className="h4">Trending News</h2>
              <div className="stack-list">
                {trending.map((article) => <ArticleCard key={article.id} article={article} compact />)}
              </div>
            </div>
            <div className="col-lg-4">
              <h2 className="h4">Berita Populer</h2>
              <div className="stack-list">
                {popular.map((article) => <ArticleCard key={article.id} article={article} compact />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
