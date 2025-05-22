"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShareIcon, LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VideoRecorder from "@/components/ask/VideoRecorder";

export default function AskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to upload video and create question
    setTimeout(() => {
      // Generate a random ID for the question
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Posez votre question</h1>
        <p className="text-gray-600">
          Enregistrez votre question en vidéo et partagez-la pour obtenir des réponses personnalisées.
        </p>
      </div>
      
      {!isShared ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre de votre question <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="Ex: Comment configurer un environnement de développement React ?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Votre vidéo <span className="text-red-500">*</span>
            </label>
            <VideoRecorder onVideoSelected={setVideoFile} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (optionnel)
            </label>
            <Textarea
              id="description"
              placeholder="Ajoutez plus de détails à votre question..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Création en cours..." : "Partager ma question"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShareIcon className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Votre question a été partagée !</h2>
          <p className="text-gray-600 mb-6">
            Utilisez le lien ci-dessous pour partager votre question et recevoir des réponses.
          </p>
          
          <div className="flex items-center mb-6 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Input
                value={generatedLink || ""}
                readOnly
                className="pr-12 bg-white"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8"
                onClick={handleCopyLink}
              >
                {linkCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              onClick={() => router.push(generatedLink || "/")}
            >
              Voir ma question
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/ask")}
            >
              Poser une autre question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}