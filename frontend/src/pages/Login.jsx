import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearError, loginUser } from "../store/slices/authSlice";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const error = useSelector((state) => state.auth?.error);

  const onSubmit = async (data) => {
    try {
      const loginResult = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(loginResult)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const buttonText = loading ? "Logging into account..." : "Login";

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 -mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-8 py-10 text-gray-800"
      >
        <div className="text-center mb-8">
          <p className="prata-regular text-3xl mb-2">Login</p>
          <p className="text-sm text-gray-500">Welcome Back, Please Login</p>
        </div>

        <input
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black/50 focus:outline-none"
        />

        {errors.email && (
          <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black/50 focus:outline-none"
        />

        {errors.password && (
          <p className="text-red-500 text-xs mb-3">{errors.password.message}</p>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <Link
            to={"/register"}
            className="cursor-pointer hover:text-black transition"
          >
            Don't have an account? Sign up here!
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2.5 rounded-lg font-medium transition-all
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 active:scale-[0.98]"
            }`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default Login;
