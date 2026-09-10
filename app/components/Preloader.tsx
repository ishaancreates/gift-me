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
      className="fixed inset-0 z-50 bg-[#F7F2EB] text-[#1c2118] flex flex-col justify-between p-8 md:p-16 select-none bg-grain border-b border-[#8B9A6E]/20"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex justify-between items-center text-xs tracking-widest uppercase font-mono-num text-[#5a644c] font-bold">
        <span>EDITION // 2026</span>
        <span>ISHAAN PANDEY'S BIRTHDAY ARCHIVE</span>
      </div>

      <div ref={textRef} className="my-auto flex flex-col items-start space-y-2">
        <span className="text-[#8B9A6E] font-mono-num text-sm tracking-wider uppercase font-extrabold">
          INITIALIZING WISHLIST
        </span>
        <div className="flex items-baseline space-x-6">
          <h1 className="text-7xl md:text-9xl font-black font-mono-num tracking-tighter text-[#1c2118]">
            {String(num).padStart(2, '0')}
          </h1>
          <div className="flex flex-col">
            <span className="text-3xl md:text-5xl font-display tracking-tight uppercase text-[#5a644c]">
              OCTOBER 31
            </span>
            <span className="text-xs font-mono-num tracking-widest text-[#5a644c] font-bold">
              DON'T FORGET TO SURPRISE HIM
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs tracking-wider uppercase font-mono-num text-[#5a644c] border-t border-[#8B9A6E]/20 pt-4 font-bold">
        <span>ISHAAN PANDEY'S BIRTHDAY</span>
        <span>LOADING {num}%</span>
      </div>
    </div>
  );
};
