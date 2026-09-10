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
      className="w-full relative min-h-[90vh] bg-black text-white flex flex-col justify-between p-8 md:p-20 overflow-hidden border-b border-white/10"
    >
      {/* Background Featured Image with parallax scaling */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center opacity-40 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Header Tag */}
      <div className="relative z-10 flex items-center space-x-3 text-xs font-mono-num text-red-500 uppercase tracking-widest">
        <Star className="w-4 h-4 fill-red-500" />
        <span>CENTERPIECE // THE ONE I'D REALLY LOVE</span>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 my-auto max-w-4xl space-y-6 pt-12">
        <span className="text-8xl font-display font-black text-white/20 block leading-none">
          {product.number}
        </span>
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-none"
        >
          {product.name}
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl font-light">
          {product.whyIWantIt}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-text="AMAZON ↗"
            className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-sm px-8 py-5 uppercase tracking-widest transition-colors shadow-2xl"
          >
            <span>GET THIS FOR ME</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => onSelect(product)}
            className="bg-white/10 hover:bg-white/20 text-white font-mono-num font-semibold text-xs px-6 py-5 uppercase tracking-widest border border-white/20 backdrop-blur-md transition-colors"
          >
            EXPLORE DETAILS
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex justify-between items-center text-xs font-mono-num text-neutral-500 uppercase tracking-wider pt-8 border-t border-white/10">
        <span>PRIORITY // {product.priority}</span>
        <span>ESTIMATED PRICE // {product.price}</span>
      </div>
    </section>
  );
};
