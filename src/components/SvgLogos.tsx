import React from 'react';

type SvgProps = React.SVGProps<SVGSVGElement>;

export function BrandLogo({ className, ...props }: SvgProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width="100%" 
      height="100%" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="bamboo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D5A27" />
          <stop offset="50%" stopColor="#4E8C40" />
          <stop offset="100%" stopColor="#1E3F1A" />
        </linearGradient>
        <linearGradient id="stone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8F9499" />
          <stop offset="100%" stopColor="#555A60" />
        </linearGradient>
        <linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#AEDDDD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4EA8A8" stopOpacity="0.8" />
        </linearGradient>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F2027" floodOpacity="0.15" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#F8FAFA" rx="24" />

      <ellipse cx="250" cy="180" rx="140" ry="160" fill="none" stroke="#2D524B" strokeWidth="2.5" strokeDasharray="2000" strokeOpacity="0.3" />
      <path d="M 110 180 A 140 160 0 0 1 390 180" fill="none" stroke="#2D524B" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>

      <g id="bamboo" filter="url(#soft-shadow)">
        <path d="M 130 110 Q 133 180 135 250 L 131 250 Q 129 180 126 110 Z" fill="url(#bamboo-grad)" />
        <line x1="126" y1="140" x2="132" y2="141" stroke="#F8FAFA" strokeWidth="1.5" />
        <line x1="128" y1="180" x2="134" y2="181" stroke="#F8FAFA" strokeWidth="1.5" />
        <line x1="130" y1="215" x2="136" y2="216" stroke="#F8FAFA" strokeWidth="1.5" />
        
        <path d="M 105 160 Q 110 215 113 270 L 109 270 Q 106 215 101 160 Z" fill="url(#bamboo-grad)" />
        <line x1="102" y1="190" x2="108" y2="191" stroke="#F8FAFA" strokeWidth="1.5" />
        <line x1="105" y1="230" x2="111" y2="231" stroke="#F8FAFA" strokeWidth="1.5" />

        <path d="M 148 150 Q 146 200 144 260 L 141 260 Q 143 200 145 150 Z" fill="url(#bamboo-grad)" opacity="0.8" />

        <path d="M 128 140 Q 100 135 85 150 Q 110 150 128 141" fill="#427A3C" />
        <path d="M 131 180 Q 160 170 175 185 Q 145 185 131 181" fill="#427A3C" />
        <path d="M 104 190 Q 75 185 60 205 Q 85 205 104 191" fill="#3D7037" />
        <path d="M 107 230 Q 130 220 145 235 Q 120 235 107 231" fill="#3D7037" />
        <path d="M 129 215 Q 100 210 90 225 Q 112 225 129 216" fill="#4B8943" />
      </g>

      <g id="zen-stones" filter="url(#soft-shadow)">
        <ellipse cx="170" cy="265" rx="42" ry="18" fill="url(#stone-grad)" />
        <ellipse cx="171" cy="242" rx="30" ry="14" fill="url(#stone-grad)" />
        <ellipse cx="168" cy="223" rx="20" ry="10" fill="url(#stone-grad)" />
        
        <path d="M 145 260 Q 170 252 195 260" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
        <path d="M 153 238 Q 171 232 189 238" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
        <path d="M 157 220 Q 168 216 179 220" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      </g>

      <g id="profile" filter="url(#soft-shadow)">
        <path d="M 215 250 C 240 250 255 230 255 195 C 255 185 252 178 250 170 C 246 160 230 155 220 140 C 208 122 205 105 210 85 C 215 65 235 50 265 50 C 295 50 318 68 322 92 C 324 105 320 120 312 130 C 305 140 300 150 300 160 C 300 185 285 210 260 215 C 248 218 240 230 235 245 C 230 258 220 268 200 270" fill="none" stroke="#12352F" strokeWidth="3" strokeLinecap="round" />
        <path d="M 233 125 Q 240 130 248 126" fill="none" stroke="#12352F" strokeWidth="2.5" strokeLinecap="round" />

        <g stroke="#1F4D45" strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round">
          <path d="M 245 92 C 242 80, 258 70, 270 75" />
          <path d="M 270 75 C 282 70, 298 75, 295 90" />
          <path d="M 295 90 C 305 92, 305 108, 295 112" />
          <path d="M 295 112 C 300 120, 290 130, 280 125" />
          <path d="M 280 125 C 275 130, 260 128, 255 118" />
          <path d="M 255 118 C 245 115, 245 100, 250 95" />
          
          <path d="M 258 98 Q 275 90 286 100" />
          <path d="M 265 85 Q 270 95 280 82" />
          <path d="M 270 108 Q 285 105 290 115" />
          <path d="M 275 95 C 270 110, 260 105, 255 105" />
        </g>
      </g>

      <g id="waterfall" filter="url(#soft-shadow)">
        <path d="M 310 270 C 315 250 335 240 345 255" fill="none" stroke="#5E6368" strokeWidth="6" />
        <path d="M 345 255 C 352 245 372 242 380 258" fill="none" stroke="#4F5459" strokeWidth="8" />
        <path d="M 295 272 C 302 260 318 262 322 272" fill="none" stroke="#505559" strokeWidth="5" />

        <path d="M 342 248 C 342 258 335 264 334 275" fill="none" stroke="url(#water-grad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 348 248 C 347 257 342 266 341 275" fill="none" stroke="url(#water-grad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 336 250 C 336 258 330 265 328 275" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />

        <circle cx="250" cy="255" r="3" fill="#4EA8A8" />
        <path d="M 250 252 L 250 242" stroke="#4EA8A8" strokeWidth="1.5" strokeLinecap="round" />

        <ellipse cx="250" cy="275" rx="35" ry="10" fill="none" stroke="#4EA8A8" strokeWidth="1.2" opacity="0.7" />
        <ellipse cx="250" cy="275" rx="65" ry="17" fill="none" stroke="#4EA8A8" strokeWidth="1.8" opacity="0.4" />
        <ellipse cx="250" cy="275" rx="95" ry="24" fill="none" stroke="#4EA8A8" strokeWidth="1.2" opacity="0.2" />
        <ellipse cx="250" cy="275" rx="120" ry="30" fill="none" stroke="#4EA8A8" strokeWidth="0.8" opacity="0.1" />
      </g>

      <path d="M 285 185 Q 265 170 270 150 Q 290 165 285 185" fill="#427A3C" opacity="0.75" />
      <line x1="285" y1="185" x2="277.5" y2="167.5" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.5" />
      
      <path d="M 292 205 Q 312 195 305 175 Q 295 195 292 205" fill="#3D7037" opacity="0.75" />
      <path d="M 268 205 Q 255 190 262 175 Q 272 190 268 205" fill="#4E8C40" opacity="0.65" />

      <g id="brand-text" textAnchor="middle">
        <text x="250" y="342" fontFamily="'Inter', 'Helvetica Neue', sans-serif" fontWeight="900" fontSize="34" letterSpacing="11" fill="#12352F">SILENCIE</text>
        <text x="250" y="390" fontFamily="'Playfair Display', 'Times New Roman', serif" fontWeight="normal" fontStyle="italic" fontSize="38" fill="#2E625A">Votre Esprit</text>
        <line x1="120" y1="414" x2="380" y2="414" stroke="#D1E2E2" strokeWidth="1.5" />
        <circle cx="250" cy="414" r="5" fill="#2E625A" />
        <text x="250" y="442" fontFamily="'JetBrains Mono', 'Courier New', monospace" fontWeight="700" fontSize="15" letterSpacing="4.5" fill="#5F7673">• GÉRER LA PANIQUE •</text>
        <path d="M 90 435 Q 75 425 65 435 Q 80 445 90 435" fill="#5F7673" opacity="0.5" />
        <path d="M 410 435 Q 425 425 435 435 Q 420 445 410 435" fill="#5F7673" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Bonus1Svg({ className, ...props }: SvgProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 450" 
      width="100%" 
      height="100%" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#021E2D" />
          <stop offset="100%" stopColor="#074D6E" />
        </linearGradient>
        <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="100%" stopColor="#4FACFE" />
        </linearGradient>
        <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bg-1)" rx="24" />

      <g opacity="0.1" stroke="#00F2FE" strokeWidth="1">
        <line x1="50" y1="0" x2="50" y2="450" />
        <line x1="150" y1="0" x2="150" y2="450" />
        <line x1="250" y1="0" x2="250" y2="450" />
        <line x1="350" y1="0" x2="350" y2="450" />
        <line x1="450" y1="0" x2="450" y2="450" />
        <line x1="550" y1="0" x2="550" y2="450" />
        <line x1="650" y1="0" x2="650" y2="450" />
        <ellipse cx="600" cy="225" rx="300" ry="300" fill="none" strokeWidth="1.5" />
        <ellipse cx="600" cy="225" rx="200" ry="200" fill="none" strokeWidth="1.5" />
      </g>

      <g transform="translate(80, 50)">
        <rect x="0" y="0" width="220" height="340" rx="20" fill="#0A0F14" stroke="#4FACFE" strokeWidth="2.5" />
        <rect x="10" y="10" width="200" height="320" rx="14" fill="#03111A" />
        <rect x="18" y="20" width="184" height="160" rx="8" fill="#062235" />
        
        <g transform="translate(110, 85)" stroke="#00F2FE" strokeWidth="3.5" fill="none" strokeLinecap="round">
          <path d="M -30 15 A 32 32 0 0 1 30 15" />
          <rect x="-36" y="10" width="10" height="18" rx="3" fill="#00F2FE" stroke="none" />
          <rect x="26" y="10" width="10" height="18" rx="3" fill="#00F2FE" stroke="none" />
          <path d="M -31 20 L -31 28 AM -31 24 C -15 36, 15 36, 31 24" strokeWidth="1.5" strokeDasharray="2,2" />
        </g>
        <path d="M 40 150 Q 60 130 80 150 T 120 150 T 160 150" fill="none" stroke="#4FACFE" strokeWidth="2" />

        <text x="110" y="210" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" textAnchor="middle" letterSpacing="1">BONUS AUDIOS</text>
        <text x="110" y="232" fill="#88A0B0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="9" textAnchor="middle" letterSpacing="2">CALME IMMÉDIAT</text>
        
        <circle cx="110" cy="275" r="22" fill="#00F2FE" opacity="0.15" />
        <circle cx="110" cy="275" r="16" fill="url(#neon-glow)" />
        <polygon points="106,267 118,275 106,283" fill="#0A0F14" />
      </g>

      <g transform="translate(380, 210)" filter="url(#glow-effect)">
        <path d="M 40 -80 C 80 -150 140 -120 180 -140 Q 220 -160 260 -70" fill="none" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
        <path d="M 10 -40 C 60 -100 120 -50 160 -90 Q 200 -130 290 -20" fill="none" stroke="#4FACFE" strokeWidth="5" strokeLinecap="round" />
        <path d="M 30 10 C 90 -40 140 30 200 -30 Q 250 -80 310 30" fill="none" stroke="#00F2FE" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </g>

      <circle cx="430" cy="330" r="4" fill="#00F2FE" filter="url(#glow-effect)" />
      <circle cx="560" cy="80" r="7" fill="#4FACFE" filter="url(#glow-effect)" />
      <circle cx="680" cy="180" r="3" fill="#00F2FE" />

      <g transform="translate(380, 80)">
        <rect x="0" y="0" width="105" height="26" rx="13" fill="#00F2FE" fillOpacity="0.1" stroke="#00F2FE" strokeWidth="1" />
        <text x="52.5" y="17" fill="#00F2FE" fontFamily="'JetBrains Mono', monospace" fontWeight="950" fontSize="9" textAnchor="middle" letterSpacing="1">AUDIO FLAC 320K</text>
      </g>

      <g transform="translate(380, 130)">
        <text x="0" y="0" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" letterSpacing="1">CADEAU #1</text>
        <text x="0" y="32" fill="url(#neon-glow)" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20">SESSIONS CALME RAPIDE</text>
        <text x="0" y="60" fill="#E2E8F0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12" opacity="0.8">5 minutes chrono pour stopper net le surmenage mental.</text>
      </g>

      <g transform="translate(380, 240)">
        <text x="0" y="44" fill="#00F2FE" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fontSize="44" filter="url(#glow-effect)">05:00</text>
        <text x="140" y="40" fill="#88A0B0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="11" letterSpacing="1">ACTIVATE RECOVERY<tspan x="140" dy="16">NEURAL SYSTEM</tspan></text>
      </g>
    </svg>
  );
}

export function Bonus2Svg({ className, ...props }: SvgProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 450" 
      width="100%" 
      height="100%" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="bg-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#111B24" />
          <stop offset="100%" stopColor="#213E4A" />
        </linearGradient>
        <linearGradient id="coral-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5F6D" />
          <stop offset="100%" stopColor="#FFC371" />
        </linearGradient>
        <filter id="shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bg-2)" rx="24" />

      <g opacity="0.08" stroke="#FF5F6D" strokeWidth="1">
        <line x1="100" y1="0" x2="100" y2="450" />
        <line x1="300" y1="0" x2="300" y2="450" />
        <line x1="500" y1="0" x2="500" y2="450" />
        <line x1="700" y1="0" x2="700" y2="450" />
        <circle cx="200" cy="225" r="155" fill="none" strokeWidth="1.5" />
        <circle cx="200" cy="225" r="240" fill="none" strokeWidth="1" />
      </g>

      <g transform="translate(90, 50)" filter="url(#shadow-blur)">
        <rect x="0" y="0" width="210" height="340" rx="12" fill="#E6EEF4" stroke="#FFF" strokeWidth="3" />
        <rect x="65" y="-8" width="80" height="28" rx="6" fill="#A0B3C1" />
        <rect x="85" y="-3" width="40" height="10" rx="2" fill="#718898" />
        <circle cx="105" cy="12" r="3" fill="#4B5F6C" />

        <g transform="translate(18, 45)">
          <text x="0" y="15" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="11" fill="#C23B3B" letterSpacing="1.5">PROTOCOLE CLASSIFIÉ</text>
          <text x="0" y="32" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#1B2B35">URGENCE PANIQUE</text>
          <line x1="0" y1="42" x2="174" y2="42" stroke="#BDC9D3" strokeWidth="2" />

          <g transform="translate(0, 58)">
            <circle cx="10" cy="10" r="10" fill="#FF5F6D" />
            <text x="10" y="14" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="10" fill="#FFF" textAnchor="middle">1</text>
            <text x="28" y="10" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8" fill="#5F717C">MOUVEMENT INVERSE</text>
            <rect x="28" y="14" width="130" height="4" rx="2" fill="#BDC9D3" opacity="0.6" />
            <rect x="28" y="21" width="90" height="4" rx="2" fill="#BDC9D3" opacity="0.4" />
          </g>

          <g transform="translate(0, 115)">
            <circle cx="10" cy="10" r="10" fill="#FF8C37" />
            <text x="10" y="14" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="10" fill="#FFF" textAnchor="middle">2</text>
            <text x="28" y="10" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8" fill="#5F717C">RECALIBRAGE PHYSIQUE</text>
            <rect x="28" y="14" width="120" height="4" rx="2" fill="#BDC9D3" opacity="0.6" />
            <rect x="28" y="21" width="110" height="4" rx="2" fill="#BDC9D3" opacity="0.4" />
          </g>

          <g transform="translate(0, 172)">
            <circle cx="10" cy="10" r="10" fill="#FFC371" />
            <text x="10" y="14" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="10" fill="#FFF" textAnchor="middle">3</text>
            <text x="28" y="10" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8" fill="#5F717C">VERROUILLAGE VAGAL</text>
            <rect x="28" y="14" width="140" height="4" rx="2" fill="#BDC9D3" opacity="0.6" />
            <rect x="28" y="21" width="70" height="4" rx="2" fill="#BDC9D3" opacity="0.4" />
          </g>

          <path d="M 12 250 L 22 232 L 2 232 Z" fill="#FF5F6D" />
          <rect x="11" y="236" width="2" height="5" fill="#FFEFEF" />
          <circle cx="12" cy="245" r="1.2" fill="#FFEFEF" />
          <text x="30" y="244" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fontSize="8" fill="#71838F" letterSpacing="0.5">FICHE REFLEXE CLASSIQUE</text>
        </g>
      </g>

      <g transform="translate(420, 80)">
        <rect x="0" y="0" width="125" height="26" rx="13" fill="#FF5F6D" fillOpacity="0.15" stroke="#FF5F6D" strokeWidth="1.2" />
        <text x="62.5" y="17" fill="#FF5F6D" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fontSize="9" textAnchor="middle" letterSpacing="1">REPONSE DE SECOURS</text>
        
        <text x="0" y="65" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" letterSpacing="1">CADEAU #2</text>
        <text x="0" y="97" fill="url(#coral-glow)" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20">FICHE PROTOCOLE D'URGENCE</text>
        <text x="0" y="125" fill="#E2E8F0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12" opacity="0.8">Le guide d'action immédiate à regarder en cas de crise imminente.</text>
      </g>

      <g transform="translate(420, 250)">
        <circle cx="34" cy="34" r="54" fill="none" stroke="#FF5F6D" strokeWidth="1" opacity="0.1" />
        <circle cx="34" cy="34" r="44" fill="none" stroke="#FF5F6D" strokeWidth="1" opacity="0.25" />
        <circle cx="34" cy="34" r="34" fill="url(#coral-glow)" opacity="0.9" />
        
        <path d="M 22 34 L 30 42 L 48 24" fill="none" stroke="#111B24" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        <g transform="translate(110, 10)" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="12" fill="#E2E8F0">
          <text x="0" y="10">• Bloquer l'hyperventilation réactive en 12 secondes</text>
          <text x="0" y="32">• Actionner le frein moteur ralentisseur cardiaque</text>
        </g>
      </g>
    </svg>
  );
}

export function Bonus3Svg({ className, ...props }: SvgProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 450" 
      width="100%" 
      height="100%" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="bg-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#021C15" />
          <stop offset="100%" stopColor="#0F5C45" />
        </linearGradient>
        <linearGradient id="emerald-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="soft-depth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#010A08" floodOpacity="0.5" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bg-3)" rx="24" />

      <g opacity="0.08" stroke="#10B981" strokeWidth="1.2">
        <ellipse cx="650" cy="100" rx="100" ry="100" fill="none" />
        <ellipse cx="650" cy="100" rx="180" ry="180" fill="none" />
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="250" x2="800" y2="250" />
      </g>

      <g transform="translate(100, 50)" filter="url(#soft-depth)">
        <rect x="-8" y="10" width="10" height="320" rx="4" fill="#021F17" />
        <rect x="0" y="6" width="200" height="328" rx="8" fill="#113F32" stroke="#46AC94" strokeWidth="2.5" />
        <rect x="10" y="16" width="180" height="308" rx="5" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
        
        <g transform="translate(100, 105)">
          <circle cx="0" cy="0" r="35" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="#34D399" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="12" fill="#10B981" opacity="0.3" />
          
          <path d="M 0 -12 Q -12 0 0 12 Q 12 0 0 -12" fill="#10B981" />
          <line x1="0" y1="10" x2="0" y2="-10" stroke="#113F32" strokeWidth="1.2" />
        </g>

        <text x="100" y="195" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12" textAnchor="middle" letterSpacing="3.5">MÉDITATIONS</text>
        <text x="100" y="215" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="11" textAnchor="middle" letterSpacing="3.5">GUIDÉES</text>
        <text x="100" y="240" fill="#34D399" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="8" textAnchor="middle" letterSpacing="1.5">ANTI-SURPENSÉE</text>
        <text x="100" y="285" fill="#78AF9F" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="7" textAnchor="middle">REPROGRAMMATION NEURONALE</text>
      </g>

      <g transform="translate(390, 80)">
        <rect x="0" y="0" width="115" height="26" rx="13" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" />
        <text x="57.5" y="17" fill="#10B981" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fontSize="9" textAnchor="middle" letterSpacing="1">ZEN PLEINE CONSCIENCE</text>
        
        <text x="0" y="65" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" letterSpacing="1">CADEAU #3</text>
        <text x="0" y="97" fill="url(#emerald-glow)" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20">MÉDITATIONS ANTI-SURPENSÉE</text>
        <text x="0" y="125" fill="#E2E8F0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12" opacity="0.8">Faites taire définitivement le brouhaha cérébral et la rumination nocturne.</text>
      </g>

      <g transform="translate(390, 240)">
        <circle cx="44" cy="44" r="36" fill="none" stroke="#10B981" strokeWidth="2.5" opacity="0.3" />
        <path d="M 44 8 A 36 36 0 0 1 80 44" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
        
        <line x1="44" y1="44" x2="44" y2="20" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="44" y1="44" x2="62" y2="44" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="44" r="5" fill="#34D399" />
        
        <g transform="translate(110, 18)" fontFamily="'Inter', sans-serif" fill="#E2E8F0" fontWeight="800" fontSize="12">
          <text x="0" y="10">• Séance courte de 10 min basée sur l'imagerie somatique</text>
          <text x="0" y="32">• Dissoudre les schémas obsessionnels de pensée répétitive</text>
        </g>
      </g>
    </svg>
  );
}

export function Bonus4Svg({ className, ...props }: SvgProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 450" 
      width="100%" 
      height="100%" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="bg-4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B1736" />
          <stop offset="100%" stopColor="#3D2063" />
        </linearGradient>
        <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="soft-book-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#080512" floodOpacity="0.6" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bg-4)" rx="24" />

      <g opacity="0.12" fill="#C084FC">
        <circle cx="500" cy="80" r="1.5" />
        <circle cx="620" cy="140" r="2.5" />
        <circle cx="430" cy="280" r="1.2" />
        <circle cx="710" cy="220" r="2.2" />
        <circle cx="580" cy="350" r="1.6" />
        <circle cx="480" cy="190" r="3" />
      </g>

      <g transform="translate(100, 50)" filter="url(#soft-book-shadow)">
        <rect x="-6" y="8" width="12" height="324" rx="4" fill="#140D24" />
        <rect x="0" y="4" width="195" height="332" rx="10" fill="#2E1C4B" stroke="#8B5CF6" strokeWidth="2.5" />
        <rect x="8" y="12" width="179" height="316" rx="6" fill="none" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.5" />
        
        <g transform="translate(97.5, 95)" textAnchor="middle">
          <path d="M -12 -12 Q 2 -12 2 2 Q 2 16 -12 16 Q -26 16 -26 2 Q -26 -12 -12 -12 M -8 -6 Q -13 -6 -13 -1 Q -13 4 -8 4 Q -3 4 -3 -1 Q -3 -6 -8 -6" fill="#A78BFA" fillOpacity="0.25" />
          <path d="M 0 -15 A 15 15 0 0 1 15 15 A 15 15 0 0 1 0 30 A 12 12 0 0 0 10 15 A 12 12 0 0 0 0 -15" fill="#C084FC" />
          
          <text x="0" y="85" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" letterSpacing="3">JOURNAL</text>
          <text x="0" y="103" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="9" letterSpacing="1">DE DECHARGE</text>
          <text x="0" y="125" fill="#C084FC" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="8" letterSpacing="1">MENTAL SPIRIT</text>
          <line x1="-50" y1="145" x2="50" y2="145" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.5" />
        </g>

        <text x="97.5" y="290" fill="#9CA3AF" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="7" textAnchor="middle">THERAPEUTIC EMOTIONAL RELEASE</text>
      </g>

      <g transform="translate(390, 80)">
        <rect x="0" y="0" width="112" height="26" rx="13" fill="#8B5CF6" fillOpacity="0.15" stroke="#9F7AEA" strokeWidth="1.2" />
        <text x="56" y="17" fill="#C084FC" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fontSize="9" textAnchor="middle" letterSpacing="1.2">COGNITIVE WRITING</text>
        
        <text x="0" y="65" fill="#FFFFFF" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" letterSpacing="1">CADEAU #4</text>
        <text x="0" y="97" fill="url(#purple-glow)" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20">JOURNAL DE DECHARGE MENTALE</text>
        <text x="0" y="125" fill="#E2E8F0" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="12" opacity="0.8">Libérez les émotions bloquées et videz votre sac mental avant le coucher.</text>
      </g>

      <g transform="translate(390, 240)">
        <g transform="translate(10, 25)" stroke="#A78BFA" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M 0 0 C 15 -15 25 -5 45 -25 Q 55 -35 70 -50" />
          <path d="M 3 3 Q -5 12 -12 24 L -18 36 L -8 30 Q 5 24 15 15" strokeWidth="1.5" />
          <path d="M -12 24 Q -45 35 -65 14 T -105 24" stroke="url(#purple-glow)" strokeWidth="4.5" opacity="0.6" strokeDasharray="1,1" />
        </g>

        <g transform="translate(110, 18)" fontFamily="'Inter', sans-serif" fill="#E2E8F0" fontWeight="800" fontSize="12">
          <text x="0" y="10">• Désamorcer l'anxiété chronique par l'écriture rationnelle</text>
          <text x="0" y="32">• Vider la boîte noire de vos ruminations pour un sommeil serein</text>
        </g>
      </g>
    </svg>
  );
}
