import { useState, useEffect, ReactNode } from "react";

const ACCESS_CODE = "XNCahKl09P!298Gq20LkAns!1";
const STORAGE_KEY = "site_access_granted";

interface SiteAccessGateProps {
  children: ReactNode;
}

export default function SiteAccessGate({ children }: SiteAccessGateProps) {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const accessGranted = sessionStorage.getItem(STORAGE_KEY);
    setIsAccessGranted(accessGranted === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAccessGranted(true);
    } else {
      setError("Codice non valido");
      setCode("");
    }
  };

  if (isAccessGranted === null) {
    return null;
  }

  if (isAccessGranted) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-6">Accedi</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Codice di accesso"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            autoFocus
            className="w-full p-3 border rounded mb-3 text-center"
          />
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          <button
            type="submit"
            disabled={!code}
            className="w-full p-3 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-gray-300"
          >
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}
