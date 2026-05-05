import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExpiredPopup from "../components/ExpiredPopup";
import CustomFooter from "../components/CustomFooter";

function UnlockPage() {
  const { shortCode } = useParams();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [searchParams] = useSearchParams();

  //const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if(searchParams.get("error") === "invalid"){
      setError("Invalid password");
    }

    if(searchParams.get("expired") === "true"){
      setExpired(true);
    }
  },[]);

const handleUnlock = async () => {

  if(!password){
    setError("Please enter password");
    return;
  }

  try {
    const API = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(
      `${API}/api/${shortCode}?password=${password}`
    );

    // 🔥 INVALID PASSWORD
    if (res.status === 401) {
      setError("Invalid password");
      return;
    }

    // 🔥 EXPIRED LINK
    if (res.status === 410) {
      setExpired(true);
      return;
    }

    // 🔥 SUCCESS → GET URL
    const url = await res.text();

    if (url) {
      window.location.href = url;
    }

  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  }
};

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

       <form onSubmit={(e) => {
  e.preventDefault();
  handleUnlock();
}}>
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