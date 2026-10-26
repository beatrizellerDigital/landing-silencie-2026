/**
 * CONFIGURACIÓN DEL VIDEO DE LA LANDING PAGE
 * 
 * Aquí puedes cambiar fácilmente el video que se muestra en tu página.
 * Compatible con:
 * - YouTube: Enlaces normales (https://www.youtube.com/watch?v=...), cortos (https://youtu.be/...) o shorts.
 * - Vimeo: Enlaces normales (https://vimeo.com/...) o reproductores embed.
 * - Archivos MP4 / WebM directos: URLs de video en la nube o colocados en la carpeta /public.
 * - Códigos iframe o reproductores externos (Loom, Wistia, etc.)
 */

export interface VideoConfiguration {
  /** Activar o desactivar la sección del video en la página */
  enabled: boolean;

  /** 
   * URL de tu video.
   * Ejemplos:
   * - YouTube: "https://www.youtube.com/watch?v=inpok4MKVLM"
   * - Vimeo: "https://vimeo.com/76979871"
   * - MP4 directo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
   * - Archivo local: "/mi-video.mp4" (guardado dentro de la carpeta /public)
   */
  url: string;

  /**
   * Imagen de portada antes de presionar play.
   * Puedes usar cualquier enlace de imagen o dejar una de Unsplash / tuya.
   */
  posterUrl: string;

  /** Reproducir automáticamente al hacer clic en Play (recomendado: true) */
  autoplay: boolean;

  /** Repetir el video al terminar (loop) */
  loop: boolean;

  /** Mostrar barra de controles del reproductor */
  controls: boolean;

  /** Iniciar silenciado (útil si deseas autoplay directo) */
  muted: boolean;

  /** Si el video proviene de un archivo adjuntado localmente */
  isAttachedFile?: boolean;
  /** Nombre del archivo adjuntado */
  attachedFileName?: string;
  /** Tamaño del archivo adjuntado en bytes */
  attachedFileSize?: number;

  /** Activar subtítulos por defecto (en los 4 idiomas: FR, ES, EN, PT) */
  subtitlesEnabled?: boolean;
}

export const DEFAULT_VIDEO_CONFIG: VideoConfiguration = {
  enabled: true,
  // Video oficial de presentación del libro: "Silencia Tu Mente"
  url: '/videos/presentacion.mp4',
  // Portada serena y profesional para el reproductor
  posterUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
  autoplay: true,
  loop: false,
  controls: true,
  muted: false,
  subtitlesEnabled: true,
};

