import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { email: 'member@nusanews.id', password: 'password', role: 'member' },
  });

  const onSubmit = async (values) => {
    await login(values);
    const path = values.role === 'admin' ? '/admin' : values.role === 'journalist' ? '/wartawan/dashboard' : '/member';
    navigate(path);
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-brand fw-semibold">Login Member</span>
        <h1>Masuk ke akun</h1>
        <input className="form-control" type="email" placeholder="Email" {...register('email', { required: true })} />
        <input className="form-control" type="password" placeholder="Password" {...register('password', { required: true })} />
        <select className="form-select" {...register('role')}>
          <option value="member">Member</option>
          <option value="journalist">Wartawan</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-brand w-100" disabled={isSubmitting}>{isSubmitting ? 'Memproses...' : 'Login'}</button>
        <p className="small text-secondary mb-0">Mode demo aktif jika Supabase belum dikonfigurasi.</p>
      </form>
    </main>
  );
}
