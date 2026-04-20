/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Youtube, 
  Tv, 
  Radio as RadioIcon, 
  Globe, 
  FolderOpen, 
  Settings, 
  Battery, 
  Wifi, 
  Signal, 
  Search,
  Clock,
  ChevronRight,
  ChevronLeft,
  Play,
  Volume2,
  Maximize2,
  ExternalLink,
  Zap,
  PlayCircle,
  Database,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from './types';

// Components (will be created in separate files later or defined here for simplicity)
const NavigationItem = ({ 
  icon: Icon, 
  isActive, 
  onClick, 
  label 
}: { 
  icon: any, 
  isActive: boolean, 
  onClick: () => void, 
  label: string 
}) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-4 rounded-lg transition-all duration-200 flex items-center gap-3 ${
      isActive 
        ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
    }`}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="text-xs uppercase font-bold tracking-[1px]">{label}</span>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const time = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('tr-TR', { weekday: 'long' });
    const fullDate = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    return { time, day, fullDate };
  };

  const { time, day, fullDate } = formatDateTime(currentTime);

  return (
    <div className="flex h-screen w-screen bg-[#0a0b10] text-[#e2e8f0] font-sans overflow-hidden select-none">
      {/* Sidebar Navigation */}
      <nav className="w-60 bg-[#0f111a] border-r border-white/5 flex flex-col p-6 gap-6 z-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold">
            F+
          </div>
          <span className="text-lg font-semibold tracking-tight">Fermcar+</span>
        </div>
        
        <div className="text-[#64748b] text-[10px] uppercase tracking-[1px] mb-[-12px] px-1 font-bold">Modüller</div>
        
        <div className="flex flex-col gap-1">
          <NavigationItem icon={Home} label="Giriş" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavigationItem icon={Youtube} label="YouTube" isActive={activeTab === 'youtube'} onClick={() => setActiveTab('youtube')} />
          <NavigationItem icon={Tv} label="Plus TV" isActive={activeTab === 'tv'} onClick={() => setActiveTab('tv')} />
          <NavigationItem icon={RadioIcon} label="Plus Radyo" isActive={activeTab === 'radio'} onClick={() => setActiveTab('radio')} />
          <NavigationItem icon={PlayCircle} label="URL Yayın" isActive={activeTab === 'streamer'} onClick={() => setActiveTab('streamer')} />
          <NavigationItem icon={Globe} label="Tarayıcı" isActive={activeTab === 'browser'} onClick={() => setActiveTab('browser')} />
          <NavigationItem icon={FolderOpen} label="Dosyalar" isActive={activeTab === 'files'} onClick={() => setActiveTab('files')} />
        </div>
        
        <div className="mt-auto">
          <NavigationItem icon={Settings} label="Ayarlar" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          
          <div className="mt-6 p-4 glass-panel rounded-xl">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Gelişim Seviyesi</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[85%]"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Status Bar */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#0f111a] border-b border-white/5 z-40">
          <div className="flex items-center gap-6">
            <div className="status-badge bg-blue-500/10 text-blue-400 border-blue-500/20 px-4">Fermcar+ Premium</div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xl font-light tracking-[0.2em] text-slate-100">{time}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Signal className="w-3.5 h-3.5" />
                <span>5G</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Battery className="w-3.5 h-3.5 text-emerald-500" />
                <span>%88</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 pb-32 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {activeTab === 'home' ? <Dashboard time={time} day={day} fullDate={fullDate} /> :
               activeTab === 'youtube' ? <YoutubeModule /> :
               activeTab === 'tv' ? <TVModule /> :
               activeTab === 'radio' ? <RadioModule /> :
               activeTab === 'browser' ? <BrowserModule /> :
               activeTab === 'files' ? <FileModule /> :
               activeTab === 'streamer' ? <URLStreamerModule /> :
               activeTab === 'settings' ? <SettingsModule /> :
               <Dashboard time={time} day={day} fullDate={fullDate} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Bottom Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 glass-panel p-2 rounded-2xl z-50 shadow-2xl border-white/10 backdrop-blur-2xl">
          <button 
            className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          
          <button 
            className={`w-20 h-20 flex items-center justify-center rounded-2xl transition-all shadow-xl active:scale-95 ${activeTab === 'home' ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="w-9 h-9" />
          </button>

          <button 
            className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
            onClick={() => window.history.forward()}
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </main>
    </div>
  );
}

// --- MODULE COMPONENTS ---

const Dashboard = ({ time, day, fullDate }: { time: string, day: string, fullDate: string }) => (
  <div className="grid grid-cols-12 grid-rows-6 gap-8 h-full">
    {/* Large Greeting */}
    <div className="col-span-12 row-span-2 glass-panel p-10 flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
        <Home className="w-80 h-80" />
      </div>
      <div className="relative z-10">
        <h1 className="text-7xl font-extralight text-slate-100 mb-2 tracking-tighter">İyi Yolculuklar, <span className="font-medium text-blue-500">Keyifli Sürüşler</span></h1>
        <p className="text-slate-500 text-lg tracking-widest font-light">Yolculuğun tadını Fermcar+ ile çıkarın.</p>
      </div>
    </div>

    {/* TV Quick Card */}
    <div className="col-span-8 row-span-4 module-card rounded-2xl p-1 grid grid-cols-2 overflow-hidden">
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="text-[10px] text-blue-400 font-bold tracking-[2px] uppercase mb-1">Şimdi Canlı</div>
          <h2 className="text-3xl font-bold mb-2">Plus TV Global</h2>
          <p className="text-slate-500 text-sm leading-relaxed">4K Ultra HD Yayın Akışı Kesintisiz Devam Ediyor</p>
        </div>
        <div className="flex gap-4">
          <button className="px-10 py-4 bg-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">İZLE</button>
          <button className="px-10 py-4 bg-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">LİSTE</button>
        </div>
      </div>
      <div className="relative bg-black rounded-r-xl overflow-hidden shadow-2xl">
        <img src="https://picsum.photos/seed/tv2/800/600" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Play className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </div>
    </div>

    {/* Central Clock & Date Card */}
    <div className="col-span-4 row-span-4 glass-panel p-10 flex flex-col justify-center items-center text-center relative overflow-hidden bg-blue-600/5 border-blue-500/10">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Clock className="w-32 h-32" />
      </div>
      <div className="relative z-10 w-full">
        <div className="text-[10px] text-blue-400 font-black tracking-[4px] uppercase mb-8">Şu Anki Zaman</div>
        <div className="text-8xl font-black text-white tracking-widest leading-none mb-4 selection:bg-blue-500">
          {time}
        </div>
        <div className="h-px w-20 bg-blue-500/30 mx-auto mb-6"></div>
        <div className="text-2xl font-bold text-slate-100 mb-2">{day}</div>
        <div className="text-sm font-light text-slate-400 uppercase tracking-[0.2em]">{fullDate}</div>
      </div>
    </div>
  </div>
);

const YoutubeModule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = (import.meta as any).env?.VITE_YOUTUBE_API_KEY || 'AIzaSyAigABTX8kt3gnH7AjOc9_Ky5LNGMRQ4uk';

  const fetchVideos = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = query 
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=12&regionCode=TR&key=${API_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'API Hatası');
      }
      
      const data = await response.json();
      
      if (data.items) {
        setVideos(data.items.map((item: any) => ({
          id: query ? item.id.videoId : item.id,
          title: item.snippet?.title || 'Başlıksız Video',
          author: item.snippet?.channelTitle || 'Bilinmeyen Kanal',
          thumb: item.snippet?.thumbnails?.high?.url || 'https://picsum.photos/seed/yt/400/225',
          published: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt).toLocaleDateString('tr-TR') : ''
        })));
      } else {
        setVideos([]);
      }
    } catch (error: any) {
      console.error("YouTube API Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  return (
    <div className="h-full flex flex-col gap-8">
      <form onSubmit={handleSearch} className="flex gap-4 p-1 glass-panel rounded-xl">
        <div className="flex-1 flex items-center px-6">
          <Search className="w-5 h-5 text-slate-500 mr-3" />
          <input 
            type="text" 
            placeholder="YouTube'da Gerçek Arama Yap..." 
            className="flex-1 bg-transparent py-4 text-lg focus:outline-none placeholder:text-slate-600 font-light"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-600 px-10 rounded-lg font-bold hover:bg-blue-700 transition-colors m-1">ARA</button>
      </form>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {error ? (
          <div className="h-full flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">YouTube Bağlantı Hatası</h3>
            <p className="text-slate-500 text-sm max-w-md">{error}</p>
            <button 
              onClick={() => fetchVideos()}
              className="mt-8 px-10 py-4 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              TEKRAR DENE
            </button>
          </div>
        ) : loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : selectedVideoId ? (
          <div className="h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setSelectedVideoId(null)}
                className="text-xs font-bold text-blue-400 flex items-center gap-2 hover:bg-white/5 py-2 px-4 rounded-lg transition-all"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> LİSTEYE DÖN
              </button>
              <div className="status-badge bg-red-600/20 text-red-500 border-red-600/30">YouTube Video Player</div>
            </div>
            <div className="flex-1 bg-black rounded-3xl overflow-hidden border border-white/5 relative shadow-2xl">
              <iframe 
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-8 pb-10">
            {videos.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVideoId(v.id)}
                className="module-card rounded-2xl overflow-hidden group cursor-pointer hover:border-white/10 transition-colors"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={v.thumb} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20"><Play className="w-5 h-5 fill-white" /></div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-100 line-clamp-1 mb-1" dangerouslySetInnerHTML={{ __html: v.title }}></h3>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">{v.author}</p>
                    <p className="text-slate-700 text-[9px] font-mono">{v.published}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TVModule = () => {
  const [channels, setChannels] = useState([
    { name: 'Plus TV Haber HD', url: 'https://vjs.zencdn.net/v/oceans.mp4' },
    { name: 'Plus TV Spor HD', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
    { name: 'Belgesel TR 4K', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { name: 'Sinema Max Plus', url: 'https://media.w3.org/2010/05/video/movie.mp4' },
    { name: 'Trend Müzik TV', url: 'https://vjs.zencdn.net/v/oceans.mp4' },
  ]);
  const [activeStream, setActiveStream] = useState(channels[0].url);
  const [channelName, setChannelName] = useState(channels[0].name);
  const [error, setError] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: '', url: '' });
  const [bulkUrl, setBulkUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    setError(false);
  }, [activeStream]);

  const parseM3U = (text: string) => {
    const lines = text.split('\n');
    const newChannels: { name: string, url: string }[] = [];
    let currentName = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#EXTINF:')) {
        const parts = trimmed.split(',');
        currentName = parts[parts.length - 1].trim() || 'Adsız Kanal';
      } else if (trimmed.startsWith('http') || trimmed.startsWith('rtmp') || trimmed.startsWith('rtsp')) {
        newChannels.push({
          name: currentName || `Kanal ${newChannels.length + 1}`,
          url: trimmed
        });
        currentName = '';
      }
    });
    return newChannels;
  };

  const importM3U = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrl) return;

    setIsImporting(true);
    try {
      const response = await fetch(bulkUrl);
      if (!response.ok) throw new Error('Liste indirilemedi');
      const text = await response.text();
      const parsed = parseM3U(text);
      
      if (parsed.length > 0) {
        setChannels([...channels, ...parsed]);
        setBulkUrl('');
        setShowAddForm(false);
      } else {
        alert('Geçerli bir M3U içeriği bulunamadı.');
      }
    } catch (err: any) {
      console.error("M3U Import Error:", err);
      alert(`Hata: ${err.message}. Tarayıcı kısıtlamaları (CORS) nedeniyle bazı linkler indirilemeyebilir.`);
    } finally {
      setIsImporting(false);
    }
  };

  const removeChannel = (index: number) => {
    const updated = channels.filter((_, i) => i !== index);
    setChannels(updated);
    if (activeStream === channels[index].url) {
      setActiveStream(updated[0]?.url || '');
      setChannelName(updated[0]?.name || '');
    }
  };

  return (
    <div className="h-full grid grid-cols-12 gap-8">
      <div className="col-span-3 glass-panel p-6 flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">M3U Liste</div>
          <div className="flex gap-1">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className={`p-2 rounded-lg transition-colors ${showAddForm ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-blue-400'}`}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Database className="w-4 h-4" /></button>
          </div>
        </div>

        {showAddForm && (
          <div className="absolute inset-x-0 top-16 bg-[#0f111a] border-b border-white/10 p-6 z-20 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
              <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-blue-600 rounded-md">TOPLU M3U EKLE</button>
            </div>

            <form onSubmit={importM3U} className="space-y-4">
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase mb-1 block">M3U Liste URL</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={bulkUrl}
                    onChange={(e) => setBulkUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:border-blue-500/50"
                    placeholder="https://.../liste.m3u"
                  />
                  <Database className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isImporting}
                className={`w-full py-3 rounded-lg text-sm font-bold transition-all ${isImporting ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'}`}
              >
                {isImporting ? 'İNDİRİLİYOR...' : 'LİSTEYİ İÇE AKTAR'}
              </button>
              
              <p className="text-[8px] text-slate-600 leading-relaxed italic mt-2">
                * M3U dosyasını otomatik ayrıştırıp tüm kanalları listenize ekler.
              </p>
            </form>
            
            <div className="mt-6 pt-4 border-t border-white/5">
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-full py-2 text-[9px] font-bold text-slate-500 hover:text-white transition-colors"
              >
                İPTAL
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
          {channels.map((ch, i) => (
            <div 
              key={`${ch.name}-${i}`} 
              className={`group p-4 rounded-xl flex items-center gap-4 transition-all cursor-pointer relative ${activeStream === ch.url ? 'bg-white/10 border border-white/5' : 'hover:bg-white/5'}`}
              onClick={() => {
                setActiveStream(ch.url);
                setChannelName(ch.name);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs group-hover:scale-110 transition-transform">{i+1}</div>
              <div className="flex-1 overflow-hidden">
                <div className="font-bold text-sm truncate">{ch.name}</div>
                <div className="text-[9px] text-slate-500 font-mono tracking-tighter truncate opacity-50 uppercase">M3U STREAM SOURCE</div>
              </div>
              
              <div className="flex items-center gap-2">
                {activeStream === ch.url && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse"></div>}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChannel(i);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-slate-600 hover:text-red-400 rounded-md transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 bg-black rounded-2xl overflow-hidden relative shadow-2xl group border border-white/5 flex items-center justify-center">
        {error ? (
          <div className="flex flex-col items-center gap-4 text-center p-10">
            <Zap className="w-12 h-12 text-red-500 mb-2" />
            <div className="text-xl font-bold">Yayın Bağlantı Hatası</div>
            <p className="text-slate-500 text-sm max-w-xs">Bu yayın kaynağı şu an kısıtlanmış veya erişilemiyor olabilir. Lütfen listeden başka bir kanal seçin.</p>
          </div>
        ) : (
          <video 
            key={activeStream}
            autoPlay 
            muted
            playsInline
            controls 
            className="w-full h-full object-contain"
            src={activeStream}
            onError={() => setError(true)}
          />
        )}
        <div className="absolute top-8 right-8">
          <div className="status-badge bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-2">
            <Zap className="w-3 h-3" /> 1080p 60fps
          </div>
        </div>
        <div className="absolute bottom-16 left-0 right-0 p-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity translate-y-10 group-hover:translate-y-0 duration-500">
          <div className="flex justify-between items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 rounded-md text-[10px] font-black tracking-widest mb-4">CANLI</div>
              <h2 className="text-3xl font-bold tracking-tight text-white">{channelName}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const URLStreamerModule = () => {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [url]);

  const handlePlay = () => {
    if (url) {
      setPlaying(false); // Reset to trigger re-mount
      setTimeout(() => {
        setPlaying(true);
        setError(false);
      }, 50);
    }
  };

  return (
    <div className="h-full flex flex-col gap-10">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h2 className="text-4xl font-extralight tracking-tight mb-1">URL Yayın Çözücü</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">M3U8, MP4 veya Direk Video Linkleri</p>
        </div>
        <div className="flex gap-3">
          <div className="status-badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px]">Media Engine Ready</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-10">
        <div className="col-span-8 flex flex-col gap-8">
          <div className="glass-panel p-2 rounded-2xl flex gap-4">
            <div className="flex-1 flex items-center px-6">
              <PlayCircle className="w-6 h-6 text-blue-500 mr-4" />
              <input 
                type="text" 
                placeholder="Örnek: https://.../video.mp4" 
                className="flex-1 bg-transparent py-6 text-xl focus:outline-none placeholder:text-slate-700 font-light"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={handlePlay}
              className="bg-blue-600 px-12 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              YAYINI BAŞLAT
            </button>
          </div>

          <div className="flex-1 bg-black rounded-3xl overflow-hidden border border-white/5 relative group flex items-center justify-center">
            {playing ? (
              error ? (
                <div className="flex flex-col items-center gap-4 text-center p-10">
                  <Zap className="w-12 h-12 text-red-500 mb-2" />
                  <div className="text-xl font-bold">URL Yükleme Hatası</div>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Girdiğiniz adres oynatılamıyor. Lütfen URL'yi ve internet bağlantınızı kontrol edin. 
                    (CORS kısıtlamaları bazı dış bağlantıları engelleyebilir)
                  </p>
                  <button 
                    onClick={() => setPlaying(false)}
                    className="mt-4 px-6 py-2 bg-white/5 rounded-lg text-xs font-bold hover:bg-white/10"
                  >
                    DÜZENLE
                  </button>
                </div>
              ) : (
                <video 
                  controls 
                  autoPlay 
                  muted
                  playsInline
                  className="w-full h-full object-contain" 
                  src={url} 
                  onError={() => setError(true)}
                />
              )
            ) : (
              <>
                <img src="https://picsum.photos/seed/stream/1280/720" className="w-full h-full object-cover opacity-20 blur-sm" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 border-2 border-white/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-10 h-10 text-white/10" />
                  </div>
                  <div className="text-slate-700 font-bold uppercase tracking-[4px] text-xs">VİDEO ÇIKTI YÜZEYİ</div>
                </div>
              </>
            )}
            
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="status-badge bg-black/60 backdrop-blur-md">HW ACCEL</span>
              <span className="status-badge bg-black/60 backdrop-blur-md">VULKAN</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Hızlı Test Linkleri</h3>
          <div className="flex-1 glass-panel rounded-3xl overflow-hidden flex flex-col">
            <div className="p-4 space-y-2">
              {[
                { name: 'Örnek Film 1', url: 'https://vjs.zencdn.net/v/oceans.mp4' },
                { name: 'Örnek Film 2', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
                { name: 'Doğa Manzarası', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
              ].map((link, i) => (
                <div 
                  key={i} 
                  onClick={() => { setUrl(link.url); setPlaying(true); }}
                  className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-sm truncate flex-1">{link.name}</div>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono truncate">{link.url}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RadioModule = () => (
  <div className="h-full grid grid-cols-4 gap-8 overflow-y-auto pr-4 scrollbar-hide">
    {['Joy FM', 'Virgin Radio', 'Metro FM', 'Number 1', 'Pal FM', 'Radyo Fenomen', 'Power FM', 'Kral Pop'].map(station => (
      <div key={station} className="module-card rounded-2xl p-10 flex flex-col items-center gap-6 group cursor-pointer hover:border-blue-500/30 transition-all shadow-xl">
        <div className="w-32 h-32 bg-[#0a0b10] rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-2xl group-hover:scale-105 transition-transform">
          <RadioIcon className="w-12 h-12 text-slate-100 group-hover:text-blue-500 transition-colors" />
        </div>
        <div className="text-center">
          <div className="font-bold text-xl tracking-tight leading-none mb-2">{station}</div>
          <div className="status-badge lowercase bg-white/5 border-white/10 text-slate-400">Canlı Yayın</div>
        </div>
      </div>
    ))}
  </div>
);

const BrowserModule = () => (
  <div className="h-full flex flex-col rounded-2xl border border-white/5 overflow-hidden bg-black/40">
    <div className="h-14 bg-[#0f111a] flex gap-4 items-center px-6 border-b border-white/5">
      <div className="flex gap-1.5 px-2">
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg px-4 py-2 flex items-center text-xs text-slate-500 font-mono border border-white/5">
        <span className="truncate">https://google.com/search?q=fermcar+plus+auto</span>
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-12">
      <div className="w-32 h-32 glass-panel rounded-full flex items-center justify-center mb-10 opacity-50 relative">
        <Globe className="w-16 h-16 text-slate-400" />
        <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-full animate-spin-slow"></div>
      </div>
      <h2 className="text-4xl font-extralight tracking-tighter mb-4">Web Browser Engine</h2>
      <p className="text-slate-500 text-sm font-medium uppercase tracking-[3px]">Chromium Webview Surface Enabled</p>
    </div>
  </div>
);

const FileModule = () => (
  <div className="h-full flex flex-col gap-10">
    <div className="flex justify-between items-end border-b border-white/5 pb-8">
      <div>
        <h2 className="text-4xl font-extralight tracking-tight mb-1">Dosya Yöneticisi</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sistem Depolama & Medya Taraması</p>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 glass-panel rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Klasör Oluştur</button>
        <button className="px-6 py-3 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">Dosya Yükle</button>
      </div>
    </div>
    <div className="grid grid-cols-6 gap-10">
      {[
        { name: 'Müzikler', type: 'folder' },
        { name: 'Videolar', type: 'folder' },
        { name: 'test_drive.mp4', type: 'video' },
        { name: 'dashboard.png', type: 'image' },
      ].map(item => (
        <div key={item.name} className="flex flex-col items-center gap-4 group cursor-pointer">
          <div className="w-20 h-20 glass-panel rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform group-hover:border-white/20">
            {item.type === 'folder' ? <FolderOpen className="w-8 h-8 text-slate-500 group-hover:text-amber-500 transition-colors" /> : <Play className="w-8 h-8 text-slate-500 group-hover:text-blue-500 transition-colors" />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-200 transition-colors text-center truncate w-full px-2">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SettingsModule = () => (
  <div className="h-full flex flex-col max-w-4xl py-6">
    <h1 className="text-4xl font-extralight tracking-tight mb-12">Sistem Ayarları</h1>
    
    <div className="grid grid-cols-2 gap-12">
      <div className="space-y-10">
        <div>
          <h2 className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-6">Görüntü Ayarları</h2>
          <div className="glass-panel rounded-2xl p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-100">
                <span>Parlaklık Seviyesi</span>
                <span className="text-blue-400">75%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%]"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold"> Gece Modu</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1 border border-white/10 shadow-inner">
                <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-6">Bağlantı & Ağ</h2>
          <div className="glass-panel rounded-2xl p-8 divide-y divide-white/5">
            <div className="py-4 flex justify-between items-center first:pt-0">
              <span className="text-sm font-semibold text-slate-400">Wi-Fi Bağlantısı</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-100">Aktif (5G)</span>
            </div>
            <div className="py-4 flex justify-between items-center last:pb-0">
              <span className="text-sm font-semibold text-slate-400">Bluetooth Sürümü</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic">Connected v5.3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-10 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8 border border-white/10">
          <Settings className="w-12 h-12 text-white animate-spin-slow" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Fermcar+ v2.1</h3>
        <p className="text-slate-500 text-sm font-light italic mb-8">Tüm sistemler stabil ve optimize çalışıyor.</p>
        <button className="w-full py-4 bg-white/5 rounded-xl text-xs font-black uppercase tracking-[2px] border border-white/5 hover:bg-white/10 transition-colors">Son Güncellemeleri Denetle</button>
      </div>
    </div>
  </div>
);

