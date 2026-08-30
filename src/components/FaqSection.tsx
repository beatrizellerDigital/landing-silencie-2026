import { useState } from 'react';
import { HelpCircle, ChevronDown, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../translations';

interface FaqSectionProps {
  lang: Language;
}

const DICT = {
  fr: {
    tag: "Foire Aux Questions",
    title: "Questions fréquentes et certitudes",
    desc: "Nous levons le voile sur les doutes communs afin que vous puissiez commander votre formule l'esprit serein et déchargé de tout stress financier ou logistique.",
    guaranteeTitle: "Vous êtes protégé par notre Garantie Inconditionnelle de 14 Jours",
    guaranteeDesc: "Nous prenons 100% du risque sur nos propres épaules de sorte que vous n'ayez aucun effort ni doute financier. Appliquez les techniques simples, si votre esprit ne s'apaise pas, nous vous remboursons intégralement.",
    faqs: [
      {
        question: "Que faire si j'ai l'impression d'avoir déjà tout essayé et que rien ne marche pour moi ?",
        answer: "C’est la preuve de certitude absolue que vous étiez dans une lutte analytique et intellectuelle vaine contre votre esprit. Notre méthode n'est pas un énième cours théorique ou thérapeutique. Nous régulons votre système nerveux de façon physique et somatique (nerf vague, respiration, biochimie corporelle). C'est de la neuro-biologie pure, et cela fonctionne là où la force de volonté a toujours échoué."
      },
      {
        question: "Y a-t-il un abonnement récurrent ou des frais cachés après l'achat ?",
        answer: "Absolument aucun. C'est un paiement unique de 23 €. Vous obtenez un accès complet, définitif et instantané à vie, ainsi qu'aux futures mises à jour gratuites du programme."
      },
      {
        question: "Je n'ai pas beaucoup de temps libre. Combien de temps cela prend-il ?",
        answer: "Chaque module vidéo dure entre 8 et 15 minutes maximum, conçus de manière très synthétique. Nos exercices somatiques urgents prennent moins de 90 secondes et se pratiquent n'importe où (au bureau, au lit, en public) sans que personne ne s'en aperçoive."
      },
      {
        question: "Comment fonctionne la garantie de remboursement de 14 jours ?",
        answer: "C'est extrêmement simple et transparent : testez l'ensemble du programme tranquillement. Si dans les 14 jours vous ne ressentez pas plus de calme intérieur, de clarté et un soulagement direct de votre stress... envoyez-nous un email de demande de remboursement. Nous créditons votre carte à 100% sans poser d'autres questions."
      },
      {
        question: "Comment et quand vais-je recevoir mon accès ?",
        answer: "De façon 100% automatisée et instantanée. Dès que votre paiement est validé par notre pare-feu crypté, un email de bienvenue est expédié contenant toutes vos clés membres et les accès directs de téléchargement des PDF et audios."
      }
    ]
  },
  es: {
    tag: "Preguntas Frecuentes",
    title: "Preguntas frecuentes y certezas",
    desc: "Aclaramos las dudas más comunes para que puedas pedir tu fórmula con la mente tranquila y libre de todo estrés financiero o logístico.",
    guaranteeTitle: "Estás protegido por nuestra Garantía Incondicional de 14 Días",
    guaranteeDesc: "Asumimos el 100% del riesgo para que no tengas ningún esfuerzo ni duda financiera. Aplica las técnicas sencillas; si tu mente no se calma, te reembolsamos el total sin preguntas.",
    faqs: [
      {
        question: "¿Qué pasa si siento que ya lo he intentado todo y nada me funciona?",
        answer: "Esta es la prueba de certeza absoluta de que estabas en una lucha intelectual e inútil contra tu mente. Nuestro método no es otra clase teórica o terapéutica. Regulamos tu sistema nervioso de forma física y somática (nervio vago, respiración, bioquímica corporal). Es neurobiología pura y funciona donde la fuerza de voluntad siempre ha fallado."
      },
      {
        question: "¿Hay alguna suscripción recurrente o cargos ocultos después de la compra?",
        answer: "Absolutamente ninguno. Es un pago único de 23 €. Obtienes acceso completo, definitivo e instantáneo de por vida, así como a todas las actualizaciones gratuitas futuras."
      },
      {
        question: "No tengo mucho tiempo libre. ¿Cuánto tiempo requiere esto?",
        answer: "Cada módulo de video dura entre 8 y 15 minutos como máximo, diseñados para ser muy sintéticos. Nuestros ejercicios somáticos de emergencia toman menos de 90 segundos y se pueden practicar en cualquier lugar (en la oficina, en la cama, en público) sin que nadie lo note."
      },
      {
        question: "¿Cómo funciona la garantía de devolución de dinero de 14 días?",
        answer: "Es extremadamente sencillo y transparente: prueba todo el programa con calma. Si en 14 días no sientes mayor calma interior, claridad y un alivio directo de tu estrés... envíanos un correo electrónico solicitando el reembolso. Te devolveremos el 100% del dinero a tu tarjeta, sin preguntas."
      },
      {
        question: "¿Cómo y cuándo recibiré mi acceso?",
        answer: "De manera 100% automatizada e instantánea. Tan pronto como tu pago sea validado, se enviará un correo electrónico de bienvenida con todas tus claves de miembro y enlaces directos de descarga para los PDF y audios."
      }
    ]
  },
  en: {
    tag: "Frequently Asked Questions",
    title: "Frequently Asked Questions & Answers",
    desc: "We answer common doubts so you can order your formula with a clear mind, free of any financial or logistical stress.",
    guaranteeTitle: "You are Protected by Our Unconditional 14-Day Guarantee",
    guaranteeDesc: "We take 105% of the risk on our shoulders so you have zero financial worry. Try the simple techniques; if your mind does not calm down, we will refund you fully.",
    faqs: [
      {
        question: "What if I feel like I've already tried everything and nothing works for me?",
        answer: "This is absolute proof that you were in a futile intellectual struggle against your mind. Our method is not another theoretical or talk therapy. We regulate your nervous system physically and somatically (vagus nerve, breathing, body biochemistry). This is pure neurobiology, and it works where willpower has always failed."
      },
      {
        question: "Are there any recurring subscriptions or hidden fees after purchase?",
        answer: "Absolutely none. This is a one-time payment of €23. You get full, lifetime access to the program, including all future updates."
      },
      {
        question: "I don't have much free time. How long does this take?",
        answer: "Each video module lasts between 8 and 15 minutes max, designed to be highly concise. Our urgent somatic exercises take less than 90 seconds and can be practiced anywhere (at the office, in bed, in public) without anyone noticing."
      },
      {
        question: "How does the 14-day money-back guarantee work?",
        answer: "It is extremely simple and transparent: try the entire program. If within 14 days you don't feel more inner calm, clarity, and direct relief from stress... send us an email. We will issue a 100% refund, no questions asked."
      },
      {
        question: "How and when will I receive my access?",
        answer: "100% automated and instant. As soon as your payment is validated, a welcome email is sent containing all member credentials and direct download links for the PDFs and audios."
      }
    ]
  },
  pt: {
    tag: "Perguntas Frequentes",
    title: "Perguntas frequentes e certezas",
    desc: "Esclarecemos as dúvidas mais comuns para que você possa solicitar sua fórmula com a mente tranquila e livre de qualquer estresse financeiro ou logístico.",
    guaranteeTitle: "Você está protegido pela nossa Garantia Incondicional de 14 Dias",
    guaranteeDesc: "Assumimos 100% do risco em nossos próprios ombros, para que você não tenha nenhum esforço ou dúvida financeira. Aplique as técnicas simples; se sua mente não se acalmar, nós o reembolsaremos integralmente.",
    faqs: [
      {
        question: "E se eu sentir que já tentei de tudo e nada funciona para mim?",
        answer: "Isso é a prova de certeza absoluta de que você estava em uma luta analítica e intelectual em vão contra sua mente. Nosso método não é mais um curso teórico ou terapêutico. Nós regulamos seu sistema nervoso de forma física e somática (nervo vago, respiração, bioquímica corporal). É pura neurobiologia, e funciona onde a força de vontade sempre falhou."
      },
      {
        question: "Existe alguma assinatura recorrente ou taxa oculta após a compra?",
        answer: "Absolutamente nenhuma. É um pagamento único de 23 €. Você ganha acesso completo, definitivo e instantâneo vitalício, bem como a todas as futuras atualizações gratuitas do programa."
      },
      {
        question: "Não tenho muito tempo livre. Quanto tempo isso exige?",
        answer: "Cada módulo em vídeo dura entre 8 e 15 minutos no máximo, projetados para serem muito sintéticos. Nossos exercícios somáticos urgentes levam menos de 90 segundos e podem ser praticados em qualquer lugar (no trabalho, na cama, em público) sem que ninguém perceba."
      },
      {
        question: "Como funciona a garantia de reembolso de 14 dias?",
        answer: "É extremamente simples e transparente: experimente todo o programa calmamente. Se em até 14 dias você não sentir mais calma interna, clareza e um alívio direto do seu estresse... envie-nos um e-mail solicitando o reembolso. Devolveremos 100% do valor no seu cartão, sem perguntas."
      },
      {
        question: "Como e quando receberei meu acesso?",
        answer: "De maneira 100% automatizada e instantânea. Assim que seu pagamento for validado pelo nosso sistema criptografado, um e-mail de boas-vindas será enviado contendo todas as suas credenciais de membro e os links diretos para download dos PDFs e áudios."
      }
    ]
  }
};

export default function FaqSection({ lang }: FaqSectionProps) {
  const t = DICT[lang] || DICT.fr;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-sky-650 font-mono text-xs uppercase tracking-widest font-semibold bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4" id="faq-accordion-list">
          {t.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-200 hover:bg-slate-100/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:text-sky-600 transition cursor-pointer"
                  id={`btn-faq-question-${idx}`}
                >
                  <span className="font-sans font-extrabold text-sm sm:text-base text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-sky-600 shrink-0 rotate-180 transition-transform" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 transition-transform" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-4 font-semibold">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Additional guarantee ribbon */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden">
          <div className="p-4 bg-sky-100 text-sky-600 rounded-2xl border border-sky-200 shrink-0">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">{t.guaranteeTitle}</h4>
            <p className="text-slate-600 text-xs mt-1 font-semibold leading-relaxed">
              {t.guaranteeDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
