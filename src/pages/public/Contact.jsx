import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async () => {
    reset();
    await Swal.fire('Pesan terkirim', 'Tim redaksi akan menghubungi Anda.', 'success');
  };

  return (
    <main className="container py-5 page-narrow">
      <span className="text-brand fw-semibold">Kontak</span>
      <h1>Hubungi redaksi</h1>
      <form className="form-panel" onSubmit={handleSubmit(onSubmit)}>
        <input className="form-control" placeholder="Nama" {...register('name', { required: true })} />
        <input className="form-control" type="email" placeholder="Email" {...register('email', { required: true })} />
        <textarea className="form-control" rows="5" placeholder="Pesan" {...register('message', { required: true })} />
        <button className="btn btn-brand">Kirim Pesan</button>
      </form>
    </main>
  );
}
