import { ArrowRight, Check, Facebook } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { BrandLogo } from './SvgLogos';
import { Language } from '../translations';

interface FooterProps {
  lang: Language;
}

const DICT = {
  fr: {
    title: "Silenciez votre Esprit",
    desc: "Rééduquez votre système nerveux face aux ruminations, à l'anxiété chronique et aux crises de panique spontanées. Des protocoles somatiques cliniques directs.",
    fbFollow: "Suivez notre page Facebook",
    programTitle: "Le Programme",
    benefits: "Bénéfices Thérapeutiques",
    simulator: "Simulateur Vagal Intégral",
    basicPlan: "Le Programme Complet",
    guaranteeTitle: "Garantie & Support",
    guaranteeGold: "Garantie Or de 14 Jours",
    privacy: "Politique de Confidentialité",
    legal: "Mentions Légales Éditeur",
    supportEmail: "Support : support@silencievotreesprit.fr",
    newsletterTitle: "La Lettre de l'Esprit",
    newsletterDesc: "Rejoignez plus de 18 450 abonnés pour recevoir chaque lundi matin un exercice neuro-somatique court dans votre boîte mail.",
    subscribedText: "Inscription validée ! À lundi prochain.",
    placeholderEmail: "jean.dupont@gmail.com",
    credits: "© 2026 Silenciez votre Esprit • Tous droits de propriété intellectuels réservés.",
    gdpr: "Loi de protection des données (RGPD)",
    charter: "Charte Thérapeutique"
  },
  es: {
    title: "Silencia tu Mente",
    desc: "Reeduca tu sistema nervioso frente a las rumiaciones, la ansiedad crónica y los ataques de pánico espontáneos. Protocolos somáticos clínicos directos.",
    fbFollow: "Sigue nuestra página de Facebook",
    programTitle: "El Programa",
    benefits: "Beneficios Terapéuticos",
    simulator: "Simulador Vagal Integral",
    basicPlan: "El Programa Completo",
    guaranteeTitle: "Garantía y Soporte",
    guaranteeGold: "Garantía de Oro de 14 Días",
    privacy: "Política de Privacidad",
    legal: "Aviso Legal del Editor",
    supportEmail: "Soporte: support@silencievotreesprit.fr",
    newsletterTitle: "La Carta de la Mente",
    newsletterDesc: "Únete a más de 18,450 suscriptores para recibir cada lunes por la mañana un ejercicio neurosomático corto en tu correo.",
    subscribedText: "¡Suscripción confirmada! Nos vemos el próximo lunes.",
    placeholderEmail: "juan.perez@gmail.com",
    credits: "© 2026 Silencia tu Mente • Todos los derechos de propiedad intelectual reservados.",
    gdpr: "Ley de protección de datos (RGPD)",
    charter: "Carta Terapéutica"
  },
  en: {
    title: "Silence your Mind",
    desc: "Re-educate your nervous system against looping thoughts, chronic anxiety, and spontaneous panic attacks. Direct clinical somatic protocols.",
    fbFollow: "Follow our Facebook page",
    programTitle: "The Program",
    benefits: "Therapeutic Benefits",
    simulator: "Integral Vagal Simulator",
    basicPlan: "The Complete Program",
    guaranteeTitle: "Guarantee & Support",
    guaranteeGold: "14-Day Gold Guarantee",
    privacy: "Privacy Policy",
    legal: "Publisher Legal Notice",
    supportEmail: "Support: support@silencievotreesprit.fr",
    newsletterTitle: "The Mind Newsletter",
    newsletterDesc: "Join over 18,450 subscribers to receive a short neuro-somatic exercise in your inbox every Monday morning.",
    subscribedText: "Subscription confirmed! See you next Monday.",
    placeholderEmail: "john.doe@gmail.com",
    credits: "© 2026 Silence your Mind • All intellectual property rights reserved.",
    gdpr: "Data protection law (GDPR)",
    charter: "Therapeutic Charter"
  },
  pt: {
    title: "Silencie sua Mente",
    desc: "Reeduque seu sistema nervoso contra as ruminações, a ansiedade crônica e os ataques de pânico espontâneos. Protocolos somáticos clínicos diretos.",
    fbFollow: "Siga nossa página no Facebook",
    programTitle: "O Programa",
    benefits: "Benefícios Terapêuticos",
    simulator: "Simulador Vagal Integral",
    basicPlan: "O Programa Completo",
    guaranteeTitle: "Garantia & Suporte",
    guaranteeGold: "Garantia de Ouro de 14 Dias",
    privacy: "Política de Privacidade",
    legal: "Aviso Legal do Editor",
    supportEmail: "Suporte: suporte@silenciesuamente.pt",
    newsletterTitle: "A Carta da Mente",
    newsletterDesc: "Junte-se a mais de 18.450 assinantes para receber todas as segundas-feiras pela manhã um breve exercício neuro-somático em seu e-mail.",
    subscribedText: "Inscrição confirmada! Até a próxima segunda-feira.",
    placeholderEmail: "joao.silva@gmail.com",
    credits: "© 2026 Silencie sua Mente • Todos os direitos de propriedade intelectual reservados.",
    gdpr: "Lei de proteção de dados (LGPD)",
    charter: "Carta Terapêutica"
  }
};

export default function Footer({ lang }: FooterProps) {
  const t = DICT[lang] || DICT.fr;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-16 text-slate-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-slate-200 shrink-0">
                <BrandLogo className="w-full h-full object-cover scale-110" />
              </div>
              <span className="font-sans font-black text-lg text-slate-900">{t.title}</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              {t.desc}
            </p>
            <div className="pt-1 flex items-center space-x-2">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
                title={t.fbFollow}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-bold text-slate-500">{t.fbFollow}</span>
            </div>
          </div>

          {/* Ecosystem Col */}
          <div className="space-y-3 font-semibold text-slate-600">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[10px] font-mono">{t.programTitle}</h4>
            <ul className="space-y-2">
              <li><a href="#benefits-accordion" className="hover:text-sky-600 transition">{t.benefits}</a></li>
              <li><a href="#practical-example" className="hover:text-sky-600 transition">{t.simulator}</a></li>
              <li><a href="#pricing-checkout-block" className="hover:text-sky-600 transition">{t.basicPlan}</a></li>
            </ul>
          </div>

          {/* Trust Support Col */}
          <div className="space-y-3 font-semibold text-slate-600">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[10px] font-mono">{t.guaranteeTitle}</h4>
            <ul className="space-y-2">
              <li><a href="#faqs" className="hover:text-sky-600 transition">{t.guaranteeGold}</a></li>
              <li><a href="#faqs" className="hover:text-sky-600 transition">{t.privacy}</a></li>
              <li><a href="#faqs" className="hover:text-sky-600 transition">{t.legal}</a></li>
              <li><span className="text-slate-500">{t.supportEmail}</span></li>
            </ul>
          </div>

          {/* Newsletter Join Col */}
          <div className="space-y-4 font-semibold text-slate-600">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[10px] font-mono">{t.newsletterTitle}</h4>
            <p className="text-slate-600 leading-normal">
              {t.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-bold text-[11px] flex items-center space-x-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{t.subscribedText}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-sky-500 focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-950 font-bold"
                  required
                />
                <button
                  type="submit"
                  className="p-2 py-2.5 bg-sky-500 text-white rounded-lg font-bold hover:bg-sky-400 transition cursor-pointer"
                  id="btn-footer-subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px]" id="app-footer-credits">
          <span>{t.credits}</span>
          <div className="space-x-4">
            <span className="hover:text-slate-800 cursor-pointer">{t.gdpr}</span>
            <span className="hover:text-slate-800 cursor-pointer">{t.charter}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
