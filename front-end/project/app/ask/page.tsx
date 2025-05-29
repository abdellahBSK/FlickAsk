"use client";

import { useState } from "react";
import { Share, Link, Check, Sparkles, Video, FileText, Send } from "lucide-react";

import VideoRecorder from "@/components/ask/VideoRecorder";
export default function AskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const questionId = Math.random().toString(36).substring(2, 10);
      const link = `${window.location.origin}/answer/${questionId}`;
      
      setGeneratedLink(link);
      setIsShared(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    }
  };

  const isFormValid = title.trim() !== "" && videoFile !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 mb-6 shadow-lg">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Nouvelle expérience</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Posez votre question
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enregistrez votre question en vidéo et partagez-la pour obtenir des réponses personnalisées de la communauté.
          </p>
        </div>
        
        {!isShared ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
            <div onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <label htmlFor="title" className="text-lg font-semibold text-gray-800">
                    Titre de votre question <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    placeholder="Ex: Comment configurer un environnement de développement React ?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
                </div>
              </div>
              
              {/* Video Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-gray-800">
                    Votre vidéo <span className="text-red-500">*</span>
                  </label>
                </div>
                <VideoRecorder onVideoSelected={setVideoFile} />
              </div>
              
              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <label htmlFor="description" className="text-lg font-semibold text-gray-800">
                    Description (optionnel)
                  </label>
                </div>
                <textarea
                  id="description"
                  placeholder="Ajoutez plus de détails à votre question..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2 justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Création en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Partager ma question</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-3xl p-8 md:p-12 text-center shadow-2xl backdrop-blur-sm">
            <div className="relative">
              {/* Success animation */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <Share className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-3 text-gray-800">Votre question a été partagée !</h2>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                Utilisez le lien ci-dessous pour partager votre question et recevoir des réponses.
              </p>
              
              {/* Link sharing section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-xl mx-auto shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Link className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Lien de partage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      value={generatedLink || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                  >
                    {linkCopied ? (
                      <Check className="h-4 w-4 text-green-200" />
                    ) : (
                      <Link className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {linkCopied && (
                  <div className="mt-2 text-sm text-green-600 font-medium animate-fade-in">
                    ✓ Lien copié dans le presse-papiers !
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open(generatedLink || "/", "_blank")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Voir ma question
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Poser une autre question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}