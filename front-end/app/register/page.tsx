"use client";
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft, Github, Chrome, Facebook, Video, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Validation simple
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Données d\'inscription:', formData);
    setIsLoading(false);
    
    // Redirection après inscription réussie
    alert('Compte créé avec succès !');
    // window.location.href = '/dashboard';
  };

  const handleSocialRegister = (provider) => {
    console.log(`Inscription avec ${provider}`);
    // Logique d'inscription sociale
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
     
        {/* Card principale */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative px-8 pt-12 pb-8 text-center">
         
            {/* Icon et titre */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <UserPlus className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-ping"></div>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
              Rejoignez FlickAsk
            </h1>
            <p className="text-gray-600 text-lg">
              Créez votre compte et découvrez une nouvelle façon d'apprendre
            </p>
          </div>

          {/* Formulaire */}
          <div className="px-8 pb-12">
            <div className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Mot de passe */}
              <div className="relative group">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Créer un mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Confirmer mot de passe */}
              <div className="relative group">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 z-10" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Bouton d'inscription */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 focus:ring-4 focus:ring-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Création du compte...</span>
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Créer mon compte gratuitement</span>
                  </span>
                )}
              </button>

              {/* Séparateur */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-6 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">ou continuez avec</span>
                </div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Boutons sociaux */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  type="button"
                  onClick={() => handleSocialRegister('Google')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-300 group transform hover:scale-105"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium text-sm">Google</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleSocialRegister('Facebook')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group transform hover:scale-105"
                >
                  <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-gray-700 font-medium text-sm">Facebook</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleSocialRegister('GitHub')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group transform hover:scale-105"
                >
                  <Github className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-gray-700 font-medium text-sm">GitHub</span>
                </button>
              </div>

              {/* Lien vers connexion */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-lg mb-2">
                  Vous avez déjà un compte ?
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-200 hover:scale-105 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
                >
                  Se connecter maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>En créant un compte, vous acceptez nos</p>
          <div className="space-x-4 mt-2">
            <Link href="/terms" className="hover:text-blue-600 transition-colors duration-200">
              Conditions d'utilisation
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors duration-200">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}