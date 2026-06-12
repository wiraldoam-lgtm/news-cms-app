import { Link } from 'react-router-dom';
import { useContent } from '../../lib/content';

export default function CategoryList() {
  const { categories } = useContent();
  return (
    <main className="container py-5">
      <span className="text-brand fw-semibold">Daftar Kategori</span>
      <h1 className="mb-4">Kanal berita redaksi</h1>
      <div className="category-grid category-grid-large">
        {categories.map((category) => (
          <Link to={`/berita?category=${category}`} key={category}>{category}</Link>
        ))}
      </div>
    </main>
  );
}
