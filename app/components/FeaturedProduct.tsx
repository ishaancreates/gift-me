'use client';

import React, { useEffect, useRef } from 'react';
import { Product } from '../data/wishlist';
import { ExternalLink, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProductProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-[85vh] bg-[#F7F2EB] text-[#1c2118] flex flex-col justify-between p-8 md:p-20 overflow-hidden border-b border-[#8B9A6E]/20"
    >
      {/* Background Featured Image with parallax scaling */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center opacity-30 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2EB] via-[#F7F2EB]/60 to-transparent" />
      </div>

      {/* Header Tag */}
      <div className="relative z-10 flex items-center space-x-3 text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest font-bold">
        <Star className="w-4 h-4 fill-[#8B9A6E]" />
        <span>CENTERPIECE // THE ONE I'D REALLY LOVE</span>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 my-auto max-w-4xl space-y-6 pt-12">
        <span className="text-8xl font-display font-black text-[#8B9A6E]/30 block leading-none">
          {product.number}
        </span>
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-[#1c2118] uppercase leading-none"
        >
          {product.name}
        </h2>
        <p className="text-lg md:text-xl text-[#5a644c] max-w-2xl font-medium">
          {product.whyIWantIt}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-text="AMAZON ↗"
            className="inline-flex items-center space-x-3 bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-sm px-8 py-5 rounded-full uppercase tracking-widest transition-all shadow-xl"
          >
            <span>GET THIS FOR ME</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => onSelect(product)}
            className="bg-[#EAE2D6] hover:bg-[#EEEEEE] text-[#1c2118] font-mono-num font-bold text-xs px-6 py-5 rounded-full uppercase tracking-widest border border-[#8B9A6E]/30 backdrop-blur-md transition-colors shadow-sm"
          >
            EXPLORE DETAILS
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex justify-between items-center text-xs font-mono-num text-[#5a644c] uppercase tracking-wider pt-8 border-t border-[#8B9A6E]/20 font-bold">
        <span>PRIORITY // {product.priority}</span>
        <span>ESTIMATED PRICE // {product.price}</span>
      </div>
    </section>
  );
};
