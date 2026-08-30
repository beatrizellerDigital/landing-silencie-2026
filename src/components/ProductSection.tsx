import { useState } from 'react';
import { Product, PRODUCTS } from '../types';
import { motion } from 'motion/react';
import { Check, Info, ShieldCheck, Zap, Star } from 'lucide-react';

interface ProductSectionProps {
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onBuyAllBundle: () => void;
}

export default function ProductSection({ onAddToCart, onBuyAllBundle }: ProductSectionProps) {
  const [activeSpecsTab, setActiveSpecsTab] = useState<Record<string, string>>({
    'auraglass-core': 'specs',
    'aura-acoustic-sphere': 'specs',
    'aura-sensor-element': 'specs',
    'auraglass-ultimate-bundle': 'specs',
  });

  const toggleSpecsTab = (productId: string, tab: string) => {
    setActiveSpecsTab((prev) => ({
      ...prev,
      [productId]: tab,
    }));
  };

  return (
    <section id="specs" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="block text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold mb-2">
              BUILD YOUR SANCTUARY
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              The AuraGlass Modular Ecosystem
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Each component of the AuraGlass system connects flawlessly through magnetic Gold Pogo PIN technology, delivering synchronous beauty to your eyes, ears, and soul.
            </p>
          </div>

          <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono px-4 py-2 border border-slate-900 rounded-xl bg-slate-900/40">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-bit order checkout validation encryption</span>
          </div>
        </div>

        {/* Modular Product cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="ecosystem-product-grid">
          {PRODUCTS.map((prod) => {
            const hasSpecs = prod.specs && Object.keys(prod.specs).length > 0;
            const isBundle = prod.category === 'bundle';

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col justify-between overflow-hidden rounded-3xl border ${
                  isBundle 
                    ? 'border-indigo-500 bg-slate-900/60 ring-1 ring-indigo-500/20' 
                    : 'border-slate-800 bg-slate-900/30'
                } relative`}
                id={`product-card-${prod.id}`}
              >
                {/* Special Bundle Banner indicator */}
                {isBundle && (
                  <div className="absolute top-0 right-0 bg-indigo-500 font-mono text-[9px] uppercase tracking-widest font-extrabold text-white py-1 px-4 rounded-bl-xl flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current stroke-0" />
                    <span>Best Seller Bundle</span>
                  </div>
                )}

                {/* Card Top Block */}
                <div>
                  {/* Aspect Ratio 4:3 product representation images */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>

                  {/* Pricing / Information block */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white">
                          {prod.name}
                        </h3>
                        <div className="text-right">
                          <span className="block font-sans font-black text-2xl text-cyan-400">
                            ${prod.price}
                          </span>
                          {prod.originalPrice && (
                            <span className="block font-sans text-xs text-slate-500 line-through">
                              ${prod.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="block text-xs text-indigo-400 font-mono tracking-wide mt-1">
                        {prod.tagline}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs uppercase tracking-wider text-slate-300 font-mono font-bold">Key Aspects</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prod.features.map((feat) => (
                          <li key={feat} className="flex items-center space-x-2 text-xs text-slate-300">
                            <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specifications/Detail toggles */}
                    {hasSpecs && (
                      <div className="border-t border-slate-800/80 pt-4 mt-2">
                        <div className="flex space-x-4 border-b border-slate-800/80 pb-2">
                          <button
                            onClick={() => toggleSpecsTab(prod.id, 'specs')}
                            className={`text-xs font-mono font-bold tracking-wider ${
                              activeSpecsTab[prod.id] === 'specs' ? 'text-white border-b border-cyan-500-custom pb-2' : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            TECHNICAL SPECS
                          </button>
                        </div>

                        {activeSpecsTab[prod.id] === 'specs' && (
                          <div className="grid grid-cols-1 gap-2 pt-3 font-mono text-[11px] text-slate-400">
                            {Object.entries(prod.specs).map(([specKey, specVal]) => (
                              <div key={specKey} className="flex justify-between border-b border-slate-900/60 pb-1.5">
                                <span className="font-semibold text-slate-500">{specKey}:</span>
                                <span className="text-slate-300 text-right">{specVal}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action footer button - Add to Cart */}
                <div className="p-6 sm:p-8 bg-slate-900/50 border-t border-slate-800/60 flex items-center justify-between gap-4">
                  {isBundle ? (
                    <motion.button
                      id="btn-buy-bundle-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onBuyAllBundle}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-sm tracking-wide text-center cursor-pointer shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
                      <span>Buy Complete Bundle (Save $48)</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      id={`btn-add-cart-${prod.id}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onAddToCart(prod)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-200 font-semibold text-xs tracking-wider uppercase border border-slate-700/60 hover:border-slate-600 transition-all duration-200 cursor-pointer text-center flex items-center justify-center space-x-1.5"
                    >
                      <span>Add to Cart Unit</span>
                    </motion.button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
