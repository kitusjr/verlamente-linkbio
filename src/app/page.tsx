'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Book, Users, Coffee, Search, Instagram, Command, Mic, Package } from 'lucide-react';
import VisitorCounter from '@/components/VisitorCounter';

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
    category: 'Mi libro',
    action: 'próximamente...',
    shortcut: '⌘N',
    shortcutLabel: 'Libro',
    href: '#',
    icon: Book,
    isDisabled: true,
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
    target: '_blank'
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
    target: '_blank'
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showSubResources, setShowSubResources] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-0">
      <div className={`w-full max-w-[440px] mx-auto space-y-1.5 px-6 md:px-4`}>
        <h1 className={`text-xs text-gray-400 px-1 transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          ¿Qué necesitas?
        </h1>

        <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
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
            className="w-full bg-black/40 text-sm font-medium text-gray-200 placeholder-gray-500 px-4 pr-12 py-1.5 rounded-md border border-white/[0.05] focus:outline-none focus:border-white/10 focus:bg-black/60 transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
        
        <div className={`bg-black/40 backdrop-blur-sm border border-white/[0.05] rounded-b-lg transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] delay-200 ${
          mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-99'
        }`}>
          <div>
            {filteredLinks.map((link) => {
              const Icon = link.icon;
              const isInteractive = link.category === 'Colaboración' || link.category === 'Apoyo';
              const isResources = link.category === 'Recursos';
              return (
                <div key={link.category}>
                  {isResources ? (
                    <button
                      onClick={() => setShowSubResources(prev => !prev)}
                      className={`block w-full text-left group`}
                    >
                      <div className="px-3 py-[9.5px] transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-3.5 h-3.5 transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                              link.isDisabled ? 'text-gray-600' : 
                              isResources ? 'text-gray-300 group-hover:text-white animate-pulse-glow' :
                              'text-gray-300 group-hover:text-white'
                            }`} />
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                                link.isDisabled ? 'text-gray-600' : 
                                isInteractive ? 'text-gray-300 group-hover:text-white' : 'text-gray-300'
                              }`}>{link.category}</div>
                              <div className={`text-xs transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                                link.isDisabled ? 'italic text-gray-600' : 'text-gray-500 group-hover:text-gray-300'
                              }`}>{link.action}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] text-gray-600 group-hover:text-gray-500">
                            <Command className="w-3 h-3" />
                            <span>{link.shortcut.replace('⌘', '')}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.target}
                      rel="noopener noreferrer"
                      className={`block w-full text-left ${isInteractive ? 'group' : ''} ${link.isDisabled ? 'pointer-events-none' : ''}`}
                    >
                      <div className="px-3 py-[9.5px] transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-3.5 h-3.5 transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                              link.isDisabled ? 'text-gray-600' : 
                              isResources ? 'text-gray-300 group-hover:text-white animate-pulse-glow' :
                              'text-gray-300 group-hover:text-white'
                            }`} />
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                                link.isDisabled ? 'text-gray-600' : 
                                isInteractive ? 'text-gray-300 group-hover:text-white' : 'text-gray-300'
                              }`}>{link.category}</div>
                              <div className={`text-xs transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                                link.isDisabled ? 'italic text-gray-600' : 'text-gray-500 group-hover:text-gray-300'
                              }`}>{link.action}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] text-gray-600 group-hover:text-gray-500">
                            <Command className="w-3 h-3" />
                            <span>{link.shortcut.replace('⌘', '')}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                  {isResources && (
                    <div 
                      className={`pl-4 border-l border-white/[0.03] ml-3 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]`}
                      style={{
                        height: showSubResources ? `${filteredSubResources.length * 38}px` : '0',
                        opacity: showSubResources ? 1 : 0,
                      }}
                    >
                      {filteredSubResources.map((subLink, index) => {
                        const SubIcon = subLink.icon;
                        return (
                          <Link
                            key={subLink.category}
                            href={subLink.href}
                            target={subLink.target}
                            rel="noopener noreferrer"
                            className={`block transform transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] group hover:text-white`}
                            style={{
                              transform: showSubResources ? 'translateY(0)' : 'translateY(-8px)',
                              opacity: showSubResources ? 1 : 0,
                              transitionDelay: `${index * 100}ms`
                            }}
                          >
                            <div className="px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2.5">
                                  <SubIcon className="w-3.5 h-3.5 text-gray-300 group-hover:text-white" />
                                  <div className="flex items-center space-x-2">
                                    <div className="text-sm font-medium text-gray-300 group-hover:text-white">{subLink.category}</div>
                                    <div className="text-xs text-gray-500 group-hover:text-gray-300">{subLink.action}</div>
                                    <span className="px-1 py-0.5 text-[8px] font-medium rounded bg-gradient-to-r from-premium-light via-premium to-premium-light bg-[length:200%_100%] animate-shimmer text-black/80">PREMIUM</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-gray-600">
                                  <Command className="w-3 h-3" />
                                  <span>{subLink.shortcut.replace('⌘', '')}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={`border-t border-white/[0.03] px-4 py-3 transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] delay-[500ms] ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}>
            <div className="flex flex-col space-y-2">
              <div className="text-xs text-gray-500">Síguenos en:</div>
              <div className="flex flex-col space-y-2.5">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target={social.target}
          rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] flex items-center space-x-2 group px-2 py-1 rounded-md"
                    >
                      <Icon className="w-3.5 h-3.5 transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] group-hover:text-white" />
                      <span className="text-xs transition-colors duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] group-hover:text-white">{social.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`border-t border-white/[0.03] transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] delay-[700ms] ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </div>
  );
}