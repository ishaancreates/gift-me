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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#121216] border border-white/20 text-white overflow-y-auto flex flex-col md:flex-row shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-red-600 text-white p-3 border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px] bg-neutral-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 z-10 font-mono-num text-5xl font-black text-white/30">
            {product.number}
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs font-mono-num text-red-500 uppercase tracking-widest">
              <span>{product.category}</span>
              <span>•</span>
              <span>PRIORITY // {product.priority}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-display font-black uppercase text-white leading-tight">
              {product.name}
            </h2>

            <div className="text-xl font-mono-num text-neutral-300 font-bold">
              {product.price}
            </div>

            <hr className="border-white/10 my-4" />

            <div className="space-y-3">
              <span className="text-xs font-mono-num text-neutral-400 uppercase tracking-widest block font-bold">
                WHY I WANT IT
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {product.whyIWantIt}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-num text-neutral-400 uppercase tracking-widest block font-bold">
                SPECIFICATIONS & DETAILS
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs py-4 px-6 uppercase tracking-widest transition-colors shadow-xl"
            >
              <span>GET THIS FOR ME</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onClaim(product);
                onClose();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 font-mono-num font-semibold text-xs py-3 px-6 uppercase tracking-widest transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-red-500" />
              <span>{product.claimed ? 'THIS ONE IS TAKEN' : 'MARK AS CLAIMED'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
