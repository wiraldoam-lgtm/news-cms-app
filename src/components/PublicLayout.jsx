import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const navItems = [
  ['/', 'Beranda'],
  ['/berita', 'Berita'],
  ['/kategori', 'Kategori'],
  ['/tentang-kami', 'Tentang'],
  ['/kontak', 'Kontak'],
];

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const dashboardPath =
    user?.role === 'admin' ? '/admin' : user?.role === 'journalist' ? '/wartawan/dashboard' : '/member';

  return (
    <div className="site-shell">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-brand" to="/">NusaNews</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto gap-lg-2">
              {navItems.map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to}>{label}</NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-2">
              {user ? (
                <>
                  <Link className="btn btn-sm btn-brand" to={dashboardPath}>Dashboard</Link>
                  <button className="btn btn-sm btn-outline-secondary" onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-sm btn-outline-secondary" to="/login">Login</Link>
                  <Link className="btn btn-sm btn-brand" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 small text-secondary">
          <span>NusaNews CMS - portal berita React, Vite, dan Supabase.</span>
          <span>Editorial, member, wartawan, admin dalam satu platform.</span>
        </div>
      </footer>
    </div>
  );
}
