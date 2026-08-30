import { useState } from 'react';
import { ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, Language } from '../translations';

interface BenefitsAccordionProps {
  lang: Language;
}

export default function BenefitsAccordion({ lang }: BenefitsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[lang].benefits;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getHeaderInfo = () => {
    switch (lang) {
      case 'es':
        return {
          title: "Lo que vas a obtener (Tus beneficios)",
          subtitle: "Haz clic en un beneficio para descubrir cómo reprograma tu sistema nervioso en profundidad."
        };
      case 'en':
        return {
          title: "What you will get (Your benefits)",
          subtitle: "Click on a benefit to discover how it deeply reprograms your nervous system."
        };
      case 'pt':
        return {
          title: "O que você vai obter (Seus benefícios)",
          subtitle: "Clique em um benefício para descobrir como ele reprograma profundamente o seu sistema nervoso."
        };
      default:
        return {
          title: "Ce que vous allez obtenir (Vos bénéfices)",
          subtitle: "Cliquez sur un avantage pour découvrir comment il reprogramme votre système nerveux en profondeur."
        };
    }
  };

  const header = getHeaderInfo();

  return (
    <div id="benefits-accordion" className="w-full max-w-3xl mx-auto rounded-3xl bg-white/95 p-6 sm:p-8 shadow-xl border border-sky-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans tracking-tight">
            {header.title}
          </h3>
          <p className="text-slate-650 text-sm mt-0.5">
            {header.subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {t.items.map((benefit, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen 
                  ? 'border-sky-400 bg-sky-50/70 shadow-sm' 
                  : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-3.5 pr-4">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-sky-500' : 'text-slate-400'}`} />
                  <span className="text-sm sm:text-base text-slate-900 font-bold">{benefit.title}</span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {benefit.badge && (
                    <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-sky-100 text-sky-700">
                      {benefit.badge}
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-sky-500' : ''}`} />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-5 pl-12 text-sm sm:text-base text-slate-850 leading-relaxed border-t border-sky-100/50 pt-3">
                      {benefit.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
