'use client';

import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'product' | 'amazon' | 'pointer';
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered elements for cursor data attributes
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]');
      
      if (cursorTarget) {
        setIsHovered(true);
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Circle Ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-24 h-24 bg-white text-black font-mono-num text-[10px] tracking-widest font-bold uppercase shadow-2xl scale-100'
            : 'w-8 h-8 bg-transparent border-red-500/80 scale-75'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-center px-1 animate-pulse leading-none">{cursorText}</span>
        )}
      </div>

      {/* Tiny Core Dot */}
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity duration-200 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
