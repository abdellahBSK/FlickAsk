import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import QuestionCard from "@/components/shared/QuestionCard";

const recentQuestions = [
  {
    id: "1",
    title: "Comment configurer un environnement de développement Next.js ?",
    description: "Je voudrais savoir comment installer et configurer correctement un environnement de développement pour commencer avec Next.js.",
    createdAt: "Il y a 2 heures",
    responseCount: 3,
    thumbnailUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "2",
    title: "Conseils pour améliorer mes compétences en design UX/UI ?",
    description: "Je travaille en tant que développeur front-end depuis 2 ans et j'aimerais améliorer mes compétences en design. Quels conseils pourriez-vous me donner ?",
    createdAt: "Il y a 1 jour",
    responseCount: 5,
    thumbnailUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "3",
    title: "Comment gérer l'authentification dans une application React ?",
    description: "Je cherche la meilleure approche pour implémenter un système d'authentification dans mon application React. Quelles sont les meilleures pratiques ?",
    createdAt: "Il y a 3 jours",
    responseCount: 2,
    thumbnailUrl: "https://images.pexels.com/photos/8761744/pexels-photo-8761744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <FeatureSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Questions récentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les dernières questions posées par notre communauté et rejoignez la conversation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                description={question.description}
                createdAt={question.createdAt}
                responseCount={question.responseCount}
                thumbnailUrl={question.thumbnailUrl}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="/ask"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Poser votre propre question
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à poser votre première question ?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Rejoignez des milliers d'utilisateurs qui utilisent FlickAsk pour obtenir des réponses personnalisées à leurs questions.
          </p>
          
          <a
            href="/ask"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            Commencer maintenant
          </a>
        </div>
      </section>
    </div>
  );
}