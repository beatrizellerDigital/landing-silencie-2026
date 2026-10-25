import { Language } from './translations';

export interface SubtitleCue {
  id: number;
  start: number; // in seconds
  end: number;
  text: string;
}

export interface SubtitleTrackInfo {
  lang: Language;
  label: string;
  flag: string;
  src: string;
}

export const SUBTITLE_TRACKS: Record<Language, SubtitleTrackInfo> = {
  fr: {
    lang: 'fr',
    label: 'Français',
    flag: '🇫🇷',
    src: '/subtitles/subtitles-fr.vtt'
  },
  es: {
    lang: 'es',
    label: 'Español',
    flag: '🇪🇸',
    src: '/subtitles/subtitles-es.vtt'
  },
  en: {
    lang: 'en',
    label: 'English',
    flag: '🇬🇧',
    src: '/subtitles/subtitles-en.vtt'
  },
  pt: {
    lang: 'pt',
    label: 'Português',
    flag: '🇧🇷',
    src: '/subtitles/subtitles-pt.vtt'
  }
};

export const SUBTITLES_CUES: Record<Language, SubtitleCue[]> = {
  es: [
    { id: 1, start: 0.5, end: 3.35, text: "Apaga esa tormenta de pensamientos que te roban tu paz." },
    { id: 2, start: 3.6, end: 7.95, text: "Con los sencillos métodos de Silenciez votre esprit, científicamente probados y sin medicamentos." },
    { id: 3, start: 8.25, end: 9.5, text: "Reencuentra tu paz interior." }
  ],
  fr: [
    { id: 1, start: 0.5, end: 3.35, text: "Éteignez cette tempête de pensées qui vous volent votre paix." },
    { id: 2, start: 3.6, end: 7.95, text: "Avec les méthodes simples de Silenciez votre esprit, scientifiquement prouvées et sans médicaments." },
    { id: 3, start: 8.25, end: 9.5, text: "Retrouvez votre paix intérieure." }
  ],
  en: [
    { id: 1, start: 0.5, end: 3.35, text: "Turn off that storm of thoughts stealing your peace." },
    { id: 2, start: 3.6, end: 7.95, text: "With the simple methods of Silenciez votre esprit, scientifically proven and medication-free." },
    { id: 3, start: 8.25, end: 9.5, text: "Rediscover your inner peace." }
  ],
  pt: [
    { id: 1, start: 0.5, end: 3.35, text: "Desligue essa tempestade de pensamentos que roubam sua paz." },
    { id: 2, start: 3.6, end: 7.95, text: "Com os métodos simples de Silenciez votre esprit, cientificamente comprovados e sem medicamentos." },
    { id: 3, start: 8.25, end: 9.5, text: "Reencontre sua paz interior." }
  ]
};
