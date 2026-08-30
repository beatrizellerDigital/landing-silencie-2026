import { ShoppingCart, Compass, HelpCircle, Layers, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToElement: (id: string) => void;
}

export default function Navbar({ cartCount, onOpenCart, onScrollToElement }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onScrollToElement('hero')}
          id="nav-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-cyan-400 blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="font-sans font-bold text-xl tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AuraGlass
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-cyan-400 font-mono -mt-1 font-semibold">
              Cyber-Aesthetics
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
          <button
            onClick={() => onScrollToElement('customizer')}
            className="flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
            id="nav-btn-customizer"
          >
            <Compass className="w-4 h-4 text-cyan-500" />
            <span>Interactive Customizer</span>
          </button>
          
          <button
            onClick={() => onScrollToElement('specs')}
            className="flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
            id="nav-btn-ecosystem"
          >
            <Layers className="w-4 h-4 text-cyan-500" />
            <span>The Ecosystem</span>
          </button>

          <button
            onClick={() => onScrollToElement('faqs')}
            className="flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
            id="nav-btn-support"
          >
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            <span>Support</span>
          </button>
        </nav>

        {/* Cart Trigger Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onScrollToElement('customizer')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            id="btn-header-customize"
          >
            Design Yours
          </button>

          <motion.button
            onClick={onOpenCart}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-xl bg-slate-800 border border-slate-700/60 hover:border-cyan-500 text-slate-200 hover:text-white hover:bg-slate-800/80 transition-all duration-300 cursor-pointer shadow-md"
            id="btn-cart-toggle"
            title="Panier"
            aria-label="Ouvrir le panier"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center border border-slate-900 shadow-md shadow-rose-500/30"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
