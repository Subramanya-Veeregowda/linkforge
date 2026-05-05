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

  if(expired) return;
  const checkLink = async () => {
    const res = await fetch(`${API}/api/${shortCode}`);

 if (res.status === 410) {
  setExpired(true);
  return;
}

if (res.status === 401) {
  window.location.href = `/unlock/${shortCode}`;
  return;
}

    // success → redirect
    const url = await res.text();
    window.location.href = url;
  };

  checkLink();
}, [])

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