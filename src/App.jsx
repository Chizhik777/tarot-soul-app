import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';
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
  RefreshCw,
  Archive,
  Copy,
  Check,
  CreditCard,
  Bug,
  Mail
} from 'lucide-react';

/**
 * TAROT SOUL APP v18.2 (Supabase Edition)
 * - ДИЗАЙН: Звезды стали меньше и только белого цвета. (Точная копия v18.2)
 * - АНИМАЦИЯ: Сохранено динамическое мерцание и движение.
 * - БАЗА: Переписано на Supabase.
 */

const SUPABASE_URL = "https://hvqdnasfjtbipuuvblbw.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_s080zBFK5LwnBIavU_44yw_QElRnhCk"; 
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MASTER_SECRET_CODE = "2026";

// --- ГЛОБАЛЬНЫЕ ХЕЛПЕРЫ ---
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

// --- SVG ИКОНКИ ДЛЯ ПОЛА (Замена lucide-react для избежания ошибок Vercel) ---
const VenusIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M9 19h6"/></svg>
);
const MarsIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="10" cy="14" r="6"/><path d="M14 10l7-7"/><path d="M16 3h5v5"/></svg>
);

// --- ЗВЕЗДНОЕ НЕБО (ФОН ПРИЛОЖЕНИЯ) ---
const StarryBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 140 }).map((_, i) => {
      const floatType = Math.floor(Math.random() * 3) + 1;
      return {
        id: i,
        cx: Math.random() * 100 + '%',
        cy: Math.random() * 100 + '%',
        r: Math.random() * 0.6 + 0.2, // Уменьшенный радиус для изящности
        dur: Math.random() * 4 + 2, 
        delay: -(Math.random() * 5), 
        color: "#FFFFFF", // Только белый цвет
        opacity: Math.random() * 0.6 + 0.3,
        floatClass: `float-star-${floatType}`,
        floatDur: Math.random() * 20 + 15 
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#060608]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowPan {
          0% { transform: translateY(0) scale(1.02); }
          50% { transform: translateY(-2%) scale(1.05); }
          100% { transform: translateY(0) scale(1.02); }
        }
        .animate-slow-pan { animation: slowPan 100s ease-in-out infinite; transform-origin: center; }
        
        @keyframes floatStar1 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(4px, -4px); } }
        @keyframes floatStar2 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-3px, 5px); } }
        @keyframes floatStar3 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(5px, 3px); } }
        
        .float-star-1 { animation: floatStar1 ease-in-out infinite alternate; }
        .float-star-2 { animation: floatStar2 ease-in-out infinite alternate; }
        .float-star-3 { animation: floatStar3 ease-in-out infinite alternate; }

        @keyframes shootingStar {
          0% { transform: translate(0, 0) rotate(-45deg) scale(0); opacity: 0; }
          2% { opacity: 0.8; scale: 1; }
          10% { transform: translate(-400px, 400px) rotate(-45deg) scale(0); opacity: 0; }
          100% { transform: translate(-400px, 400px) rotate(-45deg) scale(0); opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 1px;
          background: linear-gradient(90deg, #FFFFFF, transparent);
          animation: shootingStar 20s linear infinite;
          opacity: 0;
        }
        .shooting-star::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
        }
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

      <div className="shooting-star" style={{ top: '15%', right: '5%', animationDelay: '2s' }}></div>
      <div className="shooting-star" style={{ top: '40%', right: '20%', animationDelay: '12s' }}></div>
    </div>
  );
};

// --- КОМПОНЕНТ УВЕДОМЛЕНИЙ ---
const NotificationUI = ({ toast, onClose }) => (
  <motion.div 
    initial={{ y: -100, opacity: 0, scale: 0.8 }} 
    animate={{ y: 0, opacity: 1, scale: 1 }} 
    exit={{ x: 100, opacity: 0 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 z-[600] bg-[#1a1a24]/98 border-2 border-[#d4af37]/60 backdrop-blur-3xl p-4 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex items-start gap-4 max-w-sm w-[92%] pointer-events-auto text-left"
  >
    <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0"><Sparkles className="text-[#d4af37]" size={20} /></div>
    <div className="flex-1 font-light text-white/90 text-xs leading-snug">{toast.message}</div>
    <button onClick={onClose} className="text-white/20 hover:text-white p-1 flex-shrink-0"><X size={18}/></button>
  </motion.div>
);

// --- КОМПОНЕНТ ЖИВОГО КОТА ---
const GoldenCatFamiliar = () => (
  <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center animate-cat-float flex-shrink-0 mx-auto">
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes catTail { from { transform: rotate(-5deg); } to { transform: rotate(15deg); } }
      @keyframes catFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      .animate-cat-tail { animation: catTail 2s ease-in-out infinite alternate; transform-origin: 75px 65px; }
      .animate-cat-float { animation: catFloat 6s ease-in-out infinite; }
      @keyframes heartBeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .animate-heart-beat { animation: heartBeat 2s ease-in-out infinite; }
    `}} />
    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute w-36 h-36 sm:w-56 sm:h-56 bg-[#d4af37] rounded-full blur-[70px]" />
    <div className="relative z-10 scale-100 sm:scale-110">
      <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75,65 C90,65 95,45 90,35 C85,25 75,35 80,45" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" className="animate-cat-tail" />
          <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
          <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
          {/* МОРГАЮЩИЕ ГЛАЗА */}
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
          <path d="M32,58 L12,55 M32,62 L8,62 M32,66 L12,69" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
          <path d="M68,58 L88,55 M68,62 L92,62 M68,66 L88,69" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  </div>
);

// --- СТИКЕРЫ ЧАТА ---
const CatMuzzleS = ({ color = "#D4AF37" }) => (
  <>
    <path d="M48,64 L52,64 L50,68 Z" fill="#F9F1D8" />
    <path d="M50,68 Q47,72 43,70 M50,68 Q53,72 57,70" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </>
);

const StickerLove = () => (
  <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
      <motion.path d="M68,65 C80,65 90,50 85,35 C80,20 70,30 75,40" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-5, 10, -5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <motion.path d="M33 48 C33 44 38 41 41 45 C44 41 49 44 49 48 C49 52 41 58 41 58 C41 58 33 52 33 48 Z" fill="#ff4d4d" animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ transformOrigin: "41px 49px" }} />
      <motion.path d="M51 48 C51 44 56 41 59 45 C62 41 67 44 67 48 C67 52 59 58 59 58 C59 58 51 52 51 48 Z" fill="#ff4d4d" animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} style={{ transformOrigin: "59px 49px" }} />
      <CatMuzzleS />
      <circle cx="34" cy="60" r="3.5" fill="#ff4d4d" opacity="0.5" />
      <circle cx="66" cy="60" r="3.5" fill="#ff4d4d" opacity="0.5" />
      <ellipse cx="38" cy="78" rx="7" ry="5" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <ellipse cx="62" cy="78" rx="7" ry="5" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  </motion.div>
);

const StickerJoy = () => (
  <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path d="M68,65 C80,65 90,50 85,35" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 0.3 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M34,51 Q39,44 44,51 M56,51 Q61,44 66,51" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M45,63 Q50,73 55,63 Z" fill="#D4AF37" />
      <circle cx="33" cy="58" r="3" fill="#ff4d4d" opacity="0.4" />
      <circle cx="67" cy="58" r="3" fill="#ff4d4d" opacity="0.4" />
      <motion.ellipse cx="28" cy="55" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-30 28 55)" animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5 }} />
      <motion.ellipse cx="72" cy="55" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(30 72 55)" animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} />
      <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, 90, 180] }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles className="text-[#D4AF37] absolute top-1 left-2" size={14} /></motion.g>
      <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [180, 90, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}><Sparkles className="text-[#D4AF37] absolute top-3 right-1" size={12} /></motion.g>
    </svg>
  </motion.div>
);

const StickerFear = () => (
  <motion.div animate={{ x: [-2, 2, -2], y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 0.08 }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M68,65 L75,55 L85,60 L90,40" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25,48 Q40,15 50,42 Z" fill="#D4AF37" /><path d="M75,48 Q60,15 50,42 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="39" cy="53" r="8" fill="#fff" />
      <circle cx="61" cy="53" r="8" fill="#fff" />
      <motion.circle cx="39" cy="53" r="2" fill="#000" animate={{ x: [-1, 1, -1], y: [1, -1, 1] }} transition={{ repeat: Infinity, duration: 0.1 }} />
      <motion.circle cx="61" cy="53" r="2" fill="#000" animate={{ x: [1, -1, 1], y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 0.1 }} />
      <circle cx="50" cy="68" r="3" fill="#D4AF37" />
      <path d="M34,42 L44,39 M66,42 L56,39" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="44" cy="70" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(30 44 70)" />
      <ellipse cx="56" cy="70" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-30 56 70)" />
    </svg>
  </motion.div>
);

const StickerCry = () => (
  <motion.div animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path d="M68,65 C75,70 85,75 85,85" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.2 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      
      <path d="M33,48 L39,52 L33,56" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M67,48 L61,52 L67,56" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      <motion.path d="M36,54 Q20,40 10,70" stroke="#4dabff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 8" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} />
      <motion.circle cx="36" cy="54" r="2.5" fill="#4dabff" animate={{ cx: [36, 20, 10], cy: [54, 45, 75], scale: [1, 1.5, 0] }} transition={{ repeat: Infinity, duration: 0.7, ease: "easeOut" }} />
      <motion.circle cx="36" cy="54" r="2" fill="#4dabff" animate={{ cx: [36, 25, 12], cy: [54, 35, 65], scale: [1, 1.2, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeOut", delay: 0.2 }} />
      
      <motion.path d="M64,54 Q80,40 90,70" stroke="#4dabff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="4 8" animate={{ strokeDashoffset: [-24, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} />
      <motion.circle cx="64" cy="54" r="2.5" fill="#4dabff" animate={{ cx: [64, 80, 90], cy: [54, 45, 75], scale: [1, 1.5, 0] }} transition={{ repeat: Infinity, duration: 0.7, ease: "easeOut", delay: 0.1 }} />
      <motion.circle cx="64" cy="54" r="2" fill="#4dabff" animate={{ cx: [64, 75, 88], cy: [54, 35, 65], scale: [1, 1.2, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeOut", delay: 0.3 }} />
      
      <ellipse cx="50" cy="65" rx="3.5" ry="4.5" fill="#ff4d4d" />
      
      <motion.ellipse cx="36" cy="60" rx="5" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" animate={{ y: [-2, 2, -2], rotate: [-20, -30, -20] }} transition={{ repeat: Infinity, duration: 0.4 }} style={{ transformOrigin: "36px 60px" }} />
      <motion.ellipse cx="64" cy="60" rx="5" ry="6" fill="#000" stroke="#D4AF37" strokeWidth="1.5" animate={{ y: [-2, 2, -2], rotate: [20, 30, 20] }} transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} style={{ transformOrigin: "64px 60px" }} />
    </svg>
  </motion.div>
);

const StickerZen = () => (
  <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M68,65 C90,70 90,85 70,85 C60,85 50,80 40,80" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
      <motion.circle cx="50" cy="58" r="34" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="3" strokeDasharray="15 10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "50px 58px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M34,51 Q39,54 44,51 M56,51 Q61,54 66,51" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" />
      <motion.circle cx="50" cy="42" r="2" fill="#fff" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 0 4px #ffffff)" }} />
      <path d="M46,65 Q50,68 54,65" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="46" cy="74" rx="5" ry="4" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(30 46 74)" />
      <ellipse cx="54" cy="74" rx="5" ry="4" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-30 54 74)" />
    </svg>
  </motion.div>
);

const StickerMagic = () => (
  <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(147,112,219,0.5)]">
      <motion.path d="M68,65 C80,60 90,70 85,50 C80,30 95,30 90,20" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      
      {/* Моргающие глазки */}
      <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }} style={{ transformOrigin: "40px 52px" }}>
        <circle cx="40" cy="52" r="4" fill="#D4AF37" />
      </motion.g>
      <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }} style={{ transformOrigin: "60px 52px" }}>
        <circle cx="60" cy="52" r="4" fill="#D4AF37" />
      </motion.g>

      <CatMuzzleS />
      <motion.circle cx="50" cy="80" r="10" fill="#9370DB" animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      <circle cx="50" cy="80" r="6" fill="#E6E6FA" opacity="0.9" />
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} style={{ transformOrigin: "50px 80px" }}>
         <path d="M50,64 L51,68 L55,69 L51,70 L50,74 L49,70 L45,69 L49,68 Z" fill="#fff" />
         <path d="M50,86 L51,90 L55,91 L51,92 L50,96 L49,92 L45,91 L49,90 Z" fill="#fff" />
      </motion.g>
      <ellipse cx="38" cy="74" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(45 38 74)" />
      <ellipse cx="62" cy="74" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-45 62 74)" />
    </svg>
  </motion.div>
);

const StickerAngry = () => (
  <motion.div animate={{ x: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 0.1 }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,77,77,0.4)]">
      <motion.path d="M68,65 Q85,50 85,30" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 0.3 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M33,48 L45,52 L33,54 Z" fill="#ff4d4d" />
      <path d="M67,48 L55,52 L67,54 Z" fill="#ff4d4d" />
      <path d="M32,45 L46,50 M68,45 L54,50" stroke="#ff4d4d" strokeWidth="2.5" strokeLinecap="round" />
      <CatMuzzleS />
      <motion.path d="M22,46 Q18,36 22,26" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" animate={{ y: [-2, -8], opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
      <motion.path d="M78,46 Q82,36 78,26" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" animate={{ y: [-2, -8], opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} />
      <ellipse cx="35" cy="78" rx="7" ry="5" fill="#000" stroke="#ff4d4d" strokeWidth="1.5" />
      <ellipse cx="65" cy="78" rx="7" ry="5" fill="#000" stroke="#ff4d4d" strokeWidth="1.5" />
    </svg>
  </motion.div>
);

const StickerCool = () => (
  <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path d="M68,65 C80,65 90,50 85,35 C80,20 70,30 75,40" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <CatMuzzleS />
      <path d="M46,67 Q50,69 56,65" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <g>
        <path d="M25,50 Q30,46 45,48 L45,56 Q35,63 25,56 Z" fill="#222" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M75,50 Q70,46 55,48 L55,56 Q65,63 75,56 Z" fill="#222" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M45,48 Q50,46 55,48" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <path d="M28,52 L35,52 L32,58 Z" fill="#fff" opacity="0.4" />
        <path d="M58,52 L65,52 L62,58 Z" fill="#fff" opacity="0.4" />
      </g>
      <ellipse cx="38" cy="76" rx="7" ry="5" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <ellipse cx="72" cy="53" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-30 72 53)" />
    </svg>
  </motion.div>
);

const StickerSleep = () => (
  <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M68,65 C90,70 90,85 70,85 C60,85 40,85 30,80" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M34,53 Q39,56 44,53 M56,53 Q61,56 66,53" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <CatMuzzleS />
      <motion.text x="65" y="35" fill="#fff" fontSize="12" fontWeight="bold" opacity="0.8" animate={{ y: [35, 15], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 1.8] }} transition={{ repeat: Infinity, duration: 2.5 }}>Z</motion.text>
      <motion.text x="75" y="25" fill="#fff" fontSize="10" fontWeight="bold" opacity="0.8" animate={{ y: [25, 5], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 1.5] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1.2 }}>z</motion.text>
      <ellipse cx="44" cy="75" rx="7" ry="4" fill="#000" stroke="#D4AF37" strokeWidth="1" />
      <ellipse cx="56" cy="75" rx="7" ry="4" fill="#000" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  </motion.div>
);

const StickerStar = () => (
  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-20 h-20 relative flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path d="M68,65 Q90,65 90,45" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ transformOrigin: "68px 65px" }} />
      <path d="M28,40 Q40,0 52,40 Z" fill="#D4AF37" /><path d="M72,40 Q60,0 48,40 Z" fill="#D4AF37" />
      <circle cx="50" cy="58" r="26" fill="#000" stroke="#D4AF37" strokeWidth="1.5" />
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ transformOrigin: "39px 52px" }}>
        <path d="M39,45 L41,50 L46,50 L42,53 L44,58 L39,55 L34,58 L36,53 L32,50 L37,50 Z" fill="#ffeb3b" />
      </motion.g>
      <motion.g animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ transformOrigin: "61px 52px" }}>
        <path d="M61,45 L63,50 L68,50 L64,53 L66,58 L61,55 L56,58 L58,53 L54,50 L59,50 Z" fill="#ffeb3b" />
      </motion.g>
      <CatMuzzleS />
      <ellipse cx="50" cy="68" rx="3.5" ry="5.5" fill="#ff4d4d" />
      <ellipse cx="32" cy="62" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(-20 32 62)" />
      <ellipse cx="68" cy="62" rx="5" ry="7" fill="#000" stroke="#D4AF37" strokeWidth="1.5" transform="rotate(20 68 62)" />
    </svg>
  </motion.div>
);

const STICKERS_MAP = { 
  love: StickerLove, 
  joy: StickerJoy, 
  fear: StickerFear, 
  cry: StickerCry, 
  zen: StickerZen,
  magic: StickerMagic,
  angry: StickerAngry,
  cool: StickerCool,
  sleep: StickerSleep,
  star: StickerStar
};

const STICKERS_LIST = [
  { id: 'love', label: 'Любовь' },
  { id: 'joy', label: 'Ура!' },
  { id: 'fear', label: 'Ой!' },
  { id: 'cry', label: 'Грусть' },
  { id: 'zen', label: 'Дзен' },
  { id: 'magic', label: 'Магия' },
  { id: 'angry', label: 'Злость' },
  { id: 'cool', label: 'Круто' },
  { id: 'sleep', label: 'Сплю' },
  { id: 'star', label: 'Вау!' }
];

// --- ОСНОВНОЙ КОМПОНЕНТ ---

export default function App() {
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('loading'); 
  const [phone, setPhone] = useState('');
  const [clientOtp, setClientOtp] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientGender, setClientGender] = useState('female'); 
  const [masterPass, setMasterPass] = useState('');
  const [toasts, setToasts] = useState([]);
  const [clientHasNotification, setClientHasNotification] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingForm, setBookingForm] = useState({ service: '', date: getTodayDateString(), time: '' });
  
  // --- СОСТОЯНИЯ АРХИВА И АНИМАЦИИ ---
  const [selectedArchiveBooking, setSelectedArchiveBooking] = useState(null);
  const [archiveMessages, setArchiveMessages] = useState([]);
  const [sessionEndingOverlay, setSessionEndingOverlay] = useState(false);
  
  // --- СОСТОЯНИЯ ДОНАТА ---
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // --- СОСТОЯНИЕ ПОДДЕРЖКИ ---
  const [showSupportModal, setShowSupportModal] = useState(false);

  const upcomingDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);
  
  const formatDayOfWeek = (date) => date.toLocaleDateString('ru-RU', { weekday: 'short' });
  const formatShortDate = (date) => {
    const d = date.getDate();
    const m = date.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '');
    return `${d} ${m}`;
  };
  const formatDateString = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const lastPendingCountRef = useRef(null);
  const chatEndRef = useRef(null);
  const audioCtxRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevActiveBookingRef = useRef(null);

  const playSound = async (type = 'click') => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      const now = ctx.currentTime;
      const playTone = (freq, delay, duration, vol = 0.1) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(vol, now + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + delay); osc.stop(now + delay + duration);
      };
      if (type === 'notification') {
        playTone(1318.51, 0, 1.2, 0.15); playTone(1760.00, 0.15, 1.0, 0.12); playTone(2637.02, 0.3, 0.8, 0.1);
      } else {
        playTone(2200, 0, 0.05, 0.06);
      }
    } catch (e) {}
  };

  const triggerMagicAlert = (message) => {
    playSound('notification');
    const newToast = { id: Date.now(), message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== newToast.id)), 8000);
  };

  const handleInteraction = () => playSound('click');

  // --- АВТОРИЗАЦИЯ ИЗ ПАМЯТИ ---
  useEffect(() => {
    const role = localStorage.getItem('tarot_role');
    if (role === 'admin') {
      setUser({ role: 'admin', phone: 'Master', name: 'Мастер Соул' });
      setView('home');
    } else if (role === 'client') {
      const savedPhone = localStorage.getItem('tarot_phone');
      const savedName = localStorage.getItem('tarot_name');
      const savedGender = localStorage.getItem('tarot_gender');
      if (savedPhone && savedName) {
        setUser({ role: 'client', phone: savedPhone, name: savedName, gender: savedGender || 'female' });
        setPhone(savedPhone);
        setView('home');
      } else {
        setView('login-choice');
      }
    } else {
      setView('login-choice');
    }
  }, []);

  // --- REAL-TIME ЗАЯВКИ (Supabase) ---
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      
      if (!error && data) {
        const sorted = data.map(d => ({
          id: d.id,
          clientPhone: d.client_phone,
          clientName: d.client_name,
          clientGender: d.client_gender,
          service: d.service,
          date: d.date,
          time: d.time,
          status: d.status,
          createdAt: new Date(d.created_at).getTime(),
          hasUnreadMaster: d.has_unread_master
        })).sort((a, b) => b.createdAt - a.createdAt);

        setAllBookings(sorted);

        if (user.role === 'admin') {
          const pendingCount = sorted.filter(b => b.status === 'pending').length;
          if (lastPendingCountRef.current === null) {
            if (pendingCount > 0) setTimeout(() => triggerMagicAlert(`Вас ожидают души: ${pendingCount} новых заявок! ✨`), 1200);
          } else if (pendingCount > lastPendingCountRef.current) {
            triggerMagicAlert(`Поток энергий: Новая заявка на расклад! ✨`);
          }
          lastPendingCountRef.current = pendingCount;
        }

        if (user.role === 'client') {
          const active = sorted.find(b => b.clientPhone === user.phone && b.status !== 'completed');
          const prev = prevActiveBookingRef.current;

          if (prev && !active) {
            setSessionEndingOverlay(true);
            setClientHasNotification(false);
            playSound('notification');
            prevActiveBookingRef.current = null;
          } else if (active) {
            if (active.status === 'confirmed' && (!prev || prev.status === 'pending')) {
              triggerMagicAlert(`Запись подтверждена! Мастер ждет вас ${formatReadableDate(active.date)} в ${active.time}! ✅`);
              setClientHasNotification(true);
            }
            setActiveChatBooking(active);
            prevActiveBookingRef.current = active;
          } else {
            prevActiveBookingRef.current = null;
          }
        }
      }
    };

    fetchBookings();
    const channel = supabase.channel('bookings_changes').on('postgres_changes', { event: '*', table: 'bookings' }, () => {
      fetchBookings();
    }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user?.role, user?.phone]);

  // --- REAL-TIME ЧАТ (Supabase) ---
  useEffect(() => {
    if (!activeChatBooking?.id || !user) return;
    
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').eq('booking_id', activeChatBooking.id).order('timestamp', { ascending: true });
      if (data) {
        const msgs = data.map(m => ({
          id: m.id, text: m.text, imageUrl: m.image_url, stickerId: m.sticker_id, sender: m.sender, time: m.time, timestamp: m.timestamp
        }));
        setMessages(msgs);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    };

    fetchMessages();

    const channel = supabase.channel(`chat_${activeChatBooking.id}`).on('postgres_changes', { event: 'INSERT', table: 'messages', filter: `booking_id=eq.${activeChatBooking.id}` }, (payload) => {
      const m = payload.new;
      const newMsg = { id: m.id, text: m.text, imageUrl: m.image_url, stickerId: m.sticker_id, sender: m.sender, time: m.time, timestamp: m.timestamp };
      
      setMessages(prev => {
        if (prev.find(x => x.id === newMsg.id)) return prev;
        const newArr = [...prev, newMsg];
        if (newMsg.sender !== (user.role === 'admin' ? 'master' : 'user')) {
           playSound('notification');
        }
        return newArr;
      });
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeChatBooking?.id, user?.role]);

  // --- АРХИВ ЧАТОВ (Supabase) ---
  useEffect(() => {
    if (!selectedArchiveBooking?.id || view !== 'archive-chat') return;
    
    const fetchArchive = async () => {
      const { data } = await supabase.from('messages').select('*').eq('booking_id', selectedArchiveBooking.id).order('timestamp', { ascending: true });
      if (data) {
        const msgs = data.map(m => ({
          id: m.id, text: m.text, imageUrl: m.image_url, stickerId: m.sticker_id, sender: m.sender, time: m.time, timestamp: m.timestamp
        }));
        setArchiveMessages(msgs);
      }
    };
    fetchArchive();
  }, [selectedArchiveBooking?.id, view]);

  const handleLogout = () => {
    handleInteraction();
    localStorage.removeItem('tarot_role');
    localStorage.removeItem('tarot_phone');
    localStorage.removeItem('tarot_name');
    localStorage.removeItem('tarot_gender');
    
    setUser(null);
    setPhone('');
    setClientName('');
    setActiveChatBooking(null);
    setClientHasNotification(false);
    setMessages([]);
    setSelectedArchiveBooking(null);
    setArchiveMessages([]);
    lastPendingCountRef.current = null;
    setView('login-choice');
  };

  const handleMasterLogin = async () => {
    await playSound('click');
    if (masterPass === MASTER_SECRET_CODE) {
      localStorage.setItem('tarot_role', 'admin');
      setUser({ role: 'admin', phone: 'Master', name: 'Мастер Соул' });
      setView('home');
      setMasterPass('');
    } else {
      triggerMagicAlert("Доступ закрыт 🔒");
    }
  };

  const handleVerifyPhone = () => {
    handleInteraction();
    if (!phone.trim()) return;
    setView('login-client-otp');
  };

  const handleVerifyOtp = async () => {
    handleInteraction();
    if (!phone.trim()) return;
    const safePhone = phone.replace(/[^0-9+a-zA-Z]/g, '');

    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('phone', safePhone).single();
      if (data) {
        localStorage.setItem('tarot_role', 'client');
        localStorage.setItem('tarot_phone', safePhone);
        localStorage.setItem('tarot_name', data.name);
        localStorage.setItem('tarot_gender', data.gender);
        setUser({ role: 'client', phone: safePhone, name: data.name, gender: data.gender });
        setView('home');
      } else {
        setView('login-client-details');
      }
    } catch(e) {
      setView('login-client-details');
    }
  };

  const handleCompleteRegistration = async () => {
    if (!clientName.trim()) return;
    handleInteraction();
    
    const safePhone = phone.replace(/[^0-9+a-zA-Z]/g, '');
    const profileData = { phone: safePhone, name: clientName, gender: clientGender };
    
    try {
      await supabase.from('profiles').upsert(profileData);
      
      localStorage.setItem('tarot_role', 'client');
      localStorage.setItem('tarot_phone', safePhone);
      localStorage.setItem('tarot_name', clientName);
      localStorage.setItem('tarot_gender', clientGender);
      
      setUser({ role: 'client', phone: safePhone, ...profileData });
      setView('home');
    } catch (e) {}
  };

  const submitBooking = async () => {
    if (!bookingForm.time || !user) return;
    handleInteraction();
    const newB = { 
      client_phone: user.phone, 
      client_name: user.name, 
      client_gender: user.gender, 
      service: bookingForm.service, 
      date: bookingForm.date, 
      time: bookingForm.time, 
      status: 'pending', 
      created_at: new Date().toISOString(), 
      has_unread_master: false 
    };
    await supabase.from('bookings').insert(newB);
    triggerMagicAlert("Заявка отправлена! Ожидайте сигнал ✨"); setView('home');
  };

  const confirmBooking = async (bookingId) => { 
    handleInteraction(); 
    await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', bookingId); 
  };

  const endSession = async (bookingId) => {
    handleInteraction();
    await supabase.from('bookings').update({ status: 'completed' }).eq('id', bookingId);
    
    // Показываем красивую анимацию завершения для Мастера до ручного закрытия
    setSessionEndingOverlay(true);
    playSound('notification');
  };

  const sendMessage = async (text = '', imageUrl = null, stickerId = null) => {
    if ((!text.trim() && !imageUrl && !stickerId) || !activeChatBooking) return;
    handleInteraction();
    const isFromMaster = user.role === 'admin';
    const msg = { 
      booking_id: activeChatBooking.id, 
      text, 
      image_url: imageUrl, 
      sticker_id: stickerId, 
      sender: isFromMaster ? 'master' : 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      timestamp: Date.now() 
    };
    await supabase.from('messages').insert(msg);
    if (!isFromMaster) await supabase.from('bookings').update({ has_unread_master: true }).eq('id', activeChatBooking.id);
    setNewMessage(''); setShowStickerPicker(false);
  };

  const openChatAsMaster = async (booking) => {
    handleInteraction();
    await supabase.from('bookings').update({ has_unread_master: false }).eq('id', booking.id);
    setActiveChatBooking(booking);
    setView('chat');
  };

  const handleCopyDonate = () => {
    handleInteraction();
    const textArea = document.createElement("textarea");
    textArea.value = "5599002127322628";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования', err);
    }
    document.body.removeChild(textArea);
  };

  const handleSupportEmail = () => {
    handleInteraction();
    window.open('mailto:cool.pauk2302@gmail.com', '_blank');
    
    const textArea = document.createElement("textarea");
    textArea.value = "cool.pauk2302@gmail.com";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      triggerMagicAlert('Email скопирован в буфер обмена ✉️');
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => sendMessage('', ev.target.result); reader.readAsDataURL(file); } };

  if (view === 'loading') {
      return <div className="fixed inset-0 flex items-center justify-center"><StarryBackground /><div className="relative z-10"><GoldenCatFamiliar /></div></div>;
  }

  return (
    <div className="fixed inset-0 bg-[#060608] flex items-center justify-center overflow-hidden font-sans text-white text-center">
      <AnimatePresence>{toasts.map(toast => (<NotificationUI key={toast.id} toast={toast} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />))}</AnimatePresence>
      <div className="w-full h-[100dvh] max-w-md flex flex-col relative shadow-2xl overflow-hidden border-x border-white/5 text-center">
        <StarryBackground />
        {user && (
          <header className={`px-5 py-5 flex justify-between items-center backdrop-blur-2xl border-b flex-shrink-0 z-50 ${user.role === 'admin' ? 'bg-[#d4af37]/10 border-[#d4af37]/20' : 'bg-[#0d0d12]/95 border-white/[0.03]'}`}>
            <div className="flex items-center gap-4 text-left">
              {view !== 'home' && <button onClick={() => { handleInteraction(); if (view === 'chat' && user.role === 'admin') setView('admin-requests'); else if (view === 'archive-chat') setView(user.role === 'admin' ? 'admin-archive-list' : 'archive-list'); else if (view === 'admin-archive-list') setView('home'); else setView('home'); }} className="p-1 -ml-1 text-[#d4af37] active:scale-125 transition-transform"><ChevronLeft size={24} /></button>}
              <div className="flex flex-col text-left"><h1 className="text-[#d4af37] font-extralight tracking-[0.4em] uppercase text-[10px]">Tarot Soul</h1><div className="flex items-center gap-2 mt-0.5"><span className="text-[6px] text-[#d4af37]/60 uppercase tracking-[0.2em] font-bold italic text-center text-left">Связь с Мастером</span></div></div>
            </div>
            <div className="flex items-center gap-1 text-center">
               <button onClick={() => { handleInteraction(); setShowSupportModal(true); }} className="text-white/20 hover:text-[#d4af37] p-2 transition-colors active:scale-90" title="Сообщить о проблеме">
                 <Bug size={16} />
               </button>
               <button onClick={() => { handleInteraction(); if (user.role === 'admin') setView('admin-requests'); else if (activeChatBooking?.status === 'confirmed') setShowClientInfo(true); else triggerMagicAlert(activeChatBooking ? "Мастер скоро подтвердит вашу запись ✨" : "Сначала запишитесь на сеанс ✨"); setClientHasNotification(false); }} className="text-[#d4af37] p-2 relative">
                  <BellRing size={20} className={(user.role === 'admin' && allBookings.some(b => b.status === 'pending' || b.hasUnreadMaster)) || clientHasNotification ? 'animate-bounce' : ''} />
                  {((user.role === 'admin' && allBookings.some(b => b.status === 'pending' || b.hasUnreadMaster)) || clientHasNotification) && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] border border-[#0d0d12]"></span>}
               </button>
               <button onClick={handleLogout} className="text-white/10 hover:text-[#ff4d4d] p-2 transition-colors active:scale-90"><LogOut size={18} /></button>
            </div>
          </header>
        )}
        <main className="flex-1 relative w-full overflow-hidden flex flex-col text-center">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center overflow-y-auto bg-transparent z-10">
                <div className="mb-6 pt-10 text-center"><GoldenCatFamiliar /></div>
                <div className="w-full space-y-6 text-center">
                  <h1 className="text-3xl font-extralight text-[#d4af37] tracking-[0.5em] uppercase font-serif">Tarot Soul</h1>
                  {view === 'login-choice' ? (
                    <>
                      <button onClick={() => { handleInteraction(); setView('login-phone'); }} className="w-full bg-[#d4af37] text-black font-bold py-6 rounded-[30px] shadow-xl uppercase text-xs active:scale-95 italic tracking-widest">Я Клиент</button>
                      <button onClick={() => { handleInteraction(); setView('login-master'); }} className="w-full bg-white/[0.03] text-white/30 py-5 rounded-[30px] border border-white/5 uppercase text-[9px] tracking-[0.3em]">Мастер-вход</button>
                    </>
                  ) : view === 'login-phone' ? (
                    <div className="text-left space-y-6 px-4">
                      <button onClick={() => setView('login-choice')} className="text-[#d4af37] text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4"><ChevronLeft size={14} /> Назад</button>
                      <div className="bg-[#16161f] rounded-3xl p-6 border border-white/5 flex items-center shadow-2xl focus-within:border-[#d4af37]/30 transition-all text-white">
                        <Phone size={18} className="text-[#d4af37] mr-4 opacity-40" />
                        <input type="tel" placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent border-none outline-none w-full text-lg font-light text-white text-left" />
                      </div>
                      <button onClick={handleVerifyPhone} className="w-full bg-[#d4af37] text-black font-bold py-5 rounded-[28px] uppercase text-xs active:scale-95 shadow-lg">Далее</button>
                    </div>
                  ) : view === 'login-client-otp' ? (
                    <div className="text-left space-y-6 px-4">
                      <button onClick={() => setView('login-phone')} className="text-[#d4af37] text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4"><ChevronLeft size={14} /> Назад</button>
                      <div className="bg-[#16161f] rounded-3xl p-6 border border-[#d4af37]/20 flex items-center shadow-2xl text-white">
                        <ShieldCheck size={18} className="text-[#d4af37] mr-4 opacity-40" />
                        <input type="text" placeholder="****" value={clientOtp} onChange={(e) => setClientOtp(e.target.value)} className="bg-transparent border-none outline-none w-full text-2xl font-light text-[#d4af37] tracking-[0.5em] text-center" />
                      </div>
                      <button onClick={handleVerifyOtp} className="w-full bg-white text-black font-bold py-5 rounded-[28px] uppercase text-xs active:scale-95">Далее</button>
                    </div>
                  ) : view === 'login-client-details' ? (
                    <div className="text-center space-y-6 px-4">
                      <h2 className="text-lg font-light uppercase tracking-widest text-[#d4af37]">Ваше Имя</h2>
                      <div className="bg-[#16161f] rounded-3xl p-6 border border-white/5 flex items-center shadow-2xl text-white">
                        <input type="text" placeholder="Введите имя" value={clientName} onChange={(e) => setClientName(e.target.value)} className="bg-transparent border-none outline-none w-full text-lg font-light tracking-widest text-white text-center" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setClientGender('female')} className={`p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all ${clientGender === 'female' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'bg-[#16161f] border-white/5 text-white/30'}`}><VenusIcon size={24} className={clientGender === 'female' ? 'text-[#d4af37]' : 'text-white/30'} /> <span className="text-[10px] uppercase tracking-widest">Женщина</span></button>
                        <button onClick={() => setClientGender('male')} className={`p-5 rounded-3xl border flex flex-col items-center gap-2 transition-all ${clientGender === 'male' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'bg-[#16161f] border-white/5 text-white/30'}`}><MarsIcon size={24} className={clientGender === 'male' ? 'text-[#d4af37]' : 'text-white/30'} /> <span className="text-[10px] uppercase tracking-widest">Мужчина</span></button>
                      </div>
                      <button onClick={handleCompleteRegistration} className="w-full bg-[#d4af37] text-black font-bold py-5 rounded-[28px] uppercase text-xs active:scale-95 shadow-xl">Завершить</button>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 px-4">
                      <button onClick={() => setView('login-choice')} className="text-[#d4af37] text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4"><ChevronLeft size={14} /> Назад</button>
                      <div className="bg-[#16161f] rounded-3xl p-6 border border-[#d4af37]/20 shadow-2xl text-white">
                        <h2 className="text-sm font-light uppercase tracking-widest text-white/60 mb-4 flex items-center justify-center gap-2"><KeyRound size={16}/> МАСТЕР-КЛЮЧ</h2>
                        <input type="password" placeholder="****" value={masterPass} onChange={(e) => setMasterPass(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleMasterLogin()} className="bg-transparent border-none outline-none w-full text-center text-4xl font-light tracking-[0.5em] text-[#d4af37]" />
                      </div>
                      <button onClick={handleMasterLogin} className="w-full bg-white text-black font-bold py-5 rounded-[28px] active:scale-95 shadow-xl uppercase">Активировать</button>
                    </div>
                  )}
                </div>
                
                {/* ССЫЛКА НА ПОДДЕРЖКУ (Экран входа) */}
                <div className="w-full flex justify-center pb-4 mt-12">
                  <button onClick={() => { handleInteraction(); setShowSupportModal(true); }} className="text-[9px] text-white/30 hover:text-white/60 uppercase tracking-widest font-mono transition-colors flex items-center gap-1.5">
                    <Bug size={10} />
                    Сообщить о проблеме
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col w-full overflow-hidden bg-transparent text-center z-10">
                {view === 'home' && (
                  <div className="flex-1 flex flex-col items-center pt-28 p-6 space-y-12 w-full overflow-y-auto text-center">
                    <GoldenCatFamiliar />
                    <div className="text-center space-y-4 px-4 text-center text-center"><h2 className="text-xl font-light uppercase tracking-[0.3em] text-white/90 text-center text-center">Привет, {user.name}</h2><p className="text-[#d4af37]/60 text-[9px] font-bold leading-relaxed max-w-[220px] mx-auto tracking-[0.2em] uppercase text-center text-center">{user.role === 'admin' ? `Ожидающих энергий: ${allBookings.filter(b => b.status === 'pending').length}` : activeChatBooking?.status === 'confirmed' ? "Ваш сеанс подтвержден. Чат открыт." : activeChatBooking?.status === 'pending' ? "Заявка на рассмотрении. Ожидайте ✨" : "Выберите направление."}</p></div>
                    <div className="w-full space-y-4 px-6 pb-12 text-center">
                      <button onClick={() => { handleInteraction(); if (user.role === 'admin') setView('admin-requests'); else if (activeChatBooking?.status === 'confirmed') setView('chat'); else triggerMagicAlert(activeChatBooking ? "Мастер скоро подтвердит вашу запись ✨" : "Сначала запишитесь на сеанс ✨"); }} className={`w-full p-8 rounded-[45px] flex flex-col items-center gap-4 active:scale-[0.97] transition-all shadow-xl group relative overflow-hidden ${(user.role === 'admin' || activeChatBooking?.status === 'confirmed') ? 'bg-gradient-to-tr from-[#16161f] to-[#1a1a24] border border-[#d4af37]/40 shadow-[#d4af37]/10' : 'bg-[#16161f] border border-white/5 opacity-50'}`}><div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors ${(user.role === 'admin' || activeChatBooking?.status === 'confirmed') ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20' : 'bg-white/5 text-white/20 border-white/5'}`}>{user.role !== 'admin' && (!activeChatBooking || activeChatBooking.status === 'pending') ? <Lock size={20} className="text-[#d4af37]/40" /> : <MessageCircle size={24} />}</div><span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${(user.role === 'admin' || activeChatBooking?.status === 'confirmed') ? 'text-white' : 'text-white/20'}`}>Чат с Мастером</span></button>
                      <div className="grid grid-cols-2 gap-3 w-full text-center text-center"><button onClick={() => { handleInteraction(); if (user.role === 'admin') setView('admin-requests'); else if (activeChatBooking?.status === 'confirmed') setShowClientInfo(true); else setView('booking-service'); }} className={`p-5 rounded-[28px] flex flex-col items-center gap-2 active:scale-[0.95] transition-all border text-center ${user.role === 'admin' ? 'bg-[#d4af37]/10 border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : (activeChatBooking ? 'bg-[#16161f] border-white/5 opacity-50' : 'bg-gradient-to-tr from-[#1a1a24] to-[#252535] border-[#d4af37]/30')}`}>{activeChatBooking?.status === 'confirmed' ? <Sparkles size={20} className="text-[#d4af37] animate-pulse" /> : <CalendarIcon size={20} className="text-[#d4af37]" />}<span className="text-[9px] uppercase tracking-widest text-white/70 font-bold text-center text-center">{user.role === 'admin' ? 'Очередь' : (activeChatBooking ? 'Записано' : 'Записаться')}</span></button><button onClick={() => { handleInteraction(); setShowDonateModal(true); }} className="bg-[#16161f] border border-[#ff4d4d]/10 p-5 rounded-[28px] flex flex-col items-center gap-2 active:scale-[0.95] text-center text-center text-center"><Heart size={20} className="text-[#ff4d4d] mx-auto opacity-50" fill="#ff4d4d10" /><span className="text-[9px] uppercase tracking-widest text-white/70 font-bold text-center text-center">Донат</span></button></div>
                      
                      {user.role === 'client' && allBookings.some(b => b.clientPhone === user.phone && b.status === 'completed') && (
                        <button onClick={() => { handleInteraction(); setView('archive-list'); }} className="w-full bg-[#16161f] border border-[#d4af37]/20 p-5 rounded-[28px] flex justify-between items-center active:scale-[0.97] transition-all shadow-xl mt-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                              <Archive size={18} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">Архив сеансов</span>
                          </div>
                          <ChevronRight size={16} className="text-[#d4af37]/50" />
                        </button>
                      )}

                      {user.role === 'admin' && allBookings.some(b => b.status === 'completed') && (
                        <button onClick={() => { handleInteraction(); setView('admin-archive-list'); }} className="w-full bg-[#16161f] border border-[#d4af37]/30 p-5 rounded-[28px] flex justify-between items-center active:scale-[0.97] transition-all shadow-xl mt-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                              <Archive size={18} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Архив всех сеансов</span>
                          </div>
                          <ChevronRight size={16} className="text-[#d4af37]/50" />
                        </button>
                      )}

                      {/* ССЫЛКА НА ПОДДЕРЖКУ (Скрытая, но доступная внизу) */}
                      <div className="pt-8 pb-2 w-full flex justify-center">
                        <button onClick={() => { handleInteraction(); setShowSupportModal(true); }} className="text-[9px] text-white/30 hover:text-white/60 uppercase tracking-widest font-mono transition-colors flex items-center gap-1.5">
                          <Bug size={10} />
                          Сообщить о проблеме
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {view === 'admin-requests' && (<div className="flex-1 overflow-y-auto p-5 w-full bg-transparent text-center text-center text-center text-center"><h2 className="text-lg font-light uppercase tracking-widest mb-6 text-[#d4af37] text-center font-mono italic text-center text-center text-center">Клиенты</h2><div className="space-y-4 pb-12 w-full text-center text-center text-center text-center text-center">{allBookings.filter(b => b.status !== 'completed').map(b => (<div key={b.id} className={`bg-[#16161f] border p-5 rounded-[30px] space-y-4 shadow-2xl relative text-center text-center ${b.status === 'confirmed' ? 'border-[#d4af37]/40' : 'border-[#d4af37]/10 animate-pulse'}`}><div className="flex justify-between items-start text-center text-left text-left text-left text-left text-left text-left"><div className="space-y-1"><div className="flex items-center gap-2 text-left text-left text-left text-left text-left"><div className="text-[#d4af37] text-sm font-bold uppercase tracking-widest font-mono text-left text-left text-left text-left">{b.clientName}</div>{b.clientGender === 'female' ? <VenusIcon size={12} className="text-[#ff4d4d]" /> : <MarsIcon size={12} className="text-[#4d94ff]" />}</div><div className="text-white/30 text-[9px] font-mono tracking-tighter text-left text-left text-left text-left">{b.clientPhone}</div><div className="text-white/80 text-[10px] uppercase font-light leading-tight text-left text-left text-left text-left">{b.service}</div></div><div className="text-[9px] text-white/20 text-right uppercase leading-tight font-light text-right text-right text-right text-right">{formatReadableDate(b.date)}<br/>{b.time}</div></div>
                {b.hasUnreadMaster && (<motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#ff4d4d]/10 px-3 py-1 rounded-full border border-[#ff4d4d]/30 text-center text-center text-center"><MessageSquareDot size={12} className="text-[#ff4d4d]" /><span className="text-[8px] text-[#ff4d4d] uppercase font-bold tracking-widest text-center text-center text-center">Пропущенное</span></motion.div>)}
                {b.status === 'pending' ? (<button onClick={() => confirmBooking(b.id)} className="w-full bg-[#d4af37] text-black text-[10px] font-bold py-3.5 rounded-2xl uppercase active:scale-95 shadow-lg text-center font-mono text-center text-center text-center">Принять сеанс</button>) : (<button onClick={() => openChatAsMaster(b)} className="w-full bg-[#1a1a24] text-[#d4af37] text-[10px] font-bold py-3 border border-[#d4af37]/30 rounded-2xl uppercase active:scale-95 flex items-center justify-center gap-2 font-bold text-center text-center text-center text-center text-center">Чат с Клиентом</button>)}</div>))}</div></div>)}
                {view === 'booking-service' && (<div className="flex-1 overflow-y-auto p-6 space-y-4 w-full text-center bg-transparent text-center text-center text-center text-center"><h2 className="text-lg font-light uppercase tracking-widest mb-6 text-center font-serif text-[#d4af37] text-center text-center text-center">Направление</h2>{['Расклад на любовь', 'Финансовый поток', 'Карта дня', 'Кельтский крест'].map(s => (<button key={s} onClick={() => { handleInteraction(); setBookingForm(prev => ({...prev, service: s})); setView('booking-datetime'); }} className="w-full bg-[#16161f] p-5 rounded-[22px] border border-white/5 flex justify-between items-center hover:border-[#d4af37]/30 transition-all text-white/80 text-left active:scale-95 shadow-xl text-center text-center text-center text-center text-center text-center"><span className="text-xs font-light uppercase tracking-widest text-center text-center text-center text-center">{s}</span><ChevronRight size={16} className="text-[#d4af37]/50" /></button>))}</div>)}
                
                {view === 'booking-datetime' && (
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 w-full text-center bg-transparent">
                    <h2 className="text-lg font-light uppercase tracking-widest font-mono italic text-[#d4af37]">Дата и Время</h2>
                    <div className="w-full space-y-6 text-center">
                      <div className="space-y-3 px-4">
                        <label className="text-[8px] uppercase tracking-widest text-white/20 font-mono">День приема</label>
                        <div className="grid grid-cols-3 gap-2">
                          {upcomingDates.map((date) => { 
                            const dateStr = formatDateString(date); 
                            const isSelected = bookingForm.date === dateStr; 
                            return (
                              <button key={dateStr} onClick={() => { handleInteraction(); setBookingForm(prev => ({...prev, date: dateStr, time: ''})); }} className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center font-mono ${isSelected ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#16161f] border-white/5 text-white/40 active:scale-95 hover:border-white/10'}`}>
                                <span className="text-[9px] uppercase font-bold mb-1 opacity-70">{formatDayOfWeek(date)}</span>
                                <span className={`text-[11px] font-bold ${isSelected ? 'text-black' : 'text-white'}`}>{formatShortDate(date)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="space-y-3 px-4">
                        <label className="text-[8px] uppercase tracking-widest text-white/20 font-mono">Доступное время</label>
                        <div className="grid grid-cols-3 gap-2 pb-6">
                          {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(t => { 
                            const status = checkSlotStatus(t, bookingForm.date); 
                            const isPassed = status === 'passed'; 
                            return (
                              <button key={t} disabled={isPassed} onClick={() => { handleInteraction(); setBookingForm(prev => ({...prev, time: t})); }} className={`p-3 rounded-xl border transition-all text-[9px] font-mono ${isPassed ? 'bg-white/5 text-white/10 opacity-30 cursor-not-allowed' : bookingForm.time === t ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-bold' : 'bg-[#16161f] border-white/5 text-white/40'}`}>
                                <span>{t}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <button onClick={submitBooking} className="w-full bg-[#d4af37] text-black font-bold py-5 rounded-[25px] shadow-2xl active:scale-95 transition-all uppercase text-xs mb-8 tracking-[0.2em] font-serif">Подтвердить запись</button>
                  </div>
                )}
                
                {view === 'chat' && activeChatBooking && (
                   <div className="flex-1 flex flex-col overflow-hidden text-white w-full bg-transparent relative text-center">
                     <div className="px-4 py-3 bg-black/50 border-b border-white/[0.05] text-[9px] text-[#d4af37] uppercase tracking-[0.2em] font-bold flex items-center justify-center z-10 relative">
                       <div className="flex items-center gap-2"><UserCircle size={14} /> {user.role === 'admin' ? `Диалог: ${activeChatBooking?.clientName}` : 'Чат с Мастером'}</div>
                       
                       {/* Кнопка "Завершить" для Мастера */}
                       {user.role === 'admin' && activeChatBooking && (
                         <button onClick={() => endSession(activeChatBooking.id)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full text-[7px] uppercase font-bold tracking-widest border border-red-500/30 active:scale-95">Завершить</button>
                       )}
                       
                       {/* Ненавязчивая кнопка "Донат" для Клиента прямо в чате */}
                       {user.role === 'client' && (
                         <button onClick={() => { handleInteraction(); setShowDonateModal(true); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[#ff4d4d] bg-[#ff4d4d]/10 px-3 py-1.5 rounded-full border border-[#ff4d4d]/20 active:scale-95 transition-all shadow-[0_0_10px_rgba(255,77,77,0.1)]">
                           <Heart size={10} fill="#ff4d4d" opacity={0.8} />
                           <span className="text-[7px] uppercase tracking-widest">Донат</span>
                         </button>
                       )}
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide px-4 py-6 z-10 text-center">
                       <div className="text-[8px] text-[#d4af37]/70 uppercase tracking-widest font-mono italic text-center mb-6">{activeChatBooking.service} • {formatReadableDate(activeChatBooking.date)} в {activeChatBooking.time}</div>
                       {messages.map(m => (
                         <div key={m.id} className={`flex ${m.sender === 'master' ? 'justify-start' : 'justify-end'}`}>
                           <div className={`max-w-[85%] p-4 rounded-[22px] shadow-[0_10px_40px_rgba(0,0,0,0.7)] ${m.sender === 'master' ? 'bg-[#1a1a24]/95 text-white rounded-tl-none border border-[#d4af37]/30 text-left' : 'bg-[#16161f]/95 text-white border border-white/10 rounded-tr-none shadow-lg text-left font-light'}`}>
                             {m.stickerId ? (
                               <div className="flex justify-center p-2 text-center">
                                 {(() => { const SIcon = STICKERS_MAP[m.stickerId]; return SIcon ? <SIcon /> : null; })()}
                               </div>
                             ) : m.imageUrl ? (
                               <img src={m.imageUrl} alt="Insight" className="w-full h-auto rounded-xl mb-2 border border-black/10 text-center" />
                             ) : (
                               <p className="text-[13px] font-light leading-relaxed italic text-left whitespace-pre-wrap break-words">{m.text}</p>
                             )}
                             <span className={`text-[7px] opacity-40 mt-2 block text-right font-mono uppercase ${m.sender === 'master' ? 'text-[#d4af37]' : 'text-white/50'}`}>{m.time}</span>
                           </div>
                         </div>
                       ))}
                       <div ref={chatEndRef} />
                     </div>
                     <div className="p-4 bg-black/70 border-t border-white/[0.05] flex-shrink-0 z-10 text-center">
                       <AnimatePresence>
                         {showStickerPicker && (
                           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="absolute bottom-20 left-4 right-4 bg-[#16161f]/95 border border-[#d4af37]/40 rounded-3xl p-4 shadow-2xl z-50 backdrop-blur-xl">
                             <div className="grid grid-cols-5 gap-y-4 gap-x-2">
                               {STICKERS_LIST.map(s => { 
                                 const SIcon = STICKERS_MAP[s.id]; 
                                 return (
                                   <button key={s.id} onClick={() => sendMessage('', null, s.id)} className="flex flex-col items-center gap-1 hover:bg-white/5 rounded-xl p-1 transition-colors">
                                     <div className="scale-75"><SIcon /></div>
                                     <span className="text-[7px] text-white/40 uppercase font-bold text-center">{s.label}</span>
                                   </button>
                                 ); 
                               })}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                       <div className="bg-[#16161f]/95 p-1.5 rounded-[30px] border border-white/10 flex items-center gap-1 shadow-2xl text-center">
                         <button onClick={() => { handleInteraction(); setShowStickerPicker(!showStickerPicker); }} className={`p-3 rounded-full transition-colors active:scale-90 ${showStickerPicker ? 'text-[#d4af37] bg-white/5' : 'text-white/40'}`}><Smile size={20} /></button>
                         <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                         <button onClick={() => { handleInteraction(); fileInputRef.current?.click(); }} className="text-[#d4af37] p-3 hover:bg-white/5 rounded-full transition-colors active:scale-90 flex-shrink-0"><Camera size={20} /></button>
                         <input type="text" placeholder="Введите послание..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)} className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-1 font-light text-white placeholder:text-white/20 text-left" />
                         <button onClick={() => sendMessage(newMessage)} className="bg-[#d4af37] w-10 h-10 rounded-full text-black active:scale-90 shadow-xl shadow-[#d4af37]/20 flex items-center justify-center flex-shrink-0 text-center"><Send size={18} className="mx-auto" /></button>
                       </div>
                     </div>
                   </div>
                )}

                {view === 'archive-list' && (
                  <div className="flex-1 overflow-y-auto p-5 w-full bg-transparent text-center">
                    <h2 className="text-lg font-light uppercase tracking-widest mb-6 text-[#d4af37] text-center font-mono italic">История сеансов</h2>
                    <div className="space-y-4 pb-12 w-full">
                      {allBookings.filter(b => b.clientPhone === user.phone && b.status === 'completed').map(b => (
                        <button key={b.id} onClick={() => { handleInteraction(); setSelectedArchiveBooking(b); setView('archive-chat'); }} className="w-full bg-[#16161f] border border-white/5 p-5 rounded-[30px] shadow-xl text-left active:scale-95 transition-transform flex flex-col gap-2">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest font-mono">{b.service}</span>
                            <span className="text-white/30 text-[9px] uppercase font-mono">{formatReadableDate(b.date)}</span>
                          </div>
                          <div className="text-white/50 text-[10px] font-light">Сеанс завершен Мастером</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {view === 'admin-archive-list' && (
                  <div className="flex-1 overflow-y-auto p-5 w-full bg-transparent text-center">
                    <h2 className="text-lg font-light uppercase tracking-widest mb-6 text-[#d4af37] text-center font-mono italic">Архив Клиентов</h2>
                    <div className="space-y-4 pb-12 w-full">
                      {allBookings.filter(b => b.status === 'completed').map(b => (
                        <button key={b.id} onClick={() => { handleInteraction(); setSelectedArchiveBooking(b); setView('archive-chat'); }} className="w-full bg-[#16161f] border border-white/5 p-5 rounded-[30px] shadow-xl text-left active:scale-95 transition-transform flex flex-col gap-2">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest font-mono">{b.clientName}</span>
                              {b.clientGender === 'female' ? <VenusIcon size={10} className="text-[#ff4d4d]" /> : <MarsIcon size={10} className="text-[#4d94ff]" />}
                            </div>
                            <span className="text-white/30 text-[9px] uppercase font-mono">{formatReadableDate(b.date)}</span>
                          </div>
                          <div className="flex justify-between items-center w-full mt-1">
                            <span className="text-white/60 text-[10px] font-light">{b.service}</span>
                            <span className="text-white/40 text-[9px] font-mono">{b.clientPhone}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {view === 'archive-chat' && selectedArchiveBooking && (
                  <div className="flex-1 flex flex-col overflow-hidden text-white w-full bg-transparent relative text-center">
                    <div className="px-4 py-3 bg-black/50 border-b border-white/[0.05] text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 z-10 relative">
                      <Archive size={14} className="text-white/30" /> 
                      {user.role === 'admin' ? `Архив: ${selectedArchiveBooking.clientName} (${selectedArchiveBooking.service})` : `Архив: ${selectedArchiveBooking.service}`}
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide px-4 py-6 z-10 text-center">
                      <div className="text-[8px] text-white/40 uppercase tracking-widest font-mono italic text-center mb-6">{selectedArchiveBooking.service} • {formatReadableDate(selectedArchiveBooking.date)} в {selectedArchiveBooking.time}</div>
                      {archiveMessages.map(m => (
                        <div key={m.id} className={`flex ${m.sender === 'master' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] p-4 rounded-[22px] shadow-[0_10px_40px_rgba(0,0,0,0.7)] ${m.sender === 'master' ? 'bg-[#1a1a24]/95 text-white/70 rounded-tl-none border border-white/10 text-left opacity-80' : 'bg-[#16161f]/95 text-white/70 border border-white/10 rounded-tr-none shadow-lg text-left font-light opacity-80'}`}>
                            {m.stickerId ? (
                              <div className="flex justify-center p-2 text-center opacity-70">
                                {(() => { const SIcon = STICKERS_MAP[m.stickerId]; return SIcon ? <SIcon /> : null; })()}
                              </div>
                            ) : m.imageUrl ? (
                              <img src={m.imageUrl} alt="Insight" className="w-full h-auto rounded-xl mb-2 border border-black/10 opacity-70 grayscale-[30%]" />
                            ) : (
                              <p className="text-[13px] font-light leading-relaxed italic text-left whitespace-pre-wrap break-words">{m.text}</p>
                            )}
                            <span className="text-[7px] opacity-30 mt-2 block text-right font-mono uppercase text-white/40">{m.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-black/90 border-t border-white/[0.05] flex-shrink-0 z-10 text-center">
                      <p className="text-[9px] uppercase tracking-widest font-bold text-[#ff4d4d]/70 text-center flex items-center justify-center gap-2">
                        <Lock size={12} /> Сеанс закрыт для сообщений
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {/* АНИМАЦИЯ ЗАВЕРШЕНИЯ СЕАНСА */}
        <AnimatePresence>
          {sessionEndingOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-[#060608]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
            >
              {/* КНОПКА ЗАКРЫТИЯ (КРЕСТИК) */}
              <button 
                onClick={() => {
                  handleInteraction();
                  setSessionEndingOverlay(false);
                  setActiveChatBooking(null);
                  setView(user?.role === 'admin' ? 'admin-requests' : 'home');
                  triggerMagicAlert("Сеанс перенесен в архив ✨");
                }} 
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-3"
              >
                <X size={28}/>
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <StickerZen />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-[#d4af37] text-xl font-serif tracking-[0.3em] uppercase mt-8"
              >
                Сеанс Завершен
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-white/50 text-xs font-light mt-4 max-w-[250px] leading-relaxed mx-auto"
              >
                Магический поток закрыт.<br/>Ваши ответы сохранены в Архиве.
              </motion.p>
              
              {/* КНОПКА ДОНАТА В АНИМАЦИИ (Теперь видна и Мастеру, и Клиенту) */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                onClick={() => {
                  handleInteraction();
                  setSessionEndingOverlay(false);
                  setActiveChatBooking(null);
                  setView(user?.role === 'admin' ? 'admin-requests' : 'home');
                  triggerMagicAlert("Сеанс перенесен в архив ✨");
                  setShowDonateModal(true);
                }}
                className="mt-10 bg-[#ff4d4d]/10 text-[#ff4d4d] border border-[#ff4d4d]/30 px-6 py-4 rounded-[24px] flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,77,77,0.15)]"
              >
                <Heart size={16} fill="#ff4d4d" />
                Поблагодарить от сердца
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{showClientInfo && activeChatBooking && (<div className="fixed inset-0 z-[150] flex items-center justify-center p-6 text-center text-center text-center text-center text-center text-center text-center text-center"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowClientInfo(false)} className="absolute inset-0 bg-black/98 backdrop-blur-md text-center text-center text-center text-center text-center text-center text-center text-center" /><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative w-full max-w-sm bg-[#16161f] border-2 border-[#d4af37]/40 rounded-[3rem] p-10 shadow-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><CalendarCheck size={32} className="text-[#d4af37] mx-auto text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center" /></div><h3 className="text-[#d4af37] text-base font-bold uppercase tracking-widest mb-4 text-center text-center text-center text-center text-center">Ваша запись</h3><div className="space-y-3 mb-8 text-center text-white/80 font-light text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><div className="bg-white/5 p-4 rounded-2xl text-center text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><p className="text-[8px] text-[#d4af37]/50 uppercase tracking-widest mb-1 font-mono text-center text-center text-center text-center text-center">Дата</p><p className="text-lg font-mono text-center text-white text-center text-center text-center text-center text-center">{formatReadableDate(activeChatBooking.date)}</p></div><div className="bg-white/5 p-4 rounded-2xl text-center text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><p className="text-[8px] text-[#d4af37]/50 uppercase tracking-widest mb-1 font-mono text-center text-center text-center text-center text-center">Время</p><p className="text-xl font-bold text-[#d4af37] font-mono text-center text-center text-center text-center text-center text-center">{activeChatBooking.time}</p></div></div><button onClick={() => { handleInteraction(); setShowClientInfo(false); setView('chat'); }} className="w-full bg-[#d4af37] text-black font-bold py-4 rounded-2xl uppercase text-[10px] active:scale-95 shadow-xl font-bold text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Открыть чат</button></motion.div></div>)}</AnimatePresence>
        
        {/* АНИМАЦИЯ И ОКНО ДОНАТА */}
        <AnimatePresence>
          {showDonateModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 text-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDonateModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-[#1a1a24] border border-[#d4af37]/30 rounded-[3rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center">
                <button onClick={() => { handleInteraction(); setShowDonateModal(false); }} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-2"><X size={20}/></button>
                
                <div className="w-16 h-16 bg-[#ff4d4d]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,77,77,0.2)]">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Heart size={32} className="text-[#ff4d4d]" fill="#ff4d4d" />
                  </motion.div>
                </div>
                
                <h3 className="text-[#d4af37] text-base font-bold uppercase tracking-widest mb-2 font-serif">Энергообмен</h3>
                <p className="text-white/60 text-[10px] font-light mb-8 max-w-[260px] mx-auto leading-relaxed">
                  Моя главная цель — помогать и направлять. Если расклад был для вас полезен и отозвался в душе, вы можете отправить любую искреннюю благодарность по зову сердца.
                </p>
                
                {/* КАРТОЧКА ЮMONEY */}
                <div className="w-full bg-gradient-to-tr from-[#16161f] to-[#252535] border border-white/10 rounded-[24px] p-5 mb-6 relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-white"><CreditCard size={48} /></div>
                  <p className="text-[8px] text-[#d4af37] uppercase tracking-widest font-bold font-mono mb-3 text-left flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                    ЮMoney
                  </p>
                  <p className="text-2xl font-mono text-white tracking-widest text-left font-light mb-1">5599 0021 2732 2628</p>
                </div>

                <button onClick={handleCopyDonate} className={`w-full font-bold py-5 rounded-[24px] uppercase text-[10px] tracking-widest active:scale-95 shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-[#d4af37] text-black border border-transparent'}`}>
                  {copied ? <><Check size={18}/> Скопировано</> : <><Copy size={18}/> Скопировать номер</>}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ОКНО ПОДДЕРЖКИ (РАЗРАБОТЧИКУ) */}
        <AnimatePresence>
          {showSupportModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 text-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSupportModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-[#1a1a24] border border-white/10 rounded-[3rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center">
                <button onClick={() => { handleInteraction(); setShowSupportModal(false); }} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-2"><X size={20}/></button>
                
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Bug size={24} className="text-white/40" />
                </div>
                
                <h3 className="text-white/80 text-base font-bold uppercase tracking-widest mb-2 font-serif">Поддержка</h3>
                <p className="text-white/40 text-[10px] font-light mb-8 max-w-[260px] mx-auto leading-relaxed">
                  Заметили техническую ошибку или есть идеи по улучшению приложения? Напишите разработчику.
                </p>

                <button onClick={handleSupportEmail} className="w-full bg-[#16161f] text-white/80 border border-white/10 font-bold py-4 rounded-[24px] uppercase text-[9px] tracking-widest active:scale-95 shadow-xl flex items-center justify-center gap-3 transition-all hover:border-[#d4af37]/50">
                  <Mail size={16}/> Написать на Email
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
