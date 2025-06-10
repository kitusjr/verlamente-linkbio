'use client';

import { useEffect, useRef } from 'react';

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlurRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef(false);

  useEffect(() => {
    let rafId: number;
    let cursorX = 0;
    let cursorY = 0;
    let cursorBlurX = 0;
    let cursorBlurY = 0;

    const handleMove = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      cursorX = clientX;
      cursorY = clientY;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);

      if (!isMoving.current) {
        isMoving.current = true;
        animate();
      }
    };

    const animate = () => {
      cursorBlurX += (cursorX - cursorBlurX) * 0.05;
      cursorBlurY += (cursorY - cursorBlurY) * 0.05;

      if (cursorRef.current && cursorBlurRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorBlurRef.current.style.transform = `translate(${cursorBlurX}px, ${cursorBlurY}px)`;
      }

      if (
        Math.abs(cursorX - cursorBlurX) > 0.01 ||
        Math.abs(cursorY - cursorBlurY) > 0.01
      ) {
        rafId = requestAnimationFrame(animate);
      } else {
        isMoving.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .background-container {
          position: fixed;
          inset: 0;
          background-color: #000000;
          overflow: hidden;
          z-index: -10;
          cursor: none;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        .blur-layer {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            #141414,
            #0a0a0a,
            #000000
          );
          filter: blur(60px);
          opacity: 0.8;
          transform-origin: center;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, filter;
        }

        .motion-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.03) 0%,
            transparent 50%
          );
          mix-blend-mode: overlay;
          filter: blur(40px);
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, filter, opacity;
        }

        .grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.15;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .glass-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 60%
          );
          opacity: 0.5;
          backdrop-filter: blur(20px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 30%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
        }

        .cursor {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                    height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                    top 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                    left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .cursor-blur {
          position: fixed;
          top: -15px;
          left: -15px;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          filter: blur(8px);
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (hover: none) and (pointer: coarse) {
          .cursor, .cursor-blur {
            display: none;
          }
        }

        :global(a:hover) ~ .cursor {
          width: 16px;
          height: 16px;
          top: -8px;
          left: -8px;
        }
      `}</style>
      <div ref={containerRef} className="background-container">
        <div className="blur-layer" />
        <div className="motion-layer" />
        <div className="glass-effect" />
        <div className="grain" />
        <div className="vignette" />
        <div ref={cursorRef} className="cursor" />
        <div ref={cursorBlurRef} className="cursor-blur" />
      </div>
    </>
  );
} 