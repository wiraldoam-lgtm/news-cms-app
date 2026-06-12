import { useMemo, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import { useContent } from '../../lib/content';

export default function ArticleList() {
  const { articles, categories } = useContent();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchQuery = `${article.title} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === 'Semua' || article.category === category;
      return matchQuery && matchCategory;
    });
  }, [query, category]);

  return (
    <main className="container py-5">
      <div className="section-heading">
        <div>
          <span className="text-brand fw-semibold">Daftar Berita</span>
          <h1>Temukan berita yang relevan</h1>
        </div>
      </div>
      <div className="filter-bar mb-4">
        <input className="form-control" placeholder="Cari berita..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>Semua</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="row g-4">
        {filteredArticles.map((article) => (
          <div className="col-md-6 col-lg-4" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </main>
  );
}
