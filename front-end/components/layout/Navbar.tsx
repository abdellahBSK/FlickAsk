"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Video, MessageSquare, ArrowRight, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Navbar Component sans popup - Navigation vers pages séparées
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Poser une question', href: '/ask' },
    { name: 'Dashboard', href: '/admin' }
  ];

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
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}