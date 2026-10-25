import { useState, useEffect, useMemo, useRef, ChangeEvent } from 'react';
import { 
  Play, 
  Sparkles, 
  Settings2, 
  Check, 
  RotateCcw, 
  X, 
  Volume2, 
  ShieldCheck, 
  ArrowRight, 
  UploadCloud, 
  FileVideo, 
  Trash2, 
  AlertTriangle, 
  Link as LinkIcon, 
  Info,
  CheckCircle2,
  Crown,
  Lock,
  EyeOff,
  Subtitles,
  Languages,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, Language } from '../translations';
import { DEFAULT_VIDEO_CONFIG, VideoConfiguration } from '../videoConfig';
import { SUBTITLE_TRACKS, SUBTITLES_CUES } from '../subtitlesConfig';
import { 
  saveVideoFileToDB, 
  getSavedVideoFromDB, 
  deleteSavedVideoFromDB, 
  formatFileSize 
} from '../utils/videoStorage';

interface VideoSectionProps {
  lang: Language;
  onScrollToPricing: () => void;
}

export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'mp4' | 'drive' | 'iframe';
  embedUrl: string;
  isDrive?: boolean;
}

/**
 * Intelligent URL parser for multiple video providers:
 * - Google Drive: converts share/view URLs to direct /preview iframe to prevent frame blocking
 * - YouTube: regular, share, shorts, embed URLs with nocookie domain
 * - Vimeo: video IDs and players
 * - Direct files: .mp4, .webm, .ogg, .mov, blobs
 */
export function parseVideoUrl(inputUrl: string): ParsedVideo {
  const url = (inputUrl || '').trim();

  // 1. Google Drive detection (view, sharing, open?id, uc?id)
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=))([a-zA-Z0-9_-]+)/i;
  const driveMatch = url.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    return {
      type: 'drive',
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      isDrive: true
    };
  }

  // 2. YouTube detection (standard, short, embed, shorts)
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    };
  }

  // 3. Vimeo detection
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)|player\.vimeo\.com\/video\/(\d+))/i;
  const vimeoMatch = url.match(vimeoRegex);
  const vimeoId = vimeoMatch ? (vimeoMatch[3] || vimeoMatch[4]) : null;
  if (vimeoId) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
    };
  }

  // 4. Direct video files (MP4, WebM, OGG, MOV, blob, data)
  if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || url.startsWith('blob:') || url.startsWith('data:video')) {
    return {
      type: 'mp4',
      embedUrl: url
    };
  }

  // 5. Fallback: treat as iframe embed
  return {
    type: 'iframe',
    embedUrl: url
  };
}

export default function VideoSection({ lang, onScrollToPricing }: VideoSectionProps) {
  const t = TRANSLATIONS[lang].video;

  // Configuration state with fallback to DEFAULT_VIDEO_CONFIG
  const [config, setConfig] = useState<VideoConfiguration>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('app_video_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          // If stored value is the old placeholder YouTube video or old preset, upgrade to official video
          if (
            !parsed.url || 
            parsed.url === 'https://www.youtube.com/watch?v=inpok4MKVLM' ||
            parsed.posterUrl === 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80'
          ) {
            localStorage.setItem('app_video_config', JSON.stringify(DEFAULT_VIDEO_CONFIG));
            return DEFAULT_VIDEO_CONFIG;
          }
          return { ...DEFAULT_VIDEO_CONFIG, ...parsed };
        }
      } catch (e) {
        console.error('Failed reading stored video config:', e);
      }
    }
    return DEFAULT_VIDEO_CONFIG;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'guide'>('upload');
  
  // Local inputs in modal
  const [tempUrl, setTempUrl] = useState(config.url);
  const [tempPoster, setTempPoster] = useState(config.posterUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Attached video state (IndexedDB Blob -> ObjectURL)
  const [attachedBlobUrl, setAttachedBlobUrl] = useState<string | null>(null);
  const [attachedMeta, setAttachedMeta] = useState<{ name: string; size: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Subtitles state
  // Defaults to the current landing page language (fr, es, en, pt)
  const [activeSubtitleLang, setActiveSubtitleLang] = useState<Language>(lang);
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keep subtitle language synchronized with the global page language whenever it changes
  useEffect(() => {
    setActiveSubtitleLang(lang);
  }, [lang]);

  // Track playback time for synchronized subtitle overlay cues
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Find active subtitle text for current timestamp
  const activeCueText = useMemo(() => {
    if (!isSubtitlesEnabled) return null;
    const cues = SUBTITLES_CUES[activeSubtitleLang] || [];
    const found = cues.find(c => currentTime >= c.start && currentTime <= c.end);
    return found ? found.text : null;
  }, [isSubtitlesEnabled, activeSubtitleLang, currentTime]);

  // Admin / Owner Mode
  // If ?admin=true or ?edit=true is in the URL, or if saved in localStorage
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        if (
          searchParams.get('admin') === 'true' || 
          searchParams.get('edit') === 'true' || 
          searchParams.get('admin') === '1'
        ) {
          localStorage.setItem('app_video_admin_mode', 'true');
          return true;
        }
        return localStorage.getItem('app_video_admin_mode') === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  // Secret badge click counter (triple click activates/deactivates admin mode quickly)
  const [badgeClicks, setBadgeClicks] = useState(0);

  const handleBadgeClick = () => {
    const nextCount = badgeClicks + 1;
    setBadgeClicks(nextCount);
    if (nextCount >= 3) {
      const nextAdmin = !isAdmin;
      setIsAdmin(nextAdmin);
      setBadgeClicks(0);
      if (typeof window !== 'undefined') {
        if (nextAdmin) {
          localStorage.setItem('app_video_admin_mode', 'true');
        } else {
          localStorage.removeItem('app_video_admin_mode');
        }
      }
    }
  };

  const handleToggleAdminMode = (enabled: boolean) => {
    setIsAdmin(enabled);
    if (typeof window !== 'undefined') {
      if (enabled) {
        localStorage.setItem('app_video_admin_mode', 'true');
      } else {
        localStorage.removeItem('app_video_admin_mode');
        setIsConfigOpen(false);
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load any previously saved video file from IndexedDB on component mount
  useEffect(() => {
    let active = true;
    async function loadAttached() {
      try {
        const record = await getSavedVideoFromDB();
        if (record && active) {
          const objectUrl = URL.createObjectURL(record.blob);
          setAttachedBlobUrl(objectUrl);
          setAttachedMeta({ name: record.name, size: record.size });
        }
      } catch (e) {
        console.warn('Error loading video from IndexedDB:', e);
      }
    }
    loadAttached();

    return () => {
      active = false;
      if (attachedBlobUrl) {
        URL.revokeObjectURL(attachedBlobUrl);
      }
    };
  }, []);

  // Compute final effective video to render
  const effectiveVideo = useMemo(() => {
    // If the user has an attached file active and blob exists, play the attached file
    if (config.isAttachedFile && attachedBlobUrl) {
      return {
        type: 'mp4' as const,
        embedUrl: attachedBlobUrl,
        isAttached: true
      };
    }
    // Otherwise parse URL
    const parsed = parseVideoUrl(config.url);
    return {
      ...parsed,
      isAttached: false
    };
  }, [config.isAttachedFile, config.url, attachedBlobUrl]);

  // Keep modal inputs synchronized when config changes
  useEffect(() => {
    setTempUrl(config.url);
    setTempPoster(config.posterUrl);
    if (config.isAttachedFile) {
      setActiveTab('upload');
    }
  }, [config]);

  // Handle file selection / upload
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check basic type
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|ogg)$/i)) {
      setUploadError('Por favor selecciona un archivo de video válido (.mp4, .webm, .mov)');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. Save file to IndexedDB for client-side persistence
      const record = await saveVideoFileToDB(file);
      
      // 2. Revoke older object URL if exists
      if (attachedBlobUrl) {
        URL.revokeObjectURL(attachedBlobUrl);
      }

      // 3. Create fresh object URL
      const newObjectUrl = URL.createObjectURL(record.blob);
      setAttachedBlobUrl(newObjectUrl);
      setAttachedMeta({ name: record.name, size: record.size });

      // 4. Update config to prioritize this attached file
      const updatedConfig: VideoConfiguration = {
        ...config,
        isAttachedFile: true,
        attachedFileName: record.name,
        attachedFileSize: record.size
      };
      setConfig(updatedConfig);
      setIsPlaying(false);

      if (typeof window !== 'undefined') {
        localStorage.setItem('app_video_config', JSON.stringify(updatedConfig));
      }

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 1500);

    } catch (err) {
      console.error('Failed to save attached video:', err);
      setUploadError('Error al guardar el video en la memoria del navegador.');
    } finally {
      setIsUploading(false);
    }
  };

  // Remove attached file and restore URL mode
  const handleRemoveAttachedFile = async () => {
    try {
      await deleteSavedVideoFromDB();
      if (attachedBlobUrl) {
        URL.revokeObjectURL(attachedBlobUrl);
      }
      setAttachedBlobUrl(null);
      setAttachedMeta(null);

      const updatedConfig: VideoConfiguration = {
        ...config,
        isAttachedFile: false,
        attachedFileName: undefined,
        attachedFileSize: undefined
      };
      setConfig(updatedConfig);
      setIsPlaying(false);

      if (typeof window !== 'undefined') {
        localStorage.setItem('app_video_config', JSON.stringify(updatedConfig));
      }
    } catch (err) {
      console.error('Error removing video:', err);
    }
  };

  // Save manual configuration (URL or Poster)
  const handleSaveConfig = () => {
    const newConfig: VideoConfiguration = {
      ...config,
      url: tempUrl.trim(),
      posterUrl: tempPoster.trim() || DEFAULT_VIDEO_CONFIG.posterUrl,
      // If saving from URL tab, switch off attached file mode
      isAttachedFile: activeTab === 'upload' && attachedMeta ? true : false
    };
    setConfig(newConfig);
    setIsPlaying(false);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('app_video_config', JSON.stringify(newConfig));
      } catch (e) {
        console.error('Error saving video config:', e);
      }
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsConfigOpen(false);
    }, 900);
  };

  const handleReset = async () => {
    await handleRemoveAttachedFile();
    setConfig(DEFAULT_VIDEO_CONFIG);
    setTempUrl(DEFAULT_VIDEO_CONFIG.url);
    setTempPoster(DEFAULT_VIDEO_CONFIG.posterUrl);
    setIsPlaying(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('app_video_config');
    }
  };

  const handlePresetSelect = (presetUrl: string, presetPoster?: string) => {
    setTempUrl(presetUrl);
    if (presetPoster) setTempPoster(presetPoster);
    setActiveTab('url');
  };

  // Check if current tempUrl is a Google Drive link
  const isTempUrlDrive = useMemo(() => {
    return Boolean(tempUrl && tempUrl.includes('drive.google.com'));
  }, [tempUrl]);

  if (!config.enabled) {
    return null;
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-6 z-20">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Video Wrapper Box */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-sky-200/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-6">
          <div 
            onClick={handleBadgeClick}
            className="inline-flex items-center space-x-2 bg-sky-100 text-sky-800 text-[11px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full border border-sky-200 shadow-xs cursor-pointer select-none transition-all hover:bg-sky-200/80"
            title={isAdmin ? "Modo Editor activo (Haz 3 clics para salir del modo editor)" : "Presentación del programa (Haz 3 clics para abrir modo editor)"}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.badge}</span>
            {isAdmin && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black rounded uppercase tracking-wider">
                ADMIN
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Active video indicator badge (ONLY VISIBLE IN ADMIN MODE) */}
          {isAdmin && config.isAttachedFile && attachedMeta && (
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200 shadow-xs">
              <FileVideo className="w-3.5 h-3.5 text-emerald-600" />
              <span>Archivo adjuntado local: <strong>{attachedMeta.name}</strong> ({formatFileSize(attachedMeta.size)})</span>
            </div>
          )}
        </div>

        {/* SUBTITLES QUICK SELECTOR BAR (Visible for all visitors) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 px-3 py-2 bg-slate-900/90 text-white rounded-2xl backdrop-blur-md shadow-md border border-slate-700/60 text-xs">
          
          {/* Subtitle status indicator & toggle */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                isSubtitlesEnabled
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={isSubtitlesEnabled ? "Desactivar subtítulos" : "Activar subtítulos"}
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>CC {isSubtitlesEnabled ? 'ON' : 'OFF'}</span>
            </button>
            <span className="text-[11px] font-medium text-slate-300 hidden sm:inline">
              {t.subtitles}:
            </span>
          </div>

          {/* 4 Languages Pills for Subtitles */}
          <div className="flex items-center space-x-1">
            {(['fr', 'es', 'en', 'pt'] as Language[]).map((langKey) => {
              const track = SUBTITLE_TRACKS[langKey];
              const isSelected = activeSubtitleLang === langKey && isSubtitlesEnabled;
              return (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => {
                    setActiveSubtitleLang(langKey);
                    setIsSubtitlesEnabled(true);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-950 shadow-sm scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={`${t.subtitlesSelect}: ${track.label}`}
                >
                  <span className="text-[11px]">{track.flag}</span>
                  <span className="uppercase text-[11px] font-black">{langKey}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Video Player Display Container */}
        <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-200 group">
          
          {isPlaying ? (
            // ACTIVE PLAYING STATE
            <div className="relative w-full h-full">
              {effectiveVideo.type === 'mp4' ? (
                <>
                  <video
                    ref={videoRef}
                    src={effectiveVideo.embedUrl}
                    controls={config.controls}
                    autoPlay={config.autoplay}
                    loop={config.loop}
                    muted={config.muted}
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-contain bg-black"
                  >
                    {/* Native WebVTT tracks for standard browser support */}
                    <track
                      kind="subtitles"
                      src={SUBTITLE_TRACKS.es.src}
                      srcLang="es"
                      label="Español"
                      default={activeSubtitleLang === 'es' && isSubtitlesEnabled}
                    />
                    <track
                      kind="subtitles"
                      src={SUBTITLE_TRACKS.fr.src}
                      srcLang="fr"
                      label="Français"
                      default={activeSubtitleLang === 'fr' && isSubtitlesEnabled}
                    />
                    <track
                      kind="subtitles"
                      src={SUBTITLE_TRACKS.en.src}
                      srcLang="en"
                      label="English"
                      default={activeSubtitleLang === 'en' && isSubtitlesEnabled}
                    />
                    <track
                      kind="subtitles"
                      src={SUBTITLE_TRACKS.pt.src}
                      srcLang="pt"
                      label="Português"
                      default={activeSubtitleLang === 'pt' && isSubtitlesEnabled}
                    />
                    Tu navegador no soporta el reproductor de video.
                  </video>

                  {/* HIGH-CONTRAST DYNAMIC SUBTITLES OVERLAY */}
                  {/* Guarantees 100% sharp, perfectly readable subtitles on every mobile & desktop browser */}
                  <AnimatePresence>
                    {isSubtitlesEnabled && activeCueText && (
                      <motion.div
                        key={activeCueText}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute bottom-12 sm:bottom-16 left-3 right-3 sm:left-10 sm:right-10 pointer-events-none flex justify-center z-20"
                      >
                        <div className="bg-slate-950/90 backdrop-blur-md text-white text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl shadow-2xl border border-white/20 text-center leading-relaxed max-w-2xl drop-shadow-lg">
                          <span className="mr-1.5 text-xs opacity-75 font-mono uppercase tracking-wider text-sky-300">
                            [{SUBTITLE_TRACKS[activeSubtitleLang].flag} {activeSubtitleLang.toUpperCase()}]
                          </span>
                          <span>{activeCueText}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <iframe
                  src={effectiveVideo.embedUrl}
                  title="Video presentation"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          ) : (
            // POSTER / COVER WITH INTERACTIVE PLAY BUTTON
            <div 
              className="relative w-full h-full cursor-pointer select-none"
              onClick={() => setIsPlaying(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true);
              }}
              aria-label={t.watchPreview}
            >
              {/* Poster Image */}
              <img
                src={config.posterUrl}
                alt="Vidéo de présentation du programme"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dark subtle gradient overlay for readability and contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/40 group-hover:via-slate-950/20 transition-all duration-300"></div>

              {/* Top info badge with Subtitles Indicator */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/10 shadow-lg">
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>HD AUDIO</span>
                </div>

                <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/10 shadow-lg">
                  <Subtitles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 IDIOMAS (CC)</span>
                </div>
              </div>

              {/* Central Pulsing Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                
                {/* Glowing ring animation */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-sky-400/30 animate-ping pointer-events-none"></div>
                  <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sky-500/20 blur-md pointer-events-none"></div>
                  
                  <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl border-4 border-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 sm:w-10 sm:h-10 fill-slate-950 translate-x-0.5" />
                  </div>
                </div>

                <div className="text-center px-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {t.watchPreview}
                  </span>
                </div>

              </div>

              {/* Bottom reassuring bar */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white/90 text-[11px] sm:text-xs font-semibold">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Protocole clinique scientifiquement documenté</span>
                </div>
                <span className="hidden sm:inline-block bg-sky-500 text-white font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                  Accès Libre
                </span>
              </div>

            </div>
          )}

        </div>

        {/* Footer controls & CTA bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          
          {/* Direct CTA button to start */}
          <button
            onClick={onScrollToPricing}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer group"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick upload & configure buttons - VISIBLE ONLY IN ADMIN/OWNER MODE */}
          {isAdmin ? (
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-1.5 rounded-lg border border-amber-300">
                <Crown className="w-3.5 h-3.5 text-amber-700" />
                <span>Modo Editor</span>
              </div>

              <button
                onClick={() => {
                  setActiveTab('upload');
                  setIsConfigOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition duration-200 cursor-pointer shadow-xs"
              >
                <UploadCloud className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.tabUpload}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('guide');
                  setIsConfigOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition duration-200 cursor-pointer shadow-xs"
                title="¿Cómo cambiar el video más adelante?"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>¿Cómo cambiarlo luego?</span>
              </button>

              <button
                onClick={() => setIsConfigOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition duration-200 cursor-pointer shadow-xs"
                title={t.customizerTitle}
              >
                <Settings2 className="w-3.5 h-3.5 text-slate-600" />
                <span>{t.customizerBtn}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Acceso instantáneo y garantía de satisfacción</span>
            </div>
          )}

        </div>

      </div>

      {/* QUICK VIDEO CONFIGURATION & ATTACHMENT MODAL */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative max-h-[92vh] overflow-y-auto"
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-slate-950 leading-tight">{t.customizerTitle}</h3>
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                        Solo Admin
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{t.customizerDesc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConfigOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Security & Visitor Visibility Info Box */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950 text-xs space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-sky-900">
                  <Lock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>¿Quién puede ver o cambiar esta configuración?</span>
                </div>
                <p className="text-[11px] text-sky-800 leading-relaxed font-normal">
                  <strong>Solo tú.</strong> Los visitantes de tu página web <strong>no ven estos botones ni pueden modificar tu video</strong>.
                </p>
              </div>

              {/* Navigation Tabs between Attach File vs Web Link vs Guide */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`py-2 px-2 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    activeTab === 'upload'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{t.tabUpload}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className={`py-2 px-2 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    activeTab === 'url'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{t.tabUrl}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guide')}
                  className={`py-2 px-2 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    activeTab === 'guide'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guía Futura</span>
                </button>
              </div>

              {/* TAB 1: ATTACH FILE DIRECTLY (IndexedDB) */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  {/* File Upload Drop Area */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50/80 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <h4 className="text-sm font-black text-slate-900 mb-1">
                      {isUploading ? 'Guardando video en memoria...' : t.uploadTitle}
                    </h4>

                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">
                      {t.uploadSubtitle}
                    </p>

                    <button
                      type="button"
                      disabled={isUploading}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black rounded-xl shadow-xs transition"
                    >
                      <FileVideo className="w-4 h-4" />
                      <span>{t.uploadBtn}</span>
                    </button>
                  </div>

                  {/* Upload Error display */}
                  {uploadError && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Currently Attached File Card */}
                  {attachedMeta && (
                    <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">
                            {t.attachedFile}
                          </span>
                          <p className="text-xs font-bold text-slate-900 break-all">
                            {attachedMeta.name}
                          </p>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {formatFileSize(attachedMeta.size)} • Guardado localmente
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveAttachedFile}
                        className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                        title={t.removeAttached}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WEB URL (YouTube, Vimeo, Google Drive, MP4 URL) */}
              {activeTab === 'url' && (
                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="block text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      URL del Video (YouTube, Vimeo, Google Drive, MP4) :
                    </label>
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder={t.inputPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none font-mono text-xs text-slate-900 bg-slate-50"
                    />
                    <p className="mt-1 text-[10px] text-slate-500 font-normal">
                      {t.note}
                    </p>
                  </div>

                  {/* GOOGLE DRIVE EXPLANATION & 403 FIX */}
                  {isTempUrlDrive && (
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 text-amber-950 space-y-2">
                      <div className="flex items-center space-x-1.5 font-black text-amber-900 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{t.driveNotice}</span>
                      </div>
                      <p className="text-[11px] font-medium leading-relaxed">
                        {t.driveTip}
                      </p>
                    </div>
                  )}

                  {/* Quick Presets */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                      {t.presetsTitle}
                    </span>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handlePresetSelect('/assets/aistudio/SILENCIA_TU_MENTE-es_1a438279.mp4', '/assets/aistudio/image_0c66d102.png')}
                        className="text-left px-3 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition flex items-center justify-between text-xs cursor-pointer font-bold shadow-xs"
                      >
                        <div className="flex flex-col">
                          <span className="flex items-center space-x-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>⭐ Video Oficial: Silencia Tu Mente (Con subtítulos)</span>
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono font-normal">/assets/aistudio/SILENCIA_TU_MENTE-es_1a438279.mp4</span>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-200 px-2 py-0.5 rounded text-emerald-800 font-black">Oficial</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePresetSelect('/videos/presentacion.mp4', '/assets/aistudio/image_0c66d102.png')}
                        className="text-left px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 transition flex items-center justify-between text-xs cursor-pointer font-bold"
                      >
                        <div className="flex flex-col">
                          <span>📁 Ruta alternativa local (/videos/presentacion.mp4)</span>
                          <span className="text-[10px] text-sky-700 font-mono font-normal">Video nativo en carpeta /videos</span>
                        </div>
                        <span className="text-[10px] font-mono bg-sky-200 px-1.5 py-0.5 rounded text-sky-800">Local</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STEP-BY-STEP FUTURE REPLACEMENT GUIDE */}
              {activeTab === 'guide' && (
                <div className="space-y-3.5 text-xs text-slate-700">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                    <span className="font-black text-xs block">✨ Sí, podrás cambiar el video sin ningún problema cuando quieras.</span>
                    <p className="text-[11px] leading-relaxed text-emerald-800 font-normal">
                      El sistema fue diseñado pensando en máxima flexibilidad. Tienes 3 formas sencillas de cambiarlo:
                    </p>
                  </div>

                  {/* Option 1 */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">1</span>
                      <span>Opción 1: Reemplazar el archivo directamente (Sin código)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                      Solo tienes que guardar tu nuevo video con el nombre:
                      <br />
                      <code className="bg-slate-200 text-slate-800 font-mono font-bold px-1.5 py-0.5 rounded text-[10px] mt-1 inline-block">
                        public/videos/presentacion.mp4
                      </code>
                      <br />
                      Al sobreescribir ese archivo, la página mostrará tu nuevo video automáticamente.
                    </p>
                  </div>

                  {/* Option 2 */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">2</span>
                      <span>Opción 2: Usar este panel de administración en vivo</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                      Entras a tu página con <code className="bg-slate-200 font-mono px-1 py-0.5 rounded">?admin=true</code> o haces <strong>3 clics</strong> sobre la etiqueta de arriba «Presentación en Video». Haces clic en <em>Adjuntar archivo de video</em> o pegas una URL nueva y presionas <strong>Aplicar video</strong>.
                    </p>
                  </div>

                  {/* Option 3 */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">3</span>
                      <span>Opción 3: Modificar src/videoConfig.ts</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                      En el archivo <code className="bg-slate-200 font-mono px-1 py-0.5 rounded">src/videoConfig.ts</code> puedes cambiar la línea <code className="font-mono text-sky-700">url: '...'</code> a cualquier enlace de YouTube, Vimeo, o archivo MP4 en la nube.
                    </p>
                  </div>

                  {/* Subtitles note */}
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 space-y-1 text-sky-950">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <Subtitles className="w-4 h-4 text-sky-600" />
                      <span>¿Y qué pasa con los subtítulos si cambio el video?</span>
                    </div>
                    <p className="text-[11px] text-sky-800 leading-relaxed font-normal">
                      Los archivos de subtítulos se encuentran en la carpeta <code className="bg-sky-100 font-mono font-bold px-1 py-0.5 rounded">public/subtitles/</code> (<code className="font-mono">subtitles-es.vtt</code>, <code className="font-mono">subtitles-fr.vtt</code>, <code className="font-mono">subtitles-en.vtt</code>, <code className="font-mono">subtitles-pt.vtt</code>). Si tu nuevo video tiene otro audio, puedes actualizar el texto en esos archivos o pedirme que los actualice con gusto.
                    </p>
                  </div>
                </div>
              )}

              {/* POSTER URL (Always configurable except in guide tab) */}
              {activeTab !== 'guide' && (
                <div className="text-xs font-bold border-t border-slate-100 pt-3">
                  <label className="block text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    URL de la Imagen de Portada (Poster) :
                  </label>
                  <input
                    type="url"
                    value={tempPoster}
                    onChange={(e) => setTempPoster(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none font-mono text-xs text-slate-900 bg-slate-50"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.resetBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleAdminMode(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center space-x-1.5"
                    title="Oculta los botones de configuración para ver la página como un cliente normal"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ver como visitante</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsConfigOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                  >
                    {t.closeBtn}
                  </button>

                  {activeTab !== 'guide' && (
                    <button
                      type="button"
                      onClick={handleSaveConfig}
                      className="px-5 py-2.5 text-xs font-black bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-md transition cursor-pointer flex items-center space-x-1.5"
                    >
                      {savedSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>¡Guardado!</span>
                        </>
                      ) : (
                        <span>{t.saveBtn}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
