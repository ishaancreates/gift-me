'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [num, setNum] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = [0, 15, 31, 48, 67, 82, 100];
    let idx = 0;

    const interval = setInterval(() => {
      idx++;
      if (idx < steps.length) {
        setNum(steps[idx]);
      } else {
        clearInterval(interval);

        // GSAP curtain transition animation
        if (containerRef.current) {
          gsap.timeline({
            onComplete: () => {
              onComplete();
            }
          })
          .to(textRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: 'power2.in'
          })
          .to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.6,
            ease: 'power4.inOut'
          });
        }
      }
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0a0a0c] text-white flex flex-col justify-between p-8 md:p-16 select-none bg-grain border-b border-white/10"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex justify-between items-center text-xs tracking-widest uppercase font-mono-num text-neutral-500">
        <span>EDITION // 2026</span>
        <span>WISHLIST ARCHIVE</span>
      </div>

      <div ref={textRef} className="my-auto flex flex-col items-start space-y-2">
        <span className="text-red-500 font-mono-num text-sm tracking-wider uppercase font-semibold">
          INITIALIZING EXPERIENCE
        </span>
        <div className="flex items-baseline space-x-6">
          <h1 className="text-7xl md:text-9xl font-black font-mono-num tracking-tighter text-white">
            {String(num).padStart(2, '0')}
          </h1>
          <div className="flex flex-col">
            <span className="text-3xl md:text-5xl font-display tracking-tight uppercase text-neutral-400">
              OCTOBER
            </span>
            <span className="text-xs font-mono-num tracking-widest text-neutral-500">
              31ST BIRTHDAY
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs tracking-wider uppercase font-mono-num text-neutral-600 border-t border-white/5 pt-4">
        <span>LANDON & ANIME INSPIRED</span>
        <span>LOADING {num}%</span>
      </div>
    </div>
  );
};
