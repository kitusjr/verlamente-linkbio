'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Play, Clock, Users, Star, Check, Menu, BookOpen, Target, TrendingUp, DollarSign } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import BannerLaunch from '@/components/BannerLaunch';

export default function CreatorLabPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Curso Disponible</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Creator Lab
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Aprende las estrategias más efectivas para crear contenido de valor, construir una audiencia leal y monetizar tu pasión.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Ver Preview</span>
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Comprar Ahora - $97
              </button>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <Clock className="w-5 h-5" />
                <span>2 horas de contenido</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <Users className="w-5 h-5" />
                <span>1,250+ estudiantes</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 calificación</span>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Course Image/Video */}
            <div className="relative">
              <div className="aspect-video bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/logopng.png"
                  alt="Creator Lab Course"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">¿Qué aprenderás?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Estrategias para crear contenido de valor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Cómo construir una audiencia leal</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Métodos de monetización efectivos</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Herramientas y recursos profesionales</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Casos de estudio reales</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-3">Incluye:</h4>
                <ul className="space-y-2 text-white/70">
                  <li>• 2 horas de video HD</li>
                  <li>• Materiales descargables</li>
                  <li>• Acceso de por vida</li>
                  <li>• Certificado de finalización</li>
                  <li>• Soporte en español</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enfoque Práctico</h3>
              <p className="text-white/70">Estrategias que puedes implementar inmediatamente</p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Comprobados</h3>
              <p className="text-white/70">Métodos probados por creadores exitosos</p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Monetización</h3>
              <p className="text-white/70">Aprende a generar ingresos con tu contenido</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-xl text-white/70 mb-8">
              Únete a más de 1,250 creadores que ya están monetizando su pasión
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                Comprar Ahora - $97
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Ver Preview Gratis
              </button>
            </div>
            <p className="text-sm text-white/50 mt-4">
              Garantía de 30 días • Acceso inmediato • Sin compromisos
            </p>
          </div>

          {/* Related Courses */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">Otros Cursos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CourseCard
                title="Marketing Digital Avanzado"
                description="Domina las estrategias más avanzadas de marketing digital para hacer crecer tu negocio."
                duration="3 horas"
                students={890}
                rating={4.8}
                price="$147"
                image="/assets/logopng.png"
                href="#"
                level="Avanzado"
                category="Marketing"
              />
              <CourseCard
                title="Creación de Contenido"
                description="Aprende a crear contenido atractivo y profesional que conecte con tu audiencia."
                duration="1.5 horas"
                students={650}
                rating={4.7}
                price="$67"
                image="/assets/logopng.png"
                href="#"
                level="Principiante"
                category="Contenido"
              />
              <CourseCard
                title="Monetización de Redes"
                description="Descubre cómo monetizar tus redes sociales y generar ingresos pasivos."
                duration="2.5 horas"
                students={420}
                rating={4.9}
                price="$97"
                image="/assets/logopng.png"
                href="#"
                level="Intermedio"
                category="Monetización"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Banner Launch */}
      <BannerLaunch />
    </div>
  );
}
