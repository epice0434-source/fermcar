export type Tab = 'home' | 'youtube' | 'tv' | 'radio' | 'browser' | 'files' | 'streamer' | 'settings';

// ... (Rest of types from types.ts don't change, but I'll use them)

export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
}

export interface ChannelInfo {
  id: string;
  name: string;
  url: string;
  logo: string;
  category: string;
}

export interface StationInfo {
  id: string;
  name: string;
  url: string;
  logo: string;
  genre: string;
}

export interface FileInfo {
  name: string;
  type: 'folder' | 'video' | 'audio' | 'image';
  size?: string;
  modified: string;
}
