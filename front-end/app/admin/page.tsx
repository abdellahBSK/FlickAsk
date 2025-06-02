"use client";
import { useState, useEffect } from "react";
import { Video, Search, Users, MessageSquare, Clock, Play, Eye, TrendingUp, Filter, MoreVertical, Zap, Star, Award, Activity, ArrowUp, Sparkles, Heart, Share, Bookmark } from "lucide-react";

// Mock data avec plus de détails
const questions = [
  {
    id: "1",
    title: "Comment créer des animations fluides avec Framer Motion ?",
    description: "Je veux apprendre à créer des micro-interactions et des animations complexes qui donnent vie à mes interfaces utilisateur.",
    createdAt: "Il y a 2 heures",
    responseCount: 8,
    viewCount: 2340,
    likes: 124,
    category: "Animation",
    status: "trending",
    priority: "high",
    author: "Sarah Dev",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    thumbnailUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Animation", "UX"],
    engagement: 96
  },
  {
    id: "2", 
    title: "Design System moderne : créer une identité visuelle cohérente",
    description: "Comment structurer et maintenir un design system évolutif pour une équipe de développeurs et designers ?",
    createdAt: "Il y a 4 heures",
    responseCount: 12,
    viewCount: 1890,
    likes: 89,
    category: "Design System",
    status: "hot",
    priority: "high",
    author: "Alex UI",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    thumbnailUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Design", "Figma", "Brand"],
    engagement: 94
  },
  {
    id: "3",
    title: "Architecture microservices avec Next.js et Docker",
    description: "Stratégies avancées pour déployer et orchestrer des applications Next.js dans un environnement microservices.",
    createdAt: "Il y a 6 heures", 
    responseCount: 15,
    viewCount: 3450,
    likes: 203,
    category: "Architecture",
    status: "featured",
    priority: "high",
    author: "Mike Tech",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    thumbnailUrl: "https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["DevOps", "Docker", "Scaling"],
    engagement: 98
  },
  {
    id: "4",
    title: "AI-Powered UX : intégrer l'intelligence artificielle dans le design",
    description: "Comment utiliser l'IA pour créer des expériences utilisateur personnalisées et prédictives ?",
    createdAt: "Il y a 1 jour",
    responseCount: 6,
    viewCount: 1250,
    likes: 67,
    category: "AI/UX",
    status: "new",
    priority: "medium",
    author: "Luna AI",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    thumbnailUrl: "https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["AI", "Machine Learning", "UX"],
    engagement: 87
  },
  {
    id: "5",
    title: "WebGL & Three.js : créer des expériences 3D immersives",
    description: "Techniques avancées pour intégrer des éléments 3D interactifs dans vos applications web modernes.",
    createdAt: "Il y a 2 jours",
    responseCount: 9,
    viewCount: 1876,
    likes: 145,
    category: "3D/WebGL",
    status: "popular",
    priority: "medium",
    author: "David 3D",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    thumbnailUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["3D", "WebGL", "Interactive"],
    engagement: 91
  }
];

const analytics = {
  totalQuestions: 847,
  totalResponses: 12438,
  totalViews: 156720,
  activeUsers: 2847,
  avgEngagement: "94%",
  growthRate: "+127%"
};

const FlickCard = ({ question }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Harmonisation avec les couleurs du hero (bleu, violet, teal)
  const statusConfig = {
    trending: { 
      gradient: "from-blue-500 via-purple-500 to-indigo-600", 
      badge: "🔥 Trending",
      glow: "shadow-blue-500/25"
    },
    hot: { 
      gradient: "from-purple-500 via-blue-500 to-cyan-500", 
      badge: "⚡ Hot",
      glow: "shadow-purple-500/25"
    },
    featured: { 
      gradient: "from-indigo-500 via-blue-500 to-purple-600", 
      badge: "⭐ Featured",
      glow: "shadow-indigo-500/25"
    },
    new: { 
      gradient: "from-emerald-500 via-teal-500 to-cyan-500", 
      badge: "✨ New",
      glow: "shadow-emerald-500/25"
    },
    popular: { 
      gradient: "from-blue-500 via-cyan-500 to-teal-500", 
      badge: "💎 Popular",
      glow: "shadow-blue-500/25"
    }
  };

  const config = statusConfig[question.status] || statusConfig.new;

  return (
    <div 
      className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 border border-white/30 ${config.glow} hover:shadow-2xl hover:shadow-current/10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}>
        <div className="absolute inset-[2px] bg-white/95 backdrop-blur-xl rounded-3xl" />
      </div>

      <div className="relative">
        {/* Thumbnail avec effets avancés */}
        <div className="relative aspect-video overflow-hidden rounded-t-3xl">
          <img 
            src={question.thumbnailUrl} 
            alt={question.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay harmonisé */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-40`} />
          
          {/* Particules flottantes */}
          {isHovered && (
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Play button avec glow effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className={`bg-gradient-to-r ${config.gradient} p-4 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer relative`}>
              <Play className="h-6 w-6 text-white fill-white" />
              <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full animate-ping opacity-30`} />
            </div>
          </div>

          {/* Status badge avec animation */}
          <div className="absolute top-4 left-4">
            <div className={`bg-gradient-to-r ${config.gradient} px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm animate-pulse`}>
              {config.badge}
            </div>
          </div>

          {/* Engagement score */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium">
            {question.engagement}% 📈
          </div>

          {/* Actions flottantes */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all">
              <Share className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content avec design premium */}
        <div className="p-6 relative">
          {/* Author info */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={question.avatarUrl} 
              alt={question.author}
              className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{question.author}</p>
              <p className="text-xs text-gray-500">{question.createdAt}</p>
            </div>
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Category avec couleurs harmonisées */}
          <div className="mb-3">
            <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
              {question.category}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all text-lg">
            {question.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {question.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100">
                #{tag}
              </span>
            ))}
          </div>

          {/* Enhanced stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Eye className="h-4 w-4" />
                <span className="font-semibold">{question.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <MessageSquare className="h-4 w-4" />
                <span className="font-semibold">{question.responseCount}</span>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="h-4 w-4" />
                <span className="font-semibold">{question.likes}</span>
              </div>
            </div>
            <div className={`text-xs font-bold text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text`}>
              {question.engagement}% engagement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtitle, change, icon: Icon, gradient, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = parseInt(value.replace(/\D/g, '')) / 50;
      const counter = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= parseInt(value.replace(/\D/g, ''))) {
            clearInterval(counter);
            return parseInt(value.replace(/\D/g, ''));
          }
          return Math.floor(next);
        });
      }, 20);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`relative bg-gradient-to-br ${gradient} p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden group`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
          {change && (
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
              <ArrowUp className="h-3 w-3 text-white" />
              <span className="text-xs font-bold text-white">{change}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-3xl font-black text-white mb-1">
            {typeof value === 'string' && value.includes('%') 
              ? value 
              : count.toLocaleString()
            }
          </h3>
          <p className="text-white/80 font-semibold text-sm mb-1">{title}</p>
          {subtitle && <p className="text-white/60 text-xs">{subtitle}</p>}
        </div>
      </div>

      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10`} />
    </div>
  );
};

export default function FlickAskDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredQuestions = questions.filter(
    question => 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredByTab = (tab) => {
    switch(tab) {
      case "trending":
        return filteredQuestions.filter(q => q.status === "trending" || q.status === "hot");
      case "featured":
        return filteredQuestions.filter(q => q.status === "featured");
      case "new":
        return filteredQuestions.filter(q => q.status === "new");
      default:
        return filteredQuestions;
    }
  };

  const tabs = [
    { id: "all", label: "Tout", icon: Sparkles, count: filteredQuestions.length },
    { id: "trending", label: "Tendances", icon: TrendingUp, count: filteredQuestions.filter(q => q.status === "trending" || q.status === "hot").length },
    { id: "featured", label: "À la une", icon: Star, count: filteredQuestions.filter(q => q.status === "featured").length },
    { id: "new", label: "Nouveautés", icon: Zap, count: filteredQuestions.filter(q => q.status === "new").length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background harmonisé avec le hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-400/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-bl from-indigo-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header premium avec couleurs harmonisées */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Premium search avec couleurs du hero */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher dans FlickAsk..."
                  className="pl-12 pr-6 py-4 bg-transparent text-gray-800 placeholder-gray-500 rounded-2xl outline-none w-full sm:w-96 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-6 py-4 bg-white/70 hover:bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 transition-all text-gray-700 font-medium group shadow-lg">
              <Filter className="h-5 w-5 group-hover:rotate-12 transition-transform text-blue-600" />
              <span>Filtres</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Analytics avec couleurs harmonisées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <MetricCard
            title="Questions créatives"
            value={analytics.totalQuestions}
            subtitle="Cette semaine"
            change="+47%"
            icon={Video}
            gradient="from-blue-500 via-purple-500 to-indigo-600"
            delay={0}
          />
          <MetricCard
            title="Réponses inspirantes"
            value={analytics.totalResponses}
            subtitle="Communauté active"
            change="+89%"
            icon={MessageSquare}
            gradient="from-purple-500 via-blue-500 to-cyan-500"
            delay={200}
          />
          <MetricCard
            title="Vues totales"
            value={analytics.totalViews}
            subtitle="Impact global"
            change={analytics.growthRate}
            icon={Eye}
            gradient="from-emerald-500 via-teal-500 to-cyan-500"
            delay={400}
          />
        </div>

        {/* Tabs avec couleurs harmonisées */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-xl rounded-2xl p-2 mb-6 sm:mb-0 border border-white/20 shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all font-semibold ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    activeTab === tab.id ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {getFilteredByTab(activeTab).map((question, index) => (
            <div
              key={question.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in-up"
            >
              <FlickCard question={question} />
            </div>
          ))}
        </div>

        {/* Premium empty state avec couleurs harmonisées */}
        {getFilteredByTab(activeTab).length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
              <Sparkles className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Aucune question trouvée
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Explorez d'autres catégories ou créez la première question de cette section !
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
}