import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Мы убираем прямой импорт библиотеки через URL, чтобы избежать ошибки "Dynamic require"
// Вместо этого мы будем использовать динамическую загрузку скрипта, что гарантирует работу в любой среде
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
  User // Используем User вместо Venus/Mars для стабильности
} from 'lucide-react';

/**
 * TAROT SOUL APP v19.6.2 (Fix: Dynamic Require Error)
 * - Решение: Загрузка Supabase через глобальный скрипт для совместимости с Preview и Vite.
 */

const SUPABASE_URL = "https://hvqdnasfjtbipuuvblbw.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_s080zBFK5LwnBIavU_44yw_QElRnhCk"; 
const MASTER_SECRET_CODE = "2026";

// Глобальный объект для Supabase
let supabase = null;

// --- ХЕЛПЕРЫ ---
const getCurrentSystemDate = () => new Date();
const getTodayDateString = () => {
  const now = getCurrentSystemDate();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const formatReadableDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

const checkSlotStatus = (slotTime, selectedDate) => {
  const today = getTodayDateString();
  if (selectedDate > today) return 'available';
  if (selectedDate < today) return 'passed';
  const now = getCurrentSystemDate();
  const currentHour = now.getHours();
  const slotHour = parseInt(slotTime.split(':')[0]);
  return slotHour <= currentHour ? 'passed' : 'available';
};

// --- ФОН СО ЗВЕЗДАМИ ---
const StarryBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 140 }).map((_, i) => {
      const floatType = Math.floor(Math.random() * 3) + 1;
      return {
        id: i, cx: Math.random() * 100 + '%', cy: Math.random() * 100 + '%',
        r: Math.random() * 0.6 + 0.2, dur: Math.random() * 4 + 2, 
        delay: -(Math.random() * 5), color: "#FFFFFF", 
        opacity: Math.random() * 0.6 + 0.3, floatClass: `float-star-${floatType}`,
        floatDur: Math.random() * 20 + 15 
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#060608]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowPan { 0% { transform: translateY(0) scale(1.02); } 50% { transform: translateY(-2%) scale(1.05); } 100% { transform: translateY(0) scale(1.02); } }
        .animate-slow-pan { animation: slowPan 100s ease-in-out infinite; transform-origin: center; }
        @keyframes floatStar1 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(4px, -4px); } }
        @keyframes floatStar2 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-3px, 5px); } }
        @keyframes floatStar3 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(5px, 3px); } }
        .float-star-1 { animation: floatStar1 ease-in-out infinite alternate; }
        .float-star-2 { animation: floatStar2 ease-in-out infinite alternate; }
        .float-star-3 { animation: floatStar3 ease-in-out infinite alternate; }
      `}} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a10] via-transparent to-[#0d0d12] opacity-90" />
      <svg className="absolute inset-0 w-full h-full animate-slow-pan">
        {stars.map(star => (
          <g key={star.id} className={star.floatClass} style={{ animationDuration: `${star.floatDur}s`, animationDelay: `${star.delay}s` }}>
            <circle cx={star.cx} cy={star.cy} r={star.r} fill={star.color}>
              <animate attributeName="opacity" values={`0.1;${star.opacity};0.1`} dur={`${star.dur}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- КОТ ---
const GoldenCatFamiliar = () => (
  <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center flex-shrink-0 mx-auto">
    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute w-36 h-36 sm:w-56 sm:h-56 bg-[#d4af37] rounded-full blur-[70px]" />
    <div className="relative z-10 scale-100 sm:scale-110">
      <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75,65 C90,65 95,45 90,35 C85,25 75,35 80,45" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
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
          <ellipse cx="38" cy="78" rx="8" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
          <ellipse cx="62" cy="78" rx="8" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
);

// --- СТИКЕРЫ ---
const CatMuzzleS = ({ color = "#D4AF37" }) => (<><path d="M48,64 L52,64 L50,68 Z" fill="#F9F1D8" /><path d="M50,68 Q47,72 43,70 M50,68 Q53,72 57,70" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></>);
const StickerLove = () => (<motion.div animate={{ y: [-2, 2, -2] }} className="w-20 h-20 relative flex items-center justify-center"><svg viewBox="0 0 100 100" className="w-full h-full"><path d="M68,65 C80,65 90,50 85,35" fill="none" stroke="#D4AF37" strokeWidth="3" /><path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" /><circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" /><path d="M33 48 C33 44 38 41 41 45 C44 41 49 44 49 48 C49 52 41 58 41 58 C41 58 33 52 33 48 Z" fill="#ff4d4d" /><CatMuzzleS /></svg></motion.div>);
const StickerJoy = () => (<motion.div animate={{ y: [0, -10, 0] }} className="w-20 h-20 relative flex items-center justify-center"><svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" /><path d="M34,51 Q39,44 44,51 M56,51 Q61,44 66,51" stroke="#D4AF37" strokeWidth="2.5" fill="none" /><CatMuzzleS /></svg></motion.div>);
const STICKERS_MAP = { love: StickerLove, joy: StickerJoy };

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function App() {
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('loading'); 
  const [phone, setPhone] = useState('');
  const [clientOtp, setClientOtp] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientGender, setClientGender] = useState('female'); 
  const [masterPass, setMasterPass] = useState('');
  const [toasts, setToasts] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingForm, setBookingForm] = useState({ service: '', date: getTodayDateString(), time: '' });
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Динамическая загрузка Supabase
  useEffect(() => {
    const initSupabase = async () => {
      if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabaseReady(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.onload = () => {
        if (window.supabase) {
          supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          setSupabaseReady(true);
        }
      };
      document.head.appendChild(script);
    };
    initSupabase();
  }, []);

  const upcomingDates = useMemo(() => { 
    const dates = []; 
    for (let i = 0; i < 12; i++) { 
      const d = new Date(); 
      d.setDate(d.getDate() + i); 
      dates.push(d); 
    } 
    return dates; 
  }, []);

  const formatShortDate = (date) => { 
    const d = date.getDate(); 
    const m = date.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', ''); 
    return `${d} ${m}`; 
  };

  const formatDateString = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    if (!supabaseReady) return;
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
      } else { setView('login-choice'); }
    } else { setView('login-choice'); }
  }, [supabaseReady]);

  const triggerMagicAlert = (message) => {
    const newToast = { id: Date.now(), message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== newToast.id)), 5000);
  };

  useEffect(() => {
    if (!user || !supabaseReady || !supabase) return;
    const fetchBookings = async () => {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (!error && data) processBookings(data);
    };
    fetchBookings();
    const channel = supabase.channel('bookings_changes').on('postgres_changes', { event: '*', table: 'bookings' }, () => fetchBookings()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.role, user?.phone, supabaseReady]);

  const processBookings = (sorted) => {
    setAllBookings(sorted);
    const active = sorted.find(b => b.client_phone === user?.phone && b.status !== 'completed');
    if (active) setActiveChatBooking(active);
  };

  useEffect(() => {
    if (!activeChatBooking?.id || !supabaseReady || !supabase) return;
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').eq('booking_id', activeChatBooking.id).order('timestamp', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();
    const channel = supabase.channel(`chat_${activeChatBooking.id}`).on('postgres_changes', { event: 'INSERT', table: 'messages', filter: `booking_id=eq.${activeChatBooking.id}` }, (payload) => {
      setMessages(prev => [...prev, payload.new]);
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeChatBooking?.id, supabaseReady]);

  const handleLogout = () => { localStorage.clear(); setUser(null); setView('login-choice'); };

  const handleMasterLogin = () => {
    if (masterPass === MASTER_SECRET_CODE) {
      localStorage.setItem('tarot_role', 'admin');
      setUser({ role: 'admin', phone: 'Master', name: 'Мастер Соул' });
      setView('home');
    } else triggerMagicAlert("Доступ закрыт 🔒");
  };

  const handleVerifyOtp = async () => {
    if (!supabase) return;
    const safePhone = phone.replace(/[^0-9+]/g, '');
    const { data } = await supabase.from('profiles').select('*').eq('phone', safePhone).single();
    if (data) {
      localStorage.setItem('tarot_role', 'client'); 
      localStorage.setItem('tarot_phone', safePhone);
      localStorage.setItem('tarot_name', data.name);
      setUser({ role: 'client', phone: safePhone, ...data }); 
      setView('home');
    } else setView('login-client-details');
  };

  const handleCompleteRegistration = async () => {
    if (!supabase) return;
    const safePhone = phone.replace(/[^0-9+]/g, '');
    const profile = { phone: safePhone, name: clientName, gender: clientGender };
    await supabase.from('profiles').upsert(profile);
    localStorage.setItem('tarot_role', 'client'); 
    localStorage.setItem('tarot_phone', safePhone);
    localStorage.setItem('tarot_name', clientName);
    setUser({ role: 'client', ...profile }); 
    setView('home');
  };

  const submitBooking = async () => {
    if (!supabase) return;
    const newB = { 
      client_phone: user.phone, client_name: user.name, 
      service: bookingForm.service, date: bookingForm.date, time: bookingForm.time, 
      status: 'pending', created_at: new Date().toISOString()
    };
    await supabase.from('bookings').insert(newB);
    triggerMagicAlert("Заявка отправлена! ✨"); 
    setView('home');
  };

  const confirmBooking = async (id) => { 
    if (!supabase) return;
    await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', id); 
  };

  const sendMessage = async (text = '', imageUrl = null, stickerId = null) => {
    if (!activeChatBooking || !supabase) return;
    const msg = { 
      booking_id: activeChatBooking.id, text, image_url: imageUrl, sticker_id: stickerId, 
      sender: user.role === 'admin' ? 'master' : 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now() 
    };
    await supabase.from('messages').insert(msg);
    setNewMessage('');
  };

  if (!supabaseReady || view === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#060608]">
        <StarryBackground />
        <div className="flex flex-col items-center gap-6">
          <GoldenCatFamiliar />
          <div className="text-[#d4af37] text-[10px] uppercase tracking-widest animate-pulse">Загрузка энергий...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#060608] flex items-center justify-center overflow-hidden font-sans text-white text-center">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 z-[1000] bg-[#d4af37] text-black px-6 py-3 rounded-full font-bold shadow-2xl">
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="w-full h-full max-w-md flex flex-col relative overflow-hidden border-x border-white/5">
        <StarryBackground />
        {user && (
          <header className="px-5 py-5 flex justify-between items-center backdrop-blur-xl border-b border-white/5 z-50 bg-black/40">
            <div className="flex items-center gap-3">
              {view !== 'home' && <button onClick={() => setView('home')} className="text-[#d4af37]"><ChevronLeft size={24} /></button>}
              <h1 className="text-[#d4af37] tracking-widest uppercase text-xs font-bold">Tarot Soul</h1>
            </div>
            <button onClick={handleLogout} className="text-white/20"><LogOut size={18} /></button>
          </header>
        )}
        <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
              <GoldenCatFamiliar />
              <div className="w-full space-y-4">
                {view === 'login-choice' ? (<><button onClick={() => setView('login-phone')} className="w-full bg-[#d4af37] text-black font-bold py-5 rounded-3xl uppercase text-xs">Я Клиент</button><button onClick={() => setView('login-master')} className="w-full text-white/30 text-[10px] uppercase">Мастер</button></>) :
                 view === 'login-phone' ? (<div className="space-y-4"><input type="tel" placeholder="Номер телефона" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#16161f] p-5 rounded-3xl border border-white/10" /><button onClick={() => setView('login-client-otp')} className="w-full bg-[#d4af37] text-black py-5 rounded-3xl font-bold uppercase">Далее</button></div>) :
                 view === 'login-client-otp' ? (<div className="space-y-4"><input type="text" placeholder="Код" value={clientOtp} onChange={e => setClientOtp(e.target.value)} className="w-full bg-[#16161f] p-5 rounded-3xl border border-[#d4af37]/40 text-center text-xl" /><button onClick={handleVerifyOtp} className="w-full bg-white text-black py-5 rounded-3xl font-bold uppercase">Войти</button></div>) :
                 view === 'login-client-details' ? (<div className="space-y-4"><input type="text" placeholder="Ваше имя" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-[#16161f] p-5 rounded-3xl border border-white/10" /><div className="flex gap-2"><button onClick={() => setClientGender('female')} className={`flex-1 p-4 rounded-2xl border ${clientGender === 'female' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/5'}`}>Она</button><button onClick={() => setClientGender('male')} className={`flex-1 p-4 rounded-2xl border ${clientGender === 'male' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/5'}`}>Он</button></div><button onClick={handleCompleteRegistration} className="w-full bg-[#d4af37] text-black py-5 rounded-3xl font-bold uppercase">Готово</button></div>) :
                 (<div className="space-y-4"><input type="password" placeholder="****" value={masterPass} onChange={e => setMasterPass(e.target.value)} className="w-full bg-[#16161f] p-5 rounded-3xl border border-[#d4af37]/40 text-center text-3xl" /><button onClick={handleMasterLogin} className="w-full bg-white text-black py-5 rounded-3xl font-bold uppercase">Войти</button></div>)}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {view === 'home' && (<div className="p-8 flex flex-col items-center space-y-12 pt-20"><GoldenCatFamiliar /><div className="w-full space-y-4"><button onClick={() => { if (user.role === 'admin') setView('admin-requests'); else if (activeChatBooking?.status === 'confirmed') setView('chat'); else setView('booking-service'); }} className="w-full p-8 rounded-[40px] bg-gradient-to-tr from-[#16161f] to-[#1a1a24] border border-[#d4af37]/30 shadow-xl flex flex-col items-center gap-4"><MessageCircle size={32} className="text-[#d4af37]" /><span className="text-[10px] uppercase font-bold tracking-widest">Чат с Мастером</span></button><button onClick={() => setShowDonateModal(true)} className="w-full p-5 rounded-3xl bg-[#16161f] border border-white/5 flex items-center justify-center gap-3"><Heart size={18} className="text-[#ff4d4d]" /><span className="text-[9px] uppercase font-bold">Благодарность</span></button></div></div>)}
              {view === 'admin-requests' && (<div className="p-5 space-y-4">{allBookings.filter(b => b.status !== 'completed').map(b => (<div key={b.id} className="bg-[#16161f] p-5 rounded-3xl border border-[#d4af37]/20 flex justify-between items-center text-left"><div><div className="font-bold text-[#d4af37] flex items-center gap-2">{b.client_name} <User size={12}/></div><div className="text-[9px] opacity-40">{b.service}</div></div>{b.status === 'pending' ? <button onClick={() => confirmBooking(b.id)} className="bg-[#d4af37] text-black px-4 py-2 rounded-xl text-[10px] font-bold">Принять</button> : <button onClick={() => { setActiveChatBooking(b); setView('chat'); }} className="text-[#d4af37] border border-[#d4af37]/40 px-4 py-2 rounded-xl text-[10px]">В чат</button>}</div>))}</div>)}
              {view === 'booking-service' && (<div className="p-6 space-y-4">{['Расклад на любовь', 'Финансовый поток', 'Карта дня'].map(s => (<button key={s} onClick={() => { setBookingForm(prev => ({...prev, service: s})); setView('booking-datetime'); }} className="w-full bg-[#16161f] p-5 rounded-2xl border border-white/5 flex justify-between items-center"><span className="text-xs uppercase">{s}</span><ChevronRight size={16} className="text-[#d4af37]" /></button>))}</div>)}
              {view === 'booking-datetime' && (<div className="p-6 space-y-8 flex flex-col h-full"><div className="grid grid-cols-3 gap-2">{upcomingDates.map(d => { const ds = formatDateString(d); return <button key={ds} onClick={() => setBookingForm(prev => ({...prev, date: ds}))} className={`p-3 rounded-xl border text-[10px] ${bookingForm.date === ds ? 'bg-[#d4af37] text-black' : 'bg-white/5 border-white/5'}`}>{formatShortDate(d)}</button> })}</div><div className="grid grid-cols-4 gap-2">{['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => (<button key={t} onClick={() => setBookingForm(prev => ({...prev, time: t}))} className={`p-3 rounded-xl border text-[10px] ${bookingForm.time === t ? 'bg-[#d4af37] text-black' : 'bg-white/5 border-white/5'}`}>{t}</button>))}</div><button onClick={submitBooking} className="w-full bg-[#d4af37] text-black py-5 rounded-3xl font-bold uppercase mt-auto shadow-2xl">Записаться ✨</button></div>)}
              {view === 'chat' && activeChatBooking && (<div className="flex-1 flex flex-col overflow-hidden"><div className="p-3 bg-black/40 border-b border-white/5 text-[10px] font-bold text-[#d4af37] uppercase">{activeChatBooking.client_name} • {activeChatBooking.service}</div><div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">{messages.map(m => (<div key={m.id} className={`flex ${m.sender === 'master' ? 'justify-start' : 'justify-end'}`}><div className={`max-w-[80%] p-4 rounded-2xl ${m.sender === 'master' ? 'bg-[#1a1a24] border border-[#d4af37]/30' : 'bg-[#16161f] border border-white/10'}`}>{m.sticker_id ? <div className="p-2">{m.sticker_id === 'love' ? <StickerLove /> : <StickerJoy />}</div> : <p className="text-sm italic">{m.text}</p>}<span className="text-[7px] opacity-20 mt-2 block text-right">{m.time}</span></div></div>))}</div><div className="p-4 bg-black/60 border-t border-white/5 flex gap-2"><input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage(newMessage)} placeholder="Ваше послание..." className="flex-1 bg-transparent outline-none text-sm" /><button onClick={() => sendMessage(newMessage)} className="bg-[#d4af37] text-black p-3 rounded-full"><Send size={20}/></button></div></div>)}
            </div>
          )}
        </main>
        
        {showDonateModal && (<div className="fixed inset-0 z-[600] flex items-center justify-center p-6"><div onClick={() => setShowDonateModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" /><div className="relative bg-[#1a1a24] border border-[#d4af37]/30 rounded-[3rem] p-10 w-full max-w-xs flex flex-col items-center"><Heart size={40} className="text-[#ff4d4d] mb-4" fill="#ff4d4d" /><h3 className="text-[#d4af37] text-sm font-bold uppercase mb-4">Энергообмен</h3><div className="bg-[#0d0d12] p-4 rounded-2xl w-full mb-6 font-mono text-sm tracking-widest border border-white/5">5599 0021 2732 2628</div><button onClick={() => { navigator.clipboard.writeText("5599002127322628"); setCopied(true); }} className="w-full bg-[#d4af37] text-black py-4 rounded-2xl font-bold uppercase text-[10px]">{copied ? 'Готово!' : 'Копировать номер'}</button></div></div>)}
      </div>
    </div>
  );
}
