'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star, Play } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  isNew?: boolean;
  isPopular?: boolean;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  duration,
  students,
  rating,
  price,
  originalPrice,
  image,
  href,
  isNew = false,
  isPopular = false,
  level,
  category,
}) => {
  const levelColors = {
    'Principiante': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermedio': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Avanzado': 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
            Nuevo
          </span>
        )}
        {isPopular && (
          <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full border border-orange-500/30">
            Popular
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60 font-medium">{category}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${levelColors[level]}`}>
            {level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{price}</span>
            {originalPrice && (
              <span className="text-lg text-white/50 line-through">{originalPrice}</span>
            )}
          </div>
          <Link
            href={href}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            Ver curso
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
