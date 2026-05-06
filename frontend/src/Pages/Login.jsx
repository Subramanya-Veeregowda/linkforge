import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LinkForge from "../assets/linkforge.png";
import { CgPassword } from "react-icons/cg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
 
  const [form, setForm] = useState({
    email:"",
    password:""
  })

const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
  );

 const navigate = useNavigate();

 const handleSubmit = async (e) => {
      e.preventDefault();

   try {
    const res = await loginUser(form);

    // 👇 THIS IS THE WHOLE POINT
  if(res?.token){
    localStorage.setItem("token", res.token)
    setIsLoggedIn(true);
    navigate("/");
  }

  } catch (err) {
    console.log(err);
  }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      {/* 🔷 Logo + Title */}
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
          LOGIN
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Welcome back 
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => 
                setForm({...form, email:e.target.value})
            }
            className="w-full p-3 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => 
                setForm({...form, password:e.target.value})
              }
              className="w-full p-3 pr-10 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition duration-200 hover:scale-100"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="text-right">
          <span
               onClick={() => navigate("/forgot-password")}
               className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer hover:underline"
          >
             Forgot password?
          </span>
          </div>

          {/* Button */}
        
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            LOGIN
          </button>
        
        </form>

        {/* Bottom Links */}
        <p className="text-center text-sm text-gray-600 mt-6 dark:text-gray-400">
          New user?{" "}
          <span 
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-800 font-bold text-xl cursor-pointer hover:underline">
            Register
          </span>
        </p>

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