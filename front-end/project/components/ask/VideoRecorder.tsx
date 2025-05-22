"use client";

import { useState } from "react";
import { Video, Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoRecorderProps {
  onVideoSelected: (file: File | null) => void;
}

export default function VideoRecorder({ onVideoSelected }: VideoRecorderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onVideoSelected(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Clean up preview URL when component unmounts
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
    
    // Mock a recorded video by using a placeholder
    const mockVideoUrl = "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    setPreviewUrl(mockVideoUrl);
    
    // Create a mock File object
    const mockFile = new File([""], "mock-recording.mp4", { type: "video/mp4" });
    setSelectedFile(mockFile);
    onVideoSelected(mockFile);
    
    // Reset recording time
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
    <div className="w-full">
      {!selectedFile && !isRecording ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <div className="mb-4 flex flex-col items-center justify-center space-y-2">
            <Video className="h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium">Enregistrer ou télécharger une vidéo</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Enregistrez directement votre question ou téléchargez un fichier vidéo existant
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button 
              onClick={startMockRecording}
              variant="default"
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Enregistrer maintenant
            </Button>
            
            <div className="relative">
              <Button 
                variant="outline"
                className="flex items-center gap-2 relative"
              >
                <Upload className="h-4 w-4" />
                Télécharger un fichier
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
            </div>
          </div>
        </div>
      ) : isRecording ? (
        <div className="border-2 border-red-500 rounded-lg p-8 text-center bg-red-50">
          <div className="mb-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4 animate-pulse">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium">Enregistrement en cours...</h3>
            <div className="mt-2 text-2xl font-semibold">{formatTime(recordingTime)}</div>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={stopMockRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Terminer l'enregistrement
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-green-500 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-green-600 flex items-center">
              <Check className="h-5 w-5 mr-1" />
              Vidéo prête
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetRecording}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Video preview"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/60 p-3">
                <Video className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-500">
            {selectedFile?.name || "video-question.mp4"} - {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : "2.5"} MB
          </div>
        </div>
      )}
    </div>
  );
}