'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Lock, Gift, ChevronUp } from 'lucide-react';

interface NavbarProps {
  viewMode: 'home' | 'admin';
  setViewMode: (mode: 'home' | 'admin') => void;
  onOpenDelivery: () => void;
}

export const PillNavbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  onOpenDelivery,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 transition-all duration-500">
      {!isCollapsed ? (
        /* Full Pill Navbar - 6/8 (75% or max-w-4xl) width ratio centered */
        <header className="pointer-events-auto w-full md:w-3/4 max-w-4xl bg-[#EEEEEE]/90 backdrop-blur-md border border-[#8B9A6E]/30 shadow-xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500">
          {/* Brand Logo & Title */}
          <button
            onClick={() => setViewMode('home')}
            className="flex items-center space-x-2 text-xs font-mono-num font-bold tracking-widest uppercase text-[#1c2118] hover:text-[#8B9A6E] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#8B9A6E] text-white flex items-center justify-center shadow-md">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">WISHLIST // 31 OCT</span>
            <span className="sm:hidden">31 OCT</span>
          </button>

          {/* Action Links */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenDelivery}
              data-cursor
              data-cursor-text="ADDRESS"
              className="flex items-center space-x-2 text-xs font-mono-num bg-[#8B9A6E] hover:bg-[#7a895f] text-white px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WHERE SHOULD I SEND IT?</span>
              <span className="sm:hidden font-bold">ADDRESS</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'home' ? 'admin' : 'home')}
              data-cursor
              data-cursor-text="ADMIN"
              className="flex items-center space-x-1 text-xs font-mono-num bg-[#EAE2D6] hover:bg-[#8B9A6E] text-[#1c2118] hover:text-white border border-[#8B9A6E]/30 px-3.5 py-2 rounded-full uppercase tracking-wider transition-colors shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{viewMode === 'home' ? 'ADMIN' : 'VIEW SITE'}</span>
            </button>
          </div>
        </header>
      ) : (
        /* Collapsed Compact Pill - Contains main Address button & Expand trigger */
        <header className="pointer-events-auto bg-[#8B9A6E] text-white shadow-2xl rounded-full px-5 py-2.5 flex items-center space-x-3 border border-[#F7F2EB] animate-in fade-in zoom-in duration-300">
          <button
            onClick={onOpenDelivery}
            data-cursor
            data-cursor-text="ADDRESS"
            className="flex items-center space-x-2 text-xs font-mono-num font-bold uppercase tracking-widest hover:text-[#F7F2EB] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#F7F2EB] animate-bounce" />
            <span>WHERE SHOULD I SEND IT?</span>
          </button>

          <div className="w-[1px] h-4 bg-white/30" />

          <button
            onClick={() => setIsCollapsed(false)}
            title="Expand Navigation"
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronUp className="w-4 h-4 rotate-180" />
          </button>
        </header>
      )}
    </div>
  );
};
