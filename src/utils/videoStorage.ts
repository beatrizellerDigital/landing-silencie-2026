/**
 * Client-side video persistence using IndexedDB
 * Allows storing large video files (MP4, WebM, MOV) locally in the browser
 * so they persist across reloads and tab closures without needing a server upload.
 */

const DB_NAME = 'silencia_landing_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_video_store';
const VIDEO_KEY = 'vsl_attached_video';

export interface StoredVideoRecord {
  id: string;
  blob: Blob;
  name: string;
  size: number;
  type: string;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not available in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves a local video file to IndexedDB
 */
export async function saveVideoFileToDB(file: File): Promise<StoredVideoRecord> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: StoredVideoRecord = {
      id: VIDEO_KEY,
      blob: file,
      name: file.name,
      size: file.size,
      type: file.type || 'video/mp4',
      updatedAt: Date.now()
    };

    const request = store.put(record);

    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves the saved video file from IndexedDB
 */
export async function getSavedVideoFromDB(): Promise<StoredVideoRecord | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(VIDEO_KEY);

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Could not read saved video from IndexedDB:', err);
    return null;
  }
}

/**
 * Deletes the stored video file from IndexedDB
 */
export async function deleteSavedVideoFromDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(VIDEO_KEY);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Could not delete video from IndexedDB:', err);
  }
}

/**
 * Helper to format bytes into readable KB/MB
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
