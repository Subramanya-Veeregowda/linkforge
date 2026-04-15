import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaGooglePlay
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-5 text-sm text-gray-600 dark:text-gray-100 py-2">

{/* TECH STACK */}

{/* MOBILE → 2 lines */}
        <div className="text-center text-[10px] opacity-50 border-t border-gray-200 dark:border-gray-700 pt-2 px-4 md:hidden">
         <p className="leading-relaxed">
            Built with HTML • CSS • JavaScript • Tailwind • Vite • Spring • SpringBoot
        </p>
         <p className="leading-relaxed">
          Java • MySQL • Git • AWS • Docker
         </p>
      </div>

      {/* DESKTOP → single line */}
      <div className="hidden md:block text-center text-[10px] opacity-50 border-t border-gray-200 dark:border-gray-700 pt-1 px-4">
           Built with HTML • CSS • JavaScript • Tailwind • Vite • Spring • SpringBoot • Java • MySQL • Git • AWS • Docker
      </div>

      {/* MOBILE LAYOUT */}
      <div className="flex flex-col items-center gap-2 mt-3 mb-3 md:hidden">

        {/* Copyright */}
        <div className="font-bold text-xs">
          © 2026 LinkForge <span className="opacity-70">v1.0.1</span>
        </div>

        {/* Built by */}
        <div className="text-xs font-bold opacity-80 text-center">
          Built & Design by Subramanya V
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-lg mt-1">
          <a href="https://www.instagram.com/subbu.7_?igsh=MWRicmJjNGo0NW5ydg==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="mailto:subramanyav2022@gmail.com">
            <MdEmail className="hover:text-red-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://www.linkedin.com/in/subramanyav2002" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-600 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://github.com/Subramanya-Veeregowda" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-800 dark:hover:text-gray-100 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://wa.me/qr/IH3W2XLDW7FHE1" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:text-green-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://x.com/SubramanyaV_" target="_blank" rel="noopener noreferrer">
            <FaXTwitter  className="hover:text-blue-400 hover:scale-125 transition duration-300 ease-in-out" />
          </a>
        </div>
      </div>

      {/* DESKTOP LAYOUT (UNCHANGED STYLE) */}
      <div className="hidden md:flex justify-between items-center px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4 font-bold">
          <span>© 2026 LinkForge</span>
          <span className="text-xs opacity-70">v1.0.1</span>
          <FaGooglePlay className="text-lg cursor-pointer hover:text-blue-500 hover:scale-125 transition duration-300 ease-in-out" />
        </div>

        {/* CENTER */}
        <div className="text-center font-bold text-xs opacity-80">
          Built & Design by Subramanya V
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-lg">
          <a href="https://www.instagram.com/subbu.7_?igsh=MWRicmJjNGo0NW5ydg==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="mailto:subramanyav2002@gmail.com">
            <MdEmail className="hover:text-red-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://www.linkedin.com/in/subramanyav2002" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-600 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://github.com/Subramanya-Veeregowda" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-800 dark:hover:text-gray-100 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://wa.me/qr/IH3W2XLDW7FHE1" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:text-green-500 hover:scale-125 transition duration-300 ease-in-out" />
          </a>

          <a href="https://x.com/SubramanyaV_" target="_blank" rel="noopener noreferrer">
            <FaXTwitter  className="hover:text-blue-400 hover:scale-125 transition duration-300 ease-in-out" />
          </a>
        </div>
      </div>

    </footer>
  );
}