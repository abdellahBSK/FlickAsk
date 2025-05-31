// components/RouteGuard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;  // true = nécessite d'être connecté, false = nécessite d'être déconnecté
  redirectTo?: string;    // où rediriger si la condition n'est pas remplie
}

export default function RouteGuard({ 
  children, 
  requireAuth = true, 
  redirectTo 
}: RouteGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      const isAuthenticated = !!accessToken;

      if (requireAuth) {
        // Page nécessitant d'être connecté
        if (isAuthenticated) {
          setIsAuthorized(true);
        } else {
          // Rediriger vers login si pas connecté
          router.push(redirectTo || '/login');
          return;
        }
      } else {
        // Page nécessitant d'être déconnecté (login, register)
        if (!isAuthenticated) {
          setIsAuthorized(true);
        } else {
          // Rediriger vers accueil si déjà connecté
          router.push(redirectTo || '/');
          return;
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [requireAuth, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}