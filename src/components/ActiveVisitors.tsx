'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ActiveVisitors() {
  const [visitors, setVisitors] = useState(5);

  useEffect(() => {
    // Simular actualización de visitantes cada 5 segundos
    const interval = setInterval(() => {
      const newVisitors = Math.floor(Math.random() * 8) + 5; // Número aleatorio entre 5 y 12
      setVisitors(newVisitors);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white shadow-lg"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>{visitors} visitantes activos</span>
      </div>
    </motion.div>
  );
} 