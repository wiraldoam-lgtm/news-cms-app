import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const menus = {
  member: [['/member', 'Profil & Aktivitas']],
  journalist: [['/wartawan/dashboard', 'Dashboard Wartawan']],
  admin: [
    ['/admin', 'Dashboard'],
    ['/admin/berita', 'Kelola Berita'],
    ['/admin/kategori', 'Kelola Kategori'],
    ['/admin/wartawan', 'Kelola Wartawan'],
    ['/admin/member', 'Kelola Member'],
    ['/admin/komentar', 'Kelola Komentar'],
    ['/admin/banner', 'Kelola Banner'],
    ['/admin/tentang', 'Halaman Tentang'],
    ['/admin/kontak', 'Kelola Kontak'],
    ['/admin/seo', 'Kelola SEO'],
    ['/admin/setting', 'Setting Website'],
    ['/admin/trending', 'Trending News'],
    ['/admin/iklan', 'Kelola Iklan'],
    ['/admin/laporan', 'Laporan'],
  ],
};

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="fw-bold fs-5 mb-4">NusaNews CMS</div>
        <div className="small text-secondary mb-3">{user?.name || user?.email}</div>
        <nav className="nav flex-column gap-1">
          {menus[role].map(([to, label]) => (
            <NavLink className="nav-link dashboard-link" key={to} to={to} end={to === '/admin'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="btn btn-outline-light btn-sm mt-auto" onClick={logout}>Logout</button>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
