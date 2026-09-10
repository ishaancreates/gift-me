'use client';

import React, { useState } from 'react';
import { X, Copy, Check, MapPin, AlertCircle } from 'lucide-react';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const addressText = `VF12 Old VS Hostel\nKNIT Sultanpur\n228118\nUttar Pradesh\nIndia`;

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c2118]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F7F2EB] border border-[#8B9A6E]/30 p-8 md:p-10 rounded-3xl text-[#1c2118] space-y-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5a644c] hover:text-[#1c2118] p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest font-bold">
          <MapPin className="w-4 h-4" />
          <span>DELIVERY ADDRESS PROTOCOL</span>
        </div>

        {!revealed ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-12 h-12 bg-[#8B9A6E]/20 text-[#8B9A6E] rounded-full flex items-center justify-center mx-auto border border-[#8B9A6E]/30">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-black uppercase text-[#1c2118]">
                WHERE SHOULD I SEND IT?
              </h3>
              <p className="text-xs font-mono-num text-[#5a644c] uppercase tracking-wider font-bold">
                Only open this if you're actually sending a gift.
              </p>
            </div>

            <button
              onClick={() => setRevealed(true)}
              className="w-full bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs py-4 rounded-full uppercase tracking-widest transition-colors shadow-lg"
            >
              REVEAL DELIVERY ADDRESS
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-black uppercase text-[#1c2118]">
                DELIVERY DETAILS
              </h3>
              <p className="text-xs font-mono-num text-[#5a644c] uppercase tracking-wider font-bold">
                Use this exact address for Amazon checkout:
              </p>
            </div>

            <div className="bg-[#EAE2D6] p-6 border border-[#8B9A6E]/20 rounded-2xl font-mono-num text-sm text-[#1c2118] leading-relaxed space-y-1">
              <p className="font-bold text-[#1c2118]">VF12 Old VS Hostel</p>
              <p>KNIT Sultanpur</p>
              <p>228118</p>
              <p>Uttar Pradesh</p>
              <p className="text-[#8B9A6E] font-bold">India</p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#8B9A6E] text-white hover:bg-[#7a895f] rounded-full font-mono-num font-bold text-xs py-4 uppercase tracking-widest transition-colors shadow-lg"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
