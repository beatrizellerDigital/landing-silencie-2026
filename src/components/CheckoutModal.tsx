import { useState, useEffect, FormEvent } from 'react';
import { X, ShieldCheck, Mail, User, MapPin, Globe, CreditCard, Lock, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShippingDetails, PaymentDetails, OrderState } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  total: number;
  shipping: ShippingDetails;
  onSetShipping: (val: ShippingDetails) => void;
  payment: PaymentDetails;
  onSetPayment: (val: PaymentDetails) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onFinalize: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  step,
  total,
  shipping,
  onSetShipping,
  payment,
  onSetPayment,
  onPrevStep,
  onNextStep,
  onFinalize,
}: CheckoutModalProps) {
  
  // Local Form state errors validation
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Establishing secure token handshake...');
  
  // Set demo preset info for testing acceleration - extremely friendly feature
  const fillDemoShipping = () => {
    onSetShipping({
      name: 'Beatriz de Aguiar',
      email: 'deaguiarbeatriz77@gmail.com',
      address: '742 Evergreen Terrace',
      city: 'San Francisco',
      country: 'United States',
      zipCode: '94102',
    });
    setShippingErrors({});
  };

  const fillDemoPayment = () => {
    onSetPayment({
      cardNumber: '4242 4242 4242 4242',
      cardName: 'BEATRIZ DE AGUIAR',
      expiryDate: '12/29',
      cvv: '123',
    });
    setPaymentErrors({});
  };

  // Validate Step 1 - Shipping info
  const validateShipping = () => {
    const errs: Record<string, string> = {};
    if (!shipping.name.trim()) errs.name = 'Full name is required';
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) errs.email = 'Valid email is required';
    if (!shipping.address.trim()) errs.address = 'Street address is required';
    if (!shipping.city.trim()) errs.city = 'City is required';
    if (!shipping.zipCode.trim() || shipping.zipCode.length < 5) errs.zipCode = 'ZIP code is invalid';
    
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      onNextStep();
    }
  };

  // Format Card numbers & Expiry dates automatically
  const handleCardNumberChange = (val: string) => {
    const numeric = val.replace(/\D/g, '');
    const groups = numeric.match(/.{1,4}/g) || [];
    const formatted = groups.slice(0, 4).join(' ');
    onSetPayment({ ...payment, cardNumber: formatted });
  };

  const handleExpiryChange = (val: string) => {
    const numeric = val.replace(/\D/g, '');
    let formatted = numeric;
    if (numeric.length > 2) {
      formatted = numeric.slice(0, 2) + '/' + numeric.slice(2, 4);
    }
    onSetPayment({ ...payment, expiryDate: formatted.slice(0, 5) });
  };

  const handleCvvChange = (val: string) => {
    const numeric = val.replace(/\D/g, '');
    onSetPayment({ ...payment, cvv: numeric.slice(0, 4) });
  };

  // Validate Step 2 - Card info
  const validatePayment = () => {
    const errs: Record<string, string> = {};
    const cleanNum = payment.cardNumber.replace(/\s/g, '');
    if (cleanNum.length < 15) errs.cardNumber = 'Card number is too short';
    if (!payment.cardName.trim()) errs.cardName = 'Name must match physical card';
    if (payment.expiryDate.length < 5) errs.expiryDate = 'Format MM/YY required';
    if (payment.cvv.length < 3) errs.cvv = 'CVV is too short';

    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      onNextStep(); // Transition to processing loader (Step 3)
    }
  };

  // Cycle loader status messages during simulated processing step
  useEffect(() => {
    if (step === 3) {
      const timers = [
        setTimeout(() => setLoaderMessage('Establishing secure token handshake...'), 0),
        setTimeout(() => setLoaderMessage('Fusing encrypted payment keys...'), 1200),
        setTimeout(() => setLoaderMessage('Simulating physical transaction validation...'), 2400),
        setTimeout(() => setLoaderMessage('Finalizing order coordinates and inventory clearance...'), 3500),
        setTimeout(() => {
          onFinalize(); // Save final receipt layout (Step 4)
        }, 4600),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [step]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Gray Backdrop shield */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={step < 3 ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm pointer-events-auto"
          />

          {/* Stepper Modal structure */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10"
            id="modal-checkout-wizard"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div>
                <span className="block text-[10px] tracking-wider font-mono text-cyan-400 uppercase font-bold">
                  SECURE SECURE CHECKOUT PORTAL
                </span>
                <h2 className="font-sans font-extrabold text-lg text-white">
                  AuraGlass Premium Checkout
                </h2>
              </div>
              {step < 3 && (
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 cursor-pointer"
                  id="btn-close-checkout"
                  title="Fermer"
                  aria-label="Fermer la caisse"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Steps indicator bar (Hidden in Processing or Success screen) */}
            {step < 3 && (
              <div className="border-b border-slate-900 px-6 py-4 bg-slate-900/60 flex items-center justify-between">
                <div className="flex items-center space-x-6 w-full max-w-md mx-auto">
                  
                  {/* Step 1 badge */}
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center border ${
                      step === 1 ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      1
                    </span>
                    <span className={`text-xs font-semibold ${step === 1 ? 'text-white' : 'text-slate-500'}`}>Contact & Shipping</span>
                  </div>

                  <div className="flex-1 h-px bg-slate-800"></div>

                  {/* Step 2 badge */}
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center border ${
                      step === 2 ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      2
                    </span>
                    <span className={`text-xs font-semibold ${step === 2 ? 'text-white' : 'text-slate-500'}`}>Payment Shell</span>
                  </div>

                </div>
              </div>
            )}

            {/* STEP 1: SHIPPING INFORMATION */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="p-6 sm:p-8 space-y-6">
                
                {/* Fast track data fill */}
                <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center sm:justify-between justify-center gap-3">
                  <div className="flex items-start space-x-2.5">
                    <Smartphone className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-white">Accelerate Prototype Validation</span>
                      <p className="text-[11px] text-slate-400 leading-normal mt-0.5">Automate and autofill billing credentials.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoShipping}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-slate-950 hover:font-bold text-xs font-semibold font-mono rounded-lg cursor-pointer transition-all duration-300"
                    id="btn-fill-shipping-demo"
                  >
                    Simulate Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={shipping.name}
                        onChange={(e) => onSetShipping({ ...shipping, name: e.target.value })}
                        className={`w-full bg-slate-950/40 border ${shippingErrors.name ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white`}
                      />
                    </div>
                    {shippingErrors.name && <span className="block text-[10px] text-rose-400 font-mono">{shippingErrors.name}</span>}
                  </div>

                  {/* Email address */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={shipping.email}
                        onChange={(e) => onSetShipping({ ...shipping, email: e.target.value })}
                        className={`w-full bg-slate-950/40 border ${shippingErrors.email ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white`}
                      />
                    </div>
                    {shippingErrors.email && <span className="block text-[10px] text-rose-400 font-mono">{shippingErrors.email}</span>}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="123 Smart Light Boulevard"
                        value={shipping.address}
                        onChange={(e) => onSetShipping({ ...shipping, address: e.target.value })}
                        className={`w-full bg-slate-950/40 border ${shippingErrors.address ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white`}
                      />
                    </div>
                    {shippingErrors.address && <span className="block text-[10px] text-rose-400 font-mono">{shippingErrors.address}</span>}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">City</label>
                    <input
                      type="text"
                      placeholder="San Francisco"
                      value={shipping.city}
                      onChange={(e) => onSetShipping({ ...shipping, city: e.target.value })}
                      className={`w-full bg-slate-950/40 border ${shippingErrors.city ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl px-4 py-3 text-sm text-white`}
                    />
                    {shippingErrors.city && <span className="block text-[10px] text-rose-400 font-mono">{shippingErrors.city}</span>}
                  </div>

                  {/* Country Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select
                        value={shipping.country}
                        onChange={(e) => onSetShipping({ ...shipping, country: e.target.value })}
                        className="w-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none cursor-pointer"
                      >
                        <option value="United States">United States</option>
                        <option value="Spain">Spain</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  {/* ZIP code */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="94102"
                      value={shipping.zipCode}
                      onChange={(e) => onSetShipping({ ...shipping, zipCode: e.target.value })}
                      className={`w-full bg-slate-950/40 border ${shippingErrors.zipCode ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl px-4 py-3 text-sm text-white`}
                    />
                    {shippingErrors.zipCode && <span className="block text-[10px] text-rose-400 font-mono">{shippingErrors.zipCode}</span>}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800 pt-4 mt-4">
                  <div className="text-left">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Grand Total Amount</span>
                    <span className="text-xl font-bold text-white font-sans">${total.toFixed(2)}</span>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide rounded-xl flex items-center space-x-2 transition cursor-pointer"
                    id="btn-shipping-wizard-next"
                  >
                    <span>Proceed Setup Payment</span>
                    <Lock className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            )}

            {/* STEP 2: CREDIT CARD DETAILS */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="p-6 sm:p-8 space-y-6">
                
                {/* Autogenerate fast track data fill */}
                <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center sm:justify-between justify-center gap-3">
                  <div className="flex items-start space-x-2.5">
                    <Lock className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-white">Mock Checkout Simulator Secure</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Fill sandbox card metrics to confirm.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoPayment}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-cyan-500 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-slate-950 hover:font-bold text-xs font-semibold font-mono rounded-lg cursor-pointer transition-all duration-300"
                    id="btn-fill-payment-demo"
                  >
                    Simulate Card Info
                  </button>
                </div>

                {/* VISUAL CUSTOM 3D CREDIT CARD REPRESENTATION */}
                <div className="perspective-1000 flex justify-center py-4">
                  <motion.div
                    animate={{ rotateY: isCvvFocused ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full max-w-[340px] h-48 rounded-2xl text-white shadow-2xl preserve-3d"
                  >
                    {/* Front side of simulated credit card */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-800 to-cyan-900 border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between backface-hidden">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="font-mono text-xs font-bold tracking-widest">AuraGlass Private</span>
                        <div className="w-10 h-6 bg-slate-800/80 rounded-md border border-slate-700/50 flex items-center justify-center font-bold text-[11px] text-cyan-400 font-mono">
                          PD
                        </div>
                      </div>

                      {/* Chip */}
                      <div className="w-9 h-7 bg-amber-500/20 rounded-md border border-amber-500/30"></div>

                      <div className="space-y-4">
                        <span className="block font-mono text-lg tracking-[0.2em] text-white">
                          {payment.cardNumber || '•••• •••• •••• ••••'}
                        </span>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="block text-[8px] font-mono text-slate-500 uppercase">Card Holder</span>
                            <span className="block font-mono text-xs tracking-wider uppercase truncate max-w-[180px]">
                              {payment.cardName || 'YOUR FULL NAME'}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-slate-500 uppercase">Expires</span>
                            <span className="block font-mono text-xs tracking-wider">
                              {payment.expiryDate || 'MM/YY'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back side of simulated credit card (Revealed on CVV focus) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-800 to-indigo-950 border border-indigo-500/20 rounded-2xl py-6 flex flex-col justify-between backface-hidden rotate-y-180">
                      <div className="h-10 bg-slate-950 w-full mt-2"></div>
                      <div className="px-6 space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 h-8 bg-slate-800/80 flex items-center justify-end px-3 font-mono text-slate-400 text-xs text-right">
                            SIGNATURE BAND
                          </div>
                          <div className="w-12 h-8 bg-zinc-100 rounded text-slate-950 font-mono font-bold text-xs flex items-center justify-center">
                            {payment.cvv || '•••'}
                          </div>
                        </div>
                        <p className="text-[7px] text-slate-500 font-mono text-center">
                          AuraGlass hardware products payment companion. Verified sandbox system validation only. Do not provide real metrics if unencrypted.
                        </p>
                      </div>
                    </div>

                  </motion.div>
                </div>

                {/* Card input controllers */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {/* Card Number */}
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={payment.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        className={`w-full bg-slate-950/40 border ${paymentErrors.cardNumber ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono`}
                      />
                    </div>
                    {paymentErrors.cardNumber && <span className="block text-[10px] text-rose-400 font-mono">{paymentErrors.cardNumber}</span>}
                  </div>

                  {/* Card Name */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      value={payment.cardName}
                      onChange={(e) => onSetPayment({ ...payment, cardName: e.target.value })}
                      className={`w-full bg-slate-950/40 border ${paymentErrors.cardName ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl px-4 py-3 text-sm text-white uppercase font-mono`}
                    />
                    {paymentErrors.cardName && <span className="block text-[10px] text-rose-400 font-mono">{paymentErrors.cardName}</span>}
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={payment.expiryDate}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className={`w-full bg-slate-950/40 border ${paymentErrors.expiryDate ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl px-4 py-3 text-sm text-white text-center font-mono`}
                    />
                    {paymentErrors.expiryDate && <span className="block text-[10px] text-rose-400 font-mono">{paymentErrors.expiryDate}</span>}
                  </div>

                  {/* CVV Security sticker */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={payment.cvv}
                      onChange={(e) => handleCvvChange(e.target.value)}
                      onFocus={() => setIsCvvFocused(true)}
                      onBlur={() => setIsCvvFocused(false)}
                      className={`w-full bg-slate-950/40 border ${paymentErrors.cvv ? 'border-rose-500' : 'border-slate-800 hover:border-slate-700 focus:border-cyan-500'} focus:outline-none rounded-xl px-4 py-3 text-sm text-white text-center font-mono`}
                    />
                    {paymentErrors.cvv && <span className="block text-[10px] text-rose-400 font-mono">{paymentErrors.cvv}</span>}
                  </div>
                </div>

                {/* Back step & Submit buttons */}
                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800 pt-4 mt-4">
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Back Address info
                  </button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide rounded-xl flex items-center space-x-2 transition cursor-pointer"
                    id="btn-billing-submit-cta"
                  >
                    <span>Simulate Payment Receipt</span>
                    <ShieldCheck className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            )}

            {/* STEP 3: TRANSACTION PROCESSING LOADER */}
            {step === 3 && (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-6" id="payment-spinning-processor">
                <div className="relative w-20 h-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-cyan-500"
                  />
                  <Lock className="absolute inset-0 m-auto w-6 h-6 text-cyan-400 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-white text-base">Processing Order Assets</h3>
                  <motion.p
                    key={loaderMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-slate-400 font-mono text-xs min-h-[16px] tracking-wide"
                  >
                    {loaderMessage}
                  </motion.p>
                </div>

                <div className="w-full max-w-xs bg-slate-950 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.5, ease: "easeInOut" }}
                    className="h-full bg-cyan-400 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: ORDER SUCCESS RECEIPT STAGE IS COORDINATED BY APP VIEW FOR BETTER SCREENSPACE */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
