"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, User, ArrowLeft, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/shared/VideoPlayer";
import ResponseOptions from "@/components/answer/ResponseOptions";

type ResponseType = "video" | "audio" | "text" | null;

export default function AnswerPage() {
  const params = useParams();
  const router = useRouter();
  const [hasResponded, setHasResponded] = useState(false);
  const [responseType, setResponseType] = useState<ResponseType>(null);

  // Mock question data
  const question = {
    id: params.id,
    title: "Comment configurer un environnement de développement Next.js ?",
    description: "Je débute avec Next.js et j'aimerais comprendre comment configurer correctement l'environnement de développement pour un projet professionnel. Quelles sont les meilleures pratiques et les outils recommandés ?",
    createdAt: "Il y a 2 heures",
    user: "Marie Dubois",
    videoUrl: "/mock-video.mp4", // This would be a real video URL in production
    posterUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  };

  const handleSubmitResponse = (type: ResponseType, content?: string) => {
    setResponseType(type);
    setHasResponded(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8 flex items-center"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour à l'accueil
      </Button>

      {!hasResponded ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{question.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{question.user}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{question.createdAt}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{question.description}</p>
            
            <div className="bg-gray-50 p-1 rounded-xl">
              <VideoPlayer
                src={question.videoUrl}
                poster={question.posterUrl}
                className="aspect-video rounded-lg overflow-hidden"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Répondre à cette question</h2>
            <ResponseOptions onSubmit={handleSubmitResponse} />
          </div>
        </>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Merci pour votre réponse !</h2>
          <p className="text-gray-600 mb-6">
            {responseType === "video" && "Votre réponse vidéo a été envoyée avec succès."}
            {responseType === "audio" && "Votre réponse audio a été envoyée avec succès."}
            {responseType === "text" && "Votre réponse textuelle a été envoyée avec succès."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              onClick={() => router.push("/")}
            >
              Retour à l'accueil
            </Button>
            <Button
              variant="outline"
              onClick={() => setHasResponded(false)}
            >
              Donner une autre réponse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}