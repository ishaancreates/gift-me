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
import { PillNavbar } from './components/PillNavbar';

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
    <main className="min-h-screen bg-[#F7F2EB] text-[#1c2118] selection:bg-[#8B9A6E] selection:text-white font-sans relative">
      {/* Desktop Custom Dynamic Cursor */}
      <CustomCursor />

      {/* GSAP Preloader Ticker */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Modern Centered Pill Navigation Bar */}
      <PillNavbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
      />

      {/* Page Content Render */}
      {viewMode === 'home' ? (
        <div className="pt-10">
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
          <footer className="w-full p-8 md:p-16 bg-[#EEEEEE] text-[#5a644c] font-mono-num text-xs flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#8B9A6E]/20 font-bold">
            <div>
              <span>OCTOBER 31ST BIRTHDAY ARCHIVE</span>
              <span className="mx-2">•</span>
              <span>INSPIRED BY LANDON & ANIME</span>
            </div>
            <div>NO PAYMENT PROCESSED ON SITE • DIRECT AMAZON REDIRECTS</div>
          </footer>
        </div>
      ) : (
        <div className="pt-24">
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
