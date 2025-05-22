"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <VideoIcon className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">FlickAsk</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Accueil
          </Link>
          <Link href="/ask" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Poser une question
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="default" size="sm">
            <Link href="/ask">
              Commencer
            </Link>
          </Button>
          
          <button 
            className="block md:hidden"
            aria-label="Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}