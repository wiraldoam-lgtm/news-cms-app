import { Doughnut, Line } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import StatCard from '../../components/StatCard';
import { articles, comments, journalists } from '../../data/mockData';

ChartJS.register(ArcElement, CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip);

export default function AdminDashboard() {
  const lineData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [{ label: 'Pembaca', data: [1200, 1900, 1700, 2400, 3100, 2800, 3600], borderColor: '#0f766e', tension: 0.35 }],
  };
  const doughnutData = {
    labels: ['Nasional', 'Ekonomi', 'Teknologi', 'Olahraga'],
    datasets: [{ data: [30, 24, 28, 18], backgroundColor: ['#0f766e', '#2563eb', '#f97316', '#dc2626'] }],
  };

  return (
    <div>
      <div className="dashboard-heading">
        <div>
          <span className="text-brand fw-semibold">Admin</span>
          <h1>Dashboard CMS</h1>
          <p className="text-secondary">Pantau konten, pengguna, komentar, banner, SEO, setting, iklan, dan laporan.</p>
        </div>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard label="Berita" value={articles.length} /></div>
        <div className="col-md-3"><StatCard label="Member" value="1.284" tone="green" /></div>
        <div className="col-md-3"><StatCard label="Wartawan" value={journalists.length} tone="orange" /></div>
        <div className="col-md-3"><StatCard label="Komentar" value={comments.length} tone="red" /></div>
      </div>
      <div className="row g-4">
        <div className="col-lg-8">
          <section className="content-panel">
            <h2 className="h5">Laporan Traffic Berita</h2>
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </section>
        </div>
        <div className="col-lg-4">
          <section className="content-panel">
            <h2 className="h5">Distribusi Kategori</h2>
            <Doughnut data={doughnutData} />
          </section>
        </div>
      </div>
    </div>
  );
}
