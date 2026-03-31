import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  MessageCircle, 
  Calendar as CalendarIcon, 
  Heart, 
  X, 
  Sparkles, 
  Send, 
  Phone, 
  LogOut, 
  ChevronLeft, 
  Camera, 
  ChevronRight, 
  Lock, 
  BellRing, 
  CalendarCheck, 
  UserCircle,
  Smile,
  KeyRound,
  ShieldCheck,
  MessageSquareDot,
  Archive,
  Copy,
  Check,
  CreditCard,
  Bug,
  Mail,
  User,
  Zap,
  Star,
  Info
} from 'lucide-react';

/**
 * TAROT SOUL APP v19.9 — THE FULL SOUL EDITION
 * Учтены: Звуки, Анимации, Дизайн, Все стикеры и Supabase.
 */

const SUPABASE_URL = "https://hvqdnasfjtbipuuvblbw.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_s080zBFK5LwnBIavU_44yw_QElRnhCk"; 
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const MASTER_SECRET_CODE = "2026";

// --- CSS АНИМАЦИИ ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes catTail { 0% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } 100% { transform: rotate(0deg); } }
    .animate-cat-tail { animation: catTail 3s ease-in-out infinite; transform-origin: 75px 65px; }
    
    @keyframes catFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    .animate-cat-float { animation: catFloat 6s ease-in-out infinite; }
    
    @keyframes heartBeat { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }
    .animate-heart-beat { animation: heartBeat 1.8s ease-in-out infinite; }
    
    @keyframes shootingStar { 
      0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(0); opacity: 0; } 
      5% { opacity: 1; scale: 1; } 
      15% { transform: translateX(-600px) translateY(600px) rotate(-45deg) scale(0); opacity: 0; } 
      100% { transform: translateX(-600px) translateY(600px) rotate(-45deg) scale(0); opacity: 0; } 
    }
    .shooting-star { 
      position: absolute; width: 200px; height: 1px; 
      background: linear-gradient(90deg, #FFFFFF, transparent); 
      animation: shootingStar 18s linear infinite; opacity: 0; 
    }
    
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    @keyframes starPulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }
    .star-pulse { animation: starPulse 5s ease-in-out infinite; }
  `}} />
);

// --- ЗВЕЗДНОЕ НЕБО ---
const StarryBackground = () => {
  const stars = useMemo(() => Array.from({ length: 150 }).map((_, i) => ({
    id: i, cx: Math.random() * 100 + '%', cy: Math.random() * 100 + '%',
    r: Math.random() * 0.9 + 0.2, dur: Math.random() * 5 + 3, 
    delay: -(Math.random() * 10)
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#060608]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#060608] opacity-90" />
      <svg className="absolute inset-0 w-full h-full">
        {stars.map(star => (
          <circle key={star.id} cx={star.cx} cy={star.cy} r={star.r} fill="#FFFFFF" className="star-pulse" style={{ animationDelay: `${star.delay}s`, animationDuration: `${star.dur}s` }} />
        ))}
      </svg>
      <div className="shooting-star" style={{ top: '10%', right: '-5%', animationDelay: '5s' }} />
      <div className="shooting-star" style={{ top: '35%', right: '-15%', animationDelay: '15s' }} />
    </div>
  );
};

// --- КОМПОНЕНТ КОТА ---
const GoldenCatFamiliar = () => (
  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center animate-cat-float flex-shrink-0 mx-auto">
    <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute w-44 h-44 sm:w-56 sm:h-56 bg-[#d4af37] rounded-full blur-[90px]" />
    <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
      <path d="M75,65 C90,65 95,45 90,35 C85,25 75,35 80,45" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" className="animate-cat-tail" />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }} style={{ transformOrigin: "40px 52px" }}>
        <ellipse cx="40" cy="52" rx="5" ry="5" fill="#D4AF37" />
        <circle cx="39" cy="50" r="1.5" fill="#fff" opacity="0.8" />
      </motion.g>
      <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }} style={{ transformOrigin: "60px 52px" }}>
        <ellipse cx="60" cy="52" rx="5" ry="5" fill="#D4AF37" />
        <circle cx="59" cy="50" r="1.5" fill="#fff" opacity="0.8" />
      </motion.g>
      <path d="M48,64 L52,64 L50,68 Z" fill="#F9F1D8" />
      <path d="M50,68 Q46,72 42,70 M50,68 Q54,72 58,70" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
      <g className="animate-heart-beat">
        <ellipse cx="38" cy="78" rx="8" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
        <ellipse cx="62" cy="78" rx="8" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      </g>
      <path d="M32,58 L12,55 M32,62 L8,62 M32,66 L12,69" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
      <path d="M68,58 L88,55 M68,62 L92,62 M68,66 L88,69" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
    </svg>
  </div>
);

// --- СТИКЕРЫ ---
const CatMuzzleS = ({ color = "#D4AF37" }) => (<><path d="M48,64 L52,64 L50,68 Z" fill="#F9F1D8" /><path d="M50,68 Q47,72 43,70 M50,68 Q53,72 57,70" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></>);
const StickerLove = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><path d="M41 45 C44 41 49 44 49 48 C49 52 41 58 41 58 C41 58 33 52 33 48 C33 44 38 41 41 45" fill="#ff4d4d" transform="translate(9,0)"/><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><CatMuzzleS /></svg></div>);
const StickerJoy = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><path d="M34,51 Q39,44 44,51 M56,51 Q61,44 66,51" stroke="#D4AF37" strokeWidth="2.5" fill="none" /><CatMuzzleS /></svg></div>);
const StickerZen = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><path d="M34,55 Q50,65 66,55" stroke="#D4AF37" strokeWidth="2" fill="none" /><CatMuzzleS /></svg></div>);
const StickerCry = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><path d="M33,48 L39,52 L33,56 M67,48 L61,52 L67,56" stroke="#4dabff" strokeWidth="2.5" fill="none" /><CatMuzzleS /></svg></div>);
const StickerAngry = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="#200" stroke="#ff4d4d" strokeWidth="2" /><path d="M32,45 L45,50 M68,45 L55,50" stroke="#ff4d4d" strokeWidth="2.5" /><CatMuzzleS color="#ff4d4d"/></svg></div>);
const StickerMagic = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><circle cx="50" cy="50" r="10" fill="#9370DB" opacity="0.6" /><CatMuzzleS /></svg></div>);
const StickerCool = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><rect x="30" y="48" width="15" height="8" fill="#333" rx="2"/><rect x="55" y="48" width="15" height="8" fill="#333" rx="2"/><CatMuzzleS /></svg></div>);
const StickerSleep = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><path d="M34,53 Q39,56 44,53 M56,53 Q61,56 66,53" stroke="#D4AF37" strokeWidth="2" fill="none" /><CatMuzzleS /></svg></div>);
const StickerFear = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><circle cx="38" cy="52" r="5" fill="white"/><circle cx="62" cy="52" r="5" fill="white"/><CatMuzzleS /></svg></div>);
const StickerStar = () => (<div className="w-16 h-16"><svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="26" fill="black" stroke="#D4AF37" strokeWidth="1.5" /><path d="M50,40 L53,48 L62,48 L55,53 L58,62 L50,57 L42,62 L45,53 L38,48 L47,48 Z" fill="#ffeb3b" /><CatMuzzleS /></svg></div>);

const STICKERS_MAP = { love: StickerLove, joy: StickerJoy, zen: StickerZen, cry: StickerCry, angry: StickerAngry, magic: StickerMagic, cool: StickerCool, sleep: StickerSleep, fear: StickerFear, star: StickerStar };
const STICKERS_LIST = Object.keys(STICKERS_MAP).map(id => ({ id, label: id }));

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function App() {
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('loading'); 
  const [phone, setPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientGender, setClientGender] = useState('female'); 
  const [masterPass, setMasterPass] = useState('');
  const [toasts, setToasts] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingForm, setBookingForm] = useState({ service: '', date: '', time: '' });
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  
  const chatEndRef = useRef(null);
  const audioCtxRef = useRef(null);

  // --- ЗВУКИ (Web Audio API) ---
  const playSound = (type = 'click') => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'magic') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const role = localStorage.getItem('tarot_role');
    if (role === 'admin') {
      setUser({ role: 'admin', phone: 'Master', name: 'Мастер Соул' });
      setView('home');
    } else if (role === 'client') {
      const savedPhone = localStorage.getItem('tarot_phone');
      const savedName = localStorage.getItem('tarot_name');
      if (savedPhone && savedName) {
        setUser({ role: 'client', phone: savedPhone, name: savedName });
        setPhone(savedPhone); setView('home');
      } else setView('login-choice');
    } else setView('login-choice');
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (data) {
        setAllBookings(data);
        const active = data.find(b => b.client_phone === user.phone && b.status !== 'completed');
        if (active) setActiveChatBooking(active);
      }
    };
    fetchBookings();
    const sub = supabase.channel('bookings_db').on('postgres_changes', { event: '*', table: 'bookings' }, fetchBookings).subscribe();
    return () => sub.unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!activeChatBooking?.id) return;
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').eq('booking_id', activeChatBooking.id).order('timestamp', { ascending: true });
      if (data) setMessages(data);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };
    fetchMessages();
    const sub = supabase.channel(`chat_${activeChatBooking.id}`).on('postgres_changes', { event: 'INSERT', table: 'messages', filter: `booking_id=eq.${activeChatBooking.id}` }, (p) => {
      setMessages(prev => [...prev, p.new]);
      if (p.new.sender !== (user.role === 'admin' ? 'master' : 'user')) playSound('magic');
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }).subscribe();
    return () => sub.unsubscribe();
  }, [activeChatBooking]);

  const triggerMagicAlert = (m) => {
    const id = Date.now();
    setToasts(p => [...p, { id, m }]);
    playSound('magic');
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };

  const handleMasterLogin = () => {
    playSound();
    if (masterPass === MASTER_SECRET_CODE) {
      localStorage.setItem('tarot_role', 'admin');
      setUser({ role: 'admin', name: 'Мастер Соул' });
      setView('home');
    } else triggerMagicAlert("Доступ закрыт 🔒");
  };

  const handleVerify = async () => {
    playSound();
    const safePhone = phone.replace(/[^0-9+]/g, '');
    const { data } = await supabase.from('profiles').select('*').eq('phone', safePhone).single();
    if (data) {
      localStorage.setItem('tarot_role', 'client');
      localStorage.setItem('tarot_phone', safePhone);
      localStorage.setItem('tarot_name', data.name);
      setUser({ role: 'client', phone: safePhone, name: data.name });
      setView('home');
    } else setView('login-client-details');
  };

  const submitBooking = async () => {
    playSound();
    const newB = { client_phone: user.phone, client_name: user.name, service: bookingForm.service, date: bookingForm.date, time: bookingForm.time, status: 'pending', created_at: new Date().toISOString() };
    await supabase.from('bookings').insert(newB);
    triggerMagicAlert("Заявка отправлена! ✨"); 
    setView('home');
  };

  const sendMessage = async (text = '', sticker_id = null) => {
    if (!activeChatBooking) return;
    playSound();
    const msg = { 
      booking_id: activeChatBooking.id, text, sticker_id, 
      sender: user.role === 'admin' ? 'master' : 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      timestamp: Date.now() 
    };
    await supabase.from('messages').insert(msg);
    setNewMessage(''); setShowStickerPicker(false);
  };

  if (view === 'loading') return (
    <div className="fixed inset-0 bg-[#060608] flex flex-col items-center justify-center">
      <GlobalStyles /><StarryBackground /><GoldenCatFamiliar />
      <p className="text-[#d4af37] text-[10px] tracking-[0.5em] uppercase mt-10 animate-pulse">Соединение с космосом...</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#060608] flex items-center justify-center overflow-hidden font-sans text-white text-center">
      <GlobalStyles />
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} initial={{ y: -100, opacity: 0 }} animate={{ y: 30, opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 z-[1000] bg-[#d4af37] text-black px-8 py-4 rounded-full font-bold shadow-2xl tracking-widest text-[10px] uppercase">
            {t.m}
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="w-full h-full max-w-md flex flex-col relative border-x border-white/5 shadow-2xl overflow-hidden">
        <StarryBackground />
        
        {user && (
          <header className="px-6 py-6 flex justify-between items-center backdrop-blur-3xl border-b border-white/10 z-50 bg-black/40">
            <div className="flex items-center gap-3">
              {view !== 'home' && <button onClick={() => { playSound(); setView('home'); }} className="text-[#d4af37] active:scale-125 transition-transform"><ChevronLeft size={24} /></button>}
              <div className="flex flex-col text-left"><h1 className="text-[#d4af37] tracking-[0.4em] uppercase text-[10px] font-bold">Tarot Soul</h1><span className="text-[6px] text-[#d4af37]/50 uppercase tracking-[0.2em] font-medium">Связь с Мастером</span></div>
            </div>
            <button onClick={() => { playSound(); localStorage.clear(); setUser(null); setView('login-choice'); }} className="text-white/20 hover:text-red-400 transition-colors"><LogOut size={18} /></button>
          </header>
        )}

        <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12">
              <GoldenCatFamiliar />
              <div className="w-full space-y-5">
                {view === 'login-choice' ? (<><button onClick={() => { playSound(); setView('login-phone'); }} className="w-full bg-[#d4af37] text-black font-bold py-7 rounded-[35px] uppercase text-[11px] tracking-[0.3em] shadow-[0_20px_50px_rgba(212,175,55,0.2)] active:scale-95 transition-all">Я Клиент</button><button onClick={() => { playSound(); setView('login-master'); }} className="w-full text-white/20 text-[9px] uppercase tracking-[0.5em] active:text-[#d4af37] transition-colors">Мастер-вход</button></>) :
                 view === 'login-phone' ? (<div className="space-y-4"><input type="tel" placeholder="+7 (___) ___" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#16161f]/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 outline-none focus:border-[#d4af37]/50 transition-all text-center text-lg font-light" /><button onClick={handleVerify} className="w-full bg-[#d4af37] text-black py-6 rounded-3xl font-bold uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-transform">Далее</button></div>) :
                 view === 'login-client-details' ? (<div className="space-y-4"><input type="text" placeholder="Ваше имя" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-[#16161f]/90 p-6 rounded-3xl border border-white/10 text-center outline-none font-light" /><div className="flex gap-4"><button onClick={() => { playSound(); setClientGender('female'); }} className={`flex-1 p-6 rounded-2xl border transition-all flex flex-col items-center gap-2 ${clientGender === 'female' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'border-white/5 opacity-30'}`}><UserCircle size={28}/><span className="text-[8px] uppercase tracking-widest font-bold">Она</span></button><button onClick={() => { playSound(); setClientGender('male'); }} className={`flex-1 p-6 rounded-2xl border transition-all flex flex-col items-center gap-2 ${clientGender === 'male' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'border-white/5 opacity-30'}`}><User size={28}/><span className="text-[8px] uppercase tracking-widest font-bold">Он</span></button></div><button onClick={async () => { await supabase.from('profiles').upsert({ phone, name: clientName, gender: clientGender }); handleVerify(); }} className="w-full bg-[#d4af37] text-black py-6 rounded-3xl font-bold uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-transform">Активировать</button></div>) :
                 (<div className="space-y-5 text-center"><h2 className="text-[#d4af37] text-[10px] uppercase tracking-[0.5em] mb-6 font-bold">Мастер-Ключ</h2><input type="password" placeholder="****" value={masterPass} onChange={e => setMasterPass(e.target.value)} className="w-full bg-[#16161f]/90 p-6 rounded-3xl border border-[#d4af37]/40 text-center outline-none text-4xl font-light tracking-[0.5em] text-[#d4af37]" /><button onClick={handleMasterLogin} className="w-full bg-white text-black py-6 rounded-3xl font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-transform">Активировать</button></div>)}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              {view === 'home' && (
                <div className="p-8 flex flex-col items-center justify-center space-y-16 h-full">
                  <GoldenCatFamiliar />
                  <div className="text-center space-y-3"><h2 className="text-2xl font-light uppercase tracking-[0.3em] text-white/90">Привет, {user.name}</h2><p className="text-[10px] text-[#d4af37]/60 uppercase tracking-[0.4em] font-bold animate-pulse">Магический поток открыт</p></div>
                  <div className="w-full space-y-5 px-4">
                    <button onClick={() => { playSound(); if (user.role === 'admin') setView('admin-requests'); else if (activeChatBooking?.status === 'confirmed') setView('chat'); else setView('booking-service'); }} className="w-full p-12 rounded-[55px] bg-gradient-to-tr from-[#16161f] to-[#1a1a24] border border-[#d4af37]/40 shadow-[0_25px_60px_rgba(212,175,55,0.15)] flex flex-col items-center gap-4 active:scale-95 transition-all">
                      <MessageCircle size={44} className="text-[#d4af37]" />
                      <span className="text-[12px] uppercase font-bold tracking-[0.5em]">Чат с Мастером</span>
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => { playSound(); setShowDonateModal(true); }} className="p-7 rounded-[35px] bg-[#16161f]/90 backdrop-blur-xl border border-white/5 flex flex-col items-center gap-2 active:scale-95 transition-all shadow-xl"><Heart size={24} className="text-[#ff4d4d]" fill="#ff4d4d30"/><span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40">Донат</span></button>
                      <button onClick={() => { playSound(); triggerMagicAlert("Раздел в разработке ✨"); }} className="p-7 rounded-[35px] bg-[#16161f]/90 backdrop-blur-xl border border-white/5 flex flex-col items-center gap-2 opacity-30 shadow-xl"><Zap size={24} className="text-blue-400" /><span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40">Энергия</span></button>
                    </div>
                  </div>
                </div>
              )}

              {view === 'admin-requests' && (
                <div className="p-6 space-y-5 overflow-y-auto scrollbar-hide">
                  <h2 className="text-[#d4af37] uppercase tracking-[0.5em] text-[10px] text-center mb-8 italic font-bold">Очередь сеансов</h2>
                  {allBookings.filter(b => b.status !== 'completed').map(b => (
                    <div key={b.id} className="bg-[#16161f]/95 p-7 rounded-[40px] border border-[#d4af37]/20 text-left flex justify-between items-center shadow-2xl backdrop-blur-md">
                      <div className="space-y-1"><div className="text-[#d4af37] font-bold text-sm tracking-widest uppercase">{b.client_name}</div><div className="text-[10px] text-white/40 uppercase tracking-widest font-light">{b.service}</div></div>
                      {b.status === 'pending' ? <button onClick={async () => { playSound(); await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', b.id); }} className="bg-[#d4af37] text-black px-6 py-3.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest shadow-lg active:scale-90 transition-transform">Принять</button> : <button onClick={() => { playSound(); setActiveChatBooking(b); setView('chat'); }} className="text-[#d4af37] border border-[#d4af37]/40 px-6 py-3.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest active:scale-90 transition-transform">Диалог</button>}
                    </div>
                  ))}
                </div>
              )}

              {view === 'booking-service' && (
                <div className="p-10 space-y-5 pt-16 h-full flex flex-col">
                  <h2 className="text-[#d4af37] uppercase tracking-[0.6em] text-[10px] mb-10 font-bold italic">Выберите тему</h2>
                  {['Расклад на любовь', 'Финансовый поток', 'Карта дня', 'Кельтский крест'].map(s => (
                    <button key={s} onClick={() => { playSound(); setBookingForm(prev => ({...prev, service: s})); setView('booking-datetime'); }} className="w-full bg-[#16161f]/90 p-7 rounded-[35px] border border-white/5 flex justify-between items-center active:scale-95 transition-all shadow-2xl group hover:border-[#d4af37]/40"><span className="text-[12px] uppercase tracking-[0.2em] font-light text-white/80 transition-colors">{s}</span><ChevronRight size={20} className="text-[#d4af37]/30 group-hover:text-[#d4af37] transition-all"/></button>
                  ))}
                </div>
              )}

              {view === 'booking-datetime' && (
                <div className="p-8 space-y-10 h-full flex flex-col pt-16">
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2, 3, 4, 5].map(offset => { 
                      const d = new Date(); d.setDate(d.getDate() + offset); 
                      const s = d.toISOString().split('T')[0];
                      const isSelected = bookingForm.date === s;
                      return <button key={s} onClick={() => { playSound(); setBookingForm(p => ({...p, date: s})); }} className={`p-5 rounded-[25px] border transition-all flex flex-col items-center gap-1 ${isSelected ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-xl scale-105' : 'bg-[#16161f]/90 border-white/5 text-white/20 hover:border-white/20'}`}><span className="text-[8px] uppercase font-bold">{d.toLocaleDateString('ru-RU', { weekday: 'short' })}</span><span className="text-[11px] font-bold tracking-widest">{d.getDate()} {d.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '')}</span></button>
                    })}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map(t => (<button key={t} onClick={() => { playSound(); setBookingForm(p => ({...p, time: t})); }} className={`p-4 rounded-xl border text-[9px] tracking-widest font-bold transition-all ${bookingForm.time === t ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg scale-110' : 'bg-[#16161f]/90 border-white/5 text-white/20'}`}>{t}</button>))}
                  </div>
                  <button onClick={submitBooking} className="w-full bg-[#d4af37] text-black py-7 rounded-[35px] font-bold uppercase tracking-[0.4em] text-[11px] mt-auto shadow-[0_20px_50px_rgba(212,175,55,0.3)] active:scale-95 transition-all">Записаться ✨</button>
                </div>
              )}

              {view === 'chat' && activeChatBooking && (
                <div className="flex-1 flex flex-col overflow-hidden bg-black/10">
                  <div className="px-8 py-5 bg-black/70 border-b border-white/10 flex justify-between items-center backdrop-blur-3xl">
                    <div className="text-left"><div className="text-[#d4af37] text-[11px] font-bold uppercase tracking-widest">{activeChatBooking.client_name}</div><div className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-mono italic">{activeChatBooking.service}</div></div>
                    {user.role === 'admin' && <button onClick={async () => { playSound(); await supabase.from('bookings').update({ status: 'completed' }).eq('id', activeChatBooking.id); }} className="text-red-400/40 hover:text-red-400 text-[9px] uppercase font-bold tracking-[0.2em] px-5 py-2 border border-red-400/10 rounded-full active:scale-90 transition-all">Завершить</button>}
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                    {messages.map(m => {
                      const isMaster = m.sender === 'master';
                      const Sticker = m.sticker_id ? STICKERS_MAP[m.sticker_id] : null;
                      return (
                        <div key={m.id} className={`flex ${isMaster ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] p-5 rounded-[32px] shadow-2xl relative border ${isMaster ? 'bg-[#1a1a24]/98 border-[#d4af37]/40 text-white rounded-tl-none text-left' : 'bg-[#16161f]/98 border-white/10 text-white/90 rounded-tr-none text-left font-light'}`}>
                            {Sticker ? <div className="flex justify-center py-2"><Sticker /></div> : <p className="text-[14px] italic leading-relaxed whitespace-pre-wrap">{m.text}</p>}
                            <span className={`text-[7px] opacity-20 mt-3 block text-right font-mono uppercase tracking-[0.3em]`}>{m.time}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="p-5 bg-black/80 border-t border-white/10 flex flex-col gap-4 backdrop-blur-3xl relative">
                    <AnimatePresence>
                      {showStickerPicker && (
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="absolute bottom-[105%] left-4 right-4 bg-[#1a1a24]/98 border border-[#d4af37]/40 rounded-[40px] p-6 shadow-[0_0_100px_rgba(0,0,0,0.8)] grid grid-cols-5 gap-4 backdrop-blur-3xl overflow-y-auto max-h-56 scrollbar-hide">
                          {STICKERS_LIST.map(s => { const S = STICKERS_MAP[s.id]; return <button key={s.id} onClick={() => sendMessage('', s.id)} className="flex flex-col items-center gap-1 hover:bg-white/10 p-2 rounded-2xl active:scale-90 transition-all"><S /><span className="text-[6px] uppercase tracking-tighter opacity-30">{s.label}</span></button> })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex items-center gap-3 bg-white/[0.04] p-2 rounded-[35px] border border-white/10 focus-within:border-[#d4af37]/50 transition-all">
                       <button onClick={() => { playSound(); setShowStickerPicker(!showStickerPicker); }} className={`p-4 rounded-full transition-all ${showStickerPicker ? 'text-[#d4af37] bg-white/5' : 'text-white/20 hover:text-white'}`}><Smile size={22}/></button>
                       <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && newMessage.trim() && sendMessage(newMessage)} placeholder="Ваше послание..." className="flex-1 bg-transparent outline-none text-[15px] font-light text-white placeholder:text-white/10 px-3" />
                       <button onClick={() => newMessage.trim() && sendMessage(newMessage)} className="bg-[#d4af37] text-black w-12 h-12 rounded-full shadow-xl shadow-[#d4af37]/20 flex items-center justify-center active:scale-90 transition-transform"><Send size={20}/></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
        
        {showDonateModal && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-10 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowDonateModal(false)} className="absolute inset-0 bg-black/95" />
            <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} className="relative bg-[#1a1a24]/90 border border-[#d4af37]/50 rounded-[45px] p-12 w-full max-w-sm flex flex-col items-center shadow-[0_0_100px_rgba(212,175,55,0.2)]">
              <div className="w-20 h-20 bg-[#ff4d4d]/10 rounded-full flex items-center justify-center mb-8"><Heart size={44} className="text-[#ff4d4d]" fill="#ff4d4d" /></div>
              <h3 className="text-[#d4af37] text-base font-bold uppercase tracking-[0.5em] mb-4">Энергообмен</h3>
              <p className="text-[10px] text-white/40 leading-relaxed mb-10 italic text-center px-4">Ваша поддержка помогает Мастеру сохранять связь с потоком и помогать другим.</p>
              <div className="bg-black/50 p-6 rounded-[30px] w-full text-center mb-10 font-mono text-lg tracking-[0.2em] text-white border border-white/5 shadow-inner">
                <span className="text-[8px] text-[#d4af37] uppercase tracking-widest block mb-2 opacity-50">ЮMoney</span>
                5599 0021 2732 2628
              </div>
              <button onClick={() => { playSound(); navigator.clipboard.writeText("5599002127322628"); triggerMagicAlert("Номер скопирован! ✨"); }} className="w-full bg-[#d4af37] text-black py-6 rounded-[30px] font-bold uppercase text-[11px] tracking-[0.3em] shadow-2xl active:scale-95 transition-all">Копировать</button>
              <button onClick={() => { playSound(); setShowDonateModal(false); }} className="mt-8 text-white/20 text-[9px] uppercase tracking-widest hover:text-white transition-colors">Закрыть</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
