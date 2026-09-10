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
      className={`wishlist-card group relative bg-[#EAE2D6] border border-[#8B9A6E]/20 hover:border-[#8B9A6E] rounded-3xl transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${colSpanClass} p-6 md:p-8 min-h-[420px] md:min-h-[480px] shadow-md hover:shadow-xl`}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c2118]/80 via-[#1c2118]/20 to-transparent z-10 pointer-events-none" />

      {/* Product Image */}
      <div className="absolute inset-0 overflow-hidden bg-[#EEEEEE]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      {/* Top Header Row */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <span className="text-4xl font-display font-black text-white group-hover:text-[#8B9A6E] transition-colors drop-shadow-md">
            {product.number}
          </span>
          <span className="text-[10px] font-mono-num bg-[#F7F2EB]/90 text-[#1c2118] px-2.5 py-1 uppercase tracking-widest border border-[#8B9A6E]/30 rounded-full font-bold">
            {product.category}
          </span>
        </div>

        {product.claimed ? (
          <span className="inline-flex items-center space-x-1 font-mono-num text-[10px] bg-[#8B9A6E] text-white px-3 py-1 uppercase tracking-widest rounded-full font-bold shadow-md">
            <CheckCircle2 className="w-3 h-3" />
            <span>CLAIMED</span>
          </span>
        ) : (
          <span className="font-mono-num text-[10px] bg-[#EEEEEE]/90 text-[#5a644c] border border-[#8B9A6E]/30 px-3 py-1 uppercase tracking-widest rounded-full font-bold">
            {product.priority}
          </span>
        )}
      </div>

      {/* Bottom Content & Amazon Actions */}
      <div className="relative z-20 space-y-4 pt-12">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-[#F7F2EB] transition-colors leading-tight line-clamp-2 drop-shadow-sm">
            {product.name}
          </h3>
          <p className="text-sm font-mono-num text-[#F7F2EB] mt-1 font-bold">
            {product.price}
          </p>
        </div>

        <p className="text-xs text-[#EEEEEE] line-clamp-2 font-medium">
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
            className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#8B9A6E] text-white hover:bg-[#7a895f] px-4 py-3 rounded-full font-mono-num text-xs font-bold uppercase tracking-wider transition-all shadow-md"
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
            className="bg-[#F7F2EB]/90 hover:bg-white text-[#1c2118] p-3 font-mono-num text-xs border border-[#8B9A6E]/30 rounded-full uppercase tracking-widest transition-colors font-bold shadow-sm"
            title="View Details"
          >
            DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};
