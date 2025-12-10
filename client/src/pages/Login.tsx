import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail } from "lucide-react";
import { useAuthQuery } from "@/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading, error } = useAuthQuery();

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
    console.log("🚀 Iniziando login con codice");

    try {
      if (code && code.length > 0) {
        await login({ code });
      } else {
        await login({ email, password });
      }

      console.log("✅ Login completato con successo, reindirizzamento...");
      setLocation("/");
    } catch (error) {
      console.error("❌ Errore durante login:", error);
      setLocalError("Errore di connessione");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (localError) setLocalError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (localError) setLocalError("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (localError) setLocalError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
            Accesso Privato
          </h1>
          <p className="text-gray-600 mt-2 font-open-sans">Inserisci il codice o le tue credenziali</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Codice */}
            <div className="space-y-2">
              <label
                htmlFor="code"
                className="text-sm font-medium text-gray-700 font-open-sans"
              >
                Codice
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="code"
                  type="password"
                  value={code}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary font-open-sans"
                  placeholder="Inserisci codice"
                  required
                  disabled={isLoading}
                  data-testid="input-code"
                />
              </div>
            </div>

            {/* Oppure Email + Password */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 font-open-sans">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary font-open-sans"
                  placeholder="mario@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 font-open-sans">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary font-open-sans"
                  placeholder="Inserisci password"
                  disabled={isLoading}
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
              disabled={isLoading || isSubmitting || (!code && (!email || !password))}
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
