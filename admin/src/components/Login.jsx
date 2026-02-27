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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md border-2 border-gray-200">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
          <svg
            className="w-10 h-10 text-white"
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
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Login to manage products & orders
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm font-bold text-gray-800 block mb-2">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="krishna@gmail.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 hover:border-gray-300"
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 hover:border-gray-300"
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
            className={`w-full mt-6 text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 shadow-lg
            ${
            loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95"
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
