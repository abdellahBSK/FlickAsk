"use client";

import { useState } from "react";
import { Share, Link, Check, Sparkles, Video, FileText, Send, Camera, StopCircle, Play, AlertCircle, Save } from "lucide-react";

// Configuration API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Service API
const apiService = {
  async createVideoAskForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/upload`, {
        method: 'POST',
        body: formData, // FormData pour l'upload de fichier
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// Simple VideoRecorder component
function VideoRecorder({ onVideoSelected, error }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validation du fichier - Ajusté pour correspondre au backend (500MB max)
      const maxSize = 500 * 1024 * 1024; // 500MB comme dans le backend
      const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      
      if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. Taille maximale: 500MB');
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert('Format de fichier non supporté. Utilisez MP4, WebM, OGG ou MOV');
        return;
      }

      setHasVideo(true);
      setVideoPreview(URL.createObjectURL(file));
      onVideoSelected(file);
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasVideo(true);
      // Simulate a recorded video
      const mockFile = new File(["video"], "recorded-video.mp4", { type: "video/mp4" });
      onVideoSelected(mockFile);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className={`w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'} flex items-center justify-center overflow-hidden`}>
          {isRecording ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <p className="text-gray-600 font-medium">Enregistrement en cours...</p>
            </div>
          ) : hasVideo ? (
            <div className="text-center">
              {videoPreview ? (
                <video 
                  src={videoPreview} 
                  controls 
                  className="max-h-full max-w-full rounded-lg"
                />
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-green-600 font-medium">Vidéo enregistrée avec succès !</p>
                </>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">Aucune vidéo sélectionnée</p>
              <p className="text-sm text-gray-400">Cliquez sur un bouton ci-dessous pour commencer</p>
            </div>
          )}
        </div>
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={simulateRecording}
          disabled={isRecording}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
        >
          {isRecording ? (
            <>
              <StopCircle className="h-4 w-4" />
              Arrêter l'enregistrement
            </>
          ) : (
            <>
              <Camera className="h-4 w-4" />
              Enregistrer une vidéo
            </>
          )}
        </button>
        
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 cursor-pointer">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Video className="h-4 w-4" />
          Importer une vidéo
        </label>
      </div>
    </div>
  );
}

export default function AskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState("published"); // NEW: Status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Status options matching your enum
  const statusOptions = [
    { value: 'draft', label: 'Brouillon', description: 'Sauvegarder sans publier', icon: Save },
    { value: 'published', label: 'Publié', description: 'Visible par tous', icon: Share },
    { value: 'archived', label: 'Archivé', description: 'Masqué mais conservé', icon: FileText }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!title.trim()) {
      errors.title = "Le titre est requis";
    }
    
    if (!videoFile) {
      errors.video = "Une vidéo est requise";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (submitStatus = status) => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Créer FormData pour l'upload - Adapté pour correspondre au backend
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', videoFile); // Le backend attend 'video'
      
      // Convertir isPublic en string car FormData ne gère que les strings
      formData.append('isPublic', isPublic.toString());
      formData.append('status', submitStatus); // Use the correct status enum value
      
      // Traiter les tags - Convertir en array puis en JSON string
      if (tags.trim()) {
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        formData.append('tags', JSON.stringify(tagArray));
      } else {
        formData.append('tags', JSON.stringify([]));
      }
      
      // Paramètres par défaut - Convertir en JSON string
      const defaultSettings = {
        allowAnonymous: true,
        moderateAnswers: false,
        notifyOnAnswer: true
      };
      formData.append('settings', JSON.stringify(defaultSettings));

      // Debug: Afficher le contenu du FormData
      console.log('FormData content:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Appel API
      const response = await apiService.createVideoAskForm(formData);
      
      if (response.success) {
        // Générer le lien de partage avec l'ID retourné par le backend
        const questionId = response.data._id || response.data.id || Math.random().toString(36).substring(2, 10);
        const link = `${window.location.origin}/answer/${questionId}`;
        
        setGeneratedLink(link);
        setIsShared(true);
        
        // Optionnel: Log de succès
        console.log('Form created successfully:', response.data);
      } else {
        throw new Error(response.message || 'Erreur lors de la création');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // Améliorer la gestion des erreurs
      let errorMessage = 'Une erreur est survenue lors de l\'envoi';
      
      if (error.message.includes('413')) {
        errorMessage = 'Le fichier vidéo est trop volumineux (max 500MB)';
      } else if (error.message.includes('400')) {
        errorMessage = 'Données invalides. Vérifiez tous les champs requis.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Message d'erreur global */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-8">
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
                <div className="relative group">
                  <input
                    id="title"
                    type="text"
                    placeholder="Ex: Comment configurer un environnement de développement React ?"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (formErrors.title) {
                        setFormErrors(prev => ({ ...prev, title: null }));
                      }
                    }}
                    required
                    className={`w-full px-4 py-4 bg-white/80 border ${formErrors.title ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400`}
                  />
                  {formErrors.title && (
                    <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      <span>{formErrors.title}</span>
                    </div>
                  )}
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
                <VideoRecorder 
                  onVideoSelected={(file) => {
                    setVideoFile(file);
                    if (formErrors.video) {
                      setFormErrors(prev => ({ ...prev, video: null }));
                    }
                  }} 
                  error={formErrors.video}
                />
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

              {/* Tags Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">#</span>
                  </div>
                  <label htmlFor="tags" className="text-lg font-semibold text-gray-800">
                    Tags (optionnel)
                  </label>
                </div>
                <input
                  id="tags"
                  type="text"
                  placeholder="Ex: react, javascript, développement (séparés par des virgules)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400"
                />
              </div>

              {/* Status Section - NEW */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Share className="h-4 w-4 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-gray-800">
                    Statut de publication
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {statusOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                          status === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white/80 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={status === option.value}
                          onChange={(e) => setStatus(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            status === option.value
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{option.label}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    Rendre cette question publique
                  </span>
                </label>
                <p className="text-sm text-gray-500 ml-8">
                  Les questions publiques peuvent être vues par tous les utilisateurs
                </p>
              </div>
              
              {/* Submit Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                {/* Save as Draft Button */}
                <button
                  type="button"
                  onClick={() => handleSubmit('draft')}
                  disabled={!isFormValid || isSubmitting}
                  className="group relative px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2 justify-center">
                    <Save className="h-5 w-5" />
                    <span>Sauvegarder brouillon</span>
                  </div>
                </button>

                {/* Publish Button */}
                <button
                  type="button"
                  onClick={() => handleSubmit('published')}
                  disabled={!isFormValid || isSubmitting}
                  className="group relative flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
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
                        <span>Publier ma question</span>
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