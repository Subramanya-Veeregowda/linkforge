import { useState, useEffect } from "react";
import { Copy, ExternalLink, QrCode } from "lucide-react";

export default function LinkForm() {

  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiry, setExpiry] = useState();
  const [shortUrl, setShortUrl] = useState(null);
  const [error,setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


useEffect(() => {
  const savedUrl = localStorage.getItem("url");
  const savedAlias = localStorage.getItem("alias");
  const savedExpiry = localStorage.getItem("expiry");
  const savedShort = localStorage.getItem("shortUrl");


  if (savedUrl) setUrl(savedUrl);
  if (savedAlias) setAlias(savedAlias);
  if (savedExpiry) setExpiry(savedExpiry);
  if (savedShort) setShortUrl(savedShort);
}, []);

const handleSubmit = async () => {
  setError("");
  setLoading(true);

  console.log("Expiry date:" , expiry)

  try {
    const res = await fetch("http://localhost:8080/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: url,
        customCode: alias,
        expiryTime: expiry ? expiry : null,
        password: password || null,
      }),
    });

    // ✅ READ ONLY ONCE
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      console.log("Response is not JSON");
    }

    // ❌ ERROR CASE
    if (!res.ok) {
      if (data?.message === "Alias already taken") {
        setError("Alias already taken");
      } else if (data?.message === "Invalid URL") {
        setError("Invalid URL");
      } else {
        setError("Something went wrong");
      }
      setShortUrl(null);
      return;
    }

    // ✅ SUCCESS
    if (data?.shortUrl) {
      const shortCode = data.shortUrl.split("/").pop();
      setShortUrl(data.shortUrl);
    } else {
      setError("No short URL returned from server");
    }

  } catch (err) {
    setError("Backend not reachable");
  }

};

  return (
    <div className="w-full px-4 sm:px-6">
    <div className="max-w-xl mx-auto mt-3 rounded-xl backdrop-blur bg-white/80 dark:bg-blue-400/30 border border-white/20 shadow-xl p-4 sm:p-6">

      {/* URL INPUT */}
      <input
        type="text"
        placeholder="http://example.com/my-very-long-article-link"
        value={url}
        onChange={(e) => { setUrl(e.target.value);
                         setError("");
        }}
        className="w-full p-3 rounded-lg bg-white dark:bg-blue-100 border border-gray-500 mb-4 placeholder-grey-500 "
      />


      {/* CUSTOM ALIAS */}
      <input
        type="text"
        placeholder="Custom alias (optional)"
        autoComplete="off"
        value={alias}
        onChange={(e) => { setAlias(e.target.value);
                           setError("");
        }}
        className="w-full p-3 rounded-lg bg-white dark:bg-blue-100  border border-gray-500 mb-2 placeholder-grey-500 "
      />

      {error && (
      <p className="text-red-500 text-sm mt-1 mb-1">
            {error}
      </p>
     )}
        <label className="text-sm text-blue-900 dark:text-blue-300 mb-2 block">
        Enter Password (optional)
      </label>
     <input
         type="password"
         name="linksecret"
         placeholder="Password protect link (optional)"
         autoComplete="new-password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         className="w-full p-3 rounded-lg border bg-white dark:bg-blue-100 placeholder-grey-400 border-gray-400 mb-3"
    />

    <div className="w-full mb-3">
      <label className="text-sm text-blue-900 dark:text-blue-300 mb-2 block">
        Expiry date & time (optional)
      </label>

      {/* EXPIRY */}
      <input
        type="datetime-local"
        placeholder="Expiry date & time"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-white/30 dark:bg-blue-100 border border-gray-500 mb-4 text-gray-500"
        />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="ml-4 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-900 hover:scale-[1.05] transition duration-300 ease-in-out"
      >
        Forge
      </button>

     </div>

 <p className="text-sm mb-4 text-blue-900 dark:text-blue-300 ">Forged URL:</p>

      {/* RESULT */}
<div className="mb-4">
  {shortUrl ? (
    <div className="p-4 border rounded-lg bg-white/80 dark:bg-blue-100">
     

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span className="truncate max-w-[95%]">{shortUrl}</span>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap justify-end sm:justify-start">
          {/* Copy */}
          <button
            title="copy"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            className="bg-blue-500 px-3 py-1 rounded text-white  hover:bg-blue-900 hover:scale-[1.03] transition duration-300 ease-in-out"
          >
          <Copy size={16}/>
          </button>

          {/* Visit */}
          <a
            title="visit"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 px-3 py-1 rounded text-white  hover:bg-green-900 hover:scale-[1.03] transition duration-300 ease-in-out"
          >
            <ExternalLink size={16}/>
          </a>

          {/* QR */}
          <button
            title="generate QR code"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const shortCode = shortUrl.split("/").pop();
              window.location.href = `/qr/${shortCode}`;
            }}
            className="bg-purple-500 px-3 py-1 rounded text-white  hover:bg-purple-900 hover:scale-[1.03] transition duration-300 
            ease-in-out"
          >
             <QrCode size={16}/>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-400 text-sm text-center">
      You haven't forged any URL yet!
    </p>
  )}
</div>

    </div>
        </div>
  );
}