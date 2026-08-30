import { useState, useEffect } from 'react';
import { Sparkles, Play, Pause, RefreshCw, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../translations';

interface PracticalExampleProps {
  lang: Language;
}

const DICT = {
  fr: {
    tag: "DÉMONSTRATION ET CAS PRATIQUE",
    title: "Exemple Pratique : Comment réguler son corps en direct ?",
    desc: "Découvrez notre simulateur de respiration vagale en temps réel ou lisez l'histoire inspirante d'un de nos élèves.",
    tabTrial: "🌬️ Exercice Pratique Interactif",
    tabStudy: "📋 Étude de Cas (Jean, 34 ans)",
    simulatorTitle: "Simulateur Somatique Vagal de 4-7-8s",
    pause: "PAUSER L'EXERCICE",
    start: "COMMENCER LE TEST",
    howWorks: "Comment fonctionne cet exercice ?",
    howWorksDesc: "Ceci est le protocole de détresse de base du Module 3. Il sature les récepteurs baro-sensibles pulmonaires pour envoyer un signal électro-chimique direct de sécurité au cerveau gauche :",
    steps: [
      "1. Inspiration (4s) : Remplir de bas en haut pour activer le diaphragme.",
      "2. Rétention (7s) : Calmer les tressaillements involontaires des bronches.",
      "3. Expiration soupire (8s) : Évacuer l'acide carbonique et relâcher le tonus."
    ],
    phaseRunning: "● PHASE EN COURS :",
    exerciseReady: "EXERCICE PRÊT",
    clickToStart: "Cliquez sur 'COMMENCER LE TEST' pour réaliser gratuitement 1 cycle d'initiation guidé.",
    completedCycles: "Cycles terminés :",
    lettingGoText: "— Vous commencez déjà à lâcher prise !",
    oldApproach: "L'ANCIENNE APPROCHE (MENTAL)",
    oldJeanTitle: "Jean, 34 ans, victime de crises de panique spontanées",
    oldJeanDesc: "Pendant des réunions importantes de gestion, Jean sentait sa poitrine se comprimer, de la transpiration moite aux mains et une sensation d'évanouissement.",
    whatHeTried: "Ce qu'il tentait de faire :",
    oldJeanQuote: "« Je me répétais en continu d'être fort, d'arrêter d'avoir peur, que tout allait bien. Je luttais contre mon rythme cardiaque, essayant de me contrôler par la force logique. Résultat ? La panique redoublait, de peur d'être humilié devant l'équipe. Je fuyais aux toilettes. »",
    newApproach: "LA NOUVELLE APPROCHE (RÉGULATION SOMATIQUE)",
    newJeanTitle: "Jean après avoir appliqué la Méthode Silencia El Pánico",
    newJeanDesc: "Grâce au Module 3 et Module 4, Jean a rééduqué sa boucle de peur primitive et a cessé de traiter ses sensations corporelles comme un problème analytique.",
    hisTestimony: "Son témoignage précis :",
    newJeanQuote: "« J’ai compris que mon corps paniquait de lui-même. Quand les premiers symptômes montent, j'applique mon ancre somatique sous la table de réunion, sans que personne ne s'en rende compte. Je ne combats plus. Je stimule le nerf vague. La panique s'évapore de mon corps en 90 secondes chrono. Je n'ai plus jamais refait de crise majeure. »",
    consensus: "Plus besoin de lutter mentalement. En apprenant à réguler, vous reprenez le contrôle total.",
    phases: {
      Inspirer: "Inspirer",
      Retenir: "Retenir",
      Expirer: "Expirer",
      guidanceIn: "Inspirez lentement par le nez, gonflez le ventre.",
      guidanceHold: "Suspensez tranquillement l'air, détendez vos épaules.",
      guidanceOut: "Soupirez bruyamment par la bouche, libérez toute tension.",
      durationIn: "Inspiration - 4 secondes",
      durationHold: "Rétention - 7 secondes",
      durationOut: "Expiration - 8 secondes"
    }
  },
  es: {
    tag: "DEMOSTRACIÓN Y CASO PRÁCTICO",
    title: "Ejemplo Práctico: ¿Cómo regular tu cuerpo en directo?",
    desc: "Descubre nuestro simulador de respiración vagal en tiempo real o lee la historia inspiradora de uno de nuestros alumnos.",
    tabTrial: "🌬️ Ejercicio Práctico Interactivo",
    tabStudy: "📋 Estudio de Caso (Juan, 34 años)",
    simulatorTitle: "Simulador Somático Vagal de 4-7-8s",
    pause: "PAUSAR EL EJERCICIO",
    start: "EMPEZAR LA PRUEBA",
    howWorks: "¿Cómo funciona este ejercicio?",
    howWorksDesc: "Este es el protocolo de rescate básico del Módulo 3. Satura los receptores barosensibles pulmonares para enviar una señal electroquímica directa de seguridad al cerebro izquierdo:",
    steps: [
      "1. Inspiración (4s): Llenar de abajo hacia arriba para activar el diafragma.",
      "2. Retención (7s): Calmar los espasmos involuntarios de los bronquios.",
      "3. Exhalación con suspiro (8s): Evacuar el ácido carbónico y liberar el tono muscular."
    ],
    phaseRunning: "● FASE EN CURSO:",
    exerciseReady: "EJERCICIO LISTO",
    clickToStart: "Haz clic en 'EMPEZAR LA PRUEBA' para realizar gratis 1 ciclo de iniciación guiado.",
    completedCycles: "Ciclos completados:",
    lettingGoText: "— ¡Ya empiezas a soltar tensión!",
    oldApproach: "EL ENFOQUE ANTIGUO (MENTAL)",
    oldJeanTitle: "Juan, 34 años, víctima de crisis de pánico espontáneas",
    oldJeanDesc: "Durante reuniones de gestión importantes, Juan sentía que se le oprimía el pecho, manos sudorosas y sensación de desmayo.",
    whatHeTried: "Lo que intentaba hacer:",
    oldJeanQuote: "«Me repetía continuamente que fuera fuerte, que dejara de tener miedo, que todo estaba bien. Luchaba contra mi ritmo cardíaco, intentando controlarme con fuerza lógica. ¿El resultado? El pánico aumentaba por miedo a ser humillado ante el equipo. Huía al baño.»",
    newApproach: "EL NUEVO ENFOQUE (REGULACIÓN SOMÁTICA)",
    newJeanTitle: "Juan después de aplicar el Método Silencia El Pánico",
    newJeanDesc: "Gracias al Módulo 3 y Módulo 4, Juan reeducó su bucle de miedo primitivo y dejó de tratar sus sensaciones corporales como un problema analítico.",
    hisTestimony: "Su testimonio exacto:",
    newJeanQuote: "«Entendí que mi cuerpo entraba en pánico por sí solo. Cuando suben los primeros síntomas, aplico mi ancla somática debajo de la mesa de reunión, sin que nadie se dé cuenta. Ya no lucho. Estimulo el nervio vago. El pánico se evapora de mi cuerpo en 90 segundos cronometrados. Nunca volví a tener una crisis importante.»",
    consensus: "Ya no hace falta luchar mentalmente. Al aprender a regular, recuperas el control total.",
    phases: {
      Inspirer: "Inspirar",
      Retenir: "Retener",
      Expirer: "Exhalar",
      guidanceIn: "Inhala lentamente por la nariz, inflando el abdomen.",
      guidanceHold: "Retén el aire tranquilamente, relaja los hombros.",
      guidanceOut: "Exhala ruidosamente por la boca, liberando toda tensión.",
      durationIn: "Inspiración - 4 segundos",
      durationHold: "Retención - 7 segundos",
      durationOut: "Exhalación - 8 segundos"
    }
  },
  en: {
    tag: "DEMONSTRATION AND CASE STUDY",
    title: "Practical Example: How to regulate your body live?",
    desc: "Discover our real-time vagal breathing simulator or read the inspiring story of one of our students.",
    tabTrial: "🌬️ Interactive Practical Exercise",
    tabStudy: "📋 Case Study (John, 34 years old)",
    simulatorTitle: "Vagal Somatic Simulator 4-7-8s",
    pause: "PAUSE EXERCISE",
    start: "START THE TEST",
    howWorks: "How does this exercise work?",
    howWorksDesc: "This is the basic distress protocol of Module 3. It saturates pulmonary baro-sensitive receptors to send a direct electrochemical safety signal to the left brain:",
    steps: [
      "1. Inhale (4s): Fill up from bottom to top to activate the diaphragm.",
      "2. Hold (7s): Calm the involuntary twitches of the bronchi.",
      "3. Exhale sigh (8s): Evacuate carbonic acid and release muscle tone."
    ],
    phaseRunning: "● CURRENT PHASE:",
    exerciseReady: "EXERCISE READY",
    clickToStart: "Click 'START THE TEST' to perform 1 guided initiation cycle for free.",
    completedCycles: "Completed cycles:",
    lettingGoText: "— You are already starting to let go!",
    oldApproach: "THE OLD APPROACH (MENTAL)",
    oldJeanTitle: "John, 34, victim of spontaneous panic attacks",
    oldJeanDesc: "During important management meetings, John felt his chest compress, cold sweat on his hands, and a fainting sensation.",
    whatHeTried: "What he tried to do:",
    oldJeanQuote: "«I kept telling myself to be strong, to stop being afraid, that everything was fine. I fought my heart rate, trying to control myself by logical force. The result? The panic redoubled, out of fear of being humiliated in front of the team. I fled to the bathroom.»",
    newApproach: "THE NEW APPROACH (SOMATIC REGULATION)",
    newJeanTitle: "John after applying the Silence Panic Method",
    newJeanDesc: "Thanks to Module 3 and Module 4, John retrained his primitive fear loop and stopped treating his body sensations as an analytical problem.",
    hisTestimony: "His exact testimony:",
    newJeanQuote: "«I understood that my body was panicking on its own. When the first symptoms rise, I apply my somatic anchor under the meeting table, without anyone noticing. I no longer fight. I stimulate the vagus nerve. The panic evaporates from my body in 90 seconds flat. I never had another major crisis.»",
    consensus: "No more need to struggle mentally. By learning to regulate, you regain full control.",
    phases: {
      Inspirer: "Inhale",
      Retenir: "Hold",
      Expirer: "Exhale",
      guidanceIn: "Breathe in slowly through your nose, expanding your belly.",
      guidanceHold: "Tranquilly hold your breath, relax your shoulders.",
      guidanceOut: "Sigh out loudly through your mouth, releasing all tension.",
      durationIn: "Inhale - 4 seconds",
      durationHold: "Hold - 7 seconds",
      durationOut: "Exhale - 8 seconds"
    }
  },
  pt: {
    tag: "DEMONSTRAÇÃO E CASO PRÁTICO",
    title: "Exemplo Prático: Como regular seu corpo ao vivo?",
    desc: "Descubra o nosso simulador de respiração vagal em tempo real ou leia a história inspiradora de um de nossos alunos.",
    tabTrial: "🌬️ Exercício Prático Interativo",
    tabStudy: "📋 Estudo de Caso (João, 34 anos)",
    simulatorTitle: "Simulador Somático Vagal de 4-7-8s",
    pause: "PAUSAR O EXERCÍCIO",
    start: "COMEÇAR O TESTE",
    howWorks: "Como funciona este exercício?",
    howWorksDesc: "Este é o protocolo de emergência básico do Módulo 3. Ele satura os receptores barossensíveis pulmonares para enviar um sinal eletroquímico direto de segurança ao cérebro esquerdo:",
    steps: [
      "1. Inspiração (4s): Encha de baixo para cima para ativar o diafragma.",
      "2. Retenção (7s): Acalme os espasmos involuntários dos brônquios.",
      "3. Expiração com suspiro (8s): Elimine o ácido carbônico e relaxe o tônus."
    ],
    phaseRunning: "● FASE EM CURSO:",
    exerciseReady: "EXERCÍCIO PRONTO",
    clickToStart: "Clique em 'COMEÇAR O TESTE' para realizar gratuitamente 1 ciclo de iniciação guiada.",
    completedCycles: "Ciclos concluídos:",
    lettingGoText: "— Você já está começando a relaxar!",
    oldApproach: "A ABORDAGEM ANTIGA (MENTAL)",
    oldJeanTitle: "João, 34 anos, vítima de ataques de pânico espontâneos",
    oldJeanDesc: "Durante reuniões de gestão importantes, João sentia o peito apertar, mãos frias e suadas e uma sensação de desmaio.",
    whatHeTried: "O que ele tentava fazer:",
    oldJeanQuote: "«Eu repetia continuamente para mim mesmo ser forte, parar de ter medo, que tudo estava bem. Lutava contra o meu ritmo cardíaco, tentando me controlar pela força lógica. O resultado? O pânico aumentava por medo de ser humilhado na frente da equipe. Eu fugia para o banheiro.»",
    newApproach: "A NOVA ABORDAGEM (REGULAÇÃO SOMÁTICA)",
    newJeanTitle: "João depois de aplicar o Método Silencie sua Mente",
    newJeanDesc: "Graças ao Módulo 3 e ao Módulo 4, João reeducou seu ciclo de medo primitivo e parou de tratar as sensações corporais como um problema analítico.",
    hisTestimony: "Seu testemunho exato:",
    newJeanQuote: "«Entendi que meu corpo entrava em pânico sozinho. Quando os primeiros sintomas surgem, aplico minha âncora somática sob a mesa de reunião, sem que ninguém perceba. Não luto mais. Estimulo o nervo vago. O pânico evapora do meu corpo em 90 segundos cravados. Nunca mais tive outra crise grave.»",
    consensus: "Não precisa mais lutar mentalmente. Ao aprender a regular, você recupera o controle total.",
    phases: {
      Inspirer: "Inspirar",
      Retenir: "Reter",
      Expirer: "Expirar",
      guidanceIn: "Inspire lentamente pelo nariz, expandindo o abdômen.",
      guidanceHold: "Retenha o ar tranquilamente, relaxe os ombros.",
      guidanceOut: "Solte o ar ruidosamente pela boca, liberando toda a tensão.",
      durationIn: "Inalação - 4 segundos",
      durationHold: "Retenção - 7 segundos",
      durationOut: "Expiração - 8 segundos"
    }
  }
};

type BreathPhase = 'Inspirer' | 'Retenir' | 'Expirer';

export default function PracticalExample({ lang }: PracticalExampleProps) {
  const t = DICT[lang] || DICT.fr;
  const [activeTab, setActiveTab] = useState<'study' | 'trial'>('trial');
  
  // Interactive Breathing State
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('Inspirer');
  const [seconds, setSeconds] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            // Transition to the next phase of the 4-7-8 relaxing breathing cycle
            if (phase === 'Inspirer') {
              setPhase('Retenir');
              return 7;
            } else if (phase === 'Retenir') {
              setPhase('Expirer');
              return 8;
            } else {
              setPhase('Inspirer');
              setCycleCount((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, phase]);

  const handleReset = () => {
    setIsPlaying(false);
    setPhase('Inspirer');
    setSeconds(4);
    setCycleCount(0);
  };

  // Determine scale of breathing circle
  let circleScale = 1;
  let textGuidance = "";
  let durationText = "";

  if (phase === 'Inspirer') {
    circleScale = 1.35; // Expand
    textGuidance = t.phases.guidanceIn;
    durationText = t.phases.durationIn;
  } else if (phase === 'Retenir') {
    circleScale = 1.35; // Hold expanded
    textGuidance = t.phases.guidanceHold;
    durationText = t.phases.durationHold;
  } else {
    circleScale = 1.0; // Contract
    textGuidance = t.phases.guidanceOut;
    durationText = t.phases.durationOut;
  }

  return (
    <div id="practical-example" className="w-full max-w-4xl mx-auto rounded-3xl bg-white/95 p-6 sm:p-10 shadow-2xl border border-sky-200">
      <div className="flex flex-col items-center text-center space-y-3 mb-8">
        <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-sky-850 bg-sky-150 px-3 py-1 rounded-full uppercase leading-none">
          {t.tag}
        </span>
        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.title}
        </h3>
        <p className="text-sm text-slate-800 max-w-2xl font-bold">
          {t.desc}
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('trial')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all duration-300 ${
              activeTab === 'trial' 
                ? 'bg-sky-500 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabTrial}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('study')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all duration-300 ${
              activeTab === 'study' 
                ? 'bg-sky-500 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabStudy}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'trial' ? (
          <motion.div
            key="trial-active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row items-center gap-8 justify-around"
          >
            {/* Interactive Breathing Area Left */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl w-full md:w-[45%] h-80 relative overflow-hidden">
              <div className="absolute top-3 left-4 text-[10px] font-mono tracking-wider font-extrabold text-sky-700 uppercase flex items-center space-x-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
                <span>{t.simulatorTitle}</span>
              </div>

              {/* Breathing Ball */}
              <div className="relative flex items-center justify-center h-44 w-44">
                {/* Background pulse effect for expansion */}
                {isPlaying && (
                  <motion.div
                    animate={{
                      scale: circleScale * 1.3,
                      opacity: phase === 'Inspirer' ? [0.15, 0.45, 0.15] : 0.15,
                    }}
                    transition={{
                      duration: phase === 'Inspirer' ? 4 : phase === 'Retenir' ? 7 : 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-full bg-sky-300 pointer-events-none"
                  />
                )}

                <motion.div
                  animate={{ scale: isPlaying ? circleScale : 1 }}
                  transition={{
                    duration: phase === 'Inspirer' ? 4 : phase === 'Retenir' ? 7 : 8,
                    ease: "easeInOut",
                  }}
                  className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-white border-4 shadow-xl z-10 transition-colors duration-500 ${
                    phase === 'Inspirer' 
                      ? 'bg-sky-500 border-sky-300' 
                      : phase === 'Retenir' 
                      ? 'bg-indigo-500 border-indigo-300' 
                      : 'bg-emerald-500 border-emerald-300'
                  }`}
                >
                  <span className="text-xs uppercase font-mono tracking-widest font-extrabold opacity-75">
                    {t.phases[phase]}
                  </span>
                  <span className="text-3xl font-black">{seconds}s</span>
                </motion.div>
              </div>

              {/* Indicator Controls */}
              <div className="flex items-center space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs font-black tracking-wider flex items-center space-x-2 transition cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 text-amber-400" />
                      <span>{t.pause}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                      <span>{t.start}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 cursor-pointer"
                  title="Réinitialiser"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instruction Guidance Right */}
            <div className="flex-1 space-y-6">
              <div className="bg-sky-50 text-sky-900 rounded-2xl p-4 border border-sky-100 flex items-start space-x-3.5">
                <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wide">{t.howWorks}</h4>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold mt-1">
                    {t.howWorksDesc}
                  </p>
                </div>
              </div>

              {/* Phase explanations */}
              <div className="space-y-3 font-semibold text-xs sm:text-sm text-slate-950">
                {t.steps.map((stepStr, sIdx) => {
                  const stepPhase = sIdx === 0 ? 'Inspirer' : sIdx === 1 ? 'Retenir' : 'Expirer';
                  const isCurrent = phase === stepPhase && isPlaying;
                  const stepColor = sIdx === 0 ? 'bg-sky-500' : sIdx === 1 ? 'bg-indigo-500' : 'bg-emerald-400';
                  const stepBorder = sIdx === 0 ? 'bg-sky-50 border-sky-300' : sIdx === 1 ? 'bg-indigo-50 border-indigo-300' : 'bg-emerald-50 border-emerald-300';
                  return (
                    <div key={sIdx} className={`p-3 rounded-xl border flex items-center space-x-3 transition ${isCurrent ? `${stepBorder} font-bold` : 'border-slate-100 bg-white'}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${isCurrent ? `${stepColor} animate-ping` : 'bg-slate-300'}`} />
                      <span>{stepStr}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Guidance Message */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-emerald-700 text-xs font-mono uppercase tracking-wider font-extrabold animate-pulse">
                  {isPlaying ? `${t.phaseRunning} ${durationText.toUpperCase()}` : t.exerciseReady}
                </p>
                <p className="text-slate-900 text-xs sm:text-sm font-bold mt-1 leading-snug">
                  {isPlaying ? textGuidance : t.clickToStart}
                </p>
                {cycleCount > 0 && (
                  <p className="text-sky-700 text-[10px] font-bold font-mono mt-2">
                    {t.completedCycles} {cycleCount} {t.lettingGoText}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="study-active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Case Study Grid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-semibold text-xs sm:text-sm text-slate-950">
              
              {/* Box 1: The Old Jean */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 sm:p-6 space-y-4">
                <span className="inline-block bg-rose-500 text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded-md">{t.oldApproach}</span>
                
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{t.oldJeanTitle}</h4>
                
                <p className="text-slate-850 text-xs sm:text-sm leading-relaxed font-semibold">
                  {t.oldJeanDesc}
                </p>

                <div className="bg-rose-50 p-4 rounded-xl space-y-2 border border-rose-200 text-xs">
                  <span className="font-extrabold text-rose-950 uppercase tracking-wider block">{t.whatHeTried}</span>
                  <p className="text-rose-900 italic">
                    {t.oldJeanQuote}
                  </p>
                </div>
              </div>

              {/* Box 2: The Reprogrammed Jean */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 sm:p-6 space-y-4">
                <span className="inline-block bg-sky-500 text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded-md">{t.newApproach}</span>
                
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{t.newJeanTitle}</h4>
                
                <p className="text-slate-850 text-xs sm:text-sm leading-relaxed font-semibold">
                  {t.newJeanDesc}
                </p>

                <div className="bg-sky-50 p-4 rounded-xl space-y-2 border border-sky-200 text-xs">
                  <span className="font-extrabold text-sky-950 uppercase tracking-wider block">{t.hisTestimony}</span>
                  <p className="text-sky-900 italic">
                    {t.newJeanQuote}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom consensus card */}
            <div className="font-sans font-bold text-xs sm:text-sm p-4 bg-slate-50 text-slate-900 rounded-2xl text-center flex items-center justify-center space-x-2 border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{t.consensus}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
