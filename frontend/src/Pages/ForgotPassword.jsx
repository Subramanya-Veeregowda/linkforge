import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkForge from "../assets/LinkForge.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_APP_BASE_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await fetch(`${API}/api/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // ALWAYS show success (security)
    setMessage("Password reset link has been sent!");
  } catch (err) {
    // even if error, don't leak info
    setMessage("Password reset link has been sent!");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img src={LinkForge} alt="logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-semibold text-black dark:text-white">
          LinkForge
        </span>
      </div>

      {/* Card */}
      <div className="bg-gray-200 dark:bg-gray-800 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[80%] sm:w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your email to receive reset link
        </p>

        {/* Success Message */}
        {message && (
          <div className="text-center text-green-500 mb-4 font-medium">
            {message}
          </div>
        )}

        {/* Form */}
        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border focus:ring-2 outline-none 
              bg-gray-700 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg 
              hover:bg-blue-700 transition font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>
        )}

        {/* Back to login */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

                <p className="text-center text-sm text-gray-600 mt-6 dark:text-gray-400">
          New user?{" "}
          <span 
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-800 font-bold text-xl cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>

      {/* Footer */}
      <div className="text-center mt-6 px-4">
        <p className="font-semibold text-sm md:text-base text-black dark:text-white">
          © 2026 LinkForge v2.0.1
        </p>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
          Designed and developed by Subramanya V
        </p>
      </div>

    </div>
  );
}