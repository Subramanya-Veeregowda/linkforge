import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpiredPopup from "../components/ExpiredPopup";

function ResolvePage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [expired, setExpired] = useState(false);

  const password = searchParams.get("password");

  useEffect(() => {
    if (!shortCode) return;

const resolve = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/${shortCode}?password=${password || ""}`
    );

    // ❌ invalid password
    if (res.status === 401) {
      navigate(`/unlock/${shortCode}?error=invalid`);
      return;
    }

    // ⏰ expired
    if (res.status === 410) {
      navigate("/expired");
      return;
    }

    // 🔐 needs password (redirect from backend)
    if (res.redirected && res.url.includes("/unlock")) {
      navigate(`/unlock/${shortCode}`);
      return;
    }

    // ✅ success → backend gives redirect URL
    window.location.href = res.url;

  } catch (err) {
    console.error("Resolve error:", err);
  }
};

    resolve();
  }, [shortCode, password, navigate]);

  // 🟥 Expired UI
  if (expired) {
    return <ExpiredPopup />;
  }

  // ⏳ Loading fallback
  return (
    <>
    <div className="h-screen flex items-center justify-center text-gray-400">
      Redirecting...
    </div>
         </>
  );
}

export default ResolvePage;