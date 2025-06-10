'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, Book, Users, Coffee, Search, Instagram, Command, Mic, Package } from 'lucide-react';
import VisitorCounter from '@/components/VisitorCounter';
import { IconType } from 'react-icons';
import { FiChevronDown, FiChevronUp, FiBook, FiBox, FiCoffee, FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

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
  },
  {
    category: 'Apoyo',
    action: 'Invítame un café',
    shortcut: '⌘D',
    shortcutLabel: 'Café',
    href: 'https://buymeacoffee.com/verlamente',
    icon: Coffee,
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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showSubResources, setShowSubResources] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showSubResources) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setShowSubResources(false);
        setIsAnimatingOut(false);
      }, 300); // Match this with the animation duration
      return () => clearTimeout(timer);
    } else {
      setShowSubResources(true);
      setIsAnimatingOut(false);
    }
  };

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

  // Placeholder dinámico que cambia cada cierto tiempo
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Busca clips, voces, recursos...",
    "Prueba 'premium' para ver contenido exclusivo...",
    "Usa ⌘K para abrir recursos rápidamente...",
    "Escribe 'IA' para ver voces de inteligencia artificial..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-3 md:p-0">
      <div className="w-full max-w-[380px] mx-auto">
        <div className="glass-card p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h1 className="text-xs font-medium text-white/70">
                ¿Qué necesitas?
              </h1>
              <div className="text-[9px] text-white/40">⌘K para buscar</div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value !== '') {
                    setShowSubResources(true);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="w-full h-8 glass-input rounded-lg px-3 pr-9 text-xs text-white/80 placeholder:text-white/30 focus:outline-none"
              />
              <Search className="w-3 h-3 text-white/30 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="relative">
              {filteredLinks.map((item, index) => {
                const isResourcesItem = item.hasSubItems;
                const nextItemsHeight = isResourcesItem && showSubResources ? 74 : 0;

                return (
                  <div 
                    key={item.category}
                    className="relative"
                    style={{
                      marginBottom: isResourcesItem && showSubResources ? `${nextItemsHeight}px` : '3px'
                    }}
                  >
                    <Link
                      href={item.href}
                      target={item.target}
                      onClick={(e) => {
                        if (item.isDisabled) e.preventDefault();
                        if (item.hasSubItems) handleDropdownToggle(e);
                      }}
                      className={`block w-full ${item.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div 
                        className={`glass-button rounded-lg px-3 py-1.5 transition-all duration-300 ${
                          item.hasSubItems && showSubResources ? 'bg-white/[0.02]' : ''
                        } ${
                          (item.category === 'Mi libro' || item.category === 'Recursos') ? 
                          'animate-subtle-pulse before:absolute before:inset-0 before:rounded-lg before:border before:border-white/[0.08] before:animate-border-pulse after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-r after:from-white/[0.02] after:via-white/[0.04] after:to-white/[0.02] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500' : ''
                        }`}
                        onMouseMove={handleButtonHover}
                      >
                        <div className="flex items-center justify-between relative z-[1]">
                          <div className="flex items-center space-x-2">
                            <div className={`relative ${(item.category === 'Mi libro' || item.category === 'Recursos') ? 'animate-subtle-float' : ''}`}>
                              <item.icon className={`w-3 h-3 ${
                                item.isDisabled ? 'text-white/30' : 
                                (item.category === 'Mi libro' || item.category === 'Recursos') ? 'text-white/90' : 'text-white/60'
                              }`} />
                              {(item.category === 'Mi libro' || item.category === 'Recursos') && (
                                <>
                                  <div className="absolute -inset-1.5 bg-white/[0.03] rounded-full blur-sm animate-pulse-slow" />
                                  <div className="absolute -inset-3 bg-gradient-to-r from-white/[0.01] via-white/[0.02] to-white/[0.01] rounded-full blur-lg animate-glow-slow" />
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className={`text-xs font-medium ${
                                (item.category === 'Mi libro' || item.category === 'Recursos') ? 
                                'text-white/90 drop-shadow-sm' : 'text-white/80'
                              }`}>{item.category}</div>
                              <div className={`text-[10px] ${
                                (item.category === 'Mi libro' || item.category === 'Recursos') ? 
                                'text-white/50' : 'text-white/40'
                              }`}>• {item.action}</div>
                            </div>
                          </div>
                          <div className="glass-morphism px-1.5 py-0.5 rounded">
                            <div className="flex items-center space-x-1">
                              <Command className="w-2 h-2 text-white/30" />
                              <span className="text-[9px] text-white/40">{item.shortcut.replace('⌘', '')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {isResourcesItem && (showSubResources || isAnimatingOut) && (
                      <div 
                        ref={dropdownRef}
                        className={`absolute left-0 right-0 ${isAnimatingOut ? 'dropdown-exit' : 'dropdown-enter'}`}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          right: 0,
                          zIndex: 50
                        }}
                      >
                        <div className="glass-card overflow-hidden border border-white/[0.03] shadow-lg shadow-black/5">
                          {filteredSubResources.map((link, idx) => (
                            <Link
                              key={link.category}
                              href={link.href}
                              target={link.target}
                              className="block w-full"
                            >
                              <div 
                                className={`glass-button relative px-3 py-1.5 hover:bg-white/[0.02] ${
                                  isAnimatingOut ? 'dropdown-item-exit' : 'dropdown-item-enter'
                                } ${idx === 0 ? 'after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[1px] after:bg-white/[0.02]' : ''}`}
                                style={{
                                  animationDelay: isAnimatingOut ? `${idx * 0.02}s` : `${idx * 0.03}s`
                                }}
                                onMouseMove={handleButtonHover}
                              >
                                <div className="flex items-center justify-between relative z-[1]">
                                  <div className="flex items-center space-x-2">
                                    <link.icon className="w-3 h-3 text-white/60" />
                                    <div className="flex items-center gap-1.5">
                                      <div className="text-xs font-medium text-white/80">{link.category}</div>
                                      <div className="text-[10px] text-white/40">• {link.action}</div>
                                    </div>
                                  </div>
                                  <div className="glass-morphism px-1.5 py-0.5 rounded-md bg-white/[0.02]">
                                    <div className="flex items-center space-x-1">
                                      <Command className="w-2 h-2 text-white/30" />
                                      <span className="text-[9px] text-white/40">{link.shortcut.replace('⌘', '')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center mt-3">
            <div className="flex items-center gap-1.5">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.target}
                  className="block"
                >
                  <div 
                    className="glass-button p-1.5 rounded-lg group hover:bg-white/[0.02] hover:scale-105 transition-all duration-300"
                    onMouseMove={handleButtonHover}
                  >
                    <div className="relative z-[1]">
                      <social.icon 
                        className={`w-3.5 h-3.5 text-white/70 transition-all duration-300 ${social.color}`} 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}