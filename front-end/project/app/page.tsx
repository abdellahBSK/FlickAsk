"use client";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import QuestionCard from "@/components/shared/QuestionCard";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Sparkles,  Users, Star, Menu, X } from 'lucide-react';

import { Video, Mic, Upload, Send, MessageSquare, ArrowRight, Play, Camera, Edit, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const VideoCreationSteps = () => {
  const steps = [
    {
      id: 1,
      icon: Camera,
      title: "Enregistrez votre question",
      description: "Utilisez votre caméra ou microphone pour poser votre question en vidéo. Soyez naturel et précis.",
      duration: "1-3 min",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: Edit,
      title: "Ajoutez les détails",
      description: "Complétez avec un titre accrocheur, une description et les tags appropriés pour votre question.",
      duration: "30 sec",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: Upload,
      title: "Publiez votre vidéo",
      description: "Uploadez votre vidéo et partagez-la avec notre communauté d'experts prêts à vous aider.",
      duration: "Instantané",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      icon: MessageSquare,
      title: "Recevez des réponses",
      description: "Les membres de la communauté répondent à votre question avec des vidéos personnalisées et détaillées.",
      duration: "24-48h",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Video className="w-4 h-4" />
            Comment ça marche
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Créez votre vidéo question
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En quelques étapes simples, posez votre question en vidéo et obtenez des réponses personnalisées de notre communauté d'experts.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative group">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 shadow-sm">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Durée: {step.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Example Video Preview */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Exemple de question vidéo
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Voici comment nos utilisateurs posent leurs questions. Soyez naturel, 
                précis et n'hésitez pas à montrer des éléments visuels si nécessaire.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Titre clair</p>
                    <p className="text-gray-600 text-sm">Formulez votre question de manière concise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Contexte détaillé</p>
                    <p className="text-gray-600 text-sm">Expliquez votre situation en vidéo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Tags pertinents</p>
                    <p className="text-gray-600 text-sm">Aidez les experts à vous trouver</p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 group">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl">
                <div className="bg-black rounded-xl overflow-hidden aspect-video relative group cursor-pointer">
                  <img 
                    src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Exemple de question vidéo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                  
                  {/* Video overlay info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        "Comment optimiser mon code React ?"
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-200">
                        <span>2:34</span>
                        <span>•</span>
                        <span>7 réponses</span>
                        <span>•</span>
                        <span>Il y a 2h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-800">En direct</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à poser votre première question ?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui obtiennent des réponses personnalisées 
            grâce à notre plateforme de questions-réponses en vidéo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 group">
              <Camera className="w-5 h-5" />
              Enregistrer une question
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold flex items-center gap-2">
              <Play className="w-5 h-5" />
              Voir des exemples
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold mb-2">2.5K+</div>
              <div className="text-blue-100 text-sm">Questions posées</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-100 text-sm">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24h</div>
              <div className="text-blue-100 text-sm">Temps de réponse</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
=======
import { Video, Mic, MessageSquare, ArrowRight, Sparkles, Play, Users, Star, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

>>>>>>> 2713659 (améliorer le design de frontend des pages hero navbar questions et vidéo recorder)
const recentQuestions = [
  {
    id: "1",
    title: "Comment configurer un environnement de développement Next.js ?",
    description: "Je voudrais savoir comment installer et configurer correctement un environnement de développement pour commencer avec Next.js.",
    createdAt: "Il y a 2 heures",
    responseCount: 3,
    thumbnailUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "2",
    title: "Conseils pour améliorer mes compétences en design UX/UI ?",
    description: "Je travaille en tant que développeur front-end depuis 2 ans et j'aimerais améliorer mes compétences en design. Quels conseils pourriez-vous me donner ?",
    createdAt: "Il y a 1 jour",
    responseCount: 5,
    thumbnailUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "3",
    title: "Comment gérer l'authentification dans une application React ?",
    description: "Je cherche la meilleure approche pour implémenter un système d'authentification dans mon application React. Quelles sont les meilleures pratiques ?",
    createdAt: "Il y a 3 jours",
    responseCount: 2,
    thumbnailUrl: "https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default function HomePage() {
  const recentQuestions = [
    {
      id: "1",
      title: "Comment configurer un environnement de développement Next.js ?",
      description: "Je voudrais savoir comment installer et configurer correctement un environnement de développement pour commencer avec Next.js.",
      createdAt: "Il y a 2 heures",
      responseCount: 3,
      thumbnailUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "2",
      title: "Conseils pour améliorer mes compétences en design UX/UI ?",
      description: "Je travaille en tant que développeur front-end depuis 2 ans et j'aimerais améliorer mes compétences en design. Quels conseils pourriez-vous me donner ?",
      createdAt: "Il y a 1 jour",
      responseCount: 5,
      thumbnailUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: "3",
      title: "Comment gérer l'authentification dans une application React ?",
      description: "Je cherche la meilleure approche pour implémenter un système d'authentification dans mon application React. Quelles sont les meilleures pratiques ?",
      createdAt: "Il y a 3 jours",
      responseCount: 2,
      thumbnailUrl: "https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
  
      <HeroSection />
      
      {/* Recent Questions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Questions récentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Découvrez les dernières questions posées par notre communauté et rejoignez la conversation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                {...question}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              href="/ask"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold text-lg group transition-colors duration-200"
            >
              <span>Poser votre propre question</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
      
<<<<<<< HEAD
      <VideoCreationSteps />
      
=======
    
>>>>>>> 2713659 (améliorer le design de frontend des pages hero navbar questions et vidéo recorder)
    </div>
  );
}