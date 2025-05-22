import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VideoIcon, MicIcon, MessageSquare } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-100/60 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Posez vos questions <span className="text-blue-500">en vidéo</span>, obtenez des réponses humaines
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              FlickAsk vous permet d'enregistrer et de partager vos questions en vidéo, 
              et de recevoir des réponses personnalisées en vidéo, audio ou texte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full text-base">
                <Link href="/ask">
                  Commencer
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="rounded-full text-base">
                <Link href="#how-it-works">
                  Comment ça marche
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative z-10 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-100 flex items-center justify-center h-64">
                  <VideoIcon className="h-16 w-16 text-blue-500/50" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium mb-2">Comment utiliser notre produit ?</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    J'aimerais savoir comment je peux tirer le meilleur parti de votre solution...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Il y a 2 heures</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      3 réponses
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -right-5 transform rotate-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                <VideoIcon className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute -top-5 -left-5 transform -rotate-12 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                <MicIcon className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 rotate-12 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg shadow-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}