import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './SvgLogos';
import { TRANSLATIONS, Language } from '../translations';

interface PromiseHeroProps {
  lang: Language;
  onScrollToPricing: () => void;
}

export default function PromiseHero({ lang, onScrollToPricing }: PromiseHeroProps) {
  const t = TRANSLATIONS[lang].hero;

  return (
    <header className="relative py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 z-10">
      
      {/* Brand Logo Alignment */}
      <div className="w-full max-w-xs md:max-w-sm mx-auto mb-2 select-none">
        <BrandLogo className="w-full h-auto mx-auto drop-shadow-lg" />
        {/* Failover elegant text logo in case image loads slow */}
        <div className="text-center mt-2">
          <span className="block text-[10px] tracking-[0.25em] font-mono font-bold text-sky-800 uppercase">{t.tagline}</span>
          <h1 className="text-2xl font-black text-white tracking-tight leading-none mt-1">{t.title}</h1>
          <p className="text-xs font-bold text-slate-900 mt-1">{t.titleHighlight.toUpperCase()}</p>
        </div>
      </div>

      {/* Main Pitching Hook Badge */}
      <div className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 transition-all duration-300 px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer" onClick={onScrollToPricing}>
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>{t.badge}</span>
      </div>

      {/* Hero Headings */}
      <div className="space-y-4 max-w-4xl">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase font-sans">
          {t.title} <span className="text-slate-950 underline decoration-sky-300 decoration-wavy">{t.titleHighlight}</span>
        </h2>
        
        <p className="text-lg sm:text-2xl font-bold text-slate-950 max-w-3xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Core Promise Container Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-sky-100 flex flex-col space-y-8 text-left relative overflow-hidden">
        {/* Subtle decorative background water circle */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top block: Promise text outside and above the image */}
        <div className="space-y-4">
          <div className="inline-block bg-sky-500 text-white text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-md">
            {t.promiseBadge}
          </div>

          <h3 className="text-xl sm:text-3xl font-black text-slate-950 leading-tight">
            {t.promiseTitle}
          </h3>

          <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
            {t.promiseDescription}
          </p>
        </div>

        {/* Center block: Suggestive and silent visual projection of absolute harmony */}
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
          {/* Background: Majestic swaying palms on white sandy coast with serene sea */}
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" 
            alt="Palmiers balayés par la brise marine calme" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          
          {/* Serene soft water-tone gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-sky-900/10 pointer-events-none"></div>
          
          {/* Foreground circular portal of the serene floating man, styled beautifully with high-contrast glassmorphic borders */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-6 sm:border-8 border-white/90 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-sky-400 group/portal">
            <img 
              src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80" 
              alt="Homme serein flottant sur le dos dans l'eau turquoise claire" 
              className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover/portal:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Soft tropical filter overlay inside portal */}
            <div className="absolute inset-0 bg-sky-500/5 mix-blend-multiply transition-colors duration-500 group-hover/portal:bg-transparent"></div>
          </div>
        </div>

        {/* Bottom block: Bullet points differentiator, CTA and disclaimer */}
        <div className="space-y-6 pt-2">
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <span className="block text-xs uppercase font-mono tracking-widest font-bold text-slate-500">{t.whyDifferent}</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-950 font-bold">
              {t.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-sky-100 transition duration-300">
                  <span className="text-sky-500 font-extrabold text-base">✔</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 italic">
            {t.disclaimer}
          </p>

          {/* Core direct CTA button */}
          <div className="pt-2">
            <button
              onClick={onScrollToPricing}
              className="w-full sm:w-auto px-8 py-4.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 cursor-pointer group"
              id="cta-hero"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-white shrink-0 group-hover:scale-110 transition-transform duration-350 shadow-sm flex items-center justify-center">
                <BrandLogo className="w-full h-full object-cover scale-110" />
              </div>
              <span>{t.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Safety badges bar */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center text-xs font-extrabold text-slate-950 py-3">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>{t.badge1}</span>
        </div>
        <div className="inline-block w-1 h-1 rounded-full bg-slate-400"></div>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>{t.badge2}</span>
        </div>
        <div className="inline-block w-1 h-1 rounded-full bg-slate-400"></div>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>{t.badge3}</span>
        </div>
      </div>

    </header>
  );
}
