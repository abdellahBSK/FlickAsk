import { VideoIcon, Share2, MessageSquare, Users } from "lucide-react";

const features = [
  {
    icon: <VideoIcon className="h-10 w-10 text-blue-500" />,
    title: "Questions en vidéo",
    description: "Enregistrez votre question en vidéo pour une communication plus claire et personnelle."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-green-500" />,
    title: "Réponses multiformat",
    description: "Recevez des réponses en vidéo, audio ou texte, selon les préférences du répondant."
  },
  {
    icon: <Share2 className="h-10 w-10 text-amber-500" />,
    title: "Partage facile",
    description: "Partagez vos questions avec un lien unique et recevez des réponses de n'importe qui."
  },
  {
    icon: <Users className="h-10 w-10 text-purple-500" />,
    title: "Dashboard administrateur",
    description: "Gérez toutes vos questions et réponses depuis un tableau de bord intuitif."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une approche simple et intuitive pour obtenir des réponses à vos questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full bg-gray-50 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-blue-100/50 text-blue-500 font-medium text-sm mb-2">
            <span className="px-3 py-1">Simple en 3 étapes</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-8 max-w-4xl mx-auto">
            <div className="flex-1 flex flex-col items-center">
              <div className="rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-lg font-semibold mb-4">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Enregistrez votre question</h3>
              <p className="text-gray-600 text-center">
                Utilisez notre interface pour enregistrer votre question en vidéo.
              </p>
            </div>
            
            <div className="w-px h-16 md:w-16 md:h-px bg-gray-200 self-center"></div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-lg font-semibold mb-4">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">Partagez le lien</h3>
              <p className="text-gray-600 text-center">
                Obtenez un lien unique et partagez-le avec les personnes concernées.
              </p>
            </div>
            
            <div className="w-px h-16 md:w-16 md:h-px bg-gray-200 self-center"></div>
            
            <div className="flex-1 flex flex-col items-center">
              <div className="rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-lg font-semibold mb-4">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Recevez des réponses</h3>
              <p className="text-gray-600 text-center">
                Consultez les réponses en vidéo, audio ou texte dans votre dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}