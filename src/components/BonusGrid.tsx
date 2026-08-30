import { Gift, Headphones, FileText, Timer, CalendarCheck } from 'lucide-react';
import { Bonus1Svg, Bonus2Svg, Bonus3Svg, Bonus4Svg } from './SvgLogos';
import { Language } from '../translations';

interface BonusGridProps {
  lang: Language;
}

const DICT = {
  fr: {
    tag: "BOOSTEURS DE VALEUR INTÉGRÉS",
    title: "Les 4 Cadeaux Inclus en Option VIP",
    desc: "Ces bonis exclusifs sont conçus pour décupler vos résultats et vous offrir des béquilles somatiques performantes là où la volonté échoue habituellement.",
    offered: "Offert — Cadeau",
    valueText: "Valeur :",
    boosterTitle: "Boosteur de sérénité",
    savingsTitle: "💡 ÉCONOMIE TOTALE GÉANTE : Les 4 cadeaux valent à eux seuls 178 € !",
    savingsDesc: "Ils vous sont offerts à 100% dans la formule VIP d'aujourd'hui, pour une simple différence de 10 € seulement.",
    bonuses: [
      {
        id: 1,
        title: "Audios de Calme Immédiat (5 minutes)",
        desc: "Des sessions audio nomades de 5 minutes chrono conçues spécifiquement pour stopper net l'anxiété forte, calmer le surmenage cérébral et s'endormir à coup sûr sans ruminations.",
        value: 47,
        icon: Headphones,
        bullet: "Idéal pour crise aiguë, insomnie impromptue"
      },
      {
        id: 2,
        title: "Protocole d'Urgence Anti-Panique",
        desc: "Un PDF ultra-simplifié à imprimer ou à conserver sur votre téléphone. Une fiche réflexe pour savoir exactement quoi faire étape par étape à la seconde où vous sentez le sol se dérober.",
        value: 37,
        icon: FileText,
        bullet: "Réponse immédiate de secours crises intenses"
      },
      {
        id: 3,
        title: "Méditations Guidées Anti-Surpensée",
        desc: "Faites taire définitivement le bavardage mental. Des séances courtes (10 min) basées sur l'imagerie somatique pour observer les pensées défiler comme des nuages, sans s'y accrocher.",
        value: 67,
        icon: Timer,
        bullet: "Calmer le singe agité de votre cerveau"
      },
      {
        id: 4,
        title: "Journal de Décharge Mentale",
        desc: "Un guide d'écriture thérapeutique et d'apaisement pour vider intégralement la boîte noire de vos émotions négatives, libérer les frustrations et vider le sac du mental avant de s'endormir.",
        value: 27,
        icon: CalendarCheck,
        bullet: "Soulagement immédiat avant le coucher"
      }
    ]
  },
  es: {
    tag: "POTENCIADORES DE VALOR INTEGRADOS",
    title: "Los 4 Regalos Incluidos en la Opción VIP",
    desc: "Estos bonos exclusivos están diseñados para multiplicar tus resultados y ofrecerte soportes somáticos potentes allí donde la voluntad suele fallar.",
    offered: "Gratis — Regalo",
    valueText: "Valor:",
    boosterTitle: "Potenciador de serenidad",
    savingsTitle: "💡 AHORRO TOTAL GIGANTE: ¡Los 4 regalos valen por sí solos 178 €!",
    savingsDesc: "Se te ofrecen al 100% en la fórmula VIP de hoy, por una simple diferencia de solo 10 €.",
    bonuses: [
      {
        id: 1,
        title: "Audios de Calma Inmediata (5 minutos)",
        desc: "Sesiones de audio portátiles de solo 5 minutos diseñadas específicamente para frenar en seco la ansiedad fuerte, calmar el agotamiento mental y conciliar el sueño sin rumiaciones.",
        value: 47,
        icon: Headphones,
        bullet: "Ideal para crisis agudas, insomnio imprevisto"
      },
      {
        id: 2,
        title: "Protocolo de Emergencia Antipánico",
        desc: "Un PDF ultrasimplificado para imprimir o guardar en tu móvil. Una ficha refleja para saber exactamente qué hacer paso a paso en el segundo en que sientas que el suelo se hunde.",
        value: 37,
        icon: FileText,
        bullet: "Respuesta inmediata de auxilio en crisis intensas"
      },
      {
        id: 3,
        title: "Meditaciones Guiadas Antipensamiento",
        desc: "Silencia definitivamente el parloteo mental. Sesiones cortas (10 min) basadas en imágenes somáticas para observar cómo pasan los pensamientos como nubes, sin aferrarse a ellos.",
        value: 67,
        icon: Timer,
        bullet: "Calmar el mono inquieto de tu cerebro"
      },
      {
        id: 4,
        title: "Diario de Descarga Mental",
        desc: "Una guía de escritura terapéutica y apaciguamiento para vaciar por completo la caja negra de tus emociones negativas, liberar frustraciones y despejar la mente antes de dormir.",
        value: 27,
        icon: CalendarCheck,
        bullet: "Alivio inmediato antes de acostarse"
      }
    ]
  },
  en: {
    tag: "INTEGRATED VALUE BOOSTERS",
    title: "The 4 Gifts Included in the VIP Option",
    desc: "These exclusive bonuses are designed to multiply your results and offer you powerful somatic support where willpower usually fails.",
    offered: "Free — Gift",
    valueText: "Value:",
    boosterTitle: "Serenity booster",
    savingsTitle: "💡 GIANT TOTAL SAVINGS: The 4 gifts alone are worth €178!",
    savingsDesc: "They are 100% free with today's VIP formula, for a simple difference of only €10.",
    bonuses: [
      {
        id: 1,
        title: "Immediate Calm Audios (5 minutes)",
        desc: "Portable 5-minute audio sessions specifically designed to stop severe anxiety in its tracks, calm brain overload, and fall asleep guaranteed without looping thoughts.",
        value: 47,
        icon: Headphones,
        bullet: "Ideal for acute crises, unexpected insomnia"
      },
      {
        id: 2,
        title: "Emergency Anti-Panic Protocol",
        desc: "An ultra-simplified PDF to print or save on your phone. A quick-reference sheet to know exactly what to do step-by-step the second you feel the ground slip away.",
        value: 37,
        icon: FileText,
        bullet: "Immediate emergency response for intense crises"
      },
      {
        id: 3,
        title: "Anti-Overthinking Guided Meditations",
        desc: "Quiet your mental chatter for good. Short sessions (10 min) based on somatic imagery to watch thoughts drift by like clouds, without clinging to them.",
        value: 67,
        icon: Timer,
        bullet: "Calm the restless monkey in your brain"
      },
      {
        id: 4,
        title: "Mental Unloading Journal",
        desc: "A therapeutic writing and soothing guide to completely empty the black box of your negative emotions, release frustrations, and clear your mind before sleeping.",
        value: 27,
        icon: CalendarCheck,
        bullet: "Immediate relief before going to bed"
      }
    ]
  },
  pt: {
    tag: "POTENCIALIZADORES DE VALOR INTEGRADOS",
    title: "Os 4 Brindes Inclusos na Opção VIP",
    desc: "Estes bônus exclusivos foram projetados para multiplicar seus resultados e oferecer suportes somáticos eficientes onde a força de vontade costuma falhar.",
    offered: "Grátis — Brinde",
    valueText: "Valor:",
    boosterTitle: "Potencializador de serenidade",
    savingsTitle: "💡 ECONOMIA TOTAL GIGANTE: Os 4 brindes valem por si só 178 €!",
    savingsDesc: "Eles são oferecidos 100% grátis na fórmula VIP de hoje, por uma simples diferença de apenas 10 €.",
    bonuses: [
      {
        id: 1,
        title: "Áudios de Calma Imediata (5 minutos)",
        desc: "Sessões de áudio portáteis de apenas 5 minutos projetadas especificamente para conter a ansiedade forte, acalmar o esgotamento mental e adormecer com certeza, sem ruminações.",
        value: 47,
        icon: Headphones,
        bullet: "Ideal para crises agudas, insônia imprevista"
      },
      {
        id: 2,
        title: "Protocolo de Emergência Antipânico",
        desc: "Um PDF ultrasimplificado para imprimir ou salvar no celular. Uma ficha rápida para saber exatamente o que fazer passo a passo no segundo em que sentir o chão desaparecer.",
        value: 37,
        icon: FileText,
        bullet: "Resposta imediata de socorro em crises intensas"
      },
      {
        id: 3,
        title: "Meditações Guiadas Antipensamentos",
        desc: "Silencie definitivamente o falatório mental. Sessões curtas (10 min) baseadas em imagens somáticas para observar os pensamentos passando como nuvens, sem se apegar a eles.",
        value: 67,
        icon: Timer,
        bullet: "Acalmar o macaco inquieto do seu cérebro"
      },
      {
        id: 4,
        title: "Diário de Descarga Mental",
        desc: "Um guia de escrita terapêutica e pacificação para esvaziar completamente a caixa preta das suas emoções negativas, liberar frustrações e limpar a mente antes de dormir.",
        value: 27,
        icon: CalendarCheck,
        bullet: "Alívio imediato antes de deitar"
      }
    ]
  }
};

export default function BonusGrid({ lang }: BonusGridProps) {
  const t = DICT[lang] || DICT.fr;

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Title block */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-yellow-500/20 px-3.5 py-1 rounded-full text-yellow-950 text-xs font-black uppercase tracking-widest leading-none border border-yellow-300">
          <Gift className="w-3.5 h-3.5 text-yellow-800" />
          <span>{t.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-950 font-bold max-w-2xl mx-auto">
          {t.desc}
        </p>
      </div>

      {/* Grid of bonuses detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {t.bonuses.map((bonus, idx) => {
          const IconComponent = bonus.icon;
          
          let ImageComponent;
          if (bonus.id === 1) ImageComponent = Bonus1Svg;
          else if (bonus.id === 2) ImageComponent = Bonus2Svg;
          else if (bonus.id === 3) ImageComponent = Bonus3Svg;
          else ImageComponent = Bonus4Svg;

          return (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-sky-100 shadow-xl flex flex-col hover:shadow-2xl hover:border-sky-300 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Image banner occupying the top half of the card, exact widescreen ratio */}
              <div className="w-full aspect-[16/9] overflow-hidden relative bg-sky-50 border-b border-sky-100">
                <ImageComponent className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                
                {/* Visual badge for gift overlay (top left) */}
                <div className="absolute top-4 left-4 bg-sky-600 text-white text-[10px] font-black tracking-wider py-1.5 px-3 rounded-full shadow-md z-10 uppercase">
                  {t.offered} #{bonus.id}
                </div>

                {/* Value Price badge (top right) */}
                <div className="absolute top-4 right-4 bg-emerald-600/95 text-white text-[10px] font-black py-1.5 px-3 rounded-full shadow-md z-10 uppercase">
                  {t.valueText} {bonus.value} €
                </div>
              </div>

              {/* Text explanations bottom details half */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 text-sky-600 font-extrabold text-[11px] uppercase tracking-wider">
                    <IconComponent className="w-4 h-4 text-sky-500" />
                    <span>{t.boosterTitle} #{bonus.id}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    {bonus.title}
                  </h3>

                  <p className="text-slate-750 font-semibold text-xs sm:text-sm leading-relaxed">
                    {bonus.desc}
                  </p>
                </div>

                {/* Bullet benefit item */}
                <div className="font-bold text-xs text-sky-950 py-2.5 px-4 bg-sky-50 rounded-2xl border border-sky-100 inline-flex items-center space-x-2.5 self-start shadow-sm mt-auto">
                  <span className="text-sky-500 text-base leading-none">✔</span>
                  <span>{bonus.bullet}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid footer pricing logic banner */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-6 border border-sky-200 text-center space-y-3 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-indigo-500/5 pointer-events-none"></div>
        <div className="relative space-y-2 z-10">
          <p className="text-slate-900 text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5">
            <span className="text-rose-500 animate-pulse text-lg">💡</span>
            <span>{t.savingsTitle}</span>
          </p>
          <p className="text-slate-600 text-[10px] sm:text-xs font-semibold">
            {t.savingsDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
