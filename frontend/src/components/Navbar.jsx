import { useState } from "react";
import { Menu, X, LogIn, LogOut, Sun, Moon } from "lucide-react";
import { Tooltip } from "react-tooltip";
import LinkForge from "../assets/LinkForge.png";

export default function Navbar({ dark, setDark, isLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-6 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md z-50">

      {/* LOGO */}
      <div className=" text-xl font-bold text-blue-800 dark:text-blue-300 hover:scale-[1.03] transition duration-300 ease-in-out">
        <div className="flex items-center gap-2">
          <img
            src={LinkForge}
            alt="logo"
            className="h-8 w-8 object-contain"
          />
          <div className="flex items-center gap-1">
          <span className="text-lg font-semibold">LinkForge</span>
        </div>
      </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">

        <button title="Coming Soon 🚀" className="text-sm text-gray-800 dark:text-gray-200">
          My Links
        </button>

        <button title="Coming Soon 🚀" className="text-sm text-gray-800 dark:text-gray-200">
          Manage
        </button>

        {/* LOGIN / LOGOUT */}
        <button title="Coming Soon 🚀" className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm dark:text-white">
          {isLoggedIn ? <LogOut size={16} /> : <LogIn size={16} />}
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="border px-2 py-1 rounded-lg text-black dark:text-white hover:bg-gray-300 hover:dark:bg-gray-700 hover:scale-[1.1] transition duration-300 ease-in-out"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* HAMBURGER BUTTON */}
      <button
        className="md:hidden text-blue-800 dark:text-blue-300 hover:scale-[1.03] transition duration-300 ease-in-out"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-12 right-0 w-1/2 h-screen backdrop-blur-lg bg-gray-200/40 dark:bg-gray-900/60
                  border-l text-1xl border-white/20 shadow-xl md:hidden flex flex-col p-6 gap-4 z-50
                  animate-[slideIn_.25s_ease] dark:text-white font-bold ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4">

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-800 dark:text-gray-200 hover:scale-[1.03] transition duration-300 ease-in-out"
            title="Coming Soon 🚀"
          >
            My Links
          </button>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-gray-800 dark:text-gray-200 hover:scale-[1.03] transition duration-300 ease-in-out"
            title="Coming Soon 🚀"
          >
            Manage
          </button>

          {/* LOGIN / LOGOUT */}
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 border px-4 py-1 rounded-lg text-sm dark:text-white bg-green-200 dark:bg-red-400"
             title="Coming Soon 🚀"
          >
            {isLoggedIn ? <LogOut size={16} /> : <LogIn size={16} />}
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          {/* THEME */}
          <button
            onClick={() => {
              setDark(!dark);
              setOpen(false);
            }}
            className="flex items-center gap-2 border px-4 py-1 rounded-lg text-black dark:text-white hover:scale-[1.03] transition duration-300 ease-in-out"
           
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            Theme
          </button>
        </div>
      </div>

      {/* TOOLTIP FIX (GLOBAL) */}
      <Tooltip
        id="login-tip"
        place="top"
        style={{ zIndex: 9999 }}
      />
    </nav>
  );
}