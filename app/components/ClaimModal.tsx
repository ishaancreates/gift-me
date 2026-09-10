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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2118]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F7F2EB] border border-[#8B9A6E]/30 p-8 md:p-10 rounded-3xl text-[#1c2118] text-center space-y-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5a644c] hover:text-[#1c2118] p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {!isClaimedState ? (
          <>
            <div className="w-12 h-12 bg-[#8B9A6E]/20 text-[#8B9A6E] rounded-full flex items-center justify-center mx-auto border border-[#8B9A6E]/40">
              <Heart className="w-6 h-6 fill-[#8B9A6E]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-num text-[#8B9A6E] tracking-widest uppercase font-bold">
                GIFT CLAIMING
              </span>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-[#1c2118]">
                YOU'RE GETTING THIS?
              </h2>
              <p className="text-sm font-medium text-[#5a644c]">
                You're about to make my birthday significantly better.
              </p>
            </div>

            <div className="bg-[#EAE2D6] p-4 border border-[#8B9A6E]/20 rounded-2xl text-left space-y-1">
              <span className="text-[10px] font-mono-num text-[#5a644c] uppercase font-bold">
                SELECTED ITEM
              </span>
              <h4 className="text-sm font-bold font-display text-[#1c2118]">
                {product.name}
              </h4>
              <span className="text-xs font-mono-num text-[#8B9A6E] font-bold">
                {product.price}
              </span>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={handleYes}
                className="w-full bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs py-4 rounded-full uppercase tracking-widest transition-colors shadow-lg"
              >
                YES, I'LL GET IT
              </button>

              <button
                onClick={onClose}
                className="w-full bg-[#EEEEEE] hover:bg-[#EAE2D6] text-[#5a644c] border border-[#8B9A6E]/30 rounded-full font-mono-num text-xs py-3 uppercase tracking-widest transition-colors font-bold"
              >
                NOT YET
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-[#8B9A6E]/20 text-[#8B9A6E] rounded-full flex items-center justify-center mx-auto border border-[#8B9A6E]/40">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-display font-black text-[#8B9A6E] uppercase tracking-tight">
                THIS ONE'S TAKEN!
              </h2>
              <p className="text-sm font-medium text-[#5a644c]">
                Thank you so much! Now head over to Amazon to complete the order.
              </p>
            </div>

            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-[#8B9A6E] text-white hover:bg-[#7a895f] font-mono-num font-bold text-xs py-5 rounded-full uppercase tracking-widest transition-colors shadow-xl"
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
