"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Video, MessageSquare, ArrowRight, Menu, X, LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Navbar Component avec gestion de l'authentification
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier l'état d'authentification au montage du composant
  useEffect(() => {
    const checkAuthStatus = () => {
      const accessToken = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');
      
      if (accessToken && userData) {
        setIsAuthenticated(true);
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Erreur lors du parsing des données utilisateur:', error);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();

    // Écouter les changements du localStorage (pour synchroniser entre onglets)
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setShowUserMenu(false);
    // Rediriger vers la page d'accueil ou de connexion
    window.location.href = '/';
  };

  // Navigation items adaptés selon l'état d'authentification
  const getNavItems = () => {
    const baseItems = [
      { name: 'Accueil', href: '/' },
      { name: 'Poser une question', href: '/ask' }
    ];

    if (isAuthenticated) {
      baseItems.push({ name: 'Dashboard', href: '/admin' });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-100/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Video className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            FlickAsk
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={item.name} className="relative group">
              <Link 
                href={item.href} 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                {item.name}
              </Link>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          {/* Affichage conditionnel selon l'état d'authentification */}
          {isAuthenticated ? (
            // Menu utilisateur connecté
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-full px-4 py-2 border border-transparent hover:border-blue-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <span className="font-medium">
                  {user?.name || 'Utilisateur'}
                </span>
              </button>

              {/* Menu déroulant utilisateur */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100/50 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100/50">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Boutons de connexion/inscription pour utilisateurs non connectés
            <>
              <Button 
                asChild
                variant="ghost" 
                className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-full px-4 py-2 border border-transparent hover:border-blue-200"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  <span className="font-medium">Connexion</span>
                </Link>
              </Button>
              
              <Button 
                asChild
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full px-6 py-2 relative overflow-hidden group"
              >
                <Link href="/register">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <UserPlus className="h-4 w-4 relative z-10" />
                  <span className="font-medium relative z-10">S'inscrire</span>
                </Link>
              </Button>
            </>
          )}
          
          <button 
            className="block md:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-blue-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100/50 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}>
          <nav className="container mx-auto px-4 py-8 space-y-6">
            {navItems.map((item, index) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Menu mobile selon l'état d'authentification */}
            <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200/50">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-2 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl py-3 font-medium"
                  >
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Profil
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300 rounded-xl py-3 font-medium"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl py-3 font-medium"
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Connexion
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      S'inscrire
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay pour fermer le menu utilisateur */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}