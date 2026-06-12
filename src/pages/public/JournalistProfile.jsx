import { useParams } from 'react-router-dom';
import { articles, journalists } from '../../data/mockData';
import ArticleCard from '../../components/ArticleCard';

export default function JournalistProfile() {
  const { id } = useParams();
  const journalist = journalists.find((item) => String(item.id) === id) || journalists[0];
  const authorArticles = articles.filter((article) => article.author === journalist.name);

  return (
    <main className="container py-5">
      <section className="profile-header">
        <div className="avatar-lg">{journalist.avatar}</div>
        <div>
          <span className="text-brand fw-semibold">Profil Wartawan</span>
          <h1>{journalist.name}</h1>
          <p className="text-secondary mb-0">Desk {journalist.beat} - {journalist.articles} artikel terbit</p>
        </div>
      </section>
      <div className="row g-4 mt-2">
        {authorArticles.map((article) => (
          <div className="col-md-6 col-lg-4" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </main>
  );
}
