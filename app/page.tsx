'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, Book, Users, Coffee, Search, Instagram, Mic, Package } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import BannerLaunch from '@/components/BannerLaunch';

// Mouse tracking for button hover effects
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
};

// Button hover effect handler
const handleButtonHover = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
};

const subResources = [
  {
    category: 'Clips',
    action: '+2.000 clips',
    shortcut: '⌘1',
    shortcutLabel: 'Clips',
    href: 'https://payhip.com/b/7pOLs',
    icon: Package,
    isDisabled: false,
    target: '_blank'
  },
  {
    category: 'Voces',
    action: 'IA lista para narrar',
    shortcut: '⌘2',
    shortcutLabel: 'IA',
    href: 'https://payhip.com/b/yg8uf',
    icon: Mic,
    isDisabled: false,
    target: '_blank'
  }
];

const links = [
  {
    category: 'Mi libro',
    action: 'VERLAMENTE',
    shortcut: '⌘N',
    shortcutLabel: 'Libro',
    href: 'https://payhip.com/b/5ay2R',
    icon: Book,
    isDisabled: false,
    target: '_blank'
  },
  {
    category: 'Recursos',
    action: 'Kit de creadores',
    shortcut: '⌘K',
    shortcutLabel: 'Recursos',
    href: '#',
    icon: Download,
    isDisabled: false,
    hasSubItems: true,
    target: '_self'
  },
  {
    category: 'Colaboración',
    action: 'Trabaja conmigo',
    shortcut: '⌘S',
    shortcutLabel: 'Contacto',
    href: 'https://app.youform.com/forms/qust2qhy',
    icon: Users,
    isDisabled: false,
    target: '_blank'
  }
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/verlamente/',
    icon: Instagram,
    target: '_blank',
    color: 'hover:text-pink-400'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@verlamente',
    icon: ({ className }: { className?: string }) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-1.022C16.326 2.697 16.059 1.5 16.059 1.5h-3.074v14.738c0 .848-.489 1.58-1.2 1.94a2.228 2.228 0 0 1-1.007.242c-1.238 0-2.242-1.01-2.242-2.254s1.004-2.253 2.242-2.253c.247 0 .484.04.707.113V11.02c-.17-.023-.342-.035-.516-.035-2.582 0-4.674 2.105-4.674 4.703s2.092 4.703 4.674 4.703c2.582 0 4.674-2.105 4.674-4.703V8.063c1.027.957 2.35 1.547 3.801 1.547V6.598c-.472 0-.907-.113-1.295-.311a3.573 3.573 0 0 1-.829-.725Z"/>
      </svg>
    ),
    target: '_blank',
    color: 'hover:text-[#ff0050]'
  }
];

const menuItems = [
  { icon: <Book className="w-5 h-5" />, label: 'Blog', href: 'https://blog.verlamente.com' },
  { icon: <Package className="w-5 h-5" />, label: 'Productos', href: 'https://verlamente.com/productos' },
  { icon: <Coffee className="w-5 h-5" />, label: 'Café', href: 'https://verlamente.com/cafe' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showSubResources, setShowSubResources] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const cursorVelocity = useRef({ x: 0, y: 0 });

  const phrases = React.useMemo(() => [
    'crear contenido de valor',
    'monetizar tu pasión',
    'construir tu audiencia',
    'crecer en redes sociales'
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const typeText = () => {
      const currentPhrase = phrases[typingIndex];
      
      if (isDeleting) {
        setTypingText(currentPhrase.substring(0, typingText.length - 1));
        if (typingText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setTypingText(currentPhrase.substring(0, typingText.length + 1));
        if (typingText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timeout = setTimeout(typeText, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, typingIndex, mounted, phrases]);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = `${e.clientX}px`;
        cursorTrailRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setIsPointer(true);
    const handleMouseLeave = () => setIsPointer(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const animateCursor = (time: number) => {
      if (previousTimeRef.current) {
        const deltaTime = time - previousTimeRef.current;
        const deltaX = cursorPosition.x - (cursorTrailRef.current?.offsetLeft || 0);
        const deltaY = cursorPosition.y - (cursorTrailRef.current?.offsetTop || 0);
        
        cursorVelocity.current = {
          x: deltaX / deltaTime * 16,
          y: deltaY / deltaTime * 16
        };
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [cursorPosition, mounted]);

  useEffect(() => {
    if (!mounted) return;

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSubResources(false);
        setIsAnimatingOut(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubResourcesToggle = () => {
    if (showSubResources) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowSubResources(false);
        setIsAnimatingOut(false);
      }, 300);
    } else {
      setShowSubResources(true);
    }
  };

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

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold">Verlamente</h1>
              <nav className="hidden md:flex space-x-6">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Aprende a{' '}
                <span className="relative">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
                Descubre las estrategias que usan los creadores más exitosos para construir audiencias leales y monetizar su contenido.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/creator-lab"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  Ver Creator Lab
                </Link>
                <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                  Ver cursos
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {links.map((link, index) => (
                <div key={index} className="relative group">
                  {link.hasSubItems ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={handleSubResourcesToggle}
                        onMouseMove={handleButtonHover}
                        className="w-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                        style={{
                          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <link.icon className="w-8 h-8 text-blue-400" />
                          <span className="text-sm text-white/50 font-mono">{link.shortcut}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{link.category}</h3>
                        <p className="text-white/70 text-sm">{link.action}</p>
                      </button>
                      
                      {showSubResources && (
                        <div className={`absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden z-50 ${
                          isAnimatingOut ? 'animate-dropdown-exit' : 'animate-dropdown-enter'
                        }`}>
                          {subResources.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              target={subItem.target}
                              className="block p-4 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <subItem.icon className="w-5 h-5 text-blue-400" />
                                  <div>
                                    <div className="text-white font-medium">{subItem.category}</div>
                                    <div className="text-white/70 text-sm">{subItem.action}</div>
                                  </div>
                                </div>
                                <span className="text-xs text-white/50 font-mono">{subItem.shortcut}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      target={link.target}
                      onMouseMove={handleButtonHover}
                      className="block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                      style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <link.icon className="w-8 h-8 text-blue-400" />
                        <span className="text-sm text-white/50 font-mono">{link.shortcut}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{link.category}</h3>
                      <p className="text-white/70 text-sm">{link.action}</p>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Featured Course */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Curso Destacado</h3>
              <div className="max-w-4xl mx-auto">
                <CourseCard
                  title="Creator Lab: Monetiza tu Pasión"
                  description="Aprende las estrategias más efectivas para crear contenido de valor, construir una audiencia leal y monetizar tu pasión."
                  duration="2 horas"
                  students={1250}
                  rating={4.9}
                  price="$97"
                  originalPrice="$197"
                  image="/assets/logopng.png"
                  href="/creator-lab"
                  isNew={true}
                  isPopular={true}
                  level="Intermedio"
                  category="Marketing Digital"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Sígueme en redes</h3>
              <div className="flex justify-center space-x-6">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target={social.target}
                    className={`p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Banner Launch */}
      <BannerLaunch />

      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
      />
      <div 
        ref={cursorTrailRef}
        className={`cursor-trail ${isPointer ? 'pointer' : ''}`}
      />
    </div>
  );
}