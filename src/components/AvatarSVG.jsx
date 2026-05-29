// AvatarSVG — layered SVG avatar with optional full-body rendering
// Props: config (object), extras (string[]), size (number = width in px),
//        fullBody (bool) — when true, renders arms + legs + feet

// ─── Colour palettes ─────────────────────────────────────────────────────────
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

export const BOTTOM_COLORS = [
  '#1A1A2E', '#185FA5', '#3C3C3C', '#0F6E56', '#BA7517',
  '#A32D2D', '#2D5016', '#4A3728', '#534AB7', '#8B2252',
  '#1C1C1C', '#D4537E',
]

export const SHOE_COLORS = [
  '#1A1A1A', '#4A3728', '#8B7355', '#D2B48C',
  '#F0F0F0', '#A32D2D', '#185FA5', '#2D5016',
]

export const ACCESSORY_COLORS = [
  '#1A1A1A', '#8B0000', '#1A3A5C', '#2D5016',
  '#6B3A2A', '#FFD700', '#C0C0C0', '#FF6B6B',
]

// ─── Shape / style enums ─────────────────────────────────────────────────────
export const FACE_SHAPES  = ['oval', 'round', 'square', 'heart', 'angular']
export const HAIR_STYLES  = [
  'short', 'long', 'curly', 'braids', 'bun',
  'afro', 'ponytail', 'waves', 'pixie', 'locs',
  'mohawk', 'bob', 'sideswept', 'spacebuns',
]
export const TOP_STYLES   = [
  'tshirt', 'shirt', 'hoodie', 'jacket', 'sweater',
  'turtleneck', 'tank', 'kameez', 'shawl', 'suit',
]
export const BOTTOM_STYLES = [
  'jeans', 'shorts', 'joggers', 'skirt', 'longskirt',
  'saree', 'salwar', 'formal', 'dhoti',
]
export const BEARD_STYLES = ['none', 'stubble', 'mustache', 'goatee', 'full', 'extended']
export const EXTRAS_OPTIONS = ['Glasses', 'Sunglasses', 'Cap', 'Beanie', 'Earrings', 'Freckles', 'Blush']

// ─── Defaults ─────────────────────────────────────────────────────────────────
export const AVATAR_DEFAULTS = {
  skinIndex:           0,
  faceShapeIndex:      0,
  hairStyle:           'short',
  hairColorIndex:      0,
  topStyle:            'tshirt',
  topColorIndex:       0,
  bottomStyle:         'jeans',
  bottomColorIndex:    0,
  beardStyle:          'none',
  shoeColorIndex:      0,
  accessoryColorIndex: 0,
  gender:              'neutral',
  build:               'average',
}

// Build → horizontal scale centred on x=24
const BUILD_SCALE = { slim: 0.78, average: 1, athletic: 1.12, plus: 1.3 }

// ─── Face shapes ─────────────────────────────────────────────────────────────
const FACE_PATHS = {
  oval:    (s) => <ellipse cx="24" cy="26" rx="11" ry="13" fill={s} />,
  round:   (s) => <ellipse cx="24" cy="26" rx="12" ry="12" fill={s} />,
  square:  (s) => <path d="M13 17 Q14 13 24 13 Q34 13 35 17 L35 35 Q34 39 24 39 Q14 39 13 35 Z" fill={s} />,
  heart:   (s) => <path d="M24 38 Q12 31 12 21 Q12 13 18 12 Q22 11 24 17 Q26 11 30 12 Q36 13 36 21 Q36 31 24 38 Z" fill={s} />,
  angular: (s) => <path d="M15 17 Q15 12 24 12 Q33 12 33 17 L34 29 Q31 39 24 39 Q17 39 14 29 Z" fill={s} />,
}

// ─── Hair ────────────────────────────────────────────────────────────────────
const HAIR_PATHS = {
  short: (c) => <g><ellipse cx="24" cy="19" rx="13" ry="8" fill={c} /><rect x="11" y="18" width="26" height="6" fill={c} /></g>,
  long: (c) => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><rect x="11" y="17" width="5" height="32" rx="3" fill={c} /><rect x="32" y="17" width="5" height="32" rx="3" fill={c} /></g>,
  curly: (c) => <g><ellipse cx="24" cy="16" rx="14" ry="9" fill={c} /><circle cx="13" cy="19" r="5" fill={c} /><circle cx="35" cy="19" r="5" fill={c} /><circle cx="18" cy="11" r="5" fill={c} /><circle cx="30" cy="11" r="5" fill={c} /><circle cx="24" cy="8" r="5" fill={c} /></g>,
  braids: (c) => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} /><rect x="13" y="18" width="4" height="36" rx="2" fill={c} /><rect x="22" y="18" width="4" height="40" rx="2" fill={c} /><rect x="31" y="18" width="4" height="36" rx="2" fill={c} /></g>,
  bun: (c) => <g><ellipse cx="24" cy="21" rx="12" ry="7" fill={c} /><rect x="12" y="20" width="24" height="6" fill={c} /><circle cx="24" cy="9" r="9" fill={c} /></g>,
  afro: (c) => <g><circle cx="24" cy="16" r="16" fill={c} /><circle cx="11" cy="22" r="8" fill={c} /><circle cx="37" cy="22" r="8" fill={c} /><circle cx="24" cy="4" r="7" fill={c} /></g>,
  ponytail: (c) => <g><ellipse cx="24" cy="20" rx="13" ry="8" fill={c} /><rect x="11" y="19" width="26" height="6" fill={c} /><ellipse cx="24" cy="5" rx="5" ry="10" fill={c} /><rect x="21" y="12" width="6" height="9" fill={c} /></g>,
  waves: (c) => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 20 Q7 28 11 34 Q7 40 11 46 Q9 52 12 56" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M37 20 Q41 28 37 34 Q41 40 37 46 Q39 52 36 56" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" /></g>,
  pixie: (c) => <g><ellipse cx="24" cy="20" rx="12" ry="7" fill={c} /><rect x="12" y="19" width="24" height="5" fill={c} /><path d="M17 19 Q21 11 28 13" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" /></g>,
  locs: (c) => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} />{[13,16,19,22,25,28,31,34].map((x,i)=><rect key={x} x={x} y="20" width="3" height={20+(i%3)*7} rx="1.5" fill={c} />)}</g>,
  mohawk: (c) => <g><rect x="20" y="3" width="8" height="22" rx="4" fill={c} /><rect x="11" y="20" width="9" height="4" rx="2" fill={c} /><rect x="28" y="20" width="9" height="4" rx="2" fill={c} /></g>,
  bob: (c) => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><rect x="11" y="17" width="5" height="20" rx="2" fill={c} /><rect x="32" y="17" width="5" height="20" rx="2" fill={c} /><rect x="11" y="35" width="26" height="4" rx="2" fill={c} /></g>,
  sideswept: (c) => <g><ellipse cx="24" cy="18" rx="13" ry="8" fill={c} /><rect x="11" y="18" width="26" height="5" fill={c} /><rect x="32" y="17" width="6" height="30" rx="3" fill={c} /><path d="M22 18 Q32 11 37 8" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" /></g>,
  spacebuns: (c) => <g><ellipse cx="24" cy="21" rx="13" ry="7" fill={c} /><rect x="11" y="20" width="26" height="5" fill={c} /><circle cx="13" cy="12" r="7" fill={c} /><circle cx="35" cy="12" r="7" fill={c} /></g>,
}

// ─── Tops: (color, gender, fullBody) ─────────────────────────────────────────
// Torso occupies x≈12–36, y=38–64.
// Arms (when fullBody) at x≈8–15 (left) and x≈33–40 (right), y=40–63.
// Sleeve overlays rendered inside topFn when fullBody=true.
const TOPS = {

  tshirt: (c, g, full) => (
    <g>
      <rect x="12" y="40" width="24" height="24" rx="3" fill={c} />
      {/* Collar U */}
      <path d="M20 40 Q24 46 28 40" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" fill="none" />
      {full && <>
        <rect x="7" y="40" width="7" height="12" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="12" rx="3" fill={c} />
        {/* Sleeve hem */}
        <rect x="7"  y="50" width="7" height="2" rx="1" fill="rgba(0,0,0,0.12)" />
        <rect x="34" y="50" width="7" height="2" rx="1" fill="rgba(0,0,0,0.12)" />
      </>}
    </g>
  ),

  shirt: (c, g, full) => (
    <g>
      <rect x="12" y="38" width="24" height="26" rx="3" fill={c} />
      {/* Button placket */}
      <rect x="22.5" y="38" width="3" height="26" fill="rgba(255,255,255,0.12)" />
      <circle cx="24" cy="44" r="0.8" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="50" r="0.8" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="56" r="0.8" fill="rgba(255,255,255,0.4)" />
      {/* Collar points */}
      <path d="M20 38 L17 43 L24 41 L31 43 L28 38" fill={c} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      {full && <>
        <rect x="7"  y="40" width="7" height="23" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="23" rx="3" fill={c} />
        {/* Cuffs */}
        <rect x="7"  y="59" width="7" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="34" y="59" width="7" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      </>}
    </g>
  ),

  hoodie: (c, g, full) => (
    <g>
      <rect x="11" y="38" width="26" height="26" rx="5" fill={c} />
      <path d="M18 38 Q24 48 30 38" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      {/* Kangaroo pocket */}
      <rect x="19" y="54" width="10" height="6" rx="2" fill="rgba(0,0,0,0.15)" />
      {full && <>
        <rect x="7"  y="40" width="7" height="23" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="23" rx="3" fill={c} />
        {/* Ribbed cuffs */}
        <rect x="7"  y="59" width="7" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
        <rect x="34" y="59" width="7" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
      </>}
    </g>
  ),

  jacket: (c, g, full) => (
    <g>
      <rect x="11" y="38" width="26" height="26" rx="4" fill={c} />
      <path d="M21 38 L24 48 L27 38" fill="rgba(255,255,255,0.22)" />
      <circle cx="24" cy="52" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="58" r="1" fill="rgba(255,255,255,0.4)" />
      {full && <>
        <rect x="7"  y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="7"  y="60" width="7" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="34" y="60" width="7" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
      </>}
    </g>
  ),

  sweater: (c, g, full) => (
    <g>
      <rect x="12" y="38" width="24" height="26" rx="4" fill={c} />
      {/* Neck band */}
      <rect x="19" y="34" width="10" height="7" rx="3" fill={c} />
      {/* Waist rib */}
      <rect x="12" y="61" width="24" height="3" rx="1.5" fill="rgba(0,0,0,0.15)" />
      {full && <>
        <rect x="7"  y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="24" rx="3" fill={c} />
        {/* Ribbed cuffs */}
        <rect x="7"  y="59" width="7" height="5" rx="2" fill="rgba(0,0,0,0.18)" />
        <rect x="34" y="59" width="7" height="5" rx="2" fill="rgba(0,0,0,0.18)" />
      </>}
    </g>
  ),

  turtleneck: (c, g, full) => (
    <g>
      <rect x="12" y="38" width="24" height="26" rx="4" fill={c} />
      {/* Tall collar */}
      <rect x="18" y="30" width="12" height="11" rx="5" fill={c} />
      {full && <>
        <rect x="7"  y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="7"  y="60" width="7" height="4" rx="2" fill="rgba(0,0,0,0.15)" />
        <rect x="34" y="60" width="7" height="4" rx="2" fill="rgba(0,0,0,0.15)" />
      </>}
    </g>
  ),

  tank: (c, g, full) => (
    // No sleeves — arms always exposed
    g === 'feminine'
      ? <g>
          <rect x="15" y="38" width="18" height="26" rx="3" fill={c} />
          <rect x="15" y="33" width="5" height="8" rx="2.5" fill={c} />
          <rect x="28" y="33" width="5" height="8" rx="2.5" fill={c} />
        </g>
      : <g>
          <rect x="16" y="38" width="16" height="26" rx="3" fill={c} />
          <rect x="16" y="33" width="4" height="8" rx="2" fill={c} />
          <rect x="28" y="33" width="4" height="8" rx="2" fill={c} />
        </g>
  ),

  kameez: (c, g, full) => (
    // South-Asian tunic — slightly longer, side slits, 3/4 sleeves
    <g>
      <rect x="12" y="36" width="24" height="32" rx="4" fill={c} />
      {/* Side slit cuts */}
      <rect x="12" y="60" width="4" height="8" rx="0" fill="rgba(0,0,0,0.18)" />
      <rect x="32" y="60" width="4" height="8" rx="0" fill="rgba(0,0,0,0.18)" />
      {/* Neckline */}
      <path d="M21 36 Q24 42 27 36" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
      {full && <>
        {/* 3/4 sleeves */}
        <rect x="7"  y="40" width="7" height="18" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="18" rx="3" fill={c} />
        {/* Cuff trim */}
        <rect x="7"  y="55" width="7" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
        <rect x="34" y="55" width="7" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
      </>}
    </g>
  ),

  shawl: (c, g, full) => (
    <g>
      {/* Base blouse */}
      <rect x="13" y="38" width="22" height="26" rx="3" fill={c} />
      {/* Left shawl panel */}
      <path d="M11 34 Q16 50 20 64 Q14 65 12 63 Q8 47 10 34 Z" fill={c} opacity="0.6" />
      {/* Right shawl panel */}
      <path d="M37 34 Q32 50 28 64 Q34 65 36 63 Q40 47 38 34 Z" fill={c} opacity="0.5" />
      {full && <>
        <rect x="7"  y="40" width="7" height="22" rx="3" fill={c} opacity="0.75" />
        <rect x="34" y="40" width="7" height="22" rx="3" fill={c} opacity="0.75" />
      </>}
    </g>
  ),

  suit: (c, g, full) => (
    <g>
      <rect x="11" y="38" width="26" height="26" rx="4" fill={c} />
      {/* Lapels */}
      <path d="M21 38 L17 50 L24 48 L31 50 L27 38" fill={c} stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
      <path d="M21 38 L24 48 L27 38" fill="rgba(255,255,255,0.5)" />
      {/* Tie */}
      <path d="M23 38 L22.5 48 L24 51 L25.5 48 L25 38 Z" fill="#A32D2D" opacity="0.9" />
      <path d="M18 42 Q17 48 18 54" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
      <path d="M30 42 Q31 48 30 54" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
      {full && <>
        <rect x="7"  y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="34" y="40" width="7" height="24" rx="3" fill={c} />
        <rect x="7"  y="59" width="7" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="34" y="59" width="7" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
        <circle cx="10.5" cy="62" r="0.8" fill="rgba(255,255,255,0.4)" />
        <circle cx="37.5" cy="62" r="0.8" fill="rgba(255,255,255,0.4)" />
      </>}
    </g>
  ),
}

// ─── Bottoms: (color, skin) — rendered in full-body mode only ─────────────────
// Legs occupy x=15–22 (left) and x=26–33 (right), y=65–87
const BOTTOMS = {

  jeans: (c, skin) => (
    <g>
      <rect x="14" y="65" width="9" height="22" rx="2" fill={c} />
      <rect x="25" y="65" width="9" height="22" rx="2" fill={c} />
      {/* Waistband */}
      <rect x="14" y="65" width="20" height="3" rx="1" fill="rgba(0,0,0,0.22)" />
      {/* Inner seam */}
      <line x1="23" y1="65" x2="23" y2="87" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      {/* Pocket arc */}
      <path d="M15 70 Q19 71 22 70" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none" />
    </g>
  ),

  shorts: (c, skin) => (
    <g>
      <rect x="14" y="65" width="9" height="13" rx="2" fill={c} />
      <rect x="25" y="65" width="9" height="13" rx="2" fill={c} />
      {/* Waistband */}
      <rect x="14" y="65" width="20" height="3" rx="1" fill="rgba(0,0,0,0.22)" />
      {/* Bare legs below hem */}
      <rect x="15" y="78" width="7" height="9" rx="2" fill={skin} />
      <rect x="26" y="78" width="7" height="9" rx="2" fill={skin} />
    </g>
  ),

  joggers: (c, skin) => (
    <g>
      <rect x="13" y="65" width="10" height="21" rx="4" fill={c} />
      <rect x="25" y="65" width="10" height="21" rx="4" fill={c} />
      {/* Draw cord */}
      <path d="M20 65 L22 67 L26 67 L28 65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
      {/* Ankle cuffs */}
      <rect x="14" y="82" width="8" height="4" rx="2" fill="rgba(0,0,0,0.22)" />
      <rect x="26" y="82" width="8" height="4" rx="2" fill="rgba(0,0,0,0.22)" />
    </g>
  ),

  skirt: (c, skin) => (
    <g>
      {/* Waistband */}
      <rect x="13" y="65" width="22" height="3" rx="1.5" fill="rgba(0,0,0,0.22)" />
      {/* A-line mini */}
      <path d="M14 68 Q9 76 7 87 L41 87 Q39 76 34 68 Z" fill={c} />
    </g>
  ),

  longskirt: (c, skin) => (
    <g>
      <rect x="13" y="65" width="22" height="3" rx="1.5" fill="rgba(0,0,0,0.22)" />
      {/* Full-length A-line */}
      <path d="M14 68 Q9 79 6 91 L42 91 Q39 79 34 68 Z" fill={c} />
      {/* Hem shimmer */}
      <path d="M7 90 Q24 93 41 90" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none" />
    </g>
  ),

  saree: (c, skin) => (
    <g>
      {/* Petticoat */}
      <path d="M14 65 Q9 77 7 90 L41 90 Q39 77 34 65 Z" fill={c} opacity="0.75" />
      {/* Pleats on front */}
      <line x1="17" y1="65" x2="15" y2="90" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="65" x2="18" y2="90" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="65" x2="21" y2="90" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pallu drape hint going diagonally up — overlay onto torso */}
      <path d="M36 38 Q30 52 28 65 L32 65 Q34 52 40 40 Z" fill={c} opacity="0.55" />
    </g>
  ),

  salwar: (c, skin) => (
    <g>
      {/* Wide-cut legs */}
      <path d="M12 65 Q11 77 13 87 L22 87 Q21 77 20 65 Z" fill={c} />
      <path d="M36 65 Q37 77 35 87 L26 87 Q27 77 28 65 Z" fill={c} />
      {/* Crotch fill */}
      <path d="M20 65 Q24 70 28 65 L28 68 Q24 73 20 68 Z" fill={c} />
      {/* Ankle trim */}
      <rect x="13" y="83" width="9" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="26" y="83" width="9" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
    </g>
  ),

  formal: (c, skin) => (
    <g>
      <rect x="14" y="65" width="9" height="22" rx="2" fill={c} />
      <rect x="25" y="65" width="9" height="22" rx="2" fill={c} />
      {/* Belt */}
      <rect x="13" y="65" width="22" height="3" rx="1" fill="rgba(0,0,0,0.4)" />
      <rect x="22" y="65" width="4" height="3" rx="0.5" fill="#C47A1F" />
      {/* Crease lines */}
      <line x1="18.5" y1="68" x2="18.5" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <line x1="29.5" y1="68" x2="29.5" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
    </g>
  ),

  dhoti: (c, skin) => (
    <g>
      {/* Left wrap */}
      <path d="M14 65 Q12 77 13 87 L24 87 L24 65 Z" fill={c} />
      {/* Right wrap */}
      <path d="M34 65 Q36 77 35 87 L24 87 L24 65 Z" fill={c} />
      {/* Centre drape fold */}
      <path d="M24 65 Q27 73 26 81 Q25 85 24 87" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      {/* Side pleats */}
      <line x1="17" y1="65" x2="15" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <line x1="20" y1="65" x2="19" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
    </g>
  ),
}

// ─── Beards ───────────────────────────────────────────────────────────────────
const BEARDS = {
  none: () => null,

  stubble: (c) => (
    <g fill={c} opacity="0.42">
      {[
        [18,30],[20,31.5],[22,32.5],[24,33],[26,32.5],[28,31.5],[30,30],
        [17,28.5],[19,30],[21,31],[23,31.5],[25,31.5],[27,31],[29,30],[31,28.5],
      ].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="0.85" />)}
    </g>
  ),

  mustache: (c) => (
    <path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} />
  ),

  goatee: (c) => (
    <g>
      <path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} />
      <path d="M22 32 Q24 39 22 43 Q24 45 26 43 Q24 39 26 32 Z" fill={c} />
    </g>
  ),

  full: (c) => (
    <path d="M15 30 Q15 42 24 45 Q33 42 33 30 Q29 33 24 34 Q19 33 15 30 Z" fill={c} />
  ),

  extended: (c) => (
    <path d="M14 28 Q13 45 24 50 Q35 45 34 28 Q30 32 24 34 Q18 32 14 28 Z" fill={c} />
  ),
}

// ─── Accessories ─────────────────────────────────────────────────────────────
const ACCESSORY_RENDERERS = {
  Glasses: () => (
    <g>
      <rect x="14" y="21.5" width="8" height="5.5" rx="2.5" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
      <rect x="26" y="21.5" width="8" height="5.5" rx="2.5" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
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
  Cap: (_hair, acc) => (
    <g>
      <path d="M11 20 Q12 10 24 9 Q36 10 37 20 Z" fill={acc || '#222'} />
      <rect x="8" y="18.5" width="18" height="3.5" rx="1.5" fill={acc ? acc + 'dd' : '#111'} />
      <circle cx="24" cy="10" r="2" fill="rgba(255,255,255,0.3)" />
    </g>
  ),
  Beanie: (_hair, acc) => (
    <g>
      <path d="M11 22 Q11 9 24 8 Q37 9 37 22 Z" fill={acc || '#444'} />
      <rect x="11" y="20" width="26" height="4" rx="2" fill={acc || '#444'} />
      <circle cx="24" cy="8" r="3.5" fill={acc || '#444'} />
      {[16,20,24,28,32].map(x => (
        <line key={x} x1={x} y1={x===16||x===32?14:x===20||x===28?12:11} x2={x} y2="21"
          stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ))}
    </g>
  ),
  Earrings: () => (
    <g>
      <circle cx="13" cy="29" r="2" fill="#FFD700" />
      <circle cx="35" cy="29" r="2" fill="#FFD700" />
    </g>
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

// ─── Component ───────────────────────────────────────────────────────────────
export default function AvatarSVG({ config = {}, extras = [], size = 64, fullBody = false }) {
  const cfg         = { ...AVATAR_DEFAULTS, ...config }
  const skin        = SKIN_TONES[cfg.skinIndex]            ?? SKIN_TONES[0]
  const hairColor   = HAIR_COLORS[cfg.hairColorIndex]      ?? HAIR_COLORS[0]
  const topColor    = TOP_COLORS[cfg.topColorIndex]        ?? TOP_COLORS[0]
  const bottomColor = BOTTOM_COLORS[cfg.bottomColorIndex]  ?? BOTTOM_COLORS[0]
  const shoeColor   = SHOE_COLORS[cfg.shoeColorIndex]      ?? SHOE_COLORS[0]
  const accentColor = ACCESSORY_COLORS[cfg.accessoryColorIndex] ?? ACCESSORY_COLORS[0]

  const faceFn  = FACE_PATHS[FACE_SHAPES[cfg.faceShapeIndex]] ?? FACE_PATHS.oval
  const hairFn  = HAIR_PATHS[cfg.hairStyle]  ?? HAIR_PATHS.short
  const topFn   = TOPS[cfg.topStyle]         ?? TOPS.tshirt
  const bottomFn = BOTTOMS[cfg.bottomStyle]  ?? BOTTOMS.jeans
  const beardFn = BEARDS[cfg.beardStyle]     ?? BEARDS.none
  const bodyScale = BUILD_SCALE[cfg.build]   ?? 1
  const bodyXform = `translate(24,0) scale(${bodyScale},1) translate(-24,0)`

  const headwear = extras.filter(e => e === 'Cap' || e === 'Beanie')

  const viewH = fullBody ? 96 : 64
  const svgH  = Math.round(size * viewH / 48)

  return (
    <svg
      width={size}
      height={svgH}
      viewBox={`0 0 48 ${viewH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hair (behind head) */}
      {hairFn(hairColor)}

      {/* Head */}
      {faceFn(skin)}

      {/* Blush */}
      {extras.includes('Blush') && ACCESSORY_RENDERERS.Blush()}

      {/* Eyes */}
      <circle cx="20" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />
      <circle cx="28" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />

      {/* Eyelashes for feminine / non-binary */}
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

      {/* Thicker brows for masculine */}
      {cfg.gender === 'masculine' && (
        <g>
          <rect x="17"   y="20.5" width="6.5" height="1.5" rx="0.75" fill="rgba(0,0,0,0.35)" />
          <rect x="24.5" y="20.5" width="6.5" height="1.5" rx="0.75" fill="rgba(0,0,0,0.35)" />
        </g>
      )}

      {/* Smile */}
      <path d="M21 29 Q24 32 27 29" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Freckles */}
      {extras.includes('Freckles') && ACCESSORY_RENDERERS.Freckles()}

      {/* Beard */}
      {beardFn && beardFn(hairColor)}

      {/* Earrings */}
      {extras.includes('Earrings') && ACCESSORY_RENDERERS.Earrings()}

      {/* Glasses / Sunglasses */}
      {extras.includes('Glasses')    && ACCESSORY_RENDERERS.Glasses()}
      {extras.includes('Sunglasses') && ACCESSORY_RENDERERS.Sunglasses()}

      {/* ── Body group (build-scaled) ── */}
      <g transform={bodyXform}>

        {/* Neck */}
        <rect x="20" y="37" width="8" height="5" fill={skin} />

        {/* Arm bases — skin, rendered before top so sleeves can overlay */}
        {fullBody && <>
          <path d="M9 41 Q8 52 9 63 L15 63 Q16 52 15 41 Z" fill={skin} />
          <ellipse cx="12" cy="65" rx="3.5" ry="2.5" fill={skin} />
          <path d="M39 41 Q40 52 39 63 L33 63 Q32 52 33 41 Z" fill={skin} />
          <ellipse cx="36" cy="65" rx="3.5" ry="2.5" fill={skin} />
        </>}

        {/* Top (torso + sleeve overlays) */}
        {topFn(topColor, cfg.gender, fullBody)}

        {/* Leg skin bases */}
        {fullBody && <>
          <rect x="15" y="65" width="8" height="22" rx="3" fill={skin} />
          <rect x="25" y="65" width="8" height="22" rx="3" fill={skin} />
        </>}

        {/* Bottom style */}
        {fullBody && bottomFn(bottomColor, skin)}

        {/* Shoes */}
        {fullBody && <>
          <ellipse cx="19" cy="88" rx="6"   ry="3"   fill={shoeColor} />
          <ellipse cx="29" cy="88" rx="6"   ry="3"   fill={shoeColor} />
          <ellipse cx="18" cy="87" rx="3"   ry="1.2" fill="rgba(255,255,255,0.1)" />
          <ellipse cx="28" cy="87" rx="3"   ry="1.2" fill="rgba(255,255,255,0.1)" />
        </>}

      </g>

      {/* Headwear — rendered last, on top of hair */}
      {headwear.map(h => (
        <g key={h}>
          {ACCESSORY_RENDERERS[h] && ACCESSORY_RENDERERS[h](hairColor, accentColor)}
        </g>
      ))}
    </svg>
  )
}
