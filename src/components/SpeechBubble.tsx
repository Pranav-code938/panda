import React from 'react';

interface SpeechBubbleProps {
  dialogue: string;
  quip?: string | null;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  dialogue,
  quip,
  className = '',
}) => {
  return (
    <div
      className={`relative max-w-sm md:max-w-md mx-auto p-4 md:p-5 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl border-2 border-[#543828]/25 text-slate-800 transition-all duration-300 animate-bubble-pop ${className}`}
      role="region"
      aria-live="polite"
    >
      {/* Speech bubble pointer notch pointing towards the panda */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '12px solid #FFFFFF',
        }}
      />
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 -z-10"
        style={{
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '15px solid rgba(84, 56, 40, 0.3)',
        }}
      />

      {/* Postal Employee Badge */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#DFD3C3]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B2635] tracking-wide uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-[#8B2635]" />
          <span>Owl Postal Division (Special Emissary)</span>
        </div>
        <span className="text-[11px] text-stone-400 font-mono">DR. PANDA</span>
      </div>

      {/* The EXACT Dialogue */}
      <p className="text-base md:text-lg font-medium leading-relaxed font-serif text-[#2C221E] antialiased">
        “{dialogue}”
      </p>

      {/* Comedic quip if button was dodged */}
      {quip && (
        <div className="mt-2.5 pt-2 border-t border-dashed border-[#DFD3C3] text-xs md:text-sm text-[#8B2635] font-sans italic flex items-center gap-1.5 animate-fadeIn">
          <span>🐾</span>
          <span>{quip}</span>
        </div>
      )}
    </div>
  );
};
