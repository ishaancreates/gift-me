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

  // Initialize and Sync LocalStorage & API
  useEffect(() => {
    const savedProducts = localStorage.getItem('wishlist_products_v2');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }

    // Fetch messages from MongoDB API
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
      })
      .catch((e) => console.error('Failed to load messages from MongoDB', e));
  }, []);

  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('wishlist_products_v2', JSON.stringify(newProds));
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

  const handleAddMessage = async (msg: { name: string; message: string }) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        const createdMsg: BirthdayMessage = await res.json();
        setMessages((prev) => [createdMsg, ...prev]);
      }
    } catch (e) {
      console.error('Failed to add message to MongoDB:', e);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete message from MongoDB:', e);
    }
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
        <div>
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
              <span>ISHAAN PANDEY'S BIRTHDAY WISHLIST</span>
              <span className="mx-2">•</span>
              <span>DON'T FORGET TO SURPRISE HIM</span>
            </div>
            <div className="text-right">
              <span>CONTACT: ISHAANMAYBE@GMAIL.COM OR 9198347345</span>
            </div>
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
