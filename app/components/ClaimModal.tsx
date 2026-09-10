'use client';

import React, { useState } from 'react';
import { Product } from '../data/wishlist';
import { X, ExternalLink, CheckCircle, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClaimModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirmClaim: (product: Product) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  product,
  onClose,
  onConfirmClaim,
}) => {
  const [isClaimedState, setIsClaimedState] = useState(false);

  if (!product) return null;

  const handleYes = () => {
    setIsClaimedState(true);
    onConfirmClaim(product);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#121216] border border-white/20 p-8 md:p-10 text-white text-center space-y-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {!isClaimedState ? (
          <>
            <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
              <Heart className="w-6 h-6 fill-red-500" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-num text-red-500 tracking-widest uppercase">
                GIFT CLAIMING
              </span>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight">
                YOU'RE GETTING THIS?
              </h2>
              <p className="text-sm font-light text-neutral-300">
                You're about to make my birthday significantly better.
              </p>
            </div>

            <div className="bg-neutral-900/80 p-4 border border-white/10 text-left space-y-1">
              <span className="text-[10px] font-mono-num text-neutral-500 uppercase">
                SELECTED ITEM
              </span>
              <h4 className="text-sm font-bold font-display text-white">
                {product.name}
              </h4>
              <span className="text-xs font-mono-num text-neutral-400">
                {product.price}
              </span>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={handleYes}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs py-4 uppercase tracking-widest transition-colors shadow-lg"
              >
                YES, I'LL GET IT
              </button>

              <button
                onClick={onClose}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-white/10 font-mono-num text-xs py-3 uppercase tracking-widest transition-colors"
              >
                NOT YET
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-display font-black text-emerald-400 uppercase tracking-tight">
                THIS ONE'S TAKEN!
              </h2>
              <p className="text-sm font-light text-neutral-300">
                Thank you so much! Now head over to Amazon to complete the order.
              </p>
            </div>

            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-white text-black hover:bg-red-500 hover:text-white font-mono-num font-bold text-xs py-5 uppercase tracking-widest transition-colors shadow-xl"
            >
              <span>OPEN AMAZON ↗</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </>
        )}
      </div>
    </div>
  );
};
