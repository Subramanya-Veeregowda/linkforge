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

  useEffect(() => {
    if(searchParams.get("error") === "invalid"){
      setError("Invalid password");
    }

    if(searchParams.get("expired") === "true"){
      setExpired(true);
    }
  },[]);

const handleUnlock = (e) => {
  e.preventDefault();

  const url = `http://localhost:8080/${shortCode}?password=${password}`;

  // 🔥 let backend handle everything
  window.location.href = url;
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