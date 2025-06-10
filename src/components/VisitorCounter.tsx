import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

const STORAGE_KEY = 'visitor_stats';
const INITIAL_VISITORS = 10842; // Base inicial realista
const MIN_DAILY_INCREASE = 100; // Mínimo de visitas diarias
const GROWTH_FACTOR = 1.002; // Factor de crecimiento diario (0.2% más cada día)

export default function VisitorCounter() {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [activeVisitors, setActiveVisitors] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    // Recuperar o inicializar estadísticas persistentes
    const initializeStats = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { lastVisit, count, baseDaily } = JSON.parse(stored);
        const daysSinceLastVisit = Math.floor((Date.now() - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit > 0) {
          // Calcular incremento con crecimiento exponencial
          let newCount = count;
          let dailyIncrease = baseDaily || MIN_DAILY_INCREASE;
          
          // Aplicar incremento por cada día transcurrido
          for (let i = 0; i < daysSinceLastVisit; i++) {
            newCount += dailyIncrease;
            dailyIncrease *= GROWTH_FACTOR;
          }
          
          setTotalVisitors(Math.floor(newCount));
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            lastVisit: Date.now(),
            count: newCount,
            baseDaily: dailyIncrease
          }));
        } else {
          setTotalVisitors(Math.floor(count));
        }
      } else {
        // Primera visita
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          lastVisit: Date.now(),
          count: INITIAL_VISITORS,
          baseDaily: MIN_DAILY_INCREASE
        }));
        setTotalVisitors(INITIAL_VISITORS);
      }
    };

    initializeStats();

    // Simular visitantes activos iniciales (entre 5 y 12)
    const initialActive = 5 + Math.floor(Math.random() * 8);
    setActiveVisitors(initialActive);

    // Actualizar visitantes activos y total periódicamente
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Actualizar visitantes activos con más realismo
      setActiveVisitors(prev => {
        // 70% de probabilidad de cambio
        if (Math.random() < 0.7) {
          const shouldIncrease = Math.random() < 0.6; // 60% probabilidad de aumentar
          let change;
          
          if (shouldIncrease) {
            // 30% de probabilidad de múltiples usuarios nuevos
            if (Math.random() < 0.3) {
              change = 2 + Math.floor(Math.random() * 3); // Añadir 2-4 usuarios
            } else {
              change = 1; // Añadir 1 usuario
            }
          } else {
            change = -1; // Eliminar 1 usuario
          }
          
          const newValue = Math.max(5, Math.min(18, prev + change));
          
          // Solo incrementar el total cuando aumentan los usuarios activos
          if (newValue > prev) {
            setTotalVisitors(total => {
              const newTotal = total + (newValue - prev); // Suma exactamente la diferencia de nuevos usuarios
              localStorage.setItem(STORAGE_KEY, JSON.stringify({
                lastVisit: now,
                count: newTotal,
                baseDaily: MIN_DAILY_INCREASE * GROWTH_FACTOR
              }));
              return newTotal;
            });
          }
          
          return newValue;
        }
        return prev;
      });

      // Actualizar el timestamp
      setLastUpdate(now);
    }, 3000); // Actualización cada 3 segundos

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="flex items-center justify-between px-4 py-2 text-[10px] text-gray-600">
      <div className="flex items-center gap-2">
        <Users className="w-3 h-3" />
        <span>{totalVisitors.toLocaleString()} visitas totales</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-500"></span>
        </div>
        <span>{activeVisitors} activos ahora</span>
      </div>
    </div>
  );
} 