import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Swal from 'sweetalert2';
import StatCard from '../../components/StatCard';
import { articles, comments } from '../../data/mockData';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function JournalistDashboard() {
  const chartData = {
    labels: articles.map((article) => article.category),
    datasets: [{ label: 'Views', data: articles.map((article) => article.views), backgroundColor: '#0f766e' }],
  };

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Wartawan</span>
          <h1>Dashboard Wartawan</h1>
          <p className="text-secondary">Tambah berita, edit artikel sendiri, upload thumbnail, dan moderasi komentar artikel.</p>
        </div>
        <button className="btn btn-brand" onClick={() => Swal.fire('Draft dibuat', 'Form tambah berita siap dihubungkan ke Supabase.', 'success')}>
          Tambah Berita
        </button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard label="Artikel Saya" value="42" /></div>
        <div className="col-md-4"><StatCard label="Total Views" value="84.7K" tone="green" /></div>
        <div className="col-md-4"><StatCard label="Komentar" value={comments.length} tone="orange" /></div>
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
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td><span className="badge text-bg-light">{article.category}</span></td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
