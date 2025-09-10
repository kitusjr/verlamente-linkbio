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
      {/* WRAPPER: fija el ámbito de los overrides SOLO para la home */}
      <main id="home-fix" className="relative z-0 min-h-[100svh] w-full bg-transparent text-slate-200">
        {/* ÁREA SCROLLEABLE explícita (por si un padre flex estaba encajonando) */}
        <div id="home-scroll" className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-screen flex items-center justify-center p-3 md:p-0">
            <div className="w-full max-w-[380px] md:max-w-[640px] lg:max-w-[720px] mx-auto">
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-[0_8px_60px_rgba(0,0,0,0.35)] rounded-2xl p-5 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h1 className="text-xs font-medium text-white/80">
                      ¿Qué necesitas?
                    </h1>
                    <div className="text-[9px] text-white/50">⌘K para buscar</div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <FiSearch className="w-4 h-4 text-white/40" />
                    </div>
                    <input
                      type="text"
                      placeholder={typingText}
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value !== '') {
                          setShowSubResources(true);
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all duration-300 ease-out hover:bg-white/[0.05] focus:scale-[1.02] focus:shadow-lg focus:shadow-black/20"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {/* CARD — CREATOR LAB DESTACADA */}
                    <CourseCard />

                    {filteredLinks.map((link, idx) => {
                      const isResourcesItem = link.hasSubItems;
                      return (
                        <div
                          key={idx}
                          className={`relative group cursor-pointer ${
                            link.isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => {
                            if (link.isDisabled) return;
                            if (link.hasSubItems) {
                              handleResourcesClick(e);
                            } else {
                              window.open(link.href, link.target || '_self');
                            }
                          }}
                        >
                          <div className={`backdrop-blur-xl ${
                            idx === 0 ? 'premium-card' : 'bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]'
                          } transition-all duration-300 ease-out rounded-xl p-3.5 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:scale-[1.01] hover:-translate-y-0.5`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3.5">
                                <div className={`w-8 h-8 rounded-lg ${
                                  idx === 0 ? 'premium-icon' : 'bg-white/[0.04] border border-white/[0.08]'
                                } flex items-center justify-center transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.12] group-hover:scale-110`}>
                                  <link.icon className="w-4 h-4 text-white/80 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[10px] text-white/40 transition-colors duration-300 group-hover:text-white/60">{link.category}</div>
                                  <div className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">{link.action}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-[20px] min-w-[38px] px-2 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/[0.1] group-hover:scale-105">
                                  <span className="text-[9px] leading-none text-white/40 transition-colors duration-300 group-hover:text-white/60">{link.shortcut}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {isResourcesItem && (showSubResources || isAnimatingOut) && (
                            <div 
                              ref={dropdownRef}
                              className={`mt-2 ${
                                isAnimatingOut 
                                  ? 'animate-dropdown-exit' 
                                  : 'animate-dropdown-enter'
                              }`}
                            >
                              <div className="pl-6 space-y-2.5">
                                {filteredSubResources.map((subLink, idx) => (
                                  <div
                                    key={idx}
                                    className="relative group cursor-pointer"
                                    onClick={() => window.open(subLink.href, subLink.target || '_self')}
                                  >
                                    <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 ease-out rounded-xl p-3.5 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:scale-[1.01] hover:-translate-y-0.5">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3.5">
                                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.12] group-hover:scale-110">
                                            <subLink.icon className="w-4 h-4 text-white/80 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                                          </div>
                                          <div className="space-y-1">
                                            <div className="text-[10px] text-white/40 transition-colors duration-300 group-hover:text-white/60">{subLink.category}</div>
                                            <div className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">{subLink.action}</div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="h-[20px] min-w-[38px] px-2 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/[0.1] group-hover:scale-105">
                                            <span className="text-[9px] leading-none text-white/40 transition-colors duration-300 group-hover:text-white/60">{subLink.shortcut}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-xl p-3 shadow-lg shadow-black/10">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3">
                          {socials.map((social, index) => (
                            <a
                              key={index}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative"
                              title={social.name}
                            >
                              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/[0.1] group-hover:scale-105">
                                <social.icon className="w-3.5 h-3.5 text-white/60 transition-all duration-300 group-hover:text-white/80 group-hover:scale-110" />
                              </div>
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                {social.name}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ActiveVisitors />
        </div>
      </main>

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