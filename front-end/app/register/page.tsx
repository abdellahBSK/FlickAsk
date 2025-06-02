"use client";
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import RouteGuard from '@/components/RouteGuard';
// Configuration de l'API - ajustez l'URL selon votre backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation des champs requis
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    // Clear previous messages
    setErrors({});
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Préparer les données pour l'API (combiner prénom et nom)
      const userData = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccessMessage('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Optionnel: redirection après quelques secondes
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      if (error.message.includes('Email already in use')) {
        setErrors({ email: 'Cette adresse email est déjà utilisée' });
      } else {
        setErrors({ general: error.message || 'Une erreur est survenue lors de l\'inscription' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Inscription avec ${provider}`);
    // TODO: Implémenter l'authentification sociale
  };

  const inputClassName = (fieldName) => {
    const baseClass = "w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 focus:bg-white hover:bg-white/80 text-gray-800 placeholder-gray-500 font-medium";
    const errorClass = errors[fieldName] ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <RouteGuard requireAuth={false}>
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

          {/* Messages de succès/erreur */}
          {successMessage && (
            <div className="mx-8 mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {errors.general && (
            <div className="mx-8 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm font-medium">{errors.general}</p>
            </div>
          )}

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
                    className={inputClassName('firstName')}
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
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
                    className={inputClassName('lastName')}
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
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
                  className={`${inputClassName('email')} pr-4`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
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
                  className={`${inputClassName('password')} pr-14`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
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
                  className={`${inputClassName('confirmPassword')} pr-14`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 z-10"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
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
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleSocialRegister('Facebook')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group transform hover:scale-105"
                >
                  <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleSocialRegister('GitHub')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group transform hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>

              {/* Lien vers connexion */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-lg mb-2">
                  Vous avez déjà un compte ?
                </p>
                <a
                  href="/login"
                  className="text-blue-600 hover:text-purple-600 font-bold text-lg transition-all duration-200 hover:scale-105 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
                >
                  Se connecter maintenant
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>En créant un compte, vous acceptez nos</p>
          <div className="space-x-4 mt-2">
            <a href="/terms" className="hover:text-blue-600 transition-colors duration-200">
              Conditions d'utilisation
            </a>
            <span>•</span>
            <a href="/privacy" className="hover:text-blue-600 transition-colors duration-200">
              Politique de confidentialité
            </a>
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
    </RouteGuard>
  );
}