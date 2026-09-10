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
      <section className="min-h-screen w-full flex items-center justify-center p-6 bg-[#F7F2EB] text-[#1c2118]">
        <form
          onSubmit={handleAuth}
          className="w-full max-w-md bg-[#EAE2D6] border border-[#8B9A6E]/30 p-8 space-y-6 rounded-3xl text-center shadow-xl"
        >
          <div className="w-12 h-12 bg-[#8B9A6E]/20 text-[#8B9A6E] rounded-full flex items-center justify-center mx-auto border border-[#8B9A6E]/40">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black uppercase text-[#1c2118]">ADMIN DASHBOARD</h2>
            <p className="text-xs font-mono-num text-[#5a644c] font-bold">
              ENTER ACCESS CODE (Passcode: 3110)
            </p>
          </div>

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode..."
            className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl px-4 py-3 font-mono-num text-center text-[#1c2118] focus:outline-none focus:border-[#8B9A6E]"
          />

          <button
            type="submit"
            className="w-full bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs py-4 rounded-full uppercase tracking-widest transition-colors shadow-md"
          >
            AUTHENTICATE
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full p-6 md:p-16 bg-[#F7F2EB] text-[#1c2118] space-y-12">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#8B9A6E]/20 pb-8">
        <div>
          <span className="text-xs font-mono-num text-[#8B9A6E] uppercase tracking-widest block mb-2 font-bold">
            ADMINISTRATIVE CONTROL PANEL
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-[#1c2118]">
            WISHLIST MANAGER
          </h1>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onResetClaims}
            className="inline-flex items-center space-x-2 bg-[#EEEEEE] hover:bg-[#EAE2D6] text-[#1c2118] border border-[#8B9A6E]/30 font-mono-num text-xs px-5 py-3 rounded-full uppercase tracking-wider transition-colors font-bold shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-[#8B9A6E]" />
            <span>RESET ALL CLAIMS</span>
          </button>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-2 bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs px-6 py-3 rounded-full uppercase tracking-widest transition-colors shadow-md"
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
          className="bg-[#EAE2D6] border border-[#8B9A6E]/50 p-6 md:p-8 space-y-6 rounded-3xl shadow-xl"
        >
          <div className="flex justify-between items-center border-b border-[#8B9A6E]/20 pb-4">
            <h3 className="text-xl font-display font-black uppercase text-[#8B9A6E]">
              EDIT PRODUCT {editingProduct.number}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-xs font-mono-num text-[#5a644c] hover:text-[#1c2118] font-bold"
            >
              CANCEL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-num text-xs">
            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">NAME</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              />
            </div>

            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">PRICE</label>
              <input
                type="text"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              />
            </div>

            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">AMAZON PURCHASE URL</label>
              <input
                type="text"
                value={editingProduct.purchaseUrl}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, purchaseUrl: e.target.value })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              />
            </div>

            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">IMAGE URL</label>
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              />
            </div>

            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">CATEGORY</label>
              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value as any,
                  })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              >
                {['TECH', 'FASHION', 'BOOKS', 'GAMING', 'ACCESSORIES', 'OTHER'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#5a644c] block mb-1 font-bold">PRIORITY</label>
              <select
                value={editingProduct.priority}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    priority: e.target.value as any,
                  })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118]"
              >
                {['MUST HAVE', 'HIGH', 'NICE TO HAVE'].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-[#5a644c] block mb-1 font-bold">WHY I WANT IT</label>
              <textarea
                value={editingProduct.whyIWantIt}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, whyIWantIt: e.target.value })
                }
                className="w-full bg-[#EEEEEE] border border-[#8B9A6E]/30 rounded-xl p-3 text-[#1c2118] h-20"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-[#8B9A6E] hover:bg-[#7a895f] text-white font-mono-num font-bold text-xs py-3 px-8 rounded-full uppercase tracking-widest shadow-md"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      )}

      {/* Product List Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-black uppercase text-[#5a644c]">
          PRODUCTS ({products.length})
        </h3>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#EEEEEE] border border-[#8B9A6E]/20 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono-num text-xs shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold font-display text-[#8B9A6E]">
                  {p.number}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover border border-[#8B9A6E]/30 rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-[#1c2118] text-sm">{p.name}</h4>
                  <span className="text-[#5a644c] font-semibold">{p.price} • {p.category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    p.claimed
                      ? 'bg-[#8B9A6E] text-white'
                      : 'bg-[#EAE2D6] text-[#5a644c]'
                  }`}
                >
                  {p.claimed ? 'CLAIMED' : 'AVAILABLE'}
                </span>

                <button
                  onClick={() => setEditingProduct(p)}
                  className="bg-[#EAE2D6] hover:bg-[#8B9A6E] text-[#1c2118] hover:text-white p-2 rounded-lg border border-[#8B9A6E]/30 transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteProduct(p.id)}
                  className="bg-[#EAE2D6] hover:bg-[#8B9A6E] text-[#5a644c] hover:text-white p-2 rounded-lg border border-[#8B9A6E]/30 transition-colors"
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
        <h3 className="text-xl font-display font-black uppercase text-[#5a644c]">
          MESSAGES ({messages.length})
        </h3>

        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-[#EEEEEE] border border-[#8B9A6E]/20 p-4 rounded-2xl flex justify-between items-center font-mono-num text-xs shadow-sm"
            >
              <div>
                <span className="font-bold text-[#1c2118] block">{m.name}</span>
                <p className="text-[#5a644c] font-medium mt-1 font-sans">{m.message}</p>
              </div>
              <button
                onClick={() => onDeleteMessage(m.id)}
                className="text-[#5a644c] hover:text-[#8B9A6E] p-2"
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
