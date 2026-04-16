import { useEffect, useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import CustomFooter from "../components/CustomFooter";

export default function QRCodePage() {
  const [data, setData] = useState(null);
  const [showQR, setShowQR] = useState(true);
  const { shortCode } = useParams();
const API = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
  const fetchQR = async () => {
    try {
      const res = await fetch(`${API}/api/qr/details/${shortCode}`);
      const data = await res.json();
      setData(data);
    } catch {
      setData("error");
    }
  };

  fetchQR();
}, [shortCode]);

  if (data === null) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg"> Generating your Quick response Code...</div>
    </div>
  )

  if (data === "error") {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-lg">
        Invalid or protected link
      </div>
    </div>
  );
}

  const imageSrc = `data:image/png;base64,${data.qrImage}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white mb-2">Your QR Code</h1>

      {/* QR */}
      <div className="relative">
        <img
          src={imageSrc}
          className={`w-56 h-56 rounded-xl mb-2 mt-2 shadow-lg hover:shadow-xl transition hover:scale-[1.01] ${
            showQR ? "blur-md" : "blur-0"
          }`}
        />

        <button
          onClick={() => setShowQR(!showQR)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
        >
          {showQR ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <a
          href={imageSrc}
          download="qr.png"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 hover:scale-[1.04]"
        >
          <Download size={16} /> Download
        </a>
      </div>

      {/* Info */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        <p>{data.url}</p>

        {data.passwordProtected && (
          <p className="text-yellow-500">🔒 Password Protected</p>
        )}

        {data.expiry && (
          <p>Expires on: {new Date(data.expiry).toLocaleString()}</p>
        )}
      </div>

      {/* Footer */}
     <div className="mt-6 opacity-80">
       <CustomFooter/>
     </div>
    </div>
  );
}