'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        text1Ref.current,
        { opacity: 0.2, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        text2Ref.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 }
      )
      .fromTo(
        text3Ref.current,
        { opacity: 0.2, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[80vh] flex flex-col justify-center items-center p-8 md:p-24 bg-[#0d0d11] text-white text-center relative border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-5xl space-y-12 z-10">
        <h2
          ref={text1Ref}
          className="text-4xl md:text-7xl font-display font-black tracking-tight text-neutral-500 uppercase leading-none"
        >
          I DON'T NEED <br />
          <span className="text-white">A BIRTHDAY GIFT.</span>
        </h2>

        <div
          ref={text2Ref}
          className="inline-block py-2 px-6 bg-red-600/20 border border-red-500/40 text-red-500 font-mono-num text-xs tracking-widest uppercase"
        >
          BUT... IF YOU'RE INSISTING.
        </div>

        <h3
          ref={text3Ref}
          className="text-3xl md:text-6xl font-display tracking-tight text-white uppercase"
        >
          HERE'S WHAT I'D LIKE.
        </h3>
      </div>

      <div className="absolute left-8 bottom-8 text-[10px] font-mono-num text-neutral-600 uppercase tracking-widest">
        STORYLINE // EDITORIAL MANIFESTO
      </div>
    </section>
  );
};
