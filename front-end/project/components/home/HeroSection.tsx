"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Video, Mic, MessageSquare, ArrowRight, Sparkles, Play, Users, Star, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

// HeroSection Component
export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-bl from-emerald-400/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100">
              <Sparkles className="h-4 w-4" />
              <span>Nouveau: Réponses IA intégrées</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Posez vos questions{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  en vidéo
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg -z-10 rounded-lg"></div>
              </span>
              , obtenez des réponses{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  humaines
                </span>
                <svg className="absolute -bottom-4 left-0 w-full h-3 text-emerald-300" viewBox="0 0 100 12">
                  <path d="M0,8 Q25,0 50,8 T100,8" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              FlickAsk révolutionne la façon dont vous obtenez des réponses. Enregistrez vos questions en vidéo 
              et recevez des réponses personnalisées en{" "}
              <span className="font-semibold text-blue-600">vidéo</span>,{" "}
              <span className="font-semibold text-purple-600">audio</span> ou{" "}
              <span className="font-semibold text-emerald-600">texte</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild size="lg" className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full text-lg">
                <Link href="/ask" className="flex items-center space-x-2">
                  <Play className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Commencer maintenant</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group bg-white/80 backdrop-blur-sm hover:bg-white border-2 hover:border-blue-300 transition-all duration-300 rounded-full text-lg">
                <Link href="#how-it-works" className="flex items-center space-x-2">
                  <span>Comment ça marche</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>10,000+ utilisateurs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span>4.9/5 étoiles</span>
              </div>
            </div>
          </div>
          
          <div className={`flex-1 relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Card */}
              <div className="relative z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50 transform hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center h-80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  <div className="relative z-10 bg-white/90 rounded-full p-6 shadow-lg">
                    <Video className="h-16 w-16 text-blue-500" />
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    LIVE
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Comment optimiser mon site web ?</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    J&apos;aimerais savoir comment améliorer les performances et le SEO de mon site e-commerce...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Il y a 2 heures</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
                        5 réponses
                      </span>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className={`w-8 h-8 bg-gradient-to-br ${
                            i === 1 ? 'from-blue-400 to-purple-500' : 
                            i === 2 ? 'from-emerald-400 to-teal-500' : 
                            'from-amber-400 to-orange-500'
                          } rounded-full border-2 border-white shadow-sm`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-8 -right-8 transform rotate-6 w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center hover:rotate-12 transition-transform duration-300 cursor-pointer">
                <Video className="h-12 w-12 text-white" />
              </div>
              
              <div className="absolute -top-8 -left-8 transform -rotate-12 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center hover:-rotate-6 transition-transform duration-300 cursor-pointer">
                <Mic className="h-10 w-10 text-white" />
              </div>
              
              <div className="absolute top-1/2 -right-6 transform translate-x-1/2 -translate-y-1/2 rotate-12 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-2xl flex items-center justify-center hover:rotate-6 transition-transform duration-300 cursor-pointer">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>

              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
