import Link from "next/link";
import { VideoIcon, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <VideoIcon className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">FlickAsk</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Posez vos questions en vidéo et obtenez des réponses humaines.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/ask" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Poser une question
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <a href="mailto:contact@flickask.com" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  contact@flickask.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-600" />
                <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                  Assistance en ligne
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} FlickAsk. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}