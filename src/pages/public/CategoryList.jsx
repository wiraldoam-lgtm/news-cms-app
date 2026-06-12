import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

export default function CategoryList() {
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
