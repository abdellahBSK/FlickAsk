import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Clock, User, ExternalLink } from "lucide-react";

interface QuestionCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  responseCount: number;
  thumbnailUrl?: string;
  isAdminView?: boolean;
}

export default function QuestionCard({
  id,
  title,
  description,
  createdAt,
  responseCount,
  thumbnailUrl = "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  isAdminView = false
}: QuestionCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image 
          src={thumbnailUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{createdAt}</span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {responseCount} réponses
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {isAdminView ? (
          <div className="w-full flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Link href={`/admin/questions/${id}`} className="flex items-center w-full justify-center">
                <User className="h-4 w-4 mr-1" />
                Détails
              </Link>
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              <Link href={`/answer/${id}`} className="flex items-center w-full justify-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                Répondre
              </Link>
            </Button>
          </div>
        ) : (
          <Button asChild variant="default" size="sm" className="w-full">
            <Link href={`/answer/${id}`}>
              Voir la question
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}