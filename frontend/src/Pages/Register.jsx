import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Eye, EyeOff } from "lucide-react";
import CustomFooter from "../components/CustomFooter";
import LinkForge from "../assets/LinkForge.png";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await registerUser(form);

    // 👇 redirect after register
    navigate("/login");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center gap-1 mb-6">
          <img
            src={LinkForge}
            alt="logo"
            className="h-12 w-10 object-contain"
          />
        <div className="flex items-center gap-1">
          <span className="text-2xl text-Black dark:text-white font-semibold">LinkForge</span>
        </div>
        </div>

      <div className="bg-gray-300 dark:text-white dark:bg-gray-800 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[80%] sm:w-full 
                      max-w-md hover:shadow-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
         REGISTER
        </h2>
        <p className="text-center text-gray-500 mb-6 dark:text-gray-500">
          Create your own account
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-100/50"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border focus:ring-2 outline-none bg-gray-700 text-white placeholder-gray-100/50"
          />

         <div className="relative">
           <input
             type={showPassword ? "text" : "password"}
             placeholder="Password"
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

        <form onSubmit={handleSubmit}>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold hover:scale-115">
            REGISTER
          </button>
        </form>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm text-gray-600 mt-6 dark:text-gray-400 ">
          Already registered?{" "}
          <span 
           onClick={() => navigate("/login")}
          className="text-blue-600 hover:text-blue-800 font-bold text-xl cursor-pointer hover:underline">
            Login
          </span>
        </p>

     

      </div>
          <div className="text-center mt-6 px-4">
      <p className="font-semibold text-sm md:text-base text-black dark:text-white">
        © 2026 LinkForge v2.0.1
      </p>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
        Designed and developed by Subramanya V
      </p>
    </div>
    </div>
      </>
  );
}