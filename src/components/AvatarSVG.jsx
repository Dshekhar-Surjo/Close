// Layered SVG avatar system
// Each layer is a pure SVG path group so it composites cleanly

export const SKIN_TONES = [
  '#FDDBB4', '#F5C89A', '#EDAC74', '#D4845A', '#C06E3A',
  '#A55B28', '#8D4A1E', '#6B3418', '#4A2412', '#2C1208',
]

export const HAIR_COLORS = [
  '#1A1A1A', '#3D2B1F', '#6B3A2A', '#8B5E3C', '#C19A6B',
  '#D4A017', '#E8E0C8', '#A32D2D', '#C4547A', '#7B4BC4',
  '#3A89C4', '#5AAF6B',
]

export const TOP_COLORS = [
  '#185FA5', '#0F6E56', '#BA7517', '#D4537E', '#534AB7',
  '#A32D2D', '#1A1A2E', '#2D5016', '#7B4BC4', '#C47A1F',
  '#2C7873', '#8B2252',
]

export const ACCESSORY_COLORS = [
  '#1A1A1A', '#8B0000', '#1A3A5C', '#2D5016',
  '#6B3A2A', '#FFD700', '#C0C0C0', '#FF6B6B',
]

// ─── Face shapes ─────────────────────────────────────────────────────────────
export const FACE_SHAPES = ['oval', 'round', 'square', 'heart', 'angular']

const FACE_PATHS = {
  oval:    (skin) => <ellipse cx="24" cy="26" rx="11" ry="13" fill={skin} />,
  round:   (skin) => <ellipse cx="24" cy="26" rx="12" ry="12" fill={skin} />,
  square:  (skin) => <path d="M13 17 Q14 13 24 13 Q34 13 35 17 L35 35 Q34 39 24 39 Q14 39 13 35 Z" fill={skin} />,
  heart:   (skin) => <path d="M24 38 Q12 31 12 21 Q12 13 18 12 Q22 11 24 17 Q26 11 30 12 Q36 13 36 21 Q36 31 24 38 Z" fill={skin} />,
  angular: (skin) => <path d="M15 17 Q15 12 24 12 Q33 12 33 17 L34 29 Q31 39 24 39 Q17 39 14 29 Z" fill={skin} />,
}

// ─── Hair styles ─────────────────────────────────────────────────────────────
export const HAIR_STYLES = [
  'short', 'long', 'curly', 'braids', 'bun',
  'afro', 'ponytail', 'waves', 'pixie', 'locs',
  'mohawk', 'bob', 'sideswept', 'spacebuns',
]

const HAIR_PATHS = {
  short: (color) => (
    <g>
      <ellipse cx="24" cy="19" rx="13" ry="8" fill={color} />
      <rect x="11" y="18" width="26" height="6" fill={color} />
    </g>
  ),
  long: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={color} />
      <rect x="11" y="17" width="5" height="32" rx="3" fill={color} />
      <rect x="32" y="17" width="5" height="32" rx="3" fill={color} />
    </g>
  ),
  curly: (color) => (
    <g>
      <ellipse cx="24" cy="16" rx="14" ry="9" fill={color} />
      <circle cx="13" cy="19" r="5" fill={color} />
      <circle cx="35" cy="19" r="5" fill={color} />
      <circle cx="18" cy="11" r="5" fill={color} />
      <circle cx="30" cy="11" r="5" fill={color} />
      <circle cx="24" cy="8"  r="5" fill={color} />
    </g>
  ),
  braids: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="8" fill={color} />
      <rect x="13" y="18" width="4" height="36" rx="2" fill={color} />
      <rect x="22" y="18" width="4" height="40" rx="2" fill={color} />
      <rect x="31" y="18" width="4" height="36" rx="2" fill={color} />
    </g>
  ),
  bun: (color) => (
    <g>
      <ellipse cx="24" cy="21" rx="12" ry="7" fill={color} />
      <rect x="12" y="20" width="24" height="6" fill={color} />
      <circle cx="24" cy="9" r="9" fill={color} />
    </g>
  ),
  afro: (color) => (
    <g>
      <circle cx="24" cy="16" r="16" fill={color} />
      <circle cx="11" cy="22" r="8"  fill={color} />
      <circle cx="37" cy="22" r="8"  fill={color} />
      <circle cx="24" cy="4"  r="7"  fill={color} />
    </g>
  ),
  ponytail: (color) => (
    <g>
      <ellipse cx="24" cy="20" rx="13" ry="8" fill={color} />
      <rect x="11" y="19" width="26" height="6" fill={color} />
      <ellipse cx="24" cy="5" rx="5" ry="10" fill={color} />
      <rect x="21" y="12" width="6" height="9" fill={color} />
    </g>
  ),
  waves: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={color} />
      <path d="M11 20 Q7 28 11 34 Q7 40 11 46 Q9 52 12 56"
        stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M37 20 Q41 28 37 34 Q41 40 37 46 Q39 52 36 56"
        stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  ),
  pixie: (color) => (
    <g>
      <ellipse cx="24" cy="20" rx="12" ry="7" fill={color} />
      <rect x="12" y="19" width="24" height="5" fill={color} />
      <path d="M17 19 Q21 11 28 13" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  ),
  locs: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="8" fill={color} />
      {[13, 16, 19, 22, 25, 28, 31, 34].map((x, i) => (
        <rect key={x} x={x} y="20" width="3" height={20 + (i % 3) * 7} rx="1.5" fill={color} />
      ))}
    </g>
  ),
  mohawk: (color) => (
    <g>
      <rect x="20" y="3" width="8" height="22" rx="4" fill={color} />
      <rect x="11" y="20" width="9" height="4" rx="2" fill={color} />
      <rect x="28" y="20" width="9" height="4" rx="2" fill={color} />
    </g>
  ),
  bob: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={color} />
      <rect x="11" y="17" width="5" height="20" rx="2" fill={color} />
      <rect x="32" y="17" width="5" height="20" rx="2" fill={color} />
      <rect x="11" y="35" width="26" height="4" rx="2" fill={color} />
    </g>
  ),
  sideswept: (color) => (
    <g>
      <ellipse cx="24" cy="18" rx="13" ry="8" fill={color} />
      <rect x="11" y="18" width="26" height="5" fill={color} />
      <rect x="32" y="17" width="6" height="30" rx="3" fill={color} />
      <path d="M22 18 Q32 11 37 8" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  ),
  spacebuns: (color) => (
    <g>
      <ellipse cx="24" cy="21" rx="13" ry="7" fill={color} />
      <rect x="11" y="20" width="26" height="5" fill={color} />
      <circle cx="13" cy="12" r="7" fill={color} />
      <circle cx="35" cy="12" r="7" fill={color} />
    </g>
  ),
}

// ─── Outfit styles ────────────────────────────────────────────────────────────
export const TOP_STYLES = [
  'casual', 'formal', 'sporty', 'hoodie',
  'dress', 'jacket', 'tank', 'turtleneck',
  'crop', 'suit',
]

// Each top fn receives (color, gender). Gender can be 'feminine'|'masculine'|'neutral'|'fluid'.
// Feminine variants are more fitted/flared; masculine variants are broader/boxier.
const TOPS = {
  casual: (color, g) => g === 'feminine'
    ? <g>
        <path d="M14 38 Q14 34 24 34 Q34 34 34 38 L35 64 Q30 66 24 66 Q18 66 13 64 Z" fill={color} />
        <path d="M13 64 Q18 70 24 70 Q30 70 35 64" fill={color} />
      </g>
    : <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />,

  formal: (color, g) => g === 'feminine'
    ? <g>
        {/* Fitted blouse */}
        <path d="M15 38 Q15 36 24 36 Q33 36 33 38 L34 64 Q29 66 24 66 Q19 66 14 64 Z" fill={color} />
        {/* V-neck detail */}
        <path d="M20 38 L24 46 L28 38" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <rect x="22" y="50" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />
        <rect x="22" y="55" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />
      </g>
    : <g>
        {/* Dress shirt */}
        <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />
        <rect x="21" y="38" width="6" height="26" fill="rgba(255,255,255,0.15)" />
        <rect x="22" y="44" width="4" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
        <rect x="22" y="50" width="4" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
        {/* Tie */}
        <path d="M23 38 L22.5 48 L24 51 L25.5 48 L25 38 Z" fill="#A32D2D" opacity="0.9" />
      </g>,

  sporty: (color, g) => g === 'feminine'
    ? <g>
        {/* Fitted jersey */}
        <path d="M15 38 Q15 36 24 36 Q33 36 33 38 L33 60 Q29 63 24 63 Q19 63 15 60 Z" fill={color} />
        <path d="M15 44 L33 44" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        {/* Mini skirt flare */}
        <path d="M15 60 Q12 64 10 68 L38 68 Q36 64 33 60 Z" fill={color} />
      </g>
    : <g>
        <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />
        <rect x="12" y="44" width="24" height="3" fill="rgba(255,255,255,0.25)" />
        <rect x="12" y="56" width="24" height="3" fill="rgba(255,255,255,0.25)" />
      </g>,

  hoodie: (color, g) => g === 'feminine'
    ? <g>
        {/* Cropped hoodie */}
        <rect x="13" y="38" width="22" height="20" rx="5" fill={color} />
        <path d="M18 38 Q24 46 30 38" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
        <rect x="20" y="48" width="8" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      </g>
    : <g>
        <rect x="11" y="38" width="26" height="26" rx="5" fill={color} />
        <path d="M18 38 Q24 48 30 38" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
        <rect x="20" y="50" width="8" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      </g>,

  dress: (color) => (
    // Always feminine regardless of gender setting — full A-line dress
    <g>
      <rect x="16" y="38" width="16" height="10" rx="3" fill={color} />
      {/* A-line skirt */}
      <path d="M13 48 L9 68 L39 68 L35 48 Z" fill={color} />
      {/* Waist seam */}
      <rect x="13" y="47" width="22" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
    </g>
  ),

  jacket: (color, g) => g === 'feminine'
    ? <g>
        {/* Blazer - fitted */}
        <path d="M14 38 Q14 35 24 35 Q34 35 34 38 L34 64 Q29 66 24 66 Q19 66 14 64 Z" fill={color} />
        <path d="M20 38 L24 46 L28 38" fill="rgba(255,255,255,0.25)" />
        <circle cx="24" cy="54" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="24" cy="60" r="1" fill="rgba(255,255,255,0.4)" />
      </g>
    : <g>
        <rect x="11" y="38" width="26" height="26" rx="4" fill={color} />
        <path d="M20 38 L24 48 L28 38" fill="rgba(255,255,255,0.2)" />
        <circle cx="24" cy="52" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="24" cy="57" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="24" cy="62" r="1" fill="rgba(255,255,255,0.4)" />
      </g>,

  tank: (color, g) => g === 'feminine'
    ? <g>
        {/* Fitted tank with wider straps */}
        <rect x="15" y="38" width="18" height="22" rx="3" fill={color} />
        <rect x="15" y="34" width="5" height="7" rx="2.5" fill={color} />
        <rect x="28" y="34" width="5" height="7" rx="2.5" fill={color} />
        {/* Waist taper */}
        <path d="M15 55 Q24 58 33 55 L33 60 Q24 63 15 60 Z" fill={color} />
      </g>
    : <g>
        <rect x="16" y="38" width="16" height="26" rx="3" fill={color} />
        <rect x="16" y="34" width="4" height="7" rx="2" fill={color} />
        <rect x="28" y="34" width="4" height="7" rx="2" fill={color} />
      </g>,

  turtleneck: (color, g) => g === 'feminine'
    ? <g>
        {/* Fitted turtleneck */}
        <path d="M15 38 Q15 35 24 35 Q33 35 33 38 L33 62 Q29 65 24 65 Q19 65 15 62 Z" fill={color} />
        <rect x="18" y="32" width="12" height="9" rx="5" fill={color} />
      </g>
    : <g>
        <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />
        <rect x="18" y="33" width="12" height="9" rx="5" fill={color} />
      </g>,

  crop: (color, g) => g === 'feminine'
    ? <g>
        {/* Cropped with midriff gap visible */}
        <rect x="13" y="38" width="22" height="12" rx="4" fill={color} />
        {/* Straps hint */}
        <rect x="15" y="34" width="4" height="6" rx="2" fill={color} />
        <rect x="29" y="34" width="4" height="6" rx="2" fill={color} />
      </g>
    : <rect x="13" y="38" width="22" height="14" rx="4" fill={color} />,

  suit: (color, g) => g === 'feminine'
    ? <g>
        {/* Pantsuit */}
        <path d="M14 38 Q14 35 24 35 Q34 35 34 38 L34 64 Q29 66 24 66 Q19 66 14 64 Z" fill={color} />
        <path d="M20 38 L24 46 L28 38" fill={color} stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
        <path d="M20 38 L24 46 L28 38" fill="rgba(255,255,255,0.5)" />
        {/* Lapels */}
        <path d="M19 38 Q17 44 18 50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
        <path d="M29 38 Q31 44 30 50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
      </g>
    : <g>
        {/* Classic suit with lapels */}
        <rect x="11" y="38" width="26" height="26" rx="4" fill={color} />
        <path d="M21 38 L17 50 L24 48 L31 50 L27 38"
          fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <path d="M21 38 L24 48 L27 38" fill="rgba(255,255,255,0.55)" />
        {/* Tie */}
        <path d="M23 38 L22.5 48 L24 51 L25.5 48 L25 38 Z" fill="#A32D2D" opacity="0.9" />
        {/* Lapel lines */}
        <path d="M18 42 Q17 48 18 54" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
        <path d="M30 42 Q31 48 30 54" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
      </g>,
}

// ─── Accessories ──────────────────────────────────────────────────────────────
export const EXTRAS_OPTIONS = [
  'Glasses', 'Sunglasses', 'Cap', 'Beanie',
  'Earrings', 'Beard', 'Freckles', 'Blush',
]

const ACCESSORY_RENDERERS = {
  Glasses: () => (
    <g>
      <rect x="14" y="21.5" width="8" height="5.5" rx="2.5"
        stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
      <rect x="26" y="21.5" width="8" height="5.5" rx="2.5"
        stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
      <line x1="22" y1="24.3" x2="26" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
      <line x1="10" y1="24.3" x2="14" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
      <line x1="34" y1="24.3" x2="38" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
    </g>
  ),
  Sunglasses: () => (
    <g>
      <rect x="13" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.75)" />
      <rect x="25" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.75)" />
      <line x1="23" y1="24.3" x2="25" y2="24.3" stroke="#555" strokeWidth="0.8" />
      <line x1="10" y1="24.3" x2="13" y2="24.3" stroke="#555" strokeWidth="0.8" />
      <line x1="35" y1="24.3" x2="38" y2="24.3" stroke="#555" strokeWidth="0.8" />
    </g>
  ),
  Cap: (_hair, accentColor) => (
    <g>
      <path d="M11 20 Q12 10 24 9 Q36 10 37 20 Z" fill={accentColor || '#222'} />
      <rect x="8" y="18.5" width="18" height="3.5" rx="1.5" fill={accentColor ? accentColor + 'dd' : '#111'} />
      <circle cx="24" cy="10" r="2" fill="rgba(255,255,255,0.3)" />
    </g>
  ),
  Beanie: (_hair, accentColor) => (
    <g>
      <path d="M11 22 Q11 9 24 8 Q37 9 37 22 Z" fill={accentColor || '#444'} />
      <rect x="11" y="20" width="26" height="4" rx="2" fill={accentColor || '#444'} />
      <circle cx="24" cy="8" r="3.5" fill={accentColor || '#444'} />
      <line x1="16" y1="14" x2="16" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="20" y1="12" x2="20" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="24" y1="11" x2="24" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="28" y1="12" x2="28" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="32" y1="14" x2="32" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </g>
  ),
  Earrings: () => (
    <g>
      <circle cx="13" cy="29" r="2" fill="#FFD700" />
      <circle cx="35" cy="29" r="2" fill="#FFD700" />
    </g>
  ),
  Beard: (hairColor) => (
    <path d="M15 33 Q15 42 24 44 Q33 42 33 33" fill={hairColor || '#3C2C1E'} />
  ),
  Freckles: () => (
    <g>
      <circle cx="19" cy="27"   r="0.9" fill="rgba(0,0,0,0.2)"  />
      <circle cx="22" cy="26"   r="0.9" fill="rgba(0,0,0,0.2)"  />
      <circle cx="26" cy="26"   r="0.9" fill="rgba(0,0,0,0.2)"  />
      <circle cx="29" cy="27"   r="0.9" fill="rgba(0,0,0,0.2)"  />
      <circle cx="20" cy="29.5" r="0.7" fill="rgba(0,0,0,0.15)" />
      <circle cx="28" cy="29.5" r="0.7" fill="rgba(0,0,0,0.15)" />
      <circle cx="24" cy="28"   r="0.7" fill="rgba(0,0,0,0.15)" />
    </g>
  ),
  Blush: () => (
    <g>
      <circle cx="17" cy="28" r="4" fill="rgba(255,100,100,0.2)" />
      <circle cx="31" cy="28" r="4" fill="rgba(255,100,100,0.2)" />
    </g>
  ),
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
export const AVATAR_DEFAULTS = {
  skinIndex:           0,
  faceShapeIndex:      0,
  hairStyle:           'short',
  hairColorIndex:      0,
  topStyle:            'casual',
  topColorIndex:       0,
  accessoryColorIndex: 0,
  gender:              'neutral',
  build:               'average',
}

// Build → horizontal body scale (centred on x=24)
const BUILD_SCALE = { slim: 0.78, average: 1, athletic: 1.12, plus: 1.3 }

// ─── Component ────────────────────────────────────────────────────────────────
export default function AvatarSVG({ config = {}, extras = [], size = 64 }) {
  const cfg        = { ...AVATAR_DEFAULTS, ...config }
  const skin       = SKIN_TONES[cfg.skinIndex]           ?? SKIN_TONES[0]
  const hairColor  = HAIR_COLORS[cfg.hairColorIndex]     ?? HAIR_COLORS[0]
  const topColor   = TOP_COLORS[cfg.topColorIndex]       ?? TOP_COLORS[0]
  const accentColor = ACCESSORY_COLORS[cfg.accessoryColorIndex] ?? ACCESSORY_COLORS[0]

  const faceShape  = FACE_SHAPES[cfg.faceShapeIndex] ?? 'oval'
  const faceFn     = FACE_PATHS[faceShape]
  const hairFn     = HAIR_PATHS[cfg.hairStyle] ?? HAIR_PATHS.short
  const topFn      = TOPS[cfg.topStyle]        ?? TOPS.casual
  const bodyScale  = BUILD_SCALE[cfg.build]    ?? 1
  const bodyXform  = `translate(24,0) scale(${bodyScale},1) translate(-24,0)`

  const headwear    = extras.filter(e => e === 'Cap' || e === 'Beanie')
  const otherExtras = extras.filter(e => e !== 'Cap' && e !== 'Beanie')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hair behind head */}
      {hairFn(hairColor)}

      {/* Head */}
      {faceFn(skin)}

      {/* Blush (behind other face details) */}
      {extras.includes('Blush') && ACCESSORY_RENDERERS.Blush()}

      {/* Eyes */}
      <circle cx="20" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />
      <circle cx="28" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />

      {/* Gender — feminine: eyelashes */}
      {(cfg.gender === 'feminine' || cfg.gender === 'non-binary') && (
        <g stroke="rgba(0,0,0,0.45)" strokeWidth="0.7" strokeLinecap="round">
          <line x1="18.5" y1="22.8" x2="18"   y2="21.8" />
          <line x1="20"   y1="22.3" x2="20"   y2="21.3" />
          <line x1="21.5" y1="22.8" x2="21.8" y2="21.8" />
          <line x1="26.5" y1="22.8" x2="26.2" y2="21.8" />
          <line x1="28"   y1="22.3" x2="28"   y2="21.3" />
          <line x1="29.5" y1="22.8" x2="30"   y2="21.8" />
        </g>
      )}

      {/* Gender — masculine: thicker brows */}
      {cfg.gender === 'masculine' && (
        <g>
          <rect x="17" y="20.5" width="6.5" height="1.5" rx="0.75" fill="rgba(0,0,0,0.35)" />
          <rect x="24.5" y="20.5" width="6.5" height="1.5" rx="0.75" fill="rgba(0,0,0,0.35)" />
        </g>
      )}

      {/* Smile */}
      <path d="M21 29 Q24 32 27 29"
        stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Freckles */}
      {extras.includes('Freckles') && ACCESSORY_RENDERERS.Freckles()}

      {/* Beard */}
      {extras.includes('Beard') && ACCESSORY_RENDERERS.Beard(hairColor)}

      {/* Earrings */}
      {extras.includes('Earrings') && ACCESSORY_RENDERERS.Earrings()}

      {/* Glasses / Sunglasses */}
      {extras.includes('Glasses')    && ACCESSORY_RENDERERS.Glasses()}
      {extras.includes('Sunglasses') && ACCESSORY_RENDERERS.Sunglasses()}

      {/* Neck + outfit scaled by build */}
      <g transform={bodyXform}>
        <rect x="20" y="37" width="8" height="5" fill={skin} />
        {topFn(topColor, cfg.gender)}
      </g>

      {/* Headwear on top of hair */}
      {headwear.map(h => (
        <g key={h}>
          {ACCESSORY_RENDERERS[h] && ACCESSORY_RENDERERS[h](hairColor, accentColor)}
        </g>
      ))}
    </svg>
  )
}
