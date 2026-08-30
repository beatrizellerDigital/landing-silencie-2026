import { ArrowRight, Sparkles, Shield, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onBuyAllBundle: () => void;
  onScrollToElement: (id: string) => void;
}

export default function Hero({ onBuyAllBundle, onScrollToElement }: HeroProps) {
  const [currentTime, setCurrentTime] = useState('');

  // Update holographic clock simulation
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] bg-slate-950 overflow-hidden flex items-center pt-8 pb-16">
      {/* Visual background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Hero text information */}
          <div className="space-y-8" id="hero-content">
            {/* Promo Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>LAUNCH PROMOTION: SAVE 20% WITH CODE <b className="font-mono text-cyan-300">ECLIPSE20</b></span>
            </div>

            {/* Title / Description */}
            <div className="space-y-4">
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
                Sculpting Light & Sound For Your
                <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 bg-clip-text text-transparent">
                  Aesthetic Sanctuary
                </span>
              </h1>
              <p className="text-slate-400 text-lg sm:text-xl max-w-lg leading-relaxed">
                Meet AuraGlass: a premium holographic desk timepiece and ambient auditory projector designed to align your biological rhythms with stunning lightwaves.
              </p>
            </div>

            {/* Core checkout actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <motion.button
                id="btn-buy-bundle-hero"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBuyAllBundle}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-base shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center space-x-3 group cursor-pointer"
              >
                <span>Buy Complete Bundle (Save $48)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                id="btn-scroll-customizer"
                onClick={() => onScrollToElement('customizer')}
                className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-base transition-all duration-300 text-center cursor-pointer"
              >
                Customize Yours
              </button>
            </div>

            {/* Value pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900/80">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-400 font-medium font-mono">Free Express Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-400 font-medium font-mono">3 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-400 font-medium font-mono">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Interactive device visualization container */}
          <div className="flex justify-center items-center lg:justify-end" id="hero-orb-render">
            <div className="relative w-80 h-96 sm:w-96 sm:h-[450px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl flex items-center justify-center p-8 overflow-hidden group">
              
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950 pointer-events-none"></div>

              {/* Dynamic Aura projection light - pulsing */}
              <div className="absolute top-1/4 w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 opacity-30 blur-[40px] animate-pulse"></div>

              {/* Physical AuraGlass Cylinder Base representation in CSS */}
              <div className="relative z-10 w-48 h-72 flex flex-col items-center">
                
                {/* Projected Hologram Area (Floating UI text with holographic glow effects) */}
                <div className="relative flex flex-col items-center justify-center h-48 w-48 mb-4 border border-dashed border-cyan-500/10 rounded-full">
                  
                  {/* Floating Laser Projection light effect */}
                  <div className="absolute bottom-0 w-8 h-1 bg-cyan-400 blur-sm animate-pulse"></div>
                  <div className="absolute bottom-0 w-2 h-40 bg-gradient-to-t from-cyan-400/40 via-cyan-400/5 to-transparent rounded-full origin-bottom transform scale-x-50"></div>

                  {/* Holographic Glowing Clock numbers */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <span className="block font-mono text-4xl font-extrabold text-cyan-300 tracking-wider drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
                      {currentTime || '12:00:00'}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mt-2">
                      SOLAR CYCLE SYNC
                    </span>
                  </motion.div>
                </div>

                {/* Glass Cylinder Physical Body */}
                <div className="relative w-40 h-28 bg-slate-900/40 border border-slate-700/50 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-between items-center py-2 overflow-hidden">
                  
                  {/* Reflection gloss streaks */}
                  <div className="absolute -left-12 top-0 w-4 h-full bg-white/5 skew-x-12 transform group-hover:translate-x-60 transition-transform duration-1000 ease-in-out"></div>
                  <div className="absolute right-4 top-2 w-1.5 h-10 bg-white/10 rounded-full"></div>

                  {/* Laser projector focal lens inside capsule */}
                  <div className="w-12 h-1.5 bg-slate-800 border-t border-slate-600 rounded-full mt-3"></div>
                  
                  {/* Internal ambient glowing bulb rod */}
                  <div className="w-1.5 h-12 bg-gradient-to-t from-indigo-500 via-cyan-400 to-transparent rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

                  {/* Bottom mechanical chassis spacer */}
                  <div className="w-full border-t border-slate-800 px-4 pt-1 pb-1">
                    <div className="flex justify-between items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                      <span className="font-mono text-[8px] text-slate-500 tracking-wider">AURA-V4.2.1</span>
                      <div className="flex space-x-1 text-slate-400">
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOLID Aluminum Unibody base */}
                <div className="w-44 h-5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600 shadow-lg relative">
                  {/* Polished chamfered chrome accent */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-white/30"></div>
                </div>
              </div>

              {/* Status display element floating in bottom right of card */}
              <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">SYSTEM CO2</span>
                  <span className="block font-mono text-xs text-slate-300 font-bold">412 ppm (Optimal)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
