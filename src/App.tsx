import { useState, useTransition } from 'react';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './components/SvgLogos';
import { TRANSLATIONS, Language } from './translations';

// Custom modular components imported
import PromiseHero from './components/PromiseHero';
import VideoSection from './components/VideoSection';
import AccrocheSection from './components/AccrocheSection';
import BenefitsAccordion from './components/BenefitsAccordion';
import ProgramModules from './components/ProgramModules';
import PracticalExample from './components/PracticalExample';
import PricingCheckout from './components/PricingCheckout';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL query parameters (e.g., ?lang=es)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && ['fr', 'es', 'en', 'pt'].includes(urlLang)) {
        return urlLang as Language;
      }

      // 2. Check localStorage to see if they manually changed it before
      const savedLang = localStorage.getItem('user_lang');
      if (savedLang && ['fr', 'es', 'en', 'pt'].includes(savedLang)) {
        return savedLang as Language;
      }

      // 3. Detect the browser default language
      const browserLang = navigator.language.split('-')[0];
      if (['fr', 'es', 'en', 'pt'].includes(browserLang)) {
        return browserLang as Language;
      }
    }
    return 'fr'; // Fallback default
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_lang', newLang);
    }
  };

  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToElement = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadHTML = async () => {
    try {
      const response = await fetch('/SilenciaElPanico_LandingPage.html');
      const text = await response.text();
      const blob = new Blob([text], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SilenciaElPanico_LandingPage.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error during direct download:', e);
      const fallbackAnchor = document.createElement('a');
      fallbackAnchor.href = '/SilenciaElPanico_LandingPage.html';
      fallbackAnchor.download = 'SilenciaElPanico_LandingPage.html';
      fallbackAnchor.target = '_self';
      document.body.appendChild(fallbackAnchor);
      fallbackAnchor.click();
      document.body.removeChild(fallbackAnchor);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#38bdf8] via-[#0ea5e9] to-[#025684] text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden antialiased">
      
      {/* Tiny subtle calm visual water ripples background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px] z-0"></div>

      {/* STICKY LANDING NAVIGATION HEADER */}
      <nav id="sticky-landing-nav" className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-sky-200/50 py-4 px-4 sm:px-8 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleScrollToElement('sticky-landing-nav')}>
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border border-slate-200 shrink-0">
              <BrandLogo className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <span className="font-sans font-black text-base sm:text-lg tracking-tight text-slate-950 uppercase block leading-none">SILENCIE VOTRE ESPRIT</span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#0284c7] block mt-1 uppercase">{TRANSLATIONS[lang].nav.desc}</span>
            </div>
          </div>

          {/* Desktop Anchor Link Items */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-extrabold tracking-wide uppercase text-slate-700">
            <button type="button" onClick={() => handleScrollToElement('video-section')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.video}</button>
            <button type="button" onClick={() => handleScrollToElement('problem-section')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.problem}</button>
            <button type="button" onClick={() => handleScrollToElement('benefits-accordion')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.benefits}</button>
            <button type="button" onClick={() => handleScrollToElement('modules-section')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.program}</button>
            <button type="button" onClick={() => handleScrollToElement('practical-example')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.demo}</button>
            <button type="button" onClick={() => handleScrollToElement('pricing-checkout-block')} className="hover:text-sky-600 transition cursor-pointer">{TRANSLATIONS[lang].nav.pricing}</button>
          </div>

          {/* Language Switcher and CTA buttons */}
          <div className="hidden sm:flex items-center space-x-3.5">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['fr', 'es', 'en', 'pt'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleScrollToElement('pricing-checkout-block')}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black rounded-xl shadow-lg transition duration-250 cursor-pointer"
            >
              {TRANSLATIONS[lang].nav.cta}
            </button>
          </div>

          {/* Mobile language selector and menu trigger */}
          <div className="flex items-center space-x-2 sm:hidden">
            <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(['fr', 'es', 'en', 'pt'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 py-0.5 text-[9px] font-black rounded uppercase transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-slate-950 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE COLLAPSIBLE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-sky-100 px-4 py-6 space-y-4 shadow-xl z-40 relative text-center font-bold text-sm tracking-wide text-slate-700"
          >
            <button type="button" onClick={() => handleScrollToElement('video-section')} className="block w-full py-2 hover:text-sky-600">{TRANSLATIONS[lang].nav.video}</button>
            <button type="button" onClick={() => handleScrollToElement('problem-section')} className="block w-full py-2 hover:text-sky-600">{TRANSLATIONS[lang].nav.problem}</button>
            <button type="button" onClick={() => handleScrollToElement('benefits-accordion')} className="block w-full py-2 hover:text-sky-600">{TRANSLATIONS[lang].nav.benefits}</button>
            <button type="button" onClick={() => handleScrollToElement('modules-section')} className="block w-full py-2 hover:text-sky-600">{TRANSLATIONS[lang].nav.program}</button>
            <button type="button" onClick={() => handleScrollToElement('practical-example')} className="block w-full py-2 hover:text-sky-600">{TRANSLATIONS[lang].nav.demo}</button>
            <button type="button" onClick={() => handleScrollToElement('pricing-checkout-block')} className="block w-full py-2 text-sky-600 font-extrabold">{TRANSLATIONS[lang].nav.cta}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY WINDOW STAGE */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* SECTION 1: PROMISE HERO BANNER */}
        <PromiseHero lang={lang} onScrollToPricing={() => handleScrollToElement('pricing-checkout-block')} />

        {/* SECTION 2: VIDEO PRESENTATION / VSL */}
        <div id="video-section" className="py-8 bg-white/5 border-t border-b border-white/10">
          <VideoSection lang={lang} onScrollToPricing={() => handleScrollToElement('pricing-checkout-block')} />
        </div>

        {/* BRIGHT ANCHOR SPLIT: THE DEEP HOOK PROBLEM */}
        <div id="problem-section" className="bg-gradient-to-b from-[#0ea5e9] to-[#0284c7] border-t border-sky-350/20">
          <AccrocheSection lang={lang} />
        </div>

        {/* BENEFITS EXPANDABLE LIST (ACCORDION LINK) */}
        <div className="py-16 bg-white/5 border-t border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <BenefitsAccordion lang={lang} />
          </div>
        </div>

        {/* SECTION 3: DETAILED PROGRAM MODULES */}
        <div id="modules-section" className="bg-[#0284c7] py-8">
          <ProgramModules lang={lang} />
        </div>

        {/* PRACTICAL EXERCISE CASE STUDY SIMULATOR */}
        <div className="py-16 bg-white/5 border-t border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <PracticalExample lang={lang} />
          </div>
        </div>

        {/* CONVERSION SECURED DIRECT PLAN CHECKOUT */}
        <div className="bg-white/10 py-16 backdrop-blur-sm border-t border-white/10">
          <PricingCheckout lang={lang} onSuccess={(invoice) => {
            // Direct receipt is handled inside PricingCheckout itself for high velocity checkout.
          }} />
        </div>

        {/* FOIRE AUX QUESTIONS SUPPORT CLARITY */}
        <FaqSection lang={lang} />

        {/* FOOTER */}
        <Footer lang={lang} />

      </main>

    </div>
  );
}
