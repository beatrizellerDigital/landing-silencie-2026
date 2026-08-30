import { AlertTriangle, ShieldAlert, Brain, Flame, Trash2 } from 'lucide-react';
import { Language } from '../translations';

interface AccrocheSectionProps {
  lang: Language;
}

const DICT = {
  fr: {
    takeAwareness: "Prenez conscience de ceci :",
    quote: "Il y a des personnes qui se battent avec leur esprit depuis 10 ans… et qui croient encore que le problème est qu’elles « n'ont pas assez réfléchi ».",
    error: "ERREUR.",
    notStuckAnswers: "Elles ne sont pas bloquées par manque de réponses. Elles sont bloquées par un ",
    excessNoise: "excès de bruit.",
    moreYouSearch: "Plus vous cherchez une logique, plus votre esprit se piège lui-même dans des labyrinthes de doutes :",
    bulletsLeft: [
      "➕ Plus de pensées",
      "➕ Plus d’analyses",
      "➕ Plus de peur",
      "➕ Plus d’anxiété",
      "⚡ Insomnies & Questions sans fin"
    ],
    fireAnalogy: "Et pendant qu'on essaie d'éteindre l'incendie avec l'esprit même qui le provoque… ",
    fireGrows: "le feu grandit.",
    stressNotDestroyOnce: "Le stress ne vous détruit pas d'un coup. ",
    slowly: "Il le fait lentement.",
    nibblesSlyly: "Il grignote sournoisement chaque pilier de votre vie quotidienne de manière invisible :",
    bulletsRight: [
      "Il vous vole votre sommeil.",
      "Il vous vole votre énergie.",
      "Il vous vole votre paix.",
      "Il vous prive de la capacité de savourer la simplicité."
    ],
    realizeBrutal: "Jusqu'à ce qu'un jour vous réalisiez une chose brutale :",
    mindNeverQuiet: "Votre mental ne se tait plus jamais.",
    downwardSpiral: "LA SPIRALE DESCENDANTE",
    realHellBegins: "Et c'est là que commence le véritable enfer...",
    overheatingText: "Si vous souffrez d'un ou de plusieurs de ces symptômes, votre système est en surchauffe :",
    symptoms: [
      "Crises de panique ou spasmes sans avertissement",
      "Anxiété constante même quand « tout va bien »",
      "Peur chronique de l'avenir et du malheur",
      "Pensées obsessionnelles et ruminations en boucle",
      "Vide émotionnel et sensation d'être anesthésié",
      "Épuisement mental complet et fatigue chronique",
      "La douloureuse sensation d'être brisé physiquement et mentalement"
    ],
    truthTitle: "Mais voici la vérité que personne ne vous a jamais expliquée :",
    truthAction: "Vous n'avez pas besoin de contrôler votre esprit. Vous devez cesser de lui obéir.",
    analogyText: "🌿 Pensez à l'analogie de l'eau agitée : Si vous y plongez vos mains pour essayer de la calmer de force, vous ne ferez qu'empirer le chaos. Mais quand vous apprenez à simplement l'observer sans résistance ni combat...",
    analogyCalm: "elle se calme d'elle-même."
  },
  es: {
    takeAwareness: "Toma conciencia de esto:",
    quote: "Hay personas que luchan con su mente desde hace 10 años... y que todavía creen que el problema es que «no han reflexionado lo suficiente».",
    error: "ERROR.",
    notStuckAnswers: "No están bloqueadas por falta de respuestas. Están bloqueadas por un ",
    excessNoise: "exceso de ruido.",
    moreYouSearch: "Cuanto más buscas una lógica, más se atrapa tu mente a sí misma en laberintos de dudas:",
    bulletsLeft: [
      "➕ Más pensamientos",
      "➕ Más análisis",
      "➕ Más miedo",
      "➕ Más ansiedad",
      "⚡ Insomnio y Preguntas sin fin"
    ],
    fireAnalogy: "Y mientras intentamos apagar el incendio con la misma mente que lo provoca... ",
    fireGrows: "el fuego crece.",
    stressNotDestroyOnce: "El estrés no te destruye de golpe. ",
    slowly: "Lo hace lentamente.",
    nibblesSlyly: "Rocía sutilmente cada pilar de tu vida diaria de manera invisible:",
    bulletsRight: [
      "Te roba el sueño.",
      "Te roba la energía.",
      "Te roba la paz.",
      "Te priva de la capacidad de disfrutar de la sencillez."
    ],
    realizeBrutal: "Hasta que un día te das cuenta de algo brutal:",
    mindNeverQuiet: "Tu mente nunca más se calla.",
    downwardSpiral: "LA ESPIRAL DESCENDENTE",
    realHellBegins: "Y ahí es donde comienza el verdadero infierno...",
    overheatingText: "Si sufres uno o más de estos síntomas, tu sistema está sobrecalentado:",
    symptoms: [
      "Crisis de pánico o espasmos sin previo aviso",
      "Ansiedad constante incluso cuando 'todo va bien'",
      "Miedo crónico al futuro y a la desgracia",
      "Pensamientos obsesivos y rumiaciones en bucle",
      "Vacío emocional y sensación de estar anestesiado",
      "Agotamiento mental completo y fatiga crónica",
      "La dolorosa sensación de estar roto física y mentalmente"
    ],
    truthTitle: "Pero aquí está la verdad que nadie te ha explicado jamás:",
    truthAction: "No necesitas controlar tu mente. Tienes que dejar de obedecerla.",
    analogyText: "🌿 Piensa en la analogía del agua agitada: Si metes las manos para intentar calmarla a la fuerza, solo empeorarás el caos. Pero cuando aprendes a simplemente observarla sin resistencia ni lucha...",
    analogyCalm: "se calma sola."
  },
  en: {
    takeAwareness: "Become aware of this:",
    quote: "There are people who fight with their mind for 10 years... and still believe the problem is they 'haven't thought about it enough'.",
    error: "ERROR.",
    notStuckAnswers: "They are not stuck because of a lack of answers. They are stuck because of an ",
    excessNoise: "excess of noise.",
    moreYouSearch: "The more you search for logic, the more your mind traps itself in labyrinths of doubt:",
    bulletsLeft: [
      "➕ More thoughts",
      "➕ More analysis",
      "➕ More fear",
      "➕ More anxiety",
      "⚡ Insomnia & Endless questions"
    ],
    fireAnalogy: "And while trying to put out the fire with the very mind that causes it... ",
    fireGrows: "the fire grows.",
    stressNotDestroyOnce: "Stress doesn't destroy you all at once. ",
    slowly: "It does it slowly.",
    nibblesSlyly: "It slyly nibbles away at every pillar of your daily life invisibly:",
    bulletsRight: [
      "It steals your sleep.",
      "It steals your energy.",
      "It steals your peace.",
      "It deprives you of the ability to savor simplicity."
    ],
    realizeBrutal: "Until one day you realize something brutal:",
    mindNeverQuiet: "Your mind never goes quiet again.",
    downwardSpiral: "THE DOWNWARD SPIRAL",
    realHellBegins: "And that's where the real hell begins...",
    overheatingText: "If you suffer from one or more of these symptoms, your system is overheating:",
    symptoms: [
      "Panic attacks or spasms without warning",
      "Constant anxiety even when 'everything is fine'",
      "Chronic fear of the future and misfortune",
      "Obsessive thoughts and looping ruminations",
      "Emotional emptiness and feeling numb",
      "Complete mental exhaustion and chronic fatigue",
      "The painful feeling of being physically and mentally broken"
    ],
    truthTitle: "But here is the truth that no one has ever explained to you:",
    truthAction: "You don't need to control your mind. You need to stop obeying it.",
    analogyText: "🌿 Think of the analogy of choppy water: If you plunge your hands in to try and calm it by force, you will only make the chaos worse. But when you learn to simply observe it without resistance or struggle...",
    analogyCalm: "it calms down on its own."
  },
  pt: {
    takeAwareness: "Tome consciência disto:",
    quote: "Há pessoas que lutam com sua mente há 10 anos... e ainda acreditam que o problema é que «não refletiram o suficiente».",
    error: "ERRO.",
    notStuckAnswers: "Elas não estão bloqueadas por falta de respostas. Estão bloqueadas por um ",
    excessNoise: "excesso de ruído.",
    moreYouSearch: "Quanto mais você procura uma lógica, mais sua mente se prende em labirintos de dúvidas:",
    bulletsLeft: [
      "➕ Mais pensamentos",
      "➕ Mais análises",
      "➕ Mais medo",
      "➕ Mais ansiedade",
      "⚡ Insônia e Perguntas sem fim"
    ],
    fireAnalogy: "E enquanto tentamos apagar o incêndio com a própria mente que o provoca... ",
    fireGrows: "o fogo cresce.",
    stressNotDestroyOnce: "O estresse não destrói você de uma vez só. ",
    slowly: "Faz isso lentamente.",
    nibblesSlyly: "Corrói sutilmente cada pilar de sua vida diária de maneira invisível:",
    bulletsRight: [
      "Ele rouba seu sono.",
      "Ele rouba sua energia.",
      "Ele rouba sua paz.",
      "Ele priva você da capacidade de saborear a simplicidade."
    ],
    realizeBrutal: "Até que um dia você percebe uma coisa brutal:",
    mindNeverQuiet: "Sua mente nunca mais se cala.",
    downwardSpiral: "A ESPIRAL DECRESCENTE",
    realHellBegins: "E é aí que começa o verdadeiro inferno...",
    overheatingText: "Se você sofre de um ou mais destes sintomas, seu sistema está superaquecido:",
    symptoms: [
      "Ataques de pânico ou espasmos sem aviso prévio",
      "Ansiedade constante mesmo quando 'tudo está bem'",
      "Medo crônico do futuro e da infelicidade",
      "Pensamentos obsessivos e ruminações em ciclo",
      "Vazio emocional e sensação de estar anestesiado",
      "Esgotamento mental completo e fatigue crônica",
      "A dolorosa sensação de estar quebrado física e mentalmente"
    ],
    truthTitle: "Mas aqui está a verdade que ninguém nunca lhe explicou:",
    truthAction: "Você não precisa controlar sua mente. Você precisa parar de obedecer a ela.",
    analogyText: "🌿 Pense na analogia da água agitada: Se você colocar as mãos para tentar acalmá-la à força, só piorará o caos. Mas quando você aprende a simplesmente observá-la sem resistência nem luta...",
    analogyCalm: "ela se acalma sozinha."
  }
};

export default function AccrocheSection({ lang }: AccrocheSectionProps) {
  const t = DICT[lang] || DICT.fr;

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
      {/* Visual Quote Banner */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-sky-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative space-y-6 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-white text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
            <span>{t.takeAwareness}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans tracking-tight">
            {t.quote}
          </h2>

          <div className="text-5xl font-black text-rose-500 tracking-wider">
            {t.error}
          </div>
        </div>
      </div>

      {/* Structured grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Card: Excessive Noise */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.notStuckAnswers} <span className="text-rose-500">{t.excessNoise}</span>
            </h3>
            
            <p className="text-slate-850 font-semibold text-sm sm:text-base leading-relaxed">
              {t.moreYouSearch}
            </p>

            <ul className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-slate-950 p-2 bg-slate-50 rounded-2xl border border-slate-100">
              {t.bulletsLeft.slice(0, 4).map((b, i) => (
                <li key={i} className="flex items-center space-x-2 text-rose-700">
                  <span>{b}</span>
                </li>
              ))}
              <li className="flex items-center space-x-2 text-rose-700 col-span-2 text-center justify-center border-t border-slate-200/65 pt-2">
                <span>{t.bulletsLeft[4]}</span>
              </li>
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-150/50 rounded-2xl p-4 text-xs sm:text-sm text-slate-905 flex items-start space-x-3">
            <Flame className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="font-semibold text-slate-900">
              {t.fireAnalogy} <b className="text-rose-600 font-extrabold">{t.fireGrows}</b>
            </p>
          </div>
        </div>

        {/* Right Card: The slow destruction */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.stressNotDestroyOnce} <span className="text-amber-600">{t.slowly}</span>
            </h3>
            
            <p className="text-slate-850 font-semibold text-sm sm:text-base leading-relaxed">
              {t.nibblesSlyly}
            </p>

            <div className="space-y-2">
              {t.bulletsRight.map((b, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-950">
                  <Trash2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100/50 rounded-2xl p-4 text-xs sm:text-sm text-slate-905">
            <span className="font-extrabold text-slate-950 block mb-1">{t.realizeBrutal}</span>
            <span className="font-black text-rose-600 text-sm">{t.mindNeverQuiet}</span>
          </div>
        </div>

      </div>

      {/* The Mind Hell Symptoms List */}
      <div className="bg-white border border-sky-100 text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">{t.downwardSpiral}</span>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.realHellBegins}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">{t.overheatingText}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.symptoms.map((symptom, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:bg-slate-100 transition">
                <span className="text-rose-500 font-bold text-lg leading-none">⚠️</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The core shift message */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
          {t.truthTitle}
        </h3>
        <p className="text-lg font-black text-black">
          {t.truthAction}
        </p>

        <div className="bg-sky-50 border-l-4 border-sky-400 rounded-r-2xl p-5 text-left text-slate-900 shadow-md">
          <p className="font-semibold text-sm sm:text-base leading-relaxed">
            🌿 {t.analogyText} <span className="text-sky-700 font-bold">{t.analogyCalm}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
