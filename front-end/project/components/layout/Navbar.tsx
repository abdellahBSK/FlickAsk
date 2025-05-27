"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Video, Mic, MessageSquare, ArrowRight, Sparkles, Play, Users, Star, Menu, X, User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus, Github, Chrome, Facebook } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Navbar Component avec Authentification Premium
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
=======
import { Video, Mic, MessageSquare, ArrowRight, Sparkles, Play, Users, Star, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Navbar Component
export default  function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
>>>>>>> 2713659 (améliorer le design de frontend des pages hero navbar questions et vidéo recorder)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

<<<<<<< HEAD
  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Données du formulaire:', formData);
    setIsLoading(false);
    setShowAuthModal(false);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Connexion avec ${provider}`);
    // Logique de connexion sociale
  };

=======
>>>>>>> 2713659 (améliorer le design de frontend des pages hero navbar questions et vidéo recorder)
  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Poser une question', href: '/ask' },
    { name: 'Dashboard', href: '/admin' }
  ];

  return (
<<<<<<< HEAD
    <>
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
            <Button 
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              variant="ghost" 
              className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-full px-4 py-2 border border-transparent hover:border-blue-200"
            >
              <LogIn className="h-4 w-4" />
              <span className="font-medium">Connexion</span>
            </Button>
            
            <Button 
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full px-6 py-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <UserPlus className="h-4 w-4 relative z-10" />
              <span className="font-medium relative z-10">S'inscrire</span>
            </Button>
            
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
              <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200/50">
                <Button 
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline" 
                  className="w-full border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl py-3 font-medium"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
                <Button 
                  onClick={() => {
                    setAuthMode('register');
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  S'inscrire
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Modal d'authentification Premium Responsive */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Overlay animé */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-blue-900/20 backdrop-blur-md transition-all duration-500 animate-in fade-in"
            onClick={() => setShowAuthModal(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          </div>
          
          {/* Modal Container - Responsive avec hauteur limitée */}
          <div className="relative w-full max-w-md sm:max-w-lg h-[80vh] transform transition-all duration-500 animate-in zoom-in-95 slide-in-from-bottom-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative h-full flex flex-col">
              {/* Gradient background animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 animate-gradient-x"></div>
              
              {/* Header - Fixed */}
              <div className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 flex-shrink-0">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full hover:bg-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 group z-10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
                </button>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {authMode === 'login' ? (
                      <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3">
                    {authMode === 'login' ? 'Bon retour !' : 'Rejoignez-nous'}
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {authMode === 'login' 
                      ? 'Heureux de vous revoir sur FlickAsk' 
                      : 'Créez votre compte et découvrez FlickAsk'
                    }
                  </p>
                </div>
              </div>

              {/* Formulaire - Scrollable */}
              <div className="relative flex-1 overflow-y-auto">
                <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Champs nom/prénom pour l'inscription */}
                    {authMode === 'register' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="relative group">
                          <User className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium text-sm sm:text-base"
                            required
                          />
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <div className="relative group">
                          <User className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Nom de famille"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium text-sm sm:text-base"
                            required
                          />
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    <div className="relative group">
                      <Mail className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Votre adresse e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium text-sm sm:text-base"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Mot de passe */}
                    <div className="relative group">
                      <Lock className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-3 sm:top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Confirmer mot de passe (inscription uniquement) */}
                    {authMode === 'register' && (
                      <div className="relative group animate-in slide-in-from-top-2 duration-300">
                        <Lock className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirmez votre mot de passe"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium text-sm sm:text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 sm:right-4 top-3 sm:top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </button>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    )}

                    {/* Mot de passe oublié (connexion uniquement) */}
                    {authMode === 'login' && (
                      <div className="text-right">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                    )}

                    {/* Bouton de soumission */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 focus:ring-4 focus:ring-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group text-sm sm:text-base"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Connexion en cours...</span>
                        </div>
                      ) : (
                        <span className="relative z-10">
                          {authMode === 'login' ? 'Se connecter maintenant' : 'Créer mon compte gratuitement'}
                        </span>
                      )}
                    </button>

                    {/* Séparateur stylé */}
                    <div className="my-6 sm:my-8 flex items-center">
                      <div className="flex-1 border-t border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-gray-200">
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">ou continuez avec</span>
                      </div>
                      <div className="flex-1 border-t border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* Boutons sociaux améliorés */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <button 
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-2 sm:px-4 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-300 group transform hover:scale-105"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="hidden sm:inline text-gray-700 font-medium text-sm">Google</span>
                      </button>
                      
                      <button 
                        onClick={() => handleSocialLogin('Facebook')}
                        className="flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-2 sm:px-4 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group transform hover:scale-105"
                      >
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                        <span className="hidden sm:inline text-gray-700 font-medium text-sm">Facebook</span>
                      </button>
                      
                      <button 
                        onClick={() => handleSocialLogin('GitHub')}
                        className="flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-2 sm:px-4 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group transform hover:scale-105"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:scale-110 transition-transform duration-200" />
                        <span className="hidden sm:inline text-gray-700 font-medium text-sm">GitHub</span>
                      </button>
                    </div>

                    {/* Lien pour changer de mode */}
                    <div className="mt-6 sm:mt-8 text-center pb-4">
                      <p className="text-gray-600 text-sm sm:text-lg">
                        {authMode === 'login' ? "Première fois sur FlickAsk ?" : "Vous avez déjà un compte ?"}
                      </p>
                      <button
                        type="button"
                        onClick={switchAuthMode}
                        className="mt-2 text-blue-600 hover:text-purple-600 font-bold text-sm sm:text-lg transition-all duration-200 hover:scale-105 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
                      >
                        {authMode === 'login' ? "Créer un compte gratuitement" : "Se connecter maintenant"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
=======
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Video className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FlickAsk
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link 
                href={item.href} 
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </Link>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full">
            <Link href="/ask">
              <Sparkles className="h-4 w-4" />
              <span>Commencer</span>
            </Link>
          </Button>
          
          <button 
            className="block md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg border-b md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full">
              <Link href="/ask">
                Commencer
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
>>>>>>> 2713659 (améliorer le design de frontend des pages hero navbar questions et vidéo recorder)
  );
}