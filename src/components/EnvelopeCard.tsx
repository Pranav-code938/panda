import React from 'react';

interface EnvelopeCardProps {
  isOpening?: boolean;
  scale?: number;
  className?: string;
  onClickSeal?: () => void;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  isOpening = false,
  scale = 1,
  className = '',
  onClickSeal,
}) => {
  return (
    <div
      className={`relative select-none transition-all duration-700 ease-out ${
        isOpening ? 'scale-110' : 'scale-100'
      } ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Golden Magical Sparkles (activated on open) */}
      {isOpening && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(16)].map((_, i) => (
            <span
              key={i}
              className="absolute inline-block w-2.5 h-2.5 rounded-full animate-magic-sparkle"
              style={{
                left: `${35 + (i * 13) % 45}%`,
                top: `${40 + (i * 17) % 35}%`,
                background: i % 2 === 0 ? '#FDE047' : '#F59E0B',
                boxShadow: '0 0 10px #FBBF24',
                animationDelay: `${(i * 0.06).toFixed(2)}s`,
                animationDuration: `${0.8 + (i % 3) * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* The Parchment Envelope Body */}
      <div
        className="relative w-[310px] sm:w-[360px] md:w-[410px] h-[210px] sm:h-[240px] md:h-[260px] rounded-lg shadow-2xl border-2 border-[#8A7156] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F9F5EC 0%, #EFE8D8 50%, #E3D7C1 100%)',
          boxShadow: '0 20px 40px -15px rgba(50, 35, 20, 0.35), 0 0 0 1px rgba(138, 113, 86, 0.2)',
        }}
      >
        {/* Parchment Subtle Fiber Texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#9B8365 0.75px, transparent 0.75px)`,
            backgroundSize: '12px 12px',
          }}
        />

        {/* Vintage Postal Watermark / Hogwarts-style postal emblem */}
        <div className="absolute top-3 right-4 opacity-35 pointer-events-none flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-[#8C6D4C] flex items-center justify-center text-[10px] font-mono text-[#8C6D4C]">
            POST
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[#8C6D4C] mt-0.5">EXPRESS</span>
        </div>

        {/* Diagonal Envelope Fold Lines (CSS Paths) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 260"
          preserveAspectRatio="none"
        >
          {/* Bottom Fold Lines */}
          <line x1="0" y1="260" x2="200" y2="135" stroke="#CBBBA4" strokeWidth="1.5" />
          <line x1="400" y1="260" x2="200" y2="135" stroke="#CBBBA4" strokeWidth="1.5" />
          {/* Top Flap Fold Line */}
          <polygon
            points="0,0 400,0 200,135"
            fill={isOpening ? '#ECE4D2' : '#F3ECE0'}
            stroke="#C0AF97"
            strokeWidth="1.5"
            className={`transition-all duration-700 origin-top ${
              isOpening ? '-rotate-180 opacity-0' : 'rotate-0 opacity-100'
            }`}
          />
        </svg>

        {/* Scroll Peak Peek during opening */}
        {isOpening && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-48 h-24 bg-[#FAF6ED] rounded-t-lg border-2 border-[#AA8F70] shadow-md transition-all duration-700 animate-scroll-peek" />
        )}

        {/* Elegant Lettering: TO: HERMIONE GRANGER (Top Third) */}
        <div className="absolute top-5 sm:top-6 inset-x-0 flex flex-col items-center text-center z-10 pointer-events-none px-4">
          <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-[#876E55] uppercase font-bold mb-0.5">
            TO:
          </span>
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide text-[#2C211B] font-serif"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
          >
            HERMIONE GRANGER
          </h2>
          <div className="w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#C2AF94] to-transparent mt-1" />
        </div>

        {/* Elegant Lettering: FROM: ROONIL WAZLIB (Bottom Third) */}
        <div className="absolute bottom-5 sm:bottom-6 inset-x-0 flex flex-col items-center text-center z-10 pointer-events-none px-4">
          <div className="w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#C2AF94] to-transparent mb-1" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#876E55] uppercase font-bold">
              FROM:
            </span>
            <span
              className="text-xs sm:text-base font-bold text-[#4B3B30] tracking-wider font-serif italic"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ROONIL WAZLIB
            </span>
          </div>
        </div>

        {/* Elegant Red Wax Seal with Tiny Panda Paw (Centered with dedicated breathing space) */}
        <button
          type="button"
          onClick={onClickSeal}
          aria-label="Red wax seal featuring a panda paw"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-500 cursor-pointer ${
            isOpening ? 'scale-125 opacity-0 pointer-events-none' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Wax Seal Outer Organic Edge */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transition-transform"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #DC2626 0%, #991B1B 65%, #6B0E0E 100%)',
              boxShadow: '0 6px 14px rgba(100, 10, 10, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
              border: '2px solid #580B0B',
            }}
          >
            {/* Inner Stamped Rim */}
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full border border-[#FF9999]/30 flex items-center justify-center">
              {/* Stamped Tiny Panda Paw SVG */}
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="transform group-hover:scale-110 transition-transform">
                {/* Central main pad */}
                <ellipse cx="17" cy="20" rx="6.5" ry="5.5" fill="#F87171" fillOpacity="0.85" stroke="#7F1D1D" strokeWidth="1" />
                {/* 4 toe beans */}
                <circle cx="10" cy="13" r="2.4" fill="#F87171" fillOpacity="0.85" stroke="#7F1D1D" strokeWidth="0.8" />
                <circle cx="14.5" cy="10" r="2.6" fill="#F87171" fillOpacity="0.85" stroke="#7F1D1D" strokeWidth="0.8" />
                <circle cx="19.5" cy="10" r="2.6" fill="#F87171" fillOpacity="0.85" stroke="#7F1D1D" strokeWidth="0.8" />
                <circle cx="24" cy="13" r="2.4" fill="#F87171" fillOpacity="0.85" stroke="#7F1D1D" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
