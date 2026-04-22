import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExpiredPopup from "../components/ExpiredPopup";
import Footer from "../components/Footer";
import CustomFooter from "../components/CustomFooter";

function UnlockPage() {
  const { shortCode } = useParams();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [searchParams] = useSearchParams();

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if(searchParams.get("error") === "invalid"){
      setError("Invalid password");
    }

    if(searchParams.get("expired") === "true"){
      setExpired(true);
    }
  },[]);

const handleUnlock = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // 1. Fetch the data instead of just changing window.location
    const response = await fetch(`${API}/api/${shortCode}?password=${password}`);
    
    // 2. Parse the JSON result from the backend
    const data = await response.json();

    if (data.status === "SUCCESS") {
      // 3. If valid, redirect to the actual original link
      window.location.href = data.url; 
    } else if (data.status === "EXPIRED") {
      // 4. If expired, show the popup
      setExpired(true);
    } else if (data.status === "INVALID_PASSWORD") {
      setError("Invalid password. Please try again.");
    }
  } catch (err) {
    console.error("Unlock error:", err);
    setError("Something went wrong. Please check your connection.");
  }
};

  // Show expired UI
  if (expired) {
    return <ExpiredPopup />;
  }

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-white">
      <div className="bg-gray-300 text-black dark:text-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        
        <h2 className="text-xl font-semibold mb-4">
          🔐 Encrypted Link
        </h2>

        <p className="text-gray-700 dark:text-gray-400 mb-4">
          This link requires a password.
        </p>

        <form onSubmit={handleUnlock}>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 mb-3">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
          >
            Unlock
          </button>
        </form>
      </div>   
      <div className="mt-6 opacity-80">
        <CustomFooter/>
      </div>
    </div>
         </>
  );
}

export default UnlockPage;