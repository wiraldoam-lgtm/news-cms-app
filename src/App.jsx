import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/public/Home';
import ArticleList from './pages/public/ArticleList';
import ArticleDetail from './pages/public/ArticleDetail';
import CategoryList from './pages/public/CategoryList';
import JournalistProfile from './pages/public/JournalistProfile';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import MemberDashboard from './pages/member/MemberDashboard';
import JournalistDashboard from './pages/journalist/JournalistDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManagement from './pages/admin/AdminManagement';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<ArticleList />} />
        <Route path="/berita/:slug" element={<ArticleDetail />} />
        <Route path="/kategori" element={<CategoryList />} />
        <Route path="/wartawan/:id" element={<JournalistProfile />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute roles={['member']} />}>
        <Route element={<DashboardLayout role="member" />}>
          <Route path="/member" element={<MemberDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['journalist']} />}>
        <Route element={<DashboardLayout role="journalist" />}>
          <Route path="/wartawan/dashboard" element={<JournalistDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route element={<DashboardLayout role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/:section" element={<AdminManagement />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
