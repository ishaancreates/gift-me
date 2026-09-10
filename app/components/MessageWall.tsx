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
    <section className="w-full p-8 md:p-20 bg-[#0a0a0c] text-white border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs font-mono-num text-red-500 uppercase tracking-widest block mb-2">
              GUESTBOOK // COMMUNITY WALL
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase">
              LEAVE ME SOMETHING.
            </h2>
          </div>
          <p className="text-xs font-mono-num text-neutral-400 uppercase tracking-widest max-w-xs">
            NO GIFT? NO PROBLEM. LEAVE A BIRTHDAY NOTE OR WORD OF ADVICE.
          </p>
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#121216] border border-white/10 p-6 md:p-8 space-y-4 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono-num text-neutral-400 uppercase tracking-widest">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-neutral-950 border border-white/10 px-4 py-3 text-sm font-mono-num text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-mono-num text-neutral-400 uppercase tracking-widest">
                YOUR BIRTHDAY MESSAGE
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Wish me a happy 31 October birthday..."
                className="w-full bg-neutral-950 border border-white/10 px-4 py-3 text-sm font-mono-num text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            {submitted ? (
              <span className="text-xs font-mono-num text-emerald-400 uppercase tracking-wider">
                ✓ MESSAGE POSTED TO THE WALL!
              </span>
            ) : (
              <span className="text-[10px] font-mono-num text-neutral-500 uppercase">
                PUBLIC DISPLAY ON WISHLIST WALL
              </span>
            )}

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs px-6 py-3 uppercase tracking-widest transition-colors"
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
              className="bg-[#14141a] border border-white/10 hover:border-red-500/40 p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <p className="text-sm font-light text-neutral-200 leading-relaxed italic">
                "{msg.message}"
              </p>

              <div className="flex justify-between items-center border-t border-white/5 pt-3 font-mono-num text-xs">
                <span className="font-bold text-white uppercase">{msg.name}</span>
                <span className="text-[10px] text-neutral-500">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
