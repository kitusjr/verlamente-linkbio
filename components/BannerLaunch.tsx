'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';

const BannerLaunch: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show banner after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 transform transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm p-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1">
              ¡Nuevo curso disponible!
            </h3>
            <p className="text-white/80 text-sm mb-2">
              Aprende a crear contenido de valor y monetiza tu pasión con nuestro nuevo curso de Creator Lab.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>2 horas de contenido</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Disponible ahora</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
              Ver curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerLaunch;
