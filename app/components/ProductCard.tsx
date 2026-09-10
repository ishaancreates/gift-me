'use client';

import React from 'react';
import { Product } from '../data/wishlist';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onClaimRequest: (product: Product, e: React.MouseEvent) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onClaimRequest,
  index,
}) => {
  // Determine layout span style based on editorial grid pattern
  const isFullWidth = index === 4 || index === 9;
  const isTwoCol = index === 0 || index === 3 || index === 7;

  const colSpanClass = isFullWidth
    ? 'col-span-1 md:col-span-12'
    : isTwoCol
    ? 'col-span-1 md:col-span-8'
    : 'col-span-1 md:col-span-4';

  const handleCardClick = (e: React.MouseEvent) => {
    // Open Amazon link in new tab directly on card click
    window.open(product.purchaseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleCardClick}
      data-cursor
      data-cursor-text="OPEN AMAZON ↗"
      className={`wishlist-card group relative bg-[#121216] border border-white/10 hover:border-red-500/60 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${colSpanClass} p-6 md:p-8 min-h-[420px] md:min-h-[480px]`}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* Product Image */}
      <div className="absolute inset-0 overflow-hidden bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      {/* Top Header Row */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <span className="text-4xl font-display font-black text-white/40 group-hover:text-red-500 transition-colors">
            {product.number}
          </span>
          <span className="text-[10px] font-mono-num bg-white/10 text-white/80 px-2 py-1 uppercase tracking-widest border border-white/10">
            {product.category}
          </span>
        </div>

        {product.claimed ? (
          <span className="inline-flex items-center space-x-1 font-mono-num text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-3 py-1 uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" />
            <span>CLAIMED</span>
          </span>
        ) : (
          <span className="font-mono-num text-[10px] bg-red-950/50 text-red-400 border border-red-500/30 px-3 py-1 uppercase tracking-widest">
            {product.priority}
          </span>
        )}
      </div>

      {/* Bottom Content & Amazon Actions */}
      <div className="relative z-20 space-y-4 pt-12">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-red-400 transition-colors leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm font-mono-num text-neutral-400 mt-1 font-semibold">
            {product.price}
          </p>
        </div>

        <p className="text-xs text-neutral-300 line-clamp-2 font-light">
          {product.description}
        </p>

        {/* Action Button Row */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {/* Direct Amazon CTA Button */}
          <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center space-x-2 bg-white text-black hover:bg-red-500 hover:text-white px-4 py-3 font-mono-num text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
          >
            <span>GET THIS FOR ME</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Quick View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="bg-neutral-800/80 hover:bg-neutral-700 text-white p-3 font-mono-num text-xs border border-white/10 uppercase tracking-widest transition-colors"
            title="View Details"
          >
            DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};
