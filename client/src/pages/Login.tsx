import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading, error } = useAuth();

  // Redirect diretto se già autenticato
  useEffect(() => {
    if (isAuthenticated) {
      console.log("✅ Utente autenticato, redirect immediato alla home");
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevenire submit multipli
    if (isSubmitting || isLoading) {
      console.log("🔄 Submit già in corso, ignoro");
      return;
    }

    setIsSubmitting(true);
    setLocalError("");
    console.log("🚀 Iniziando login per:", credentials.username);

    try {
      const result = await login(credentials.username, credentials.password);

      if (result.success) {
        console.log("✅ Login completato con successo, reindirizzamento...");
        // Redirect forzato anche qui per sicurezza
        setLocation("/");
      } else {
        setLocalError(result.message || "Credenziali non valide");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("❌ Errore durante login:", error);
      setLocalError("Errore di connessione");
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof credentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // Rimuovi errore quando l'utente inizia a digitare
      if (localError) setLocalError("");
    };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
            Accesso Privato
          </h1>
          <p className="text-gray-600 mt-2 font-open-sans">
            Inserisci le tue credenziali per accedere
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 font-open-sans"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleInputChange("username")}
                  className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary font-open-sans"
                  placeholder="Inserisci username"
                  required
                  disabled={isLoading}
                  data-testid="input-username"
                />
              </div>
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 font-open-sans"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleInputChange("password")}
                  className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary font-open-sans"
                  placeholder="Inserisci password"
                  required
                  disabled={isLoading}
                  data-testid="input-password"
                />
              </div>
            </div>

            {/* Messaggio di errore */}
            {(localError || error) && (
              <Alert variant="destructive" data-testid="error-message">
                <AlertDescription className="font-open-sans">
                  {localError || error}
                </AlertDescription>
              </Alert>
            )}

            {/* Pulsante Accedi */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-semibold font-montserrat text-lg"
              disabled={
                isLoading ||
                isSubmitting ||
                !credentials.username ||
                !credentials.password
              }
              data-testid="button-login"
            >
              {isLoading || isSubmitting ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>

          {/* Footer minimalista */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-open-sans">
              Big Gimmy Integratori - Accesso Riservato
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
