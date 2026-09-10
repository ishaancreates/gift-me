'use client';

import React, { useState } from 'react';
import { Product, BirthdayMessage } from '../data/wishlist';
import { Plus, Trash2, Edit3, Check, RotateCcw, Lock } from 'lucide-react';

interface AdminViewProps {
  products: Product[];
  messages: BirthdayMessage[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onResetClaims: () => void;
  onDeleteMessage: (id: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  messages,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetClaims,
  onDeleteMessage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Simple admin lock screen passcode check
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '3110' || passcode === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid passcode. Use "3110" or "admin".');
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleCreateNew = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      number: String(products.length + 1).padStart(2, '0'),
      name: 'NEW WISHLIST ITEM',
      category: 'TECH',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
      description: 'Product details description',
      whyIWantIt: 'Reason why I want this item',
      purchaseUrl: 'https://www.amazon.in/',
      priority: 'HIGH',
      claimed: false,
    };
    onAddProduct(newProd);
    setEditingProduct(newProd);
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0a0a0c] text-white">
        <form
          onSubmit={handleAuth}
          className="w-full max-w-md bg-[#121216] border border-white/20 p-8 space-y-6 text-center"
        >
          <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black uppercase">ADMIN DASHBOARD</h2>
            <p className="text-xs font-mono-num text-neutral-400">
              ENTER ACCESS CODE (Passcode: 3110)
            </p>
          </div>

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode..."
            className="w-full bg-neutral-950 border border-white/10 px-4 py-3 font-mono-num text-center text-white focus:outline-none focus:border-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs py-4 uppercase tracking-widest transition-colors"
          >
            AUTHENTICATE
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full p-6 md:p-16 bg-[#0a0a0c] text-white space-y-12">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="text-xs font-mono-num text-red-500 uppercase tracking-widest block mb-2">
            ADMINISTRATIVE CONTROL PANEL
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase">
            WISHLIST MANAGER
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onResetClaims}
            className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/10 font-mono-num text-xs px-5 py-3 uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-red-500" />
            <span>RESET ALL CLAIMS</span>
          </button>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs px-6 py-3 uppercase tracking-widest transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW ITEM</span>
          </button>
        </div>
      </div>

      {/* Product Edit Drawer Modal */}
      {editingProduct && (
        <form
          onSubmit={handleSaveEdit}
          className="bg-[#14141a] border border-red-500/50 p-6 md:p-8 space-y-6 rounded-none shadow-2xl"
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h3 className="text-xl font-display font-black uppercase text-red-500">
              EDIT PRODUCT {editingProduct.number}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-xs font-mono-num text-neutral-400 hover:text-white"
            >
              CANCEL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-num text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">NAME</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">PRICE</label>
              <input
                type="text"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">AMAZON PURCHASE URL</label>
              <input
                type="text"
                value={editingProduct.purchaseUrl}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, purchaseUrl: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">IMAGE URL</label>
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">CATEGORY</label>
              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value as any,
                  })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              >
                {['TECH', 'FASHION', 'BOOKS', 'GAMING', 'ACCESSORIES', 'OTHER'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">PRIORITY</label>
              <select
                value={editingProduct.priority}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    priority: e.target.value as any,
                  })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white"
              >
                {['MUST HAVE', 'HIGH', 'NICE TO HAVE'].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-neutral-400 block mb-1">WHY I WANT IT</label>
              <textarea
                value={editingProduct.whyIWantIt}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, whyIWantIt: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 p-3 text-white h-20"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-mono-num font-bold text-xs py-3 px-8 uppercase tracking-widest"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      )}

      {/* Product List Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-black uppercase text-neutral-400">
          PRODUCTS ({products.length})
        </h3>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#121216] border border-white/10 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono-num text-xs"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold font-display text-red-500">
                  {p.number}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  <span className="text-neutral-500">{p.price} • {p.category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <span
                  className={`px-2 py-1 text-[10px] ${
                    p.claimed
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-900 text-neutral-400'
                  }`}
                >
                  {p.claimed ? 'CLAIMED' : 'AVAILABLE'}
                </span>

                <button
                  onClick={() => setEditingProduct(p)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white p-2 border border-white/10"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteProduct(p.id)}
                  className="bg-red-950/60 hover:bg-red-900 text-red-400 p-2 border border-red-500/30"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Management Table */}
      <div className="space-y-4 pt-8">
        <h3 className="text-xl font-display font-black uppercase text-neutral-400">
          MESSAGES ({messages.length})
        </h3>

        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-[#121216] border border-white/10 p-4 flex justify-between items-center font-mono-num text-xs"
            >
              <div>
                <span className="font-bold text-white block">{m.name}</span>
                <p className="text-neutral-300 font-light mt-1 font-sans">{m.message}</p>
              </div>
              <button
                onClick={() => onDeleteMessage(m.id)}
                className="text-neutral-500 hover:text-red-500 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
