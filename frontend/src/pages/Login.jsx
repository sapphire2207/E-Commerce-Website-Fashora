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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-14 -mt-20 sm:-mt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md surface-card px-6 sm:px-8 py-8 sm:py-10 text-gray-800 animate-[fade-up_0.35s_ease-out]"
      >
        <div className="text-center mb-7 sm:mb-8">
          <p className="prata-regular text-4xl text-gray-900 leading-none">Login</p>
          <p className="text-sm text-gray-500 mt-2">Welcome back. Please login to continue.</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="field-input mt-1.5"
          />
        </div>

        {errors.email && (
          <p className="text-red-500 text-xs mt-1 mb-3">{errors.email.message}</p>
        )}

        <div>
          <label className="text-sm font-semibold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="field-input mt-1.5"
          />
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1 mb-3">{errors.password.message}</p>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-6 mt-1">
          <Link
            to={"/register"}
            className="cursor-pointer hover:text-orange-600 transition min-h-11 inline-flex items-center"
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
          className={`w-full text-white py-3 rounded-xl font-semibold min-h-11 transition-all
            ${
              loading
                ? "bg-stone-300 cursor-not-allowed"
                : "bg-linear-to-r from-orange-500 to-orange-600 shadow-[0_14px_24px_rgba(234,88,12,0.24)] hover:shadow-[0_18px_30px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 active:scale-[0.99]"
            }`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default Login;
