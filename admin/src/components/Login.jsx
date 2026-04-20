import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { adminLogin, clearError } from "../store/slices/adminAuthSlice";

const loginSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
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
  const loading = useSelector((state) => state.adminAuth?.loading);
  const error = useSelector((state) => state.auth?.error);

  const onSubmit = async (data) => {
    try {
      const loginResult = await dispatch(adminLogin(data));

      if (adminLogin.fulfilled.match(loginResult)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const buttonText = loading ? "Logging into Dashboard..." : "Login";

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-14">
      <div className="relative admin-card w-full max-w-md px-6 sm:px-9 py-8 sm:py-10 overflow-hidden">
        <div className="absolute -top-20 -right-16 w-44 h-44 rounded-full bg-orange-200/35 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative">
        {/* Icon */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto mb-6 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_14px_30px_rgba(234,88,12,0.34)] transform hover:scale-105 transition-transform duration-300">
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          </div>

        {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2 leading-tight">
            Fashora - Admin Panel
          </h1>
          <p className="text-sm text-gray-500 text-center mb-7 sm:mb-8">
            Login to manage products & orders
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-bold text-gray-800 block mb-2">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="krishna@gmail.com"
              className="field-input"
              required
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>
          )}

          {/* Password */}
          <div>
            <label className="text-sm font-bold text-gray-800 block mb-2">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="radharani"
              className="field-input"
              required
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mb-3">
              {errors.password.message}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 text-white py-3 rounded-xl font-bold text-base transition-all duration-300
            ${
            loading
                ? "bg-gray-400 cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {buttonText}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
