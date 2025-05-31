// components/QuestionCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Video } from 'lucide-react';

type QuestionCardProps = {
  id: string | number;
  title: string;
  description: string;
  createdAt: string;
  responseCount: number;
  thumbnailUrl?: string;
};

export default function QuestionCard({
  id,
  title,
  description,
  createdAt,
  responseCount,
  thumbnailUrl,
}: QuestionCardProps) {
  return (
    <Link href={`/question/${id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Video className="h-16 w-16 text-blue-500/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{createdAt}</span>
            <span className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
              {responseCount} réponse{responseCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
