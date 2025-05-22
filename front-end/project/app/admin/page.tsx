"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Video, Search, Users, MessageSquare } from "lucide-react";
import QuestionCard from "@/components/shared/QuestionCard";

// Mock data
const questions = [
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
  },
  {
    id: "4",
    title: "Conseils pour optimiser les performances d'une application web ?",
    description: "Mon application web est lente à charger, surtout sur mobile. Quelles techniques puis-je utiliser pour améliorer les performances ?",
    createdAt: "Il y a 5 jours",
    responseCount: 7,
    thumbnailUrl: "https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "5",
    title: "Meilleures pratiques pour le déploiement d'applications Next.js ?",
    description: "Quelles sont les meilleures options de déploiement pour une application Next.js en production ?",
    createdAt: "Il y a 1 semaine",
    responseCount: 4,
    thumbnailUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

// Mock analytics data
const analytics = {
  totalQuestions: 12,
  totalResponses: 43,
  avgResponseTime: "3.2 heures",
  activeUsers: 28
};

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredQuestions = questions.filter(
    question => 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Gérez et visualisez toutes vos questions et réponses
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Questions totales</p>
              <h3 className="text-3xl font-bold mt-1">{analytics.totalQuestions}</h3>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <Video className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Réponses reçues</p>
              <h3 className="text-3xl font-bold mt-1">{analytics.totalResponses}</h3>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Temps de réponse moyen</p>
              <h3 className="text-3xl font-bold mt-1">{analytics.avgResponseTime}</h3>
            </div>
            <div className="rounded-full bg-amber-100 p-2">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Utilisateurs actifs</p>
              <h3 className="text-3xl font-bold mt-1">{analytics.activeUsers}</h3>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">Toutes les questions</TabsTrigger>
            <TabsTrigger value="pending">En attente de réponse</TabsTrigger>
            <TabsTrigger value="answered">Réponses reçues</TabsTrigger>
          </TabsList>
          
          <div className="relative mt-4 md:mt-0">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une question..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                description={question.description}
                createdAt={question.createdAt}
                responseCount={question.responseCount}
                thumbnailUrl={question.thumbnailUrl}
                isAdminView={true}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions
              .filter(q => q.responseCount === 0)
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  description={question.description}
                  createdAt={question.createdAt}
                  responseCount={question.responseCount}
                  thumbnailUrl={question.thumbnailUrl}
                  isAdminView={true}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="answered" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions
              .filter(q => q.responseCount > 0)
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  description={question.description}
                  createdAt={question.createdAt}
                  responseCount={question.responseCount}
                  thumbnailUrl={question.thumbnailUrl}
                  isAdminView={true}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}