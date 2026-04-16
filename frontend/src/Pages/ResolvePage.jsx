import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ExpiredPopup from "../components/ExpiredPopup";

function ResolvePage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [expired, setExpired] = useState(false);

  const password = searchParams.get("password");

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!shortCode) return;

const resolve = async () => {
  try {
      const res = await fetch(
           `${API}/api/${shortCode}?password=${password || ""}`,
          { redirect: "manual" }
      );

    console.log("STATUS:", res.status);
    console.log("LOCATION:", res.headers.get("Location"));

    // 🔐 needs password (redirect from backend)
if (res.status === 302) {
  const location = res.headers.get("Location");

  if (location) {
       window.location.href = location;
  }
  return;
}


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