import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/Logo";

// Codice di accesso per la versione privata del sito
const ACCESS_CODE = "XNCahKl09P!298Gq20LkAns!1";
const STORAGE_KEY = "site_access_granted";

interface SiteAccessGateProps {
  children: ReactNode;
}

export default function SiteAccessGate({ children }: SiteAccessGateProps) {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);

  // Controlla se l'accesso è già stato concesso (salvato in sessionStorage)
  useEffect(() => {
    const accessGranted = sessionStorage.getItem(STORAGE_KEY);
    setIsAccessGranted(accessGranted === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === ACCESS_CODE) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAccessGranted(true);
      setError("");
    } else {
      setError("Codice non valido. Riprova.");
      setCode("");
    }
  };

  // Loading state
  if (isAccessGranted === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-pulse">
          <Lock className="w-12 h-12 text-amber-600" />
        </div>
      </div>
    );
  }

  // Se l'accesso è concesso, mostra il contenuto del sito
  if (isAccessGranted) {
    return <>{children}</>;
  }

  // Altrimenti mostra il form di accesso
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo className="h-16 w-auto" />
          </div>
          <div className="flex justify-center">
            <div className="p-3 bg-amber-100 rounded-full">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Accesso Riservato
          </CardTitle>
          <CardDescription className="text-gray-600">
            Questo sito è in fase di sviluppo e l'accesso è riservato.
            <br />
            Inserisci il codice di accesso per continuare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showCode ? "text" : "password"}
                placeholder="Inserisci il codice di accesso"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                className="pr-10 text-center text-lg tracking-wider"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!code.trim()}
            >
              Accedi al Sito
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            Se non hai il codice di accesso, contatta il proprietario del sito.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
