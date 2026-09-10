'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_MESSAGES, Product, BirthdayMessage } from './data/wishlist';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { WishlistGrid } from './components/WishlistGrid';
import { FeaturedProduct } from './components/FeaturedProduct';
import { RandomGiftSelector } from './components/RandomGiftSelector';
import { MessageWall } from './components/MessageWall';
import { ProductModal } from './components/ProductModal';
import { ClaimModal } from './components/ClaimModal';
import { DeliveryModal } from './components/DeliveryModal';
import { AdminView } from './components/AdminView';
import { MapPin, Lock, Gift } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [messages, setMessages] = useState<BirthdayMessage[]>(INITIAL_MESSAGES);
  const [viewMode, setViewMode] = useState<'home' | 'admin'>('home');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [claimingProduct, setClaimingProduct] = useState<Product | null>(null);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  // Initialize and Sync LocalStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('wishlist_products_v2');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }

    const savedMessages = localStorage.getItem('wishlist_messages_v1');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    }
  }, []);

  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('wishlist_products_v2', JSON.stringify(newProds));
  };

  const saveMessages = (newMsgs: BirthdayMessage[]) => {
    setMessages(newMsgs);
    localStorage.setItem('wishlist_messages_v1', JSON.stringify(newMsgs));
  };

  // Product Claim Handler
  const handleConfirmClaim = (product: Product) => {
    const updated = products.map((p) =>
      p.id === product.id ? { ...p, claimed: true } : p
    );
    saveProducts(updated);
  };

  // Admin Handlers
  const handleUpdateProduct = (updated: Product) => {
    const list = products.map((p) => (p.id === updated.id ? updated : p));
    saveProducts(list);
  };

  const handleAddProduct = (newProd: Product) => {
    const list = [...products, newProd];
    saveProducts(list);
  };

  const handleDeleteProduct = (id: string) => {
    const list = products.filter((p) => p.id !== id);
    saveProducts(list);
  };

  const handleResetClaims = () => {
    const list = products.map((p) => ({ ...p, claimed: false }));
    saveProducts(list);
  };

  const handleAddMessage = (msg: { name: string; message: string }) => {
    const newMsg: BirthdayMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      message: msg.message,
      timestamp: 'Just now',
      rotation: (Math.random() - 0.5) * 5,
    };
    saveMessages([newMsg, ...messages]);
  };

  const handleDeleteMessage = (id: string) => {
    const list = messages.filter((m) => m.id !== id);
    saveMessages(list);
  };

  const featuredItem = products.find((p) => p.featured) || products[0];

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-red-600 selection:text-white font-sans relative">
      {/* Desktop Custom Dynamic Cursor */}
      <CustomCursor />

      {/* GSAP Preloader Ticker */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => setViewMode('home')}
          className="flex items-center space-x-2 text-xs font-mono-num font-bold tracking-widest uppercase hover:text-red-500 transition-colors"
        >
          <Gift className="w-4 h-4 text-red-500" />
          <span>BIRTHDAY WISHLIST // 31 OCT</span>
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDeliveryOpen(true)}
            data-cursor
            data-cursor-text="ADDRESS"
            className="flex items-center space-x-2 text-xs font-mono-num bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 uppercase tracking-wider transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">WHERE SHOULD I SEND IT?</span>
            <span className="sm:hidden">ADDRESS</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'home' ? 'admin' : 'home')}
            data-cursor
            data-cursor-text="ADMIN"
            className="flex items-center space-x-1 text-xs font-mono-num bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-500/30 px-3 py-2 uppercase tracking-wider transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{viewMode === 'home' ? 'ADMIN' : 'VIEW SITE'}</span>
          </button>
        </div>
      </header>

      {/* Page Content Render */}
      {viewMode === 'home' ? (
        <div className="pt-16">
          <Hero />
          <IntroSection />

          {/* Editorial Wishlist Grid */}
          <WishlistGrid
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onClaimRequest={(p, e) => {
              e.stopPropagation();
              setClaimingProduct(p);
            }}
          />

          {/* Fullwidth Centerpiece Featured Product */}
          {featuredItem && (
            <FeaturedProduct
              product={featuredItem}
              onSelect={(p) => setSelectedProduct(p)}
            />
          )}

          {/* Anime.js Interactive Random Gift Picker */}
          <RandomGiftSelector
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

          {/* Birthday Guestbook Message Wall */}
          <MessageWall messages={messages} onAddMessage={handleAddMessage} />

          {/* Editorial Footer */}
          <footer className="w-full p-8 md:p-16 bg-black text-neutral-500 font-mono-num text-xs flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
            <div>
              <span>OCTOBER 31ST BIRTHDAY ARCHIVE</span>
              <span className="mx-2">•</span>
              <span>INSPIRED BY LANDON & ANIME</span>
            </div>
            <div>NO PAYMENT PROCESSED ON SITE • DIRECT AMAZON REDIRECTS</div>
          </footer>
        </div>
      ) : (
        <div className="pt-16">
          <AdminView
            products={products}
            messages={messages}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onResetClaims={handleResetClaims}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
      )}

      {/* Interactive Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onClaim={(p) => setClaimingProduct(p)}
      />

      <ClaimModal
        product={claimingProduct}
        onClose={() => setClaimingProduct(null)}
        onConfirmClaim={handleConfirmClaim}
      />

      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
      />
    </main>
  );
}
