"use client";

import { useState } from "react";
import { Video, Mic, MessageSquare, AlertCircle, Send, Sparkles, Activity } from "lucide-react";

type ResponseType = "video" | "audio" | "text" | null;

interface ResponseOptionsProps {
  onSubmit: (type: ResponseType, content?: string) => void;
}

export default function ResponseOptions({ onSubmit }: ResponseOptionsProps) {
  const [selectedType, setSelectedType] = useState<ResponseType>(null);
  const [textResponse, setTextResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecordedContent, setHasRecordedContent] = useState(false);

  const handleVideoRecording = () => {
    setSelectedType("video");
    if (!isRecording) {
      startMockRecording();
    } else {
      stopMockRecording();
      setHasRecordedContent(true);
    }
  };

  const handleAudioRecording = () => {
    setSelectedType("audio");
    if (!isRecording) {
      startMockRecording();
    } else {
      stopMockRecording();
      setHasRecordedContent(true);
    }
  };

  const startMockRecording = () => {
    setIsRecording(true);
    setHasRecordedContent(false);
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
  };

  const stopMockRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
    setRecordingTime(0);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (selectedType === "text") {
        onSubmit(selectedType, textResponse);
      } else {
        onSubmit(selectedType);
      }
      setIsSubmitting(false);
      setSelectedType(null);
      setTextResponse("");
      setRecordingTime(0);
      setHasRecordedContent(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const tabs = [
    { 
      id: "video", 
      label: "Vidéo", 
      icon: Video, 
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200"
    },
    { 
      id: "audio", 
      label: "Audio", 
      icon: Mic, 
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200"
    },
    { 
      id: "text", 
      label: "Texte", 
      icon: MessageSquare, 
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 p-1">
        <div className="flex rounded-xl bg-white/80 backdrop-blur-sm p-1 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedType === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as ResponseType)}
                className={`flex-1 relative px-6 py-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                  isSelected
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105`
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg"></div>
                )}
                <Icon className={`h-4 w-4 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="relative z-10">{tab.label}</span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {selectedType === "video" && (
          <div className="text-center">
            {isRecording ? (
              <div className="space-y-6">
                <div className="relative">
                  {/* Animated rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-red-500/20 animate-ping"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-red-500/30 animate-pulse"></div>
                  </div>
                  
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mx-auto shadow-2xl">
                    <Video className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Recording indicator */}
                  <div className="absolute -top-2 -right-2 flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping animate-delay-75"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping animate-delay-150"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Enregistrement en cours...
                  </h3>
                  <div className="inline-flex items-center bg-black/90 text-white px-6 py-3 rounded-full font-mono text-xl font-bold shadow-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    {formatTime(recordingTime)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Video className="h-10 w-10 text-slate-500" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Créer une réponse vidéo</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Enregistrez votre réponse en vidéo pour une communication plus personnelle et expressive
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <button
                onClick={handleVideoRecording}
                className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isRecording
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-red-500/25'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg hover:shadow-red-500/25'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {isRecording ? "Terminer l'enregistrement" : "Commencer l'enregistrement"}
                </span>
              </button>
            </div>

            {hasRecordedContent && selectedType === "video" && !isRecording && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-center text-green-600 text-sm mb-4">
                  <Sparkles className="h-5 w-5 mr-2" />
                  <span className="font-medium">Vidéo enregistrée avec succès !</span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma réponse vidéo
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {selectedType === "audio" && (
          <div className="text-center">
            {isRecording ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-amber-500/20 animate-ping"></div>
                    <div className="absolute w-24 h-24 rounded-full bg-amber-500/30 animate-pulse"></div>
                  </div>
                  
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto shadow-2xl">
                    <Mic className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Audio waveform visualization */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-amber-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    Enregistrement audio...
                  </h3>
                  <div className="inline-flex items-center bg-black/90 text-white px-6 py-3 rounded-full font-mono text-xl font-bold shadow-lg">
                    <Activity className="w-4 h-4 mr-3 animate-pulse" />
                    {formatTime(recordingTime)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                    <Mic className="h-10 w-10 text-slate-500" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Créer une réponse audio</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Enregistrez votre voix pour transmettre l'émotion et la nuance de votre message
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <button
                onClick={handleAudioRecording}
                className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {isRecording ? "Terminer l'enregistrement" : "Commencer l'enregistrement"}
                </span>
              </button>
            </div>

            {hasRecordedContent && selectedType === "audio" && !isRecording && (
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <div className="flex items-center justify-center text-amber-600 text-sm mb-4">
                  <Sparkles className="h-5 w-5 mr-2" />
                  <span className="font-medium">Audio enregistré avec succès !</span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma réponse audio
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {selectedType === "text" && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Rédigez votre réponse</h3>
                <p className="text-slate-600">
                  Exprimez-vous par écrit avec précision et clarté
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="text-response" className="block text-sm font-medium text-slate-700">
                Votre message
              </label>
              <div className="relative">
                <textarea
                  id="text-response"
                  placeholder="Commencez à taper votre réponse..."
                  className="w-full min-h-32 p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-0 resize-none transition-colors duration-200 bg-slate-50/50 focus:bg-white"
                  value={textResponse}
                  onChange={(e) => setTextResponse(e.target.value)}
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {textResponse.length} caractères
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !textResponse.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer ma réponse
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}