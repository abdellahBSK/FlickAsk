"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Video, Mic, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

  const handleVideoRecording = () => {
    setSelectedType("video");
    if (!isRecording) {
      startMockRecording();
    } else {
      stopMockRecording();
    }
  };

  const handleAudioRecording = () => {
    setSelectedType("audio");
    if (!isRecording) {
      startMockRecording();
    } else {
      stopMockRecording();
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
    setRecordingTime(0);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedType === "text") {
        onSubmit(selectedType, textResponse);
      } else {
        onSubmit(selectedType);
      }
      setIsSubmitting(false);
      // Reset after submit
      setSelectedType(null);
      setTextResponse("");
      setRecordingTime(0);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex border-b">
          <Tab
            className={({ selected }) =>
              cn(
                "flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center",
                "focus:outline-none transition-colors",
                selected
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )
            }
            onClick={() => setSelectedType("video")}
          >
            <Video className="h-4 w-4 mr-2" />
            Vidéo
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center",
                "focus:outline-none transition-colors",
                selected
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )
            }
            onClick={() => setSelectedType("audio")}
          >
            <Mic className="h-4 w-4 mr-2" />
            Audio
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center",
                "focus:outline-none transition-colors",
                selected
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )
            }
            onClick={() => setSelectedType("text")}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Texte
          </Tab>
        </Tab.List>
        <Tab.Panels className="p-6">
          <Tab.Panel>
            <div className="text-center">
              {isRecording ? (
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Enregistrement vidéo en cours...</h3>
                  <div className="mt-2 text-2xl font-semibold">{formatTime(recordingTime)}</div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">Enregistrer une réponse vidéo</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Cliquez sur le bouton ci-dessous pour commencer l'enregistrement
                  </p>
                </div>
              )}
              
              <Button
                variant={isRecording ? "destructive" : "default"}
                className="w-full sm:w-auto"
                onClick={handleVideoRecording}
              >
                {isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
              </Button>
              
              {selectedType === "video" && !isRecording && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-600 text-sm mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Vidéo enregistrée avec succès !</span>
                  </div>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma réponse vidéo"}
                  </Button>
                </div>
              )}
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div className="text-center">
              {isRecording ? (
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Enregistrement audio en cours...</h3>
                  <div className="mt-2 text-2xl font-semibold">{formatTime(recordingTime)}</div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Mic className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">Enregistrer une réponse audio</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Cliquez sur le bouton ci-dessous pour commencer l'enregistrement
                  </p>
                </div>
              )}
              
              <Button
                variant={isRecording ? "destructive" : "default"}
                className="w-full sm:w-auto"
                onClick={handleAudioRecording}
              >
                {isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
              </Button>
              
              {selectedType === "audio" && !isRecording && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center text-amber-600 text-sm mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Audio enregistré avec succès !</span>
                  </div>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma réponse audio"}
                  </Button>
                </div>
              )}
            </div>
          </Tab.Panel>
          
          <Tab.Panel>
            <div>
              <div className="mb-4">
                <label htmlFor="text-response" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre réponse textuelle
                </label>
                <Textarea
                  id="text-response"
                  placeholder="Tapez votre réponse ici..."
                  className="min-h-32"
                  value={textResponse}
                  onChange={(e) => setTextResponse(e.target.value)}
                />
              </div>
              
              <Button
                variant="default"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting || !textResponse.trim()}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma réponse textuelle"}
              </Button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}