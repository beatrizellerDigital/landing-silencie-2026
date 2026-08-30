import { useState } from 'react';
import { ShieldCheck, Lock, Check } from 'lucide-react';
import { useUrgencyCounter } from '../hooks/useUrgencyCounter';
import { Language } from '../translations';

interface PricingCheckoutProps {
  lang: Language;
  onSuccess?: (invoiceData: any) => void;
}

const DICT = {
  fr: {
    title: "Choisissez votre formule & Libérez-vous",
    subtitle: "Un paiement unique, aucuns frais cachés, aucun abonnement. Accès à vie garanti.",
    urgencyTitle: "⚠️ ATTENTION : STOCK EXTRÊMEMENT LIMITÉ",
    urgencyDesc1: "Il ne reste plus que",
    urgencyDesc2: "copies disponibles aujourd'hui avec cette offre spéciale. Le stock d'urgence s'effondre.",
    
    basicTag: "ACCÈS COMPLET IMMÉDIAT",
    basicTitle: "Le Programme Silenciez votre Esprit",
    basicDesc: "Le système complet de reprogrammation nerveuse pour éteindre l'anxiété et la panique.",
    whatIsIncluded: "CE QUI EST INCLUS :",
    basicBullets: [
      "Les 6 modules vidéo détaillés (6 heures de cours)",
      "Sons d'apprentissage neurologique basique",
      "Accès à vie et futures mises à jour incluses",
      "Support prioritaire par email"
    ],
    basicBtn: "S'inscrire au Programme complet (23 €)",

    checkoutTag: "PASSERELLE DE PAIEMENT SÉCURISÉE",
    checkoutTitle: "Finalisez votre commande de confiance",
    activeFormula: "Formule active :",
    basicFormulaText: "Programme Complet Silenciez votre Esprit — 23 €",

    guaranteeTitle: "Garantie de satisfaction de 14 jours",
    guaranteeDesc: "Vous ne prenez aucun risque. Si le programme ne vous convient pas, demandez un remboursement complet dans les 14 jours, sans aucune question. Votre achat est 100% protégé.",

    trustItems: [
      "Cryptage SSL sécurisé de bout en bout",
      "Accès et livraison numérique instantanée",
      "Tous les modes de paiement sécurisés",
      "Accès à vie et mises à jour incluses"
    ],

    amountDue: "Montant dû total aujourd'hui :",
    submitBtnText: "S'INSCRIRE & APAISER MON ESPRIT •",
    redirectInfo: "Vous allez être redirigé vers la passerelle de paiement sécurisée officielle de Hotmart pour finaliser votre commande en toute tranquillité.",
    
    processingTitle: "Transaction sécurisée en cours...",
    processingFooter: "Ne quittez pas cette fenêtre s'il vous plaît. Le pare-feu sécurise votre code."
  },
  es: {
    title: "Elige tu fórmula y libérate",
    subtitle: "Un pago único, sin costes ocultos, sin suscripción. Acceso de por vida garantizado.",
    urgencyTitle: "⚠️ ATENCIÓN: STOCK EXTREMADAMENTE LIMITADO",
    urgencyDesc1: "Solo quedan",
    urgencyDesc2: "copias disponibles hoy con esta oferta especial. El stock de urgencia se agota rápidamente.",
    
    basicTag: "ACCESO COMPLETO INMEDIATO",
    basicTitle: "El Programa Silencia tu Mente",
    basicDesc: "El sistema de reprogramación nerviosa completo para apagar la ansiedad y el pánico.",
    whatIsIncluded: "QUÉ ESTÁ INCLUIDO:",
    basicBullets: [
      "Los 6 módulos en vídeo detallados (6 horas de curso)",
      "Audios de aprendizaje neurológico básico",
      "Acceso de por vida y actualizaciones futuras incluidas",
      "Soporte prioritario por correo electrónico"
    ],
    basicBtn: "Inscribirme al Programa Completo (23 €)",

    checkoutTag: "PASARELA DE PAGO SEGURA",
    checkoutTitle: "Finaliza tu pedido con total confianza",
    activeFormula: "Fórmula activa:",
    basicFormulaText: "Programa Completo Silencia tu Mente — 23 €",

    guaranteeTitle: "Garantía de satisfacción de 14 días",
    guaranteeDesc: "No corres ningún riesgo. Si el programa no cumple tus expectativas, solicita un reembolso completo en un plazo de 14 días, sin preguntas. Tu compra está 100% protegida.",

    trustItems: [
      "Cifrado SSL seguro de extremo a extremo",
      "Acceso y entrega digital instantánea",
      "Métodos de pago 100% seguros",
      "Acceso de por vida y actualizaciones incluidas"
    ],

    amountDue: "Monto total a pagar hoy:",
    submitBtnText: "INSCRIBIRME Y APACIAGUAR MI MENTE •",
    redirectInfo: "Serás redirigido a la pasarela de pago seguro oficial de Hotmart para finalizar tu compra con absoluta tranquilidad.",
    
    processingTitle: "Transacción segura en curso...",
    processingFooter: "Por favor, no cierres esta ventana. El servidor de seguridad procesa tu acceso."
  },
  en: {
    title: "Choose your formula & Free yourself",
    subtitle: "One-time payment, no hidden fees, no subscription. Lifetime access guaranteed.",
    urgencyTitle: "⚠️ WARNING: EXTREMELY LIMITED STOCK",
    urgencyDesc1: "Only",
    urgencyDesc2: "copies left available today with this special offer. Urgent stock is collapsing.",
    
    basicTag: "COMPLETE IMMEDIATE ACCESS",
    basicTitle: "The Silence Your Mind Program",
    basicDesc: "The complete nervous reprogramming system to turn off anxiety and panic.",
    whatIsIncluded: "WHAT IS INCLUDED:",
    basicBullets: [
      "The 6 detailed video modules (6 hours of lessons)",
      "Basic neurological learning audio tracks",
      "Lifetime access & future updates included",
      "Priority email support"
    ],
    basicBtn: "Enroll in the Complete Program (23 €)",

    checkoutTag: "SECURE PAYMENT GATEWAY",
    checkoutTitle: "Finalize your order with absolute trust",
    activeFormula: "Active formula:",
    basicFormulaText: "Complete Silence Your Mind Program — 23 €",

    guaranteeTitle: "14-Day Satisfaction Guarantee",
    guaranteeDesc: "You take absolutely no risk. If the program does not suit you, request a full refund within 14 days, no questions asked. Your purchase is 100% protected.",

    trustItems: [
      "Secure end-to-end SSL encryption",
      "Instant access and digital delivery",
      "All secure payment methods supported",
      "Lifetime access & updates included"
    ],

    amountDue: "Total amount due today:",
    submitBtnText: "REGISTER & CALM MY MIND •",
    redirectInfo: "You will be redirected to Hotmart's official secure payment gateway to complete your order safely.",
    
    processingTitle: "Secure transaction processing...",
    processingFooter: "Please do not leave this page. The secure firewall is processing your license."
  },
  pt: {
    title: "Escolha sua fórmula & Liberte-se",
    subtitle: "Um pagamento único, sem taxas ocultas, sem assinatura. Acesso vitalício garantido.",
    urgencyTitle: "⚠️ ATENÇÃO: ESTOQUE EXTREMAMENTE LIMITADO",
    urgencyDesc1: "Restam apenas",
    urgencyDesc2: "cópias disponíveis hoje com esta oferta especial. O estoque de emergência está acabando rapidamente.",
    
    basicTag: "ACESSO COMPLETO IMEDIATO",
    basicTitle: "O Programa Silencie sua Mente",
    basicDesc: "O sistema de reprogramação nervosa completo para desligar a ansiedade e o pânico.",
    whatIsIncluded: "O QUE ESTÁ INCLUSO:",
    basicBullets: [
      "Os 6 módulos em vídeo detalhados (6 horas de curso)",
      "Áudios de aprendizagem neurológica básica",
      "Acesso vitalício e futuras atualizações inclusas",
      "Suporte prioritário por e-mail"
    ],
    basicBtn: "Inscrever-me no Programa Completo (23 €)",

    checkoutTag: "PORTAL DE PAGAMENTO SEGURO",
    checkoutTitle: "Finalize seu pedido com total confiança",
    activeFormula: "Fórmula ativa:",
    basicFormulaText: "Programa Completo Silencie sua Mente — 23 €",

    guaranteeTitle: "Garantia de satisfação de 14 dias",
    guaranteeDesc: "Você não assume nenhum risco. Se o programa não atender às suas expectativas, solicite o reembolso total em até 14 dias, sem perguntas. Sua compra está 100% protegida.",

    trustItems: [
      "Criptografia SSL segura de ponta a ponta",
      "Acesso e entrega digital instantânea",
      "Métodos de pagamento 100% seguros",
      "Acesso vitalício e atualizações inclusas"
    ],

    amountDue: "Valor total a pagar hoje:",
    submitBtnText: "INSCREVER-ME & ACALMAR MINHA MENTE •",
    redirectInfo: "Você será redirecionado para o portal oficial de pagamento seguro da Hotmart para finalizar sua compra com total segurança.",
    
    processingTitle: "Processando transação segura...",
    processingFooter: "Por favor, não saia desta página. O servidor de segurança está gerando sua licença de acesso."
  }
};

const HOTMART_CHECKOUT_URLS: Record<Language, string> = {
  fr: "https://pay.hotmart.com/L106615173Y?checkoutMode=10", // Lien de paiement Français
  es: "https://pay.hotmart.com/B106702063C?checkoutMode=10", // Enlace de pago Español (¡Actualizado!)
  en: "https://pay.hotmart.com/L106615173Y?checkoutMode=10", // English Payment Link
  pt: "https://pay.hotmart.com/S106709021J?checkoutMode=10"  // Link de pagamento Português (¡Actualizado!)
};

export default function PricingCheckout({ lang, onSuccess }: PricingCheckoutProps) {
  const t = DICT[lang] || DICT.fr;
  const spotsLeft = useUrgencyCounter();
  const checkoutUrl = HOTMART_CHECKOUT_URLS[lang] || HOTMART_CHECKOUT_URLS.fr;

  return (
    <section id="pricing-checkout-block" className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12 relative">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-300/10 blur-[120px] pointer-events-none"></div>

      {/* Header titles */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-950 font-bold">
          {t.subtitle}
        </p>
      </div>

      {/* Urgency countdown warning block */}
      <div className="max-w-md mx-auto bg-amber-500 text-slate-950 p-4 rounded-2xl text-center space-y-1 shadow-md border border-amber-400">
        <div className="text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 animate-pulse">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          <span>{t.urgencyTitle}</span>
        </div>
        <p className="text-xs sm:text-sm font-extrabold leading-relaxed">
          {t.urgencyDesc1} <b className="bg-slate-950 text-white font-mono rounded px-1.5 py-0.5 text-xs sm:text-base">{spotsLeft} copies</b> {t.urgencyDesc2}
        </p>
      </div>

      {/* Single Pricing card */}
      <div className="max-w-md mx-auto pt-4">
        
        {/* Version UNIQUE */}
        <div 
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-500 bg-white/100 shadow-2xl ring-4 ring-sky-100 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-sky-700">{t.basicTag}</span>
              <span className="p-1 rounded-full bg-sky-500 text-white"><Check className="w-4 h-4" /></span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">{t.basicTitle}</h3>
              <p className="text-slate-700 text-xs font-semibold">{t.basicDesc}</p>
            </div>

            {/* Pricing values */}
            <div className="pt-2 flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-black text-sky-600">23 €</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">197 €</span>
            </div>

            {/* Modules list included */}
            <div className="border-t border-slate-100 pt-4 space-y-3 font-semibold text-xs text-slate-950">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">{t.whatIsIncluded}</span>
              <div className="space-y-2">
                {t.basicBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-sky-500 font-extrabold">✔</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout', {
                  content_name: 'Formule Unique - Basic Card',
                  value: 23.00,
                  currency: 'EUR'
                });
              }
            }}
            className="py-3.5 rounded-xl text-center font-bold text-xs bg-sky-500 hover:bg-sky-450 text-white font-extrabold block decoration-transparent transition hover:scale-[1.01]"
          >
            {t.basicBtn}
          </a>
        </div>

      </div>

      {/* Secure Interactive Checkout Segment Card */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-sky-200 shadow-2xl p-6 sm:p-10 space-y-8">
        <div className="border-b border-slate-100 pb-5 text-center sm:text-left">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black block">{t.checkoutTag}</span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start space-x-2 mt-1">
            <Lock className="w-5 h-5 text-emerald-500" />
            <span>{t.checkoutTitle}</span>
          </h3>
          <p className="text-xs text-slate-650 mt-1">
            {t.activeFormula} <b className="text-slate-950 font-extrabold">{t.basicFormulaText}</b>
          </p>
        </div>

        <div className="space-y-6">
          
          <div className="p-5 bg-emerald-50 text-emerald-950 rounded-2xl border border-emerald-150 flex items-start space-x-3.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm">{t.guaranteeTitle}</h4>
              <p className="text-xs leading-snug font-medium text-slate-700">
                {t.guaranteeDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-800">
            {t.trustItems.map((item, idx) => {
              const emojis = ["🔒", "⚡", "🌐", "♾"];
              return (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <span className="text-sky-500 text-lg">{emojis[idx]}</span>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-center">
            <div className="flex justify-between items-center w-full text-slate-950 text-sm font-bold mb-2">
              <span>{t.amountDue}</span>
              <span className="text-3xl font-black text-slate-950">23.00 €</span>
            </div>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'InitiateCheckout', {
                    content_name: 'Formule Unique',
                    value: 23.00,
                    currency: 'EUR'
                  });
                }
              }}
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-sm sm:text-base py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer select-none decoration-transparent"
              id="submit-payment-btn"
            >
              <ShieldCheck className="w-6 h-6 text-white" />
              <span>{t.submitBtnText} 23 €</span>
            </a>

            <p className="text-[10px] text-slate-500 leading-tight">
              {t.redirectInfo}
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
