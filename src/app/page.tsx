'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, Book, Users, Coffee, Search, Instagram, Command, Mic, Package, Video } from 'lucide-react';
import VisitorCounter from '@/components/VisitorCounter';
import { IconType } from 'react-icons';
import { FiChevronDown, FiChevronUp, FiBook, FiBox, FiCoffee, FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiYoutube, FiSearch } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';
import ActiveVisitors from '@/components/ActiveVisitors';
import CourseCard from '@/components/CourseCard';

// Mouse tracking for button hover effects
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
};

// Button hover effect handler
const handleButtonHover = (e: React.MouseEvent<HTMLDivElement>) => {
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
  { icon: <FiBook className="w-5 h-5" />, label: 'Blog', href: 'https://blog.verlamente.com' },
  { icon: <FiBox className="w-5 h-5" />, label: 'Productos', href: 'https://verlamente.com/productos' },
  { icon: <FiCoffee className="w-5 h-5" />, label: 'Café', href: 'https://verlamente.com/cafe' }
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
  const cursorPositionRef = useRef({ x: 0, y: 0 });

  const placeholders = [
    "Busca clips, voces, recursos...",
    "Prueba 'premium' para ver contenido exclusivo...",
    "Usa ⌘K para abrir recursos rápidamente...",
    "Escribe 'IA' para ver voces de inteligencia artificial..."
  ];

  useEffect(() => {
    const currentText = placeholders[typingIndex];
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseTime = 1000;

    const handleTyping = () => {
      if (!isDeleting) {
        if (typingText === currentText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
        setTypingText(currentText.slice(0, typingText.length + 1));
      } else {
        if (typingText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % placeholders.length);
          return;
        }
        setTypingText(currentText.slice(0, typingText.length - 1));
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, typingIndex]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleResourcesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showSubResources) {
      setIsAnimatingOut(true);
      animationTimeoutRef.current = setTimeout(() => {
        setShowSubResources(false);
        setIsAnimatingOut(false);
      }, 350); // Slightly shorter than animation duration
    } else {
      setShowSubResources(true);
    }
  };

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const filteredLinks = links.filter(link => 
    link.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.shortcutLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.category === 'Recursos' && subResources.some(subLink => 
      subLink.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subLink.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      'premium'.includes(searchTerm.toLowerCase()) ||
      'clips'.includes(searchTerm.toLowerCase()) ||
      'voces'.includes(searchTerm.toLowerCase()) ||
      'ia'.includes(searchTerm.toLowerCase())
    ))
  );

  const filteredSubResources = subResources.filter(link =>
    link.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.shortcutLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    'premium'.includes(searchTerm.toLowerCase()) ||
    'clips'.includes(searchTerm.toLowerCase()) ||
    'voces'.includes(searchTerm.toLowerCase()) ||
    'ia'.includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key.toLowerCase();
    
    // Si presiona Enter y hay resultados, abrir el primer resultado
    if (key === 'enter' && searchTerm && (filteredLinks.length > 0 || filteredSubResources.length > 0)) {
      e.preventDefault();
      const firstResult = filteredSubResources.length > 0 ? filteredSubResources[0] : filteredLinks[0];
      if (firstResult && !firstResult.isDisabled) {
        window.open(firstResult.href, firstResult.target || '_self');
        return;
      }
    }
    
    // Atajos de teclado existentes
    if (e.metaKey || e.ctrlKey) {
      if (key === 'k') {
        e.preventDefault();
        setShowSubResources(prev => !prev);
        return;
      }
      
      const allLinks = [...links, ...subResources];
      const shortcutLink = allLinks.find(link => 
        link.shortcut.toLowerCase().includes(key)
      );
      if (shortcutLink && !shortcutLink.isDisabled) {
        e.preventDefault();
        window.open(shortcutLink.href, shortcutLink.target || '_self');
      }
    }
  };

  const updateCursorPosition = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    
    cursorPositionRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const animateCursor = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      
      // Smooth interpolation
      const targetX = cursorPositionRef.current.x;
      const targetY = cursorPositionRef.current.y;
      
      cursorPosition.x += (targetX - cursorPosition.x) * 0.15;
      cursorPosition.y += (targetY - cursorPosition.y) * 0.15;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
      }
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorPosition);
    requestRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* CONTENEDOR PRINCIPAL - SIN OVERLAYS */}
      <div className="min-h-[100svh] py-8 px-4 overflow-y-auto">
        <div className="flex items-center justify-center min-h-[calc(100svh-4rem)]">
          <div className="w-full max-w-sm mx-auto relative z-10">
            
            {/* TARJETA PRINCIPAL */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-2xl">
              
              {/* ICONO */}
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* TÍTULO */}
              <h1 className="text-xl font-bold mb-2">Creator Lab – Crea tu marca viral con el mismo flujo que uso cada día</h1>
              
              {/* DESCRIPCIÓN */}
              <p className="text-gray-400 mb-6">Mi flujo exacto y <span className="text-white font-semibold">+2000 recursos virales</span>.</p>
              
              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Sin experiencia previa</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Kit Creator Lab</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">+2000 Clips</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">GPT personalizado</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Acceso de por vida</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Chat de soporte incluido</span>
              </div>
              
              {/* BOTÓN PRINCIPAL */}
              <button className="w-full bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300 mb-4">
                Unirme ahora →
              </button>
              
              {/* PRECIO */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-500 line-through text-lg">97€</span>
                <span className="text-green-400 text-2xl font-bold">47€</span>
              </div>
              
              {/* BOTÓN SECUNDARIO */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                Unirme ahora →
              </button>
              
            </div>
            
            {/* SECCIONES ADICIONALES */}
            <div className="mt-6 space-y-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Mi libro</div>
                  <div className="font-semibold">VERLAMENTE</div>
                </div>
                <div className="ml-auto text-xs text-gray-500">⌘N</div>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Recursos</div>
                  <div className="font-semibold">Kit de creadores</div>
                </div>
                <div className="ml-auto text-xs text-gray-500">⌘K</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Overrides LOCALES SOLO PARA LA HOME */}
      <style jsx global>{`
        /* ——— Visibilidad: si algo quedó oculto en móvil, lo mostramos ——— */
        @media (max-width: 768px) {
          #home-fix { opacity: 1 !important; visibility: visible !important; }
          #home-fix .opacity-0 { opacity: 1 !important; }
          #home-fix .invisible { visibility: visible !important; }
          /* Si hay secciones con 'hidden' en móvil, forzamos display */
          #home-fix .hidden { display: block !important; }
        }

        /* ——— Overlays decorativos que podrían tapar la UI en móvil ——— */
        /* Si existe un fondo/halo full-screen en la home, que no intercepte toques ni tape el contenido */
        #home-fix .fixed.inset-0 { pointer-events: none; z-index: -1; }
        /* Variante por estilos inline */
        #home-fix [style*="position: fixed"][style*="inset: 0"] { pointer-events: none; z-index: -1; }

        /* ——— Scroll estable en la propia página ——— */
        #home-scroll { overscroll-behavior-y: contain; -webkit-overflow-scrolling: touch; }
        
        /* ——— Asegurar que elementos interactivos funcionen ——— */
        button, a, input, select, textarea {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        
        /* ——— Hover effects funcionen ——— */
        .group:hover {
          pointer-events: auto !important;
        }
      `}</style>
      <style jsx global>{`
        * {
          cursor: auto !important;
        }

        .custom-cursor {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background-color 0.2s;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        .custom-cursor.pointer {
          width: 24px;
          height: 24px;
          background: transparent;
          border: 1px solid white;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .cursor-trail {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
          z-index: 9998;
        }

        .cursor-trail.pointer {
          width: 40px;
          height: 40px;
          border-color: rgba(255, 255, 255, 0.1);
        }

        @media (hover: none) and (pointer: coarse) {
          .custom-cursor, .cursor-trail {
            display: none !important;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        .animate-dropdown-enter {
          animation: slideDown 0.4s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }

        .animate-dropdown-exit {
          animation: slideUp 0.4s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }

        @keyframes premiumCardEnter {
          0% {
            opacity: 0;
            transform: translateY(10px);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
          }
        }

        .premium-card {
          animation: premiumCardEnter 0.8s cubic-bezier(0.2, 0, 0.2, 1) forwards;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .premium-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .premium-icon {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .premium-icon:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
      />
      <div 
        ref={cursorTrailRef}
        className={`cursor-trail ${isPointer ? 'pointer' : ''}`}
      />
    </>
  );
}