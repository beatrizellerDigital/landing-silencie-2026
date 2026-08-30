import { Flame, Compass, Power, ShieldCheck, Heart, Sparkles, BookOpen, Clock, Layers } from 'lucide-react';
import { Language } from '../translations';

interface ProgramModulesProps {
  lang: Language;
}

interface ModuleType {
  num: number;
  title: string;
  tag: string;
  objective: string;
  items: string[];
  victory: string;
  icon: any;
}

const MODULES_DICT = {
  fr: [
    {
      num: 1,
      title: "MÓDULO 1 — L'Incendie Invisible",
      tag: "Comprendre le chaos interne",
      objective: "Savoir exactement ce qui se passe dans votre corps et dans votre tête.",
      items: [
        "Qu'est-ce que l'anxiété réellement (sans jargon psychologique complexe)",
        "Le fonctionnement précis du cycle infernal : peur ➜ pensée ➜ symptôme physique ➜ plus de peur",
        "Pourquoi votre cerveau primitif crée de fausses menaces chaque seconde",
        "L'erreur fatale : tenter d'analyser vos pensées pour tenter de les résoudre"
      ],
      victory: "Victoire rapide : Réaliser enfin, avec soulagement, que vous n'êtes PAS cassé ou défectueux.",
      icon: Flame
    },
    {
      num: 2,
      title: "MÓDULO 2 — Silence Interne",
      tag: "Désactiver le vacarme intellectuel",
      objective: "Briser durablement votre identification automatique avec le mental.",
      items: [
        "La technique fondamentale d'observation pure, sans résistance rationnelle",
        "Le fameux protocole « Mono Loco » pour dompter le singe agité qui crie en vous",
        "Comment regarder défiler vos pensées sans jamais monter à bord",
        "La respiration d'ancrage d'urgence somatique"
      ],
      victory: "Résultat : Réduire l'intensité de n'importe quel pic anxieux en moins de 3 minutes.",
      icon: Compass
    },
    {
      num: 3,
      title: "MÓDULO 3 — Éteignez l'Attaque",
      tag: "Reprendre le contrôle en pleine tempête",
      objective: "Gérer et désamorcer une crise de panique imminente.",
      items: [
        "Que faire exactement à la seconde où vous sentez l'attaque de panique monter",
        "Comment stopper net l'emballement physiologique (cœur fou, vertige, sueur)",
        "La triangulation somatique de terre (Grounding de secours)",
        "La respiration d'urgence vagale et le protocole vital des 90 secondes"
      ],
      victory: "Résultat : Retrouver votre sécurité basale en sachant que vous pouvez tout surmonter.",
      icon: Power
    },
    {
      num: 4,
      title: "MÓDULO 4 — Reprogrammation du Système Nerveux",
      tag: "Guérir la racine biologique",
      objective: "Baigner votre organisme dans un niveau bas d'excitation sympathique.",
      items: [
        "La stimulation manuelle du nerf vague pour forcer la détente somatique",
        "Rétablir une bio-chimie saine du sommeil profond et réparateur",
        "Pourquoi certains aliments ordinaires exacerbent l'anxiété",
        "Activer des décharges de cortisol saines et stopper les habitudes inconscientes qui détruisent votre niveau d'énergie"
      ],
      victory: "Résultat : Une baisse massive et définitive de votre anxiété basale après 7 jours.",
      icon: Clock
    },
    {
      num: 5,
      title: "MÓDULO 5 — Vider le Sac",
      tag: "Libérer les charges accumulées",
      objective: "Évacuer doucement les blessures d'attention et tensions stockées.",
      items: [
        "Le concept du trauma fonctionnel et comment la peur se retrouve cristallisée dans les muscles",
        "Comprendre et désactiver la culpabilité inconsciente et la déconnexion",
        "L'écriture thérapeutique de déchargement émotionnel immédiat",
        "La libération somatique de tremblement autonome guidée"
      ],
      victory: "Résultat : Un soulagement viscéral et un sentiment de légèreté corporelle inédit.",
      icon: Heart
    },
    {
      num: 6,
      title: "MÓDULO 6 — Le Nouvel Esprit",
      tag: "Établir une paix inébranlable",
      objective: "Ancrer un état de stabilité émotionnelle durable face au monde.",
      items: [
        "Votre nouvelle routine de paix sur-mesure (seulement 5 minutes par matin)",
        "Comment prévenir et transformer en douceur les éventuelles rechutes futures",
        "Construire et ancrer une identité stable d'observateur souverain",
        "Vivre sans réagir impulsivement à tout événement extérieur ou pensée"
      ],
      victory: "Résultat : Une relation saine et paisible avec un esprit clair et souverain.",
      icon: ShieldCheck
    }
  ],
  es: [
    {
      num: 1,
      title: "MÓDULO 1 — El Incendio Invisible",
      tag: "Comprender el caos interno",
      objective: "Saber exactamente qué está pasando en tu cuerpo y en tu mente.",
      items: [
        "Qué es la ansiedad realmente (sin jerga psicológica compleja)",
        "El funcionamiento preciso del ciclo infernal: miedo ➜ pensamiento ➜ síntoma físico ➜ más miedo",
        "Por qué tu cerebro primitivo crea falsas amenazas cada segundo",
        "El error fatal: intentar analizar tus pensamientos para intentar resolverlos"
      ],
      victory: "Victoria rápida: Darse cuenta por fin, con alivio, de que NO estás roto o defectuoso.",
      icon: Flame
    },
    {
      num: 2,
      title: "MÓDULO 2 — Silencio Interno",
      tag: "Desactivar el clamor intelectual",
      objective: "Romper de forma duradera tu identificación automática con la mente.",
      items: [
        "La técnica fundamental de observación pura, sin resistencia racional",
        "El famoso protocolo «Mono Loco» para domar al mono inquieto que grita en ti",
        "Cómo ver pasar tus pensamientos sin subirte nunca a ellos",
        "La respiración de anclaje de urgencia somática"
      ],
      victory: "Resultado: Reducir la intensidad de cualquier pico de ansiedad en menos de 3 minutos.",
      icon: Compass
    },
    {
      num: 3,
      title: "MÓDULO 3 — Apaga el Ataque",
      tag: "Recuperar el control en plena tormenta",
      objective: "Gestionar y desactivar un ataque de pánico inminente.",
      items: [
        "Qué hacer exactamente en el segundo en el que sientes subir el ataque de pánico",
        "Cómo detener en seco la espiral fisiológica (corazón acelerado, mareo, sudor)",
        "La triangulación somática de tierra (Grounding de rescate)",
        "La respiración de emergencia vagal y el protocolo vital de los 90 segundos"
      ],
      victory: "Resultado: Recuperar tu seguridad básica sabiendo que puedes superar cualquier cosa.",
      icon: Power
    },
    {
      num: 4,
      title: "MÓDULO 4 — Reprogramación del Sistema Nervioso",
      tag: "Sanar la raíz biológica",
      objective: "Bañar tu organismo en un nivel bajo de excitación simpática.",
      items: [
        "La estimulación manual del nervio vago para forzar la relajación somática",
        "Restablecer una bioquímica saludable del sueño profundo y reparador",
        "Por qué algunos alimentos comunes exacerban la ansiedad",
        "Activar descargas saludables de cortisol y detener hábitos inconscientes que destruyen tu nivel de energía"
      ],
      victory: "Resultado: Una reducción masiva y definitiva de tu ansiedad basal tras 7 días.",
      icon: Clock
    },
    {
      num: 5,
      title: "MÓDULO 5 — Vaciar el Saco",
      tag: "Liberar las cargas acumuladas",
      objective: "Evacuar suavemente las heridas de atención y tensiones almacenadas.",
      items: [
        "El concepto del trauma funcional y cómo el miedo se cristaliza en los músculos",
        "Comprender y desactivar la culpa inconsciente y la desconexión",
        "La escritura terapéutica de descarga emocional inmediata",
        "La liberación somática de temblor autónomo guiado"
      ],
      victory: "Resultado: Un alivio visceral y una sensación de ligereza corporal inédita.",
      icon: Heart
    },
    {
      num: 6,
      title: "MÓDULO 6 — La Nueva Mente",
      tag: "Establecer una paz inquebrantable",
      objective: "Anclar un estado de estabilidad emocional duradero ante el mundo.",
      items: [
        "Tu nueva rutina de paz a medida (solo 5 minutos cada mañana)",
        "Cómo prevenir y transformar con suavidad las posibles recaídas futuras",
        "Construir y anclar una identidad estable de observador soberano",
        "Vivir sin reaccionar impulsivamente a todo evento externo o pensamiento"
      ],
      victory: "Resultado: Una relación sana y pacífica con una mente clara y soberana.",
      icon: ShieldCheck
    }
  ],
  en: [
    {
      num: 1,
      title: "MODULE 1 — The Invisible Fire",
      tag: "Understand internal chaos",
      objective: "Know exactly what is going on in your body and mind.",
      items: [
        "What anxiety actually is (without complex psychological jargon)",
        "The precise workings of the vicious cycle: fear ➜ thought ➜ physical symptom ➜ more fear",
        "Why your primitive brain creates false threats every second",
        "The fatal mistake: trying to analyze your thoughts to solve them"
      ],
      victory: "Quick victory: Finally realize, with relief, that you are NOT broken or defective.",
      icon: Flame
    },
    {
      num: 2,
      title: "MODULE 2 — Internal Silence",
      tag: "Deactivate intellectual noise",
      objective: "Durably break your automatic identification with the mind.",
      items: [
        "The fundamental technique of pure observation, without rational resistance",
        "The famous 'Mono Loco' protocol to tame the restless monkey crying inside you",
        "How to watch your thoughts pass by without ever boarding them",
        "Somatic emergency anchoring breath"
      ],
      victory: "Result: Reduce the intensity of any anxiety spike in less than 3 minutes.",
      icon: Compass
    },
    {
      num: 3,
      title: "MODULE 3 — Put Out the Attack",
      tag: "Reclaim control in the middle of a storm",
      objective: "Manage and defuse an imminent panic attack.",
      items: [
        "Exactly what to do the second you feel the panic attack rising",
        "How to stop physiological escalation in its tracks (racing heart, dizziness, sweat)",
        "Somatic grounding (Emergency Grounding)",
        "Vagal emergency breathing and the vital 90-second protocol"
      ],
      victory: "Result: Reclaim your baseline safety knowing you can overcome anything.",
      icon: Power
    },
    {
      num: 4,
      title: "MODULE 4 — Nervous System Reprogramming",
      tag: "Heal the biological root",
      objective: "Bathe your organism in a low sympathetic excitation level.",
      items: [
        "Manual stimulation of the vagus nerve to force somatic relaxation",
        "Restore healthy biochemistry for deep and restorative sleep",
        "Why some ordinary foods exacerbate anxiety",
        "Activate healthy cortisol releases and stop unconscious habits that destroy your energy level"
      ],
      victory: "Result: A massive and definitive drop in your baseline anxiety after 7 days.",
      icon: Clock
    },
    {
      num: 5,
      title: "MODULE 5 — Emptying the Bag",
      tag: "Release accumulated burdens",
      objective: "Gently vent attention wounds and stored tensions.",
      items: [
        "The concept of functional trauma and how fear gets crystallized in muscles",
        "Understand and deactivate unconscious guilt and disconnection",
        "Therapeutic writing for immediate emotional discharge",
        "Guided autonomous shaking somatic release"
      ],
      victory: "Result: Visceral relief and an unprecedented feeling of bodily lightness.",
      icon: Heart
    },
    {
      num: 6,
      title: "MODULE 6 — The New Mind",
      tag: "Establish unshakeable peace",
      objective: "Anchor a lasting emotional stability state before the world.",
      items: [
        "Your new custom peace routine (just 5 minutes every morning)",
        "How to gently prevent and transform future potential relapses",
        "Build and anchor a stable identity as a sovereign observer",
        "Live without reacting impulsively to every external event or thought"
      ],
      victory: "Result: A healthy and peaceful relationship with a clear and sovereign mind.",
      icon: ShieldCheck
    }
  ],
  pt: [
    {
      num: 1,
      title: "MÓDULO 1 — A Origem do Alerta",
      tag: "Entenda o seu erro analítico",
      objective: "Identificar a verdadeira causa da invasão de pensamentos negativos e reverter o reflexo de controle lógico.",
      items: [
        "Por que lutar contra a ansiedade ou as crises de pânico só faz com que elas dobrem de intensidade",
        "A atitude correta a adotar e os erros cruciais que mantêm você preso na tempestade mental",
        "Como mapear seu estado vagal e saber exatamente em que ponto da espiral você se encontra",
        "O erro fatal: tentar analisar seus pensamentos para resolvê-los"
      ],
      victory: "Vitória rápida: Perceber finalmente, com alívio, que você NÃO está quebrado ou com defeito.",
      icon: Flame
    },
    {
      num: 2,
      title: "MÓDULO 2 — Silêncio Interno",
      tag: "Desative o ruído intelectual",
      objective: "Romper duradouramente sua identificação automática com a mente.",
      items: [
        "A técnica fundamental de observação pura, sem resistência racional",
        "O famoso protocolo 'Mono Loco' para domar o macaco inquieto que grita dentro de você",
        "Como ver seus pensamentos passarem sem nunca embarcar neles",
        "Respiração de ancoragem de emergência somática"
      ],
      victory: "Resultado: Reduzir a intensidade de qualquer pico de ansiedade em menos de 3 minutos.",
      icon: Compass
    },
    {
      num: 3,
      title: "MÓDULO 3 — Combater a Crise",
      tag: "Retome o controle no meio da tempestade",
      objective: "Gerenciar e desarmar um ataque de pânico iminente.",
      items: [
        "O que fazer exatamente no segundo em que você sente o pânico subir",
        "Como interromper a escalada fisiológica na hora (coração acelerado, tontura, suor)",
        "Aterramento somático (Emergency Grounding)",
        "Respiração vagal de emergência e o protocolo vital de 90 segundos"
      ],
      victory: "Resultado: Recuperar sua segurança básica sabendo que você pode superar qualquer coisa.",
      icon: Power
    },
    {
      num: 4,
      title: "MÓDULO 4 — Reprogramação do Sistema Nervoso",
      tag: "Cure a raiz biológica",
      objective: "Banhar seu organismo em um baixo nível de excitação simpática.",
      items: [
        "Estimulação manual do nervo vago para forçar o relaxamento somático",
        "Restaurar a bioquímica saudável para um sono profundo e reparador",
        "Por que alguns alimentos comuns pioram drasticamente a ansiedade",
        "Ativar liberações saudáveis de cortisol e parar hábitos inconscientes que destroem sua energia"
      ],
      victory: "Resultados: Uma queda maciça e definitiva na sua ansiedade basal após 7 dias.",
      icon: Clock
    },
    {
      num: 5,
      title: "MÓDULO 5 — Esvaziando a Bagagem",
      tag: "Liberte fardos acumulados",
      objective: "Desabafar suavemente feridas de atenção e tensões armazenadas.",
      items: [
        "O conceito de trauma funcional e como o medo se cristaliza nos músculos",
        "Entender e desativar a culpa inconsciente e a desconexão",
        "Escrita terapêutica para descarga emocional imediata",
        "Liberação somática de agitação autônoma guiada"
      ],
      victory: "Resultado: Alívio visceral e uma sensação sem precedentes de leveza corporal.",
      icon: Heart
    },
    {
      num: 6,
      title: "MÓDULO 6 — A Nova Mente",
      tag: "Estabeleça uma paz inabalável",
      objective: "Ancorar um estado de estabilidade emocional duradouro perante o mundo.",
      items: [
        "Sua nova rotina personalizada de paz (apenas 5 minutos todas as manhãs)",
        "Como prevenir e transformar suavemente futuras recaídas potenciais",
        "Construir e ancorar uma identidade estável como observador soberano",
        "Viver sem reagir impulsivamente a cada evento externo ou pensamento"
      ],
      victory: "Resultado: Um relacionamento saudável e pacífico com uma mente clara e soberana.",
      icon: ShieldCheck
    }
  ]
};

const TEXTS_DICT = {
  fr: {
    badge: "STRUCTURE COMPLÈTE DU PROGRAMME",
    title: "La Méthode pas-à-pas en 6 Modules",
    subtitle: "Chaque module dure entre 8 et 15 minutes, est filmé dans un format vidéo condensé et comprend des exercices d'application immédiats pour des gains neuro-biologiques physiques réels.",
    objective: "Objectif principal :",
    step: "Étape",
    formatModules: "6 Modules",
    formatModulesSub: "Vidéos de 8 à 15 min",
    formatVideos: "Vidéos",
    formatVideosSub: "Accès instantané",
    formatAudios: "Audios",
    formatAudiosSub: "Pratiques nomades",
    formatPDF: "PDFs",
    formatPDFSub: "Fiches & Exercices"
  },
  es: {
    badge: "ESTRUCTURA COMPLETA DEL PROGRAMA",
    title: "El Método paso a paso en 6 Módulos",
    subtitle: "Cada módulo dura entre 8 y 15 minutos, está grabado en un formato de video condensado e incluye ejercicios de aplicación inmediata para obtener beneficios neurobiológicos reales.",
    objective: "Objetivo principal:",
    step: "Módulo",
    formatModules: "6 Módulos",
    formatModulesSub: "Videos de 8 a 15 min",
    formatVideos: "Videos",
    formatVideosSub: "Acceso instantáneo",
    formatAudios: "Audios",
    formatAudiosSub: "Prácticas portátiles",
    formatPDF: "PDFs",
    formatPDFSub: "Fichas y Ejercicios"
  },
  en: {
    badge: "COMPLETE PROGRAM STRUCTURE",
    title: "The Step-by-Step Method in 6 Modules",
    subtitle: "Each module lasts between 8 and 15 minutes, is filmed in a condensed video format, and includes immediate application exercises for real physical neuro-biological gains.",
    objective: "Main objective:",
    step: "Step",
    formatModules: "6 Modules",
    formatModulesSub: "8 to 15 min videos",
    formatVideos: "Videos",
    formatVideosSub: "Instant access",
    formatAudios: "Audios",
    formatAudiosSub: "On-the-go practice",
    formatPDF: "PDFs",
    formatPDFSub: "Sheets & Exercises"
  },
  pt: {
    badge: "ESTRUTURA COMPLETA DO PROGRAMA",
    title: "O Método passo a passo em 6 Módulos",
    subtitle: "Cada módulo dura entre 8 e 15 minutos, é gravado em um formato de vídeo condensado e inclui exercícios de aplicação imediata para ganhos neurobiológicos físicos reais.",
    objective: "Objetivo principal:",
    step: "Módulo",
    formatModules: "6 Módulos",
    formatModulesSub: "Vídeos de 8 a 15 min",
    formatVideos: "Vídeos",
    formatVideosSub: "Acesso imediato",
    formatAudios: "Áudios",
    formatAudiosSub: "Práticas portáteis",
    formatPDF: "PDFs",
    formatPDFSub: "Fichas & Exercícios"
  }
};

export default function ProgramModules({ lang }: ProgramModulesProps) {
  const t = TEXTS_DICT[lang] || TEXTS_DICT.fr;
  const modules = MODULES_DICT[lang] || MODULES_DICT.fr;

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-white/20 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest leading-none">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-950 font-bold max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => {
          const IconComponent = mod.icon;
          return (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-sky-300 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Giant water badge inside block */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/5 rounded-full group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-block bg-sky-100 text-sky-800 text-[10px] uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded-lg">
                    {t.step} {mod.num}
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-500">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {mod.title.replace('MÓDULO 1 — ', '').replace('MÓDULO 2 — ', '').replace('MÓDULO 3 — ', '').replace('MÓDULO 4 — ', '').replace('MÓDULO 5 — ', '').replace('MÓDULO 6 — ', '').replace('MODULE 1 — ', '').replace('MODULE 2 — ', '').replace('MODULE 3 — ', '').replace('MODULE 4 — ', '').replace('MODULE 5 — ', '').replace('MODULE 6 — ', '')}
                  </h3>
                  <span className="block text-xs font-bold font-mono text-sky-700 uppercase">
                    {mod.tag}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-900 font-medium">
                  <span className="font-extrabold text-slate-950 block">{t.objective}</span>
                  {mod.objective}
                </div>

                <ul className="space-y-2 text-xs text-slate-950 font-bold">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-1.5 leading-snug">
                      <span className="text-sky-500 font-extrabold select-none flex-shrink-0 mt-0.5">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick victory flag */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 bg-sky-50/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-3xl">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[11px] font-extrabold text-sky-900 leading-snug">
                    {mod.victory}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course format characteristics list */}
      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">{t.formatModules}</span>
          <span className="block text-[10px] sm:text-xs font-mono font-bold text-sky-700 uppercase mt-1">{t.formatModulesSub}</span>
        </div>
        <div className="border-l border-slate-100 sm:border-l sm:border-slate-100">
          <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">{t.formatVideos}</span>
          <span className="block text-[10px] sm:text-xs font-mono font-bold text-sky-700 uppercase mt-1">{t.formatVideosSub}</span>
        </div>
        <div className="border-l border-slate-100 sm:border-l sm:border-slate-100">
          <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">{t.formatAudios}</span>
          <span className="block text-[10px] sm:text-xs font-mono font-bold text-sky-700 uppercase mt-1">{t.formatAudiosSub}</span>
        </div>
        <div className="border-l border-slate-100 sm:border-l sm:border-slate-100">
          <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">{t.formatPDF}</span>
          <span className="block text-[10px] sm:text-xs font-mono font-bold text-sky-700 uppercase mt-1">{t.formatPDFSub}</span>
        </div>
      </div>
    </section>
  );
}
