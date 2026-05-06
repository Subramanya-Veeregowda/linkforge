import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import LinkForge from "../assets/linkforge.png";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const data = await res.text(); // or res.json()

    if (res.ok) {
      alert("Password reset successful");
    } else {
      alert(data || "Something went wrong");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      {/* 🔷 Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img src={LinkForge} alt="logo" className="h-10 w-10" />
        <h1 className="text-xl font-semibold text-black dark:text-white">
          LinkForge
        </h1>
      </div>

      {/* 🔷 Card */}
      <div className="bg-gray-300 dark:bg-gray-800 dark:text-white backdrop-blur-md p-8 rounded-2xl shadow-xl w-[85%] sm:w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Reset Password
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your new password 🔐
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password (optional but not embarrassing) */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-400"
          />

          {/* Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            Reset Password
          </button>
        </form>

      </div>

      {/* 🔷 Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-black dark:text-white">
          © 2026 LinkForge v2.0.1
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Designed and developed by Subramanya V
        </p>
      </div>
    </div>
  );
}