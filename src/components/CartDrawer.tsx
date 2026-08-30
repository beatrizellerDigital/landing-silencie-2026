import { X, Trash2, Plus, Minus, Tag, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { useState, FormEvent } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  estimatedTax: number;
  total: number;
  couponCode: string;
  discountPercent: number;
  discountSuccess: string;
  discountError: string;
  onUpdateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemoveFromCart: (productId: string, selectedColor?: string) => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onStartCheckout: () => void;
  onSetCouponCode: (code: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discountAmount,
  shippingCost,
  estimatedTax,
  total,
  couponCode,
  discountPercent,
  discountSuccess,
  discountError,
  onUpdateQuantity,
  onRemoveFromCart,
  onApplyCoupon,
  onRemoveCoupon,
  onStartCheckout,
  onSetCouponCode,
}: CartDrawerProps) {
  const [internalCode, setInternalCode] = useState('');

  const handleApplyCouponClick = (e: FormEvent) => {
    e.preventDefault();
    if (!internalCode.trim()) return;
    onApplyCoupon(internalCode);
  };

  const handleRemoveCouponClick = () => {
    onRemoveCoupon();
    setInternalCode('');
  };

  // Shipping progress computation
  const freeShippingThreshold = 150;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Gray Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-50 pointer-events-auto"
          />

          {/* Cart sliding physical chassis */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between"
            id="shopping-cart-drawer"
          >
            {/* Drawer top close action and title */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h2 className="font-sans font-extrabold text-lg text-white">Your Workspace Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700/50 cursor-pointer"
                id="btn-close-cart-drawer"
                title="Fermer"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Cart List Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-72 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-500">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-slate-300">Your cart is currently empty</h3>
                    <p className="text-slate-500 text-xs mt-1 max-w-[240px] mx-auto">
                      Explore the AuraGlass modular devices to build your acoustic lighting environment.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Shipping Progress bar warning */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{shippingProgress >= 100 ? '🎉 Free shipping unlocked!' : 'Progress to Free Express Shipping'}</span>
                      <span className="font-mono text-cyan-400">
                        {shippingProgress >= 100 ? '100%' : `$${remainingForFreeShipping.toFixed(2)} left`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${shippingProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* List of items */}
                  <div className="space-y-4" id="cart-items-collection">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor || ''}-${index}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-950/20 p-4 rounded-2xl border border-slate-800/80 flex space-x-3.5 relative"
                      >
                        {/* Remove item absolute indicator button */}
                        <button
                          onClick={() => onRemoveFromCart(item.product.id, item.selectedColor)}
                          className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          id={`btn-remove-item-${item.product.id}`}
                          title="Supprimer"
                          aria-label="Supprimer du panier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800/60">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="font-sans font-bold text-xs text-white truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <span className="inline-block px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-750 text-[9px] font-mono tracking-wider text-slate-400 mt-0.5">
                              Finish: {item.selectedColor}
                            </span>
                          )}

                          <div className="flex items-center justify-between mt-3 gap-2">
                            {/* Quantity counters */}
                            <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900/60 overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                                className="px-2 py-1 text-slate-450 hover:text-white cursor-pointer hover:bg-slate-800 transition"
                                id={`qty-minus-${item.product.id}`}
                                title="Diminuer"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-mono text-xs font-bold text-white leading-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                                className="px-2 py-1 text-slate-455 hover:text-white cursor-pointer hover:bg-slate-800 transition"
                                id={`qty-plus-${item.product.id}`}
                                title="Augmenter"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-cyan-400">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Invoice Calculations Drawer Card Container */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
                
                {/* Promo application Form */}
                <form onSubmit={handleApplyCouponClick} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="TRY 'ECLIPSE20' OR 'AURA10'"
                      value={internalCode}
                      onChange={(e) => setInternalCode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 focus:outline-none rounded-lg px-8 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white"
                      disabled={discountPercent > 0}
                    />
                  </div>
                  {discountPercent > 0 ? (
                    <button
                      type="button"
                      onClick={handleRemoveCouponClick}
                      className="px-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-slate-950 hover:font-bold rounded-lg text-xs font-mono transition-all duration-300 cursor-pointer"
                    >
                      Apply
                    </button>
                  )}
                </form>

                {/* Promo Code Alerts status feedback */}
                {discountError && (
                  <div className="flex items-center space-x-2 text-[11px] text-rose-400 font-mono bg-rose-950/20 px-3 py-1.5 rounded-md border border-rose-900/40">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{discountError}</span>
                  </div>
                )}
                {discountSuccess && (
                  <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-mono bg-emerald-950/20 px-3 py-1.5 rounded-md border border-emerald-900/40">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{discountSuccess}</span>
                  </div>
                )}

                {/* Pricing summary invoices */}
                <div className="space-y-2 pt-1 font-sans text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-mono text-[11px]">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Insurance</span>
                    <span className="font-mono font-semibold text-slate-200">
                      {shippingCost === 0 ? <b className="text-emerald-400 font-normal">FREE</b> : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Local Taxes (8%)</span>
                    <span className="font-mono font-semibold text-slate-200">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-800 pt-3 text-sm">
                    <span className="font-bold text-white">Estimated Total</span>
                    <span className="font-mono font-black text-white text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA checkout button */}
                <motion.button
                  id="btn-drawer-checkout-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartCheckout}
                  className="w-full mt-2 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center shadow-lg hover:shadow-cyan-500/10 flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer"
                >
                  <span>Proceed to Safe Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
