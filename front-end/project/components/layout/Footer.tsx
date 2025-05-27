import Link from "next/link";
import { VideoIcon, Mail, MessageSquare, ArrowRight, MapPin, Phone, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <VideoIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                FlickAsk
              </h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
              Posez vos questions en vidéo et obtenez des réponses humaines authentiques. 
              Connectez-vous avec une communauté d'experts passionnés.
            </p>
            
            {/* Social media */}
            <div className="flex gap-4 mb-8">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" }
              ].map(({ icon: Icon, href, label }) => (
                <Link 
                  key={label}
                  href={href} 
                  className="bg-slate-800/50 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>

            {/* Newsletter signup */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Newsletter</h3>
              <p className="text-slate-400 text-sm mb-4">Restez informé des dernières nouveautés</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-blue-300 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              Liens rapides
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Accueil" },
                { href: "/ask", label: "Poser une question" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/explore", label: "Explorer" },
                { href: "/community", label: "Communauté" },
                { href: "/help", label: "Aide" }
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link 
                    href={href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group hover:translate-x-2"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-blue-300 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-300 group-hover:text-blue-400 transition-colors">
                    contact@flickask.com
                  </p>
                  <p className="text-slate-500 text-sm">Support général</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-300 group-hover:text-blue-400 transition-colors">
                    +33 1 23 45 67 89
                  </p>
                  <p className="text-slate-500 text-sm">Support téléphonique</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-300 group-hover:text-blue-400 transition-colors">
                    Chat en direct
                  </p>
                  <p className="text-slate-500 text-sm">Assistance immédiate</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer group">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-300 group-hover:text-blue-400 transition-colors">
                    24h/7j
                  </p>
                  <p className="text-slate-500 text-sm">Disponibilité</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} FlickAsk. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm text-slate-400">
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Politique de confidentialité
                </Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Conditions d'utilisation
                </Link>
                <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>Fait avec ❤️ en France</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
}