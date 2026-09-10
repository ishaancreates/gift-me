'use client';

import React, { useState } from 'react';
import { BirthdayMessage } from '../data/wishlist';
import { MessageSquare, Send, User } from 'lucide-react';

interface MessageWallProps {
  messages: BirthdayMessage[];
  onAddMessage: (msg: { name: string; message: string }) => void;
}

export const MessageWall: React.FC<MessageWallProps> = ({ messages, onAddMessage }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddMessage({ name, message });
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="w-full p-8 md:p-20 bg-[#F7F2EB] text-[#1c2118] border-b border-[#8B9A6E]/20 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest block mb-2 font-bold">
              GUESTBOOK // COMMUNITY WALL
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase text-[#1c2118]">
              LEAVE ME SOMETHING.
            </h2>
          </div>
          <p className="text-xs font-mono-num text-[#5a644c] uppercase tracking-widest max-w-xs font-semibold">
            NO GIFT? NO PROBLEM. LEAVE A BIRTHDAY NOTE OR WORD OF ADVICE.
          </p>
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#EAE2D6] border border-[#8B9A6E]/30 p-6 md:p-8 space-y-4 rounded-3xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono-num text-[#5a644c] uppercase tracking-widest font-bold">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl px-4 py-3 text-sm font-mono-num text-[#1c2118] placeholder-[#5a644c]/60 focus:outline-none focus:border-[#8B9A6E] transition-colors"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-mono-num text-[#5a644c] uppercase tracking-widest font-bold">
                YOUR BIRTHDAY MESSAGE
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Wish me a happy 31 October birthday..."
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl px-4 py-3 text-sm font-mono-num text-[#1c2118] placeholder-[#5a644c]/60 focus:outline-none focus:border-[#8B9A6E] transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            {submitted ? (
              <span className="text-xs font-mono-num text-[#8B9A6E] uppercase tracking-wider font-bold">
                ✓ MESSAGE POSTED TO THE WALL!
              </span>
            ) : (
              <span className="text-[10px] font-mono-num text-[#5a644c] uppercase font-semibold">
                PUBLIC DISPLAY ON WISHLIST WALL
              </span>
            )}

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs px-6 py-3 rounded-full uppercase tracking-widest transition-colors shadow-md"
            >
              <span>SEND MESSAGE</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Message Cards Grid (Angled & Skewed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                transform: `rotate(${msg.rotation || 0}deg)`,
              }}
              className="bg-[#EEEEEE] border border-[#8B9A6E]/30 hover:border-[#8B9A6E] p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <p className="text-sm font-medium text-[#1c2118] leading-relaxed italic">
                "{msg.message}"
              </p>

              <div className="flex justify-between items-center border-t border-[#8B9A6E]/20 pt-3 font-mono-num text-xs">
                <span className="font-bold text-[#8B9A6E] uppercase">{msg.name}</span>
                <span className="text-[10px] text-[#5a644c] font-bold">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
