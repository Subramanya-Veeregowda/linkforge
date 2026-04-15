import "./loader.css";

export default function MainLoader() {
  return (
    <div className="loader-container">
      
      {/* Animated Link */}
      <div className="link-loader">
        <div className="dot left"></div>
        <div className="line"></div>
        <div className="dot right"></div>
      </div>

      {/* 🏷 Branding */}
      <div className="loader-branding text-xl font-bold text-blue-800 dark:text-blue-300 hover:scale-[1.03] transition duration-300 ease-in-out">
        <h1> <span className="text-xs text-[20px] opacity-70">© 2026</span> 🔗LinkForge  <span className="text-xs text-[10px] opacity-70">v1.0.1</span></h1>

      </div>

    </div>
  );
}
