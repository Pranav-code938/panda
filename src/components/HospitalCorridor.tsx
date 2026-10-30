import React from 'react';

interface HospitalCorridorProps {
  children?: React.ReactNode;
  cameraZoom?: boolean;
}

export const HospitalCorridor: React.FC<HospitalCorridorProps> = ({
  children,
  cameraZoom = false,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-transform duration-1000 ease-out select-none ${
        cameraZoom ? 'scale-105' : 'scale-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #EFE8DC 55%, #DCD3C3 100%)',
      }}
    >
      {/* Anime Illustrated Hospital Corridor SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Warm ceiling lighting glow */}
          <radialGradient id="lampGlow1" cx="300" cy="80" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FFEAA7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFEAA7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lampGlow2" cx="700" cy="80" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FFEAA7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFEAA7" stopOpacity="0" />
          </radialGradient>
          {/* Corridor depth gradient */}
          <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5EFE6" />
            <stop offset="70%" stopColor="#E9DFD0" />
            <stop offset="100%" stopColor="#D9CEBC" />
          </linearGradient>
          {/* Floor perspective polish gradient */}
          <linearGradient id="floorGradient" x1="0" y1="460" x2="0" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D5CAB6" />
            <stop offset="25%" stopColor="#DDD3BF" />
            <stop offset="60%" stopColor="#C9BDA6" />
            <stop offset="100%" stopColor="#B3A58D" />
          </linearGradient>
          {/* Soft frosted window tint */}
          <linearGradient id="frostGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2F1F8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CDE7F0" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Ceiling Area */}
        <rect x="0" y="0" width="1000" height="120" fill="#EFE8DB" />
        <line x1="0" y1="120" x2="1000" y2="120" stroke="#C8BCAB" strokeWidth="2" />
        {/* Acoustic tile subtle grids */}
        <line x1="0" y1="60" x2="1000" y2="60" stroke="#E2D8C9" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="200" y1="0" x2="200" y2="120" stroke="#E2D8C9" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="120" stroke="#E2D8C9" strokeWidth="1" />
        <line x1="600" y1="0" x2="600" y2="120" stroke="#E2D8C9" strokeWidth="1" />
        <line x1="800" y1="0" x2="800" y2="120" stroke="#E2D8C9" strokeWidth="1" />

        {/* Warm Globe Lamps */}
        {/* Lamp 1 */}
        <circle cx="300" cy="80" r="140" fill="url(#lampGlow1)" />
        <line x1="300" y1="0" x2="300" y2="50" stroke="#8D7B68" strokeWidth="3" />
        <ellipse cx="300" cy="52" rx="14" ry="4" fill="#C5B5A0" />
        <circle cx="300" cy="68" r="18" fill="#FFFBE6" stroke="#E0CFA8" strokeWidth="2" />

        {/* Lamp 2 */}
        <circle cx="700" cy="80" r="140" fill="url(#lampGlow2)" />
        <line x1="700" y1="0" x2="700" y2="50" stroke="#8D7B68" strokeWidth="3" />
        <ellipse cx="700" cy="52" rx="14" ry="4" fill="#C5B5A0" />
        <circle cx="700" cy="68" r="18" fill="#FFFBE6" stroke="#E0CFA8" strokeWidth="2" />

        {/* Main Wall Corridor */}
        <rect x="0" y="120" width="1000" height="350" fill="url(#wallGradient)" />

        {/* Warm Protective Wainscoting / Wall Railing */}
        <rect x="0" y="320" width="1000" height="8" fill="#BFAF9B" />
        <rect x="0" y="328" width="1000" height="142" fill="#E5DAC9" />
        {/* Baseboard */}
        <rect x="0" y="460" width="1000" height="10" fill="#9F8F79" />

        {/* Left Hospital Room Door */}
        <g transform="translate(60, 160)">
          {/* Door Frame */}
          <rect x="0" y="0" width="140" height="300" rx="4" fill="#D2C3B0" stroke="#9A8B78" strokeWidth="2.5" />
          <rect x="8" y="8" width="124" height="292" rx="2" fill="#E8DEC\-0" />
          {/* Frosted Glass Window */}
          <rect x="22" y="25" width="96" height="110" rx="8" fill="url(#frostGlass)" stroke="#9F8F7B" strokeWidth="2" />
          <line x1="22" y1="80" x2="118" y2="80" stroke="#B0C8D2" strokeWidth="1.5" />
          {/* Soft inner cross symbol on glass */}
          <path d="M70 45 V65 M60 55 H80" stroke="#8EA4AF" strokeWidth="3" strokeLinecap="round" />
          {/* Room Plate */}
          <rect x="42" y="150" width="56" height="22" rx="3" fill="#FAF5ED" stroke="#8C7A65" strokeWidth="1.5" />
          <text x="70" y="165" textAnchor="middle" fill="#6A5A48" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">ROOM 304</text>
          {/* Door Handle */}
          <rect x="18" y="180" width="10" height="26" rx="3" fill="#D3C1A5" stroke="#7A6852" strokeWidth="1.5" />
          <circle cx="23" cy="193" r="3" fill="#99856E" />
        </g>

        {/* Far Center Hallway Perspective Archway */}
        <path d="M380 140 H620 V470 H380 Z" fill="#DDD1BE" stroke="#B2A38F" strokeWidth="2" />
        {/* Deeper corridor receding lines */}
        <polygon points="410,170 590,170 570,470 430,470" fill="#C9BC style" fillOpacity="0.5" />
        <rect x="440" y="210" width="120" height="260" fill="#D5C7B2" />
        {/* Soft magical glow at end of hallway */}
        <circle cx="500" cy="310" r="60" fill="#FFF7DE" fillOpacity="0.45" />

        {/* Hospital Signboard suspended above hallway */}
        <g transform="translate(415, 138)">
          <line x1="25" y1="-18" x2="25" y2="0" stroke="#7A6A58" strokeWidth="2" />
          <line x1="145" y1="-18" x2="145" y2="0" stroke="#7A6A58" strokeWidth="2" />
          <rect x="0" y="0" width="170" height="34" rx="5" fill="#4A6572" stroke="#2F444E" strokeWidth="2" />
          <circle cx="20" cy="17" r="7" fill="#F9AA33" />
          <path d="M20 13 V21 M16 17 H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="96" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" letterSpacing="0.5">RECEPTION & WARDS</text>
        </g>

        {/* Right Hospital Room Door */}
        <g transform="translate(800, 160)">
          {/* Door Frame */}
          <rect x="0" y="0" width="140" height="300" rx="4" fill="#D2C3B0" stroke="#9A8B78" strokeWidth="2.5" />
          <rect x="8" y="8" width="124" height="292" rx="2" fill="#E8DECF" />
          {/* Frosted Glass Window */}
          <rect x="22" y="25" width="96" height="110" rx="8" fill="url(#frostGlass)" stroke="#9F8F7B" strokeWidth="2" />
          <line x1="22" y1="80" x2="118" y2="80" stroke="#B0C8D2" strokeWidth="1.5" />
          {/* Room Plate */}
          <rect x="42" y="150" width="56" height="22" rx="3" fill="#FAF5ED" stroke="#8C7A65" strokeWidth="1.5" />
          <text x="70" y="165" textAnchor="middle" fill="#6A5A48" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">OFFICE 12</text>
          {/* Door Handle */}
          <rect x="112" y="180" width="10" height="26" rx="3" fill="#D3C1A5" stroke="#7A6852" strokeWidth="1.5" />
          <circle cx="117" cy="193" r="3" fill="#99856E" />
        </g>

        {/* Cozy Potted Plant in Corner (Chibi anime style) */}
        <g transform="translate(230, 370)">
          {/* Terracotta Pot */}
          <polygon points="12,70 48,70 54,100 6,100" fill="#C97A56" stroke="#8A482A" strokeWidth="2" />
          <ellipse cx="30" cy="70" rx="18" ry="5" fill="#E08E69" stroke="#8A482A" strokeWidth="2" />
          {/* Chibi Leaves */}
          <ellipse cx="20" cy="52" rx="16" ry="24" transform="rotate(-25 20 52)" fill="#7CB342" stroke="#4B6E1F" strokeWidth="2" />
          <ellipse cx="40" cy="50" rx="16" ry="24" transform="rotate(25 40 50)" fill="#8BC34A" stroke="#4B6E1F" strokeWidth="2" />
          <ellipse cx="30" cy="38" rx="14" ry="26" fill="#9CCC65" stroke="#4B6E1F" strokeWidth="2" />
          {/* Leaf veins */}
          <line x1="30" y1="58" x2="30" y2="22" stroke="#4B6E1F" strokeWidth="1.5" />
        </g>

        {/* Polished Hospital Floor with perspective reflections */}
        <rect x="0" y="470" width="1000" height="230" fill="url(#floorGradient)" />
        {/* Soft reflection tiles */}
        <line x1="0" y1="520" x2="1000" y2="520" stroke="#E5DACB" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="0" y1="580" x2="1000" y2="580" stroke="#DDD2C1" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="0" y1="650" x2="1000" y2="650" stroke="#D3C7B5" strokeWidth="1" strokeOpacity="0.4" />

        {/* Floor perspective tile seams */}
        <line x1="500" y1="470" x2="150" y2="700" stroke="#C5B8A4" strokeWidth="1.5" strokeOpacity="0.45" />
        <line x1="500" y1="470" x2="850" y2="700" stroke="#C5B8A4" strokeWidth="1.5" strokeOpacity="0.45" />
        <line x1="500" y1="470" x2="500" y2="700" stroke="#C5B8A4" strokeWidth="1" strokeOpacity="0.35" />

        {/* Soft light reflection pools on floor */}
        <ellipse cx="300" cy="580" rx="130" ry="25" fill="#FFF7D6" fillOpacity="0.22" />
        <ellipse cx="700" cy="580" rx="130" ry="25" fill="#FFF7D6" fillOpacity="0.22" />
        <ellipse cx="500" cy="520" rx="70" ry="14" fill="#FFF9E6" fillOpacity="0.3" />

        {/* Subtle magical warm dust motes floating gently in corridor */}
        <circle cx="280" cy="220" r="2.5" fill="#FFEAA7" fillOpacity="0.7" />
        <circle cx="340" cy="180" r="1.5" fill="#FFFDF0" fillOpacity="0.9" />
        <circle cx="680" cy="230" r="2" fill="#FFEAA7" fillOpacity="0.8" />
        <circle cx="520" cy="280" r="2" fill="#FFFBE6" fillOpacity="0.8" />
        <circle cx="470" cy="200" r="1.5" fill="#FFEAA7" fillOpacity="0.6" />
      </svg>

      {/* Corridor overlay container for Panda, Envelope, UI */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
