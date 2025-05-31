"use client";

import { useState } from "react";
import { Video, Upload, X, Check, Play, Pause } from "lucide-react";

interface VideoRecorderProps {
  onVideoSelected: (file: File | null) => void;
}

export default function VideoRecorder({ onVideoSelected }: VideoRecorderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onVideoSelected(file);
      
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const startMockRecording = () => {
    setIsRecording(true);
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
    
    const mockVideoUrl = "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    setPreviewUrl(mockVideoUrl);
    
    const mockFile = new File([""], "mock-recording.mp4", { type: "video/mp4" });
    setSelectedFile(mockFile);
    onVideoSelected(mockFile);
    
    setRecordingTime(0);
  };

  const resetRecording = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onVideoSelected(null);
    setRecordingTime(0);
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile && !isRecording ? (
        <div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full transition-transform duration-700 ${isHovered ? 'scale-150 rotate-12' : 'scale-100 rotate-0'}`}></div>
            <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full transition-transform duration-700 delay-75 ${isHovered ? 'scale-125 -rotate-12' : 'scale-100 rotate-0'}`}></div>
          </div>
          
          <div className="relative p-12 text-center">
            <div className="mb-8 flex flex-col items-center justify-center space-y-4">
              <div className={`relative transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Video className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Créez votre vidéo
                </h3>
                <p className="text-slate-600 max-w-md leading-relaxed">
                  Enregistrez directement votre question ou importez un fichier existant pour commencer
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <button 
                onClick={startMockRecording}
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <Video className="h-5 w-5" />
                  <span>Enregistrer maintenant</span>
                </div>
              </button>
              
              <div className="relative group">
                <button className="relative overflow-hidden bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 active:scale-95 hover:text-blue-600">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5" />
                    <span>Télécharger un fichier</span>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : isRecording ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 animate-pulse"></div>
          
          <div className="relative p-12 text-center">
            <div className="mb-8 flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-30 animate-ping"></div>
                <div className="relative w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Video className="h-12 w-12 text-white" />
                </div>
                {/* Recording indicator dots */}
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping animation-delay-75"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping animation-delay-150"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-red-600 mb-4">Enregistrement en cours...</h3>
              <div className="inline-flex items-center bg-black/90 text-white px-6 py-3 rounded-full font-mono text-2xl font-bold shadow-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                {formatTime(recordingTime)}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                onClick={stopMockRecording}
                className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5" />
                  <span>Terminer l'enregistrement</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Vidéo prête à l'envoi</h3>
              </div>
              <button 
                onClick={resetRecording}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden shadow-inner group">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Video preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-8 w-8 text-slate-700 ml-0.5" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                ✓ Prêt
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-slate-600">
                <span className="font-medium">{selectedFile?.name || "video-question.mp4"}</span>
              </div>
              <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : "2.5"} MB
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}