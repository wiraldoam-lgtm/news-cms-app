import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const { register: registerMember } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    await registerMember(values);
    navigate('/login');
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-brand fw-semibold">Register Member</span>
        <h1>Buat akun pembaca</h1>
        <input className="form-control" placeholder="Nama lengkap" {...register('name', { required: true })} />
        <input className="form-control" type="email" placeholder="Email" {...register('email', { required: true })} />
        <input className="form-control" type="password" placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
        <button className="btn btn-brand w-100" disabled={isSubmitting}>{isSubmitting ? 'Memproses...' : 'Daftar'}</button>
      </form>
    </main>
  );
}
