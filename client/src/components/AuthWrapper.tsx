interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  // Mostra sempre il contenuto senza verifiche di autenticazione
  return <>{children}</>;
}