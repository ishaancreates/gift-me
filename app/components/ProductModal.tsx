'use client';

import React, { useRef } from 'react';
import { Product } from '../data/wishlist';
import { X, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onClaim: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onClaim,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-[#1c2118]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F7F2EB] border border-[#8B9A6E]/30 text-[#1c2118] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-[#EEEEEE] hover:bg-[#8B9A6E] text-[#1c2118] hover:text-white p-3 rounded-full border border-[#8B9A6E]/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px] bg-[#EEEEEE]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2EB] via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 z-10 font-mono-num text-5xl font-black text-[#8B9A6E]/40">
            {product.number}
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest font-bold">
              <span>{product.category}</span>
              <span>•</span>
              <span>PRIORITY // {product.priority}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-display font-black uppercase text-[#1c2118] leading-tight">
              {product.name}
            </h2>

            <div className="text-xl font-mono-num text-[#8B9A6E] font-bold">
              {product.price}
            </div>

            <hr className="border-[#8B9A6E]/20 my-4" />

            <div className="space-y-3">
              <span className="text-xs font-mono-num text-[#5a644c] uppercase tracking-widest block font-bold">
                WHY I WANT IT
              </span>
              <p className="text-sm text-[#1c2118] leading-relaxed font-medium">
                {product.whyIWantIt}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-num text-[#5a644c] uppercase tracking-widest block font-bold">
                SPECIFICATIONS & DETAILS
              </span>
              <p className="text-xs text-[#5a644c] leading-relaxed font-medium">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#8B9A6E]/20">
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs py-4 px-6 rounded-full uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>GET THIS FOR ME</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onClaim(product);
                onClose();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#EEEEEE] hover:bg-[#EAE2D6] text-[#1c2118] border border-[#8B9A6E]/30 rounded-full font-mono-num font-bold text-xs py-3 px-6 uppercase tracking-widest transition-colors shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-[#8B9A6E]" />
              <span>{product.claimed ? 'THIS ONE IS TAKEN' : 'MARK AS CLAIMED'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
