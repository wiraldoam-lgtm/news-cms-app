import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const user = await login(values);

      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang ${user.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "journalist":
          navigate("/wartawan/dashboard");
          break;

        case "member":
        default:
          navigate("/member");
          break;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message,
      });
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-brand fw-semibold">Login NusaNews</span>

        <h1>Masuk ke akun</h1>

        <input className="form-control" type="email" placeholder="Email" {...register("email", { required: true })} />

        <input className="form-control" type="password" placeholder="Password" {...register("password", { required: true })} />

        <button className="btn btn-brand w-100" disabled={isSubmitting}>
          {isSubmitting ? "Memproses..." : "Login"}
        </button>
      </form>
    </main>
  );
}
