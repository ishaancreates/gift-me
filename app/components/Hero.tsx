'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { ArrowDown, Calendar, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1 = useRef<HTMLHeadingElement>(null);
  const titleLine2 = useRef<HTMLHeadingElement>(null);
  const titleLine3 = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse parallax state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      gsap.to(glowRef.current, {
        x,
        y,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Countdown timer logic targeting 31 October 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-31T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        // Trigger subtle particle burst once
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ff3333', '#ffffff', '#e2b714'],
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isToday: false });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // GSAP hero animation timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        [titleLine1.current, titleLine2.current, titleLine3.current],
        { y: 120, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1,
          stagger: 0.15,
          delay: 0.2,
        }
      )
      .fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        countdownRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWishlist = () => {
    const el = document.getElementById('wishlist-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-16 overflow-hidden bg-[#0a0a0c] text-white select-none border-b border-white/10"
    >
      {/* Background Interactive Glow */}
      <div
        ref={glowRef}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header info */}
      <div className="flex justify-between items-start z-10 pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          <span className="text-xs font-mono-num tracking-widest text-neutral-400 uppercase">
            31 OCTOBER 2026
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono-num tracking-widest text-neutral-500 uppercase block">
            PERSONAL ARCHIVE
          </span>
          <span className="text-xs font-mono-num font-semibold text-neutral-300">
            VOL. 01 / WISHLIST
          </span>
        </div>
      </div>

      {/* Hero Central Typography */}
      <div className="my-auto z-10 py-12 max-w-7xl">
        <div className="overflow-hidden">
          <h1
            ref={titleLine1}
            className="text-6xl sm:text-8xl md:text-[11rem] font-display font-black leading-[0.85] tracking-tight uppercase text-white"
          >
            IT'S
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={titleLine2}
            className="text-6xl sm:text-8xl md:text-[11rem] font-display font-black leading-[0.85] tracking-tight uppercase text-neutral-400"
          >
            MY
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={titleLine3}
            className="text-6xl sm:text-8xl md:text-[11rem] font-display font-black leading-[0.85] tracking-tight uppercase text-red-500 flex items-center"
          >
            BIRTHDAY.
          </h1>
        </div>

        {/* Subhead phrases */}
        <div ref={subheadRef} className="mt-8 max-w-xl space-y-2">
          <p className="text-lg md:text-xl font-light text-neutral-300 tracking-wide">
            Since you're probably wondering what to get me...
          </p>
          <p className="text-sm font-mono-num text-neutral-500 tracking-widest uppercase">
            I MADE THIS EDITORIAL WISHLIST.
          </p>
        </div>
      </div>

      {/* Bottom Row: Countdown & CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 z-10 pb-4">
        {/* Countdown Box */}
        <div ref={countdownRef} className="bg-neutral-900/60 border border-white/10 backdrop-blur-md p-5 md:p-6 rounded-none min-w-[280px]">
          <div className="flex items-center space-x-2 text-xs font-mono-num tracking-wider text-neutral-400 mb-3">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            <span>COUNTDOWN TO 31 OCT</span>
          </div>

          {timeLeft.isToday ? (
            <div className="flex items-center space-x-2 text-2xl md:text-3xl font-display text-red-500 tracking-wider">
              <Sparkles className="w-6 h-6 animate-spin" />
              <span>TODAY'S THE DAY.</span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 font-mono-num text-center">
              <div>
                <span className="text-3xl md:text-4xl font-bold text-white block">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">DAYS</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-bold text-white block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">HRS</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-bold text-white block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">MIN</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-bold text-red-500 block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">SEC</span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll CTA Button */}
        <div ref={ctaRef}>
          <button
            onClick={scrollToWishlist}
            data-cursor
            data-cursor-text="EXPLORE"
            className="group flex items-center space-x-4 bg-white text-black px-8 py-5 font-mono-num font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer shadow-xl"
          >
            <span>EXPLORE THE WISHLIST</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
