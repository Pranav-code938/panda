import React from 'react';
import { PandaExpression } from '../logic/deliveryMachine';

interface WizardPandaProps {
  expression?: PandaExpression;
  isWalking?: boolean;
  scale?: number;
  showEnvelopeInPaws?: boolean;
  onPandaClick?: () => void;
  className?: string;
}

export const WizardPanda: React.FC<WizardPandaProps> = ({
  expression = 'serious',
  isWalking = false,
  scale = 1,
  showEnvelopeInPaws = true,
  onPandaClick,
  className = '',
}) => {
  return (
    <div
      onClick={onPandaClick}
      className={`relative inline-block select-none transform transition-transform duration-500 origin-bottom ${
        isWalking ? 'animate-panda-walk' : 'animate-panda-idle'
      } ${className}`}
      style={{ transform: `scale(${scale})` }}
      aria-label={`Wizard Panda with ${expression} expression`}
    >
      {/* Complete 2D Anime Chibi Wizard Panda SVG */}
      <svg
        width="280"
        height="320"
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-md"
      >
        <defs>
          {/* Robe fold shadow */}
          <linearGradient id="robeGrad" x1="140" y1="180" x2="140" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A2A32" />
            <stop offset="100%" stopColor="#18181D" />
          </linearGradient>

          {/* Wizard hat gradient */}
          <linearGradient id="hatGrad" x1="140" y1="10" x2="140" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#353540" />
            <stop offset="60%" stopColor="#25252E" />
            <stop offset="100%" stopColor="#1B1B22" />
          </linearGradient>

          {/* Scarf stripe pattern */}
          <pattern id="scarfPattern" width="24" height="24" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <rect width="12" height="24" fill="#7E1825" /> {/* Deep Gryffindor burgundy */}
            <rect x="12" width="12" height="24" fill="#DDA027" /> {/* Warm gold */}
          </pattern>

          {/* Leather messenger bag */}
          <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#96562A" />
            <stop offset="100%" stopColor="#693717" />
          </linearGradient>
        </defs>

        {/* --- PANDA TAIL & SHADOW --- */}
        <ellipse cx="140" cy="308" rx="72" ry="14" fill="#201C18" fillOpacity="0.25" />

        {/* --- WIZARD ROBE & LOWER BODY --- */}
        <g id="body-robe">
          {/* Black Wizard Robe main shape */}
          <path
            d="M86 210 C80 250 72 290 84 300 C92 306 188 306 196 300 C208 290 200 250 194 210 Z"
            fill="url(#robeGrad)"
            stroke="#16161A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Robe center seam & gold piping */}
          <line x1="140" y1="218" x2="140" y2="300" stroke="#454552" strokeWidth="2" strokeDasharray="5 3" />

          {/* Cute Little Chibi Panda Feet */}
          {/* Left foot */}
          <ellipse
            cx="108"
            cy="300"
            rx="18"
            ry="11"
            fill="#1E1E22"
            stroke="#121215"
            strokeWidth="3"
            className={isWalking ? 'origin-center animate-left-foot' : ''}
          />
          {/* Right foot */}
          <ellipse
            cx="172"
            cy="300"
            rx="18"
            ry="11"
            fill="#1E1E22"
            stroke="#121215"
            strokeWidth="3"
            className={isWalking ? 'origin-center animate-right-foot' : ''}
          />
        </g>

        {/* --- MAGICAL DELIVERY SATCHEL (CROSS-BODY) --- */}
        <g id="delivery-satchel">
          {/* Strap going from right shoulder to left hip */}
          <path
            d="M174 195 L95 252"
            stroke="#5A2E11"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M174 195 L95 252"
            stroke="#C49144"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Leather Bag hanging on left hip */}
          <rect
            x="76"
            y="234"
            width="34"
            height="38"
            rx="6"
            fill="url(#bagGrad)"
            stroke="#3C1A05"
            strokeWidth="2.5"
          />
          {/* Bag Flap */}
          <path
            d="M76 235 Q93 252 110 235 Z"
            fill="#7A3F19"
            stroke="#3C1A05"
            strokeWidth="2"
          />
          {/* Tiny Brass Buckle */}
          <rect x="89" y="244" width="8" height="6" rx="1.5" fill="#E6B33D" stroke="#68470E" strokeWidth="1" />
        </g>

        {/* --- OVERSIZED CHIBI PANDA HEAD (Oversized Head Ratio) --- */}
        <g id="panda-head" className="origin-[140px_160px]">
          {/* Left Ear */}
          <g>
            <circle cx="76" cy="100" r="28" fill="#1C1C20" stroke="#101013" strokeWidth="3" />
            <circle cx="76" cy="100" r="14" fill="#2E2E35" />
          </g>

          {/* Right Ear */}
          <g>
            <circle cx="204" cy="100" r="28" fill="#1C1C20" stroke="#101013" strokeWidth="3" />
            <circle cx="204" cy="100" r="14" fill="#2E2E35" />
          </g>

          {/* Fluffy Round White Panda Head Base */}
          <ellipse
            cx="140"
            cy="146"
            rx="74"
            ry="64"
            fill="#FFFDF9"
            stroke="#262626"
            strokeWidth="3.5"
          />

          {/* Soft Shading on Chin */}
          <path
            d="M102 184 C116 198 164 198 178 184 C166 206 114 206 102 184 Z"
            fill="#EADBCE"
            fillOpacity="0.45"
          />

          {/* Cute Anime Pink Cheek Blush */}
          <ellipse cx="88" cy="164" rx="12" ry="7" fill="#F8A5A5" fillOpacity="0.55" />
          <ellipse cx="192" cy="164" rx="12" ry="7" fill="#F8A5A5" fillOpacity="0.55" />

          {/* --- DISTINCTIVE BLACK EYE PATCHES (Tilted Chibi Angle) --- */}
          {/* Left Eye Patch */}
          <ellipse
            cx="106"
            cy="144"
            rx="20"
            ry="25"
            transform="rotate(18 106 144)"
            fill="#1E1E22"
            stroke="#121215"
            strokeWidth="2"
          />

          {/* Right Eye Patch */}
          <ellipse
            cx="174"
            cy="144"
            rx="20"
            ry="25"
            transform="rotate(-18 174 144)"
            fill="#1E1E22"
            stroke="#121215"
            strokeWidth="2"
          />

          {/* --- EXPRESSIVE EYES BASED ON EXPRESSION --- */}
          {expression === 'serious' && (
            <g id="eyes-serious">
              {/* Very serious, professional postal employee eyes */}
              {/* Left Eye */}
              <circle cx="109" cy="143" r="8" fill="#FFFFFF" />
              <circle cx="110" cy="142" r="5" fill="#18181B" />
              <circle cx="112" cy="140" r="2.5" fill="#FFFFFF" />
              {/* Right Eye */}
              <circle cx="171" cy="143" r="8" fill="#FFFFFF" />
              <circle cx="170" cy="142" r="5" fill="#18181B" />
              <circle cx="168" cy="140" r="2.5" fill="#FFFFFF" />
              {/* Serious straight eyebrows */}
              <path d="M96 127 Q112 129 119 130" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M184 127 Q168 129 161 130" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {expression === 'surprised' && (
            <g id="eyes-surprised">
              {/* Wide eyes, raised brows */}
              <circle cx="109" cy="141" r="10" fill="#FFFFFF" />
              <circle cx="110" cy="141" r="6" fill="#18181B" />
              <circle cx="112" cy="139" r="3" fill="#FFFFFF" />
              <circle cx="171" cy="141" r="10" fill="#FFFFFF" />
              <circle cx="170" cy="141" r="6" fill="#18181B" />
              <circle cx="168" cy="139" r="3" fill="#FFFFFF" />
              {/* Arched surprised eyebrows */}
              <path d="M97 122 Q108 116 119 122" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M183 122 Q172 116 161 122" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {expression === 'confused' && (
            <g id="eyes-confused">
              {/* One eye squinting, one eye round */}
              <ellipse cx="108" cy="143" rx="8" ry="5" fill="#FFFFFF" />
              <circle cx="108" cy="143" r="3.5" fill="#18181B" />
              <circle cx="171" cy="142" r="9" fill="#FFFFFF" />
              <circle cx="171" cy="142" r="5" fill="#18181B" />
              <circle cx="173" cy="140" r="2.5" fill="#FFFFFF" />
              {/* Asymmetric brows */}
              <path d="M96 128 Q108 126 119 130" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M184 122 Q172 116 161 125" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {expression === 'bemused' && (
            <g id="eyes-bemused">
              {/* Half-lidded skeptical anime eyes */}
              <path d="M100 144 Q108 138 118 144 Z" fill="#FFFFFF" />
              <circle cx="109" cy="142" r="4" fill="#18181B" />
              <circle cx="111" cy="141" r="1.5" fill="#FFFFFF" />
              <path d="M180 144 Q172 138 162 144 Z" fill="#FFFFFF" />
              <circle cx="171" cy="142" r="4" fill="#18181B" />
              <circle cx="169" cy="141" r="1.5" fill="#FFFFFF" />
              {/* Flat brows */}
              <line x1="97" y1="128" x2="119" y2="128" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="183" y1="128" x2="161" y2="128" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {expression === 'exasperated' && (
            <g id="eyes-exasperated">
              {/* Whimsical anime exhaustion / disbelief spiral-dots */}
              <circle cx="108" cy="143" r="8" fill="#FFFFFF" />
              <path d="M104 140 Q108 146 112 140" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="172" cy="143" r="8" fill="#FFFFFF" />
              <path d="M168 140 Q172 146 176 140" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
              {/* Slanted exasperated brows */}
              <path d="M96 123 L118 131" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M184 123 L162 131" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
              {/* Classic anime blue sweat drop on temple */}
              <path
                d="M66 128 C66 122 72 116 72 116 C72 116 78 122 78 128 C78 132 75 135 72 135 C69 135 66 132 66 128 Z"
                fill="#60A5FA"
                stroke="#2563EB"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* --- NOSE & MOUTH --- */}
          {/* Cute inverted triangular panda nose */}
          <path
            d="M136 156 Q140 154 144 156 Q142 161 140 162 Q138 161 136 156 Z"
            fill="#232328"
          />

          {/* Expression Mouth */}
          {expression === 'serious' && (
            // Serious, official postal mouth
            <path d="M135 168 Q140 166 145 168" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {expression === 'surprised' && (
            // Tiny surprised 'o' mouth
            <circle cx="140" cy="170" r="4" fill="#782E2E" stroke="#262626" strokeWidth="2" />
          )}
          {expression === 'confused' && (
            // Wavy questioning mouth
            <path d="M133 170 Q137 166 141 170 Q145 174 147 168" stroke="#262626" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          {expression === 'bemused' && (
            // Sideways smirky line
            <path d="M136 170 Q142 168 147 166" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {expression === 'exasperated' && (
            // Wide open comedic shouting mouth
            <path
              d="M133 167 Q140 164 147 167 C148 174 132 174 133 167 Z"
              fill="#991B1B"
              stroke="#262626"
              strokeWidth="2"
            />
          )}

          {/* --- HOGWARTS-INSPIRED SCARF (Gold and Burgundy Striped) --- */}
          <g id="scarf">
            {/* Scarf wrapped snugly around neck */}
            <path
              d="M88 190 C100 205 180 205 192 190 C194 204 186 215 178 218 C158 224 122 224 102 218 C94 215 86 204 88 190 Z"
              fill="#7E1825"
              stroke="#4E0C15"
              strokeWidth="2.5"
            />
            {/* Scarf Gold Stripes */}
            <path d="M102 196 L108 220" stroke="#DDA027" strokeWidth="6" strokeLinecap="round" />
            <path d="M124 199 L126 223" stroke="#DDA027" strokeWidth="6" strokeLinecap="round" />
            <path d="M154 199 L152 223" stroke="#DDA027" strokeWidth="6" strokeLinecap="round" />
            <path d="M174 196 L168 220" stroke="#DDA027" strokeWidth="6" strokeLinecap="round" />

            {/* Scarf Hanging Tail on right */}
            <path
              d="M168 214 L176 264 L196 262 L186 212 Z"
              fill="#7E1825"
              stroke="#4E0C15"
              strokeWidth="2"
            />
            {/* Gold stripe on tail */}
            <path d="M171 230 L191 228" stroke="#DDA027" strokeWidth="6" />
            <path d="M174 248 L194 246" stroke="#DDA027" strokeWidth="6" />
            {/* Cozy Fringes */}
            <line x1="176" y1="264" x2="176" y2="272" stroke="#DDA027" strokeWidth="2" />
            <line x1="181" y1="264" x2="181" y2="273" stroke="#7E1825" strokeWidth="2" />
            <line x1="186" y1="263" x2="186" y2="272" stroke="#DDA027" strokeWidth="2" />
            <line x1="191" y1="263" x2="191" y2="273" stroke="#7E1825" strokeWidth="2" />
            <line x1="196" y1="262" x2="196" y2="271" stroke="#DDA027" strokeWidth="2" />
          </g>

          {/* --- POINTED WIZARD HAT --- */}
          <g id="wizard-hat">
            {/* Hat Brim */}
            <ellipse
              cx="140"
              cy="98"
              rx="68"
              ry="18"
              fill="#22222B"
              stroke="#131318"
              strokeWidth="3"
            />
            {/* Hat Cone with playful whimsical wizard tilt */}
            <path
              d="M92 94 C100 60 115 32 144 8 C150 5 158 12 154 22 C146 44 168 70 188 94 Z"
              fill="url(#hatGrad)"
              stroke="#131318"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Soft hat crease fold */}
            <path d="M118 64 Q135 72 152 58" stroke="#3D3D4B" strokeWidth="2.5" fill="none" />

            {/* Hat Ribbon Band (Deep Crimson & Gold Star Buckle) */}
            <path
              d="M96 93 C110 99 170 99 184 93 C186 97 182 102 180 103 C166 109 114 109 100 103 Z"
              fill="#8B1E2B"
              stroke="#59111B"
              strokeWidth="1.5"
            />
            {/* Gold Star Buckle */}
            <polygon
              points="140,94 142,99 147,99 143,102 145,107 140,104 135,107 137,102 133,99 138,99"
              fill="#F5BE41"
              stroke="#8B6310"
              strokeWidth="1"
            />
          </g>
        </g>

        {/* --- PANDAS PAWS & ENVELOPE (WHEN HELD) --- */}
        {showEnvelopeInPaws && (
          <g id="held-envelope">
            {/* Parchment Envelope Held Between Paws */}
            <g transform="translate(80, 222)">
              {/* Parchment Envelope Body */}
              <rect
                x="0"
                y="0"
                width="120"
                height="78"
                rx="4"
                fill="#F7F1E1"
                stroke="#8A7761"
                strokeWidth="2.5"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
              />

              {/* Envelope Flap Lines */}
              <path d="M0 0 L60 45 L120 0" stroke="#C4B49C" strokeWidth="2" fill="none" />
              <path d="M0 78 L48 40" stroke="#D9CCA8" strokeWidth="1.5" />
              <path d="M120 78 L72 40" stroke="#D9CCA8" strokeWidth="1.5" />

              {/* Red Wax Seal with Panda Paw Print */}
              <circle cx="60" cy="46" r="14" fill="#991B1B" stroke="#680D0D" strokeWidth="2" />
              {/* Paw Print in Seal */}
              {/* Main pad */}
              <ellipse cx="60" cy="48" rx="4.5" ry="3.5" fill="#E88282" />
              {/* 3 tiny toe beans */}
              <circle cx="55" cy="42" r="1.5" fill="#E88282" />
              <circle cx="60" cy="40.5" r="1.5" fill="#E88282" />
              <circle cx="65" cy="42" r="1.5" fill="#E88282" />
            </g>

            {/* Left Chibi White Paw holding envelope left corner */}
            <ellipse
              cx="82"
              cy="258"
              rx="15"
              ry="13"
              fill="#FFFDF9"
              stroke="#262626"
              strokeWidth="2.5"
            />
            {/* Paw pads */}
            <ellipse cx="82" cy="258" rx="6" ry="5" fill="#1C1C20" />

            {/* Right Chibi White Paw holding envelope right corner */}
            <ellipse
              cx="198"
              cy="258"
              rx="15"
              ry="13"
              fill="#FFFDF9"
              stroke="#262626"
              strokeWidth="2.5"
            />
            {/* Paw pads */}
            <ellipse cx="198" cy="258" rx="6" ry="5" fill="#1C1C20" />
          </g>
        )}
      </svg>
    </div>
  );
};
