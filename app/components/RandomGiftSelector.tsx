'use client';

import React, { useState, useRef } from 'react';
import { Product } from '../data/wishlist';
import { animate } from 'animejs';
import { Shuffle, ExternalLink, Sparkles } from 'lucide-react';

interface RandomGiftSelectorProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const RandomGiftSelector: React.FC<RandomGiftSelectorProps> = ({
  products,
  onSelectProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayProduct, setDisplayProduct] = useState<Product>(products[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const spinReel = () => {
    if (isSpinning || products.length === 0) return;
    setIsSpinning(true);

    let counter = 0;
    const totalSpins = 24;
    const intervalTime = 60;

    // Anime.js rotation pulse on start
    if (cardRef.current) {
      animate(cardRef.current, {
        scale: [1, 0.95, 1],
        duration: 300,
        ease: 'inOutQuad',
      });
    }

    const interval = setInterval(() => {
      counter++;
      const randomIndex = Math.floor(Math.random() * products.length);
      setDisplayProduct(products[randomIndex]);

      if (counter >= totalSpins) {
        clearInterval(interval);
        const finalSelection = products[Math.floor(Math.random() * products.length)];
        setSelectedProduct(finalSelection);
        setDisplayProduct(finalSelection);
        setIsSpinning(false);

        // Final celebration trigger via Anime.js
        if (cardRef.current) {
          animate(cardRef.current, {
            translateY: [-20, 0],
            scale: [0.9, 1],
            duration: 600,
            ease: 'outElastic(1, .5)',
          });
        }
      }
    }, intervalTime);
  };

  return (
    <section className="w-full p-8 md:p-20 bg-[#0d0d11] text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <span className="text-xs font-mono-num text-red-500 uppercase tracking-widest block mb-2">
            MICRO-INTERACTION // ANIME.JS POWERED
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight">
            CAN'T DECIDE?
          </h2>
          <p className="text-sm font-mono-num text-neutral-400 mt-2 uppercase tracking-wider">
            LET CHANCE PICK A GIFT FOR YOU.
          </p>
        </div>

        {/* Randomizer Card Reel Display */}
        <div
          ref={cardRef}
          className="relative max-w-xl mx-auto bg-[#121216] border border-white/20 p-8 text-left shadow-2xl flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-full md:w-40 h-40 bg-neutral-900 overflow-hidden relative border border-white/10 shrink-0">
            <img
              src={displayProduct.image}
              alt={displayProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 font-mono-num text-xs bg-black/70 px-2 py-0.5 text-white">
              {displayProduct.number}
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-mono-num text-red-500 uppercase tracking-widest block">
              {displayProduct.category}
            </span>
            <h3 className="text-xl font-bold font-display text-white line-clamp-2">
              {displayProduct.name}
            </h3>
            <span className="text-sm font-mono-num text-neutral-300 block font-semibold">
              {displayProduct.price}
            </span>
          </div>
        </div>

        {/* Control Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={spinReel}
            disabled={isSpinning}
            className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-mono-num font-bold text-xs py-4 px-8 uppercase tracking-widest transition-colors shadow-lg cursor-pointer"
          >
            <Shuffle className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SELECTING...' : 'PICK ONE FOR ME'}</span>
          </button>

          {selectedProduct && (
            <a
              href={selectedProduct.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-black hover:bg-red-500 hover:text-white font-mono-num font-bold text-xs py-4 px-8 uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>GET THIS FOR ME</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
