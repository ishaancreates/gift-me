'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../data/wishlist';
import { ProductCard } from './ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WishlistGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onClaimRequest: (product: Product, e: React.MouseEvent) => void;
}

const CATEGORIES = ['ALL', 'TECH', 'FASHION', 'BOOKS', 'GAMING', 'ACCESSORIES', 'OTHER'];

export const WishlistGrid: React.FC<WishlistGridProps> = ({
  products,
  onSelectProduct,
  onClaimRequest,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(
    (p) => activeCategory === 'ALL' || p.category === activeCategory
  );

  // ScrollTrigger reveal for cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.wishlist-card');
      cards.forEach((card: any, i: number) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProducts, activeCategory]);

  return (
    <section
      id="wishlist-section"
      className="w-full min-h-screen p-6 md:p-16 bg-[#F7F2EB] text-[#1c2118] border-b border-[#8B9A6E]/20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest block mb-2 font-bold">
            01 // WISHLIST ARCHIVE
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase leading-none text-[#1c2118]">
            THE CATALOGUE.
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono-num uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#8B9A6E] text-white font-bold border border-[#8B9A6E] shadow-md'
                  : 'bg-[#EEEEEE] text-[#5a644c] border border-[#8B9A6E]/20 hover:border-[#8B9A6E] hover:text-[#1c2118]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
      >
        {filteredProducts.map((prod, idx) => (
          <ProductCard
            key={prod.id}
            product={prod}
            index={idx}
            onSelect={onSelectProduct}
            onClaimRequest={onClaimRequest}
          />
        ))}
      </div>
    </section>
  );
};
