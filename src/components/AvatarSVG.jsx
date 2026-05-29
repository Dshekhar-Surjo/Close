// AvatarSVG — illustrated SVG avatar with full-body support
// Props: config (object), extras (string[]), size (number = width px),
//        fullBody (bool) — when true renders arms + legs + feet

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

// ─── Style enums ─────────────────────────────────────────────────────────────
export const FACE_SHAPES   = ['oval', 'round', 'square', 'heart', 'angular']
export const HAIR_STYLES   = [
  'short', 'long', 'curly', 'braids', 'bun',
  'afro', 'ponytail', 'waves', 'pixie', 'locs',
  'mohawk', 'bob', 'sideswept', 'spacebuns',
]
export const TOP_STYLES    = [
  'tshirt', 'shirt', 'hoodie', 'jacket', 'sweater',
  'turtleneck', 'tank', 'kameez', 'shawl', 'suit',
]
export const BOTTOM_STYLES = [
  'jeans', 'shorts', 'joggers', 'skirt', 'longskirt',
  'saree', 'salwar', 'formal', 'dhoti',
]
export const BEARD_STYLES  = ['none', 'stubble', 'mustache', 'goatee', 'full', 'extended']
export const EXTRAS_OPTIONS = ['Glasses', 'Sunglasses', 'Cap', 'Beanie', 'Earrings', 'Freckles', 'Blush']

// ─── Defaults ────────────────────────────────────────────────────────────────
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

const BUILD_SCALE = { slim: 0.78, average: 1, athletic: 1.12, plus: 1.3 }

// ─── Face shapes ─────────────────────────────────────────────────────────────
const FACE_PATHS = {
  oval:    s => <ellipse cx="24" cy="26" rx="11" ry="13" fill={s} />,
  round:   s => <ellipse cx="24" cy="26" rx="12" ry="12" fill={s} />,
  square:  s => <path d="M13 17 Q14 13 24 13 Q34 13 35 17 L35 35 Q34 39 24 39 Q14 39 13 35 Z" fill={s} />,
  heart:   s => <path d="M24 38 Q12 31 12 21 Q12 13 18 12 Q22 11 24 17 Q26 11 30 12 Q36 13 36 21 Q36 31 24 38 Z" fill={s} />,
  angular: s => <path d="M15 17 Q15 12 24 12 Q33 12 33 17 L34 29 Q31 39 24 39 Q17 39 14 29 Z" fill={s} />,
}

// ─── Hair ────────────────────────────────────────────────────────────────────
const HAIR_PATHS = {
  short:     c => <g><ellipse cx="24" cy="19" rx="13" ry="8" fill={c} /><rect x="11" y="18" width="26" height="7" fill={c} /></g>,
  long:      c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 17 Q8 30 9 52" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 17 Q40 30 39 52" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /></g>,
  curly:     c => <g><ellipse cx="24" cy="16" rx="14" ry="9" fill={c} /><circle cx="13" cy="19" r="5.5" fill={c} /><circle cx="35" cy="19" r="5.5" fill={c} /><circle cx="18" cy="11" r="5" fill={c} /><circle cx="30" cy="11" r="5" fill={c} /><circle cx="24" cy="8" r="5" fill={c} /><circle cx="11" cy="24" r="4" fill={c} /><circle cx="37" cy="24" r="4" fill={c} /></g>,
  braids:    c => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} /><path d="M13 18 Q12 30 14 56" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M22 18 Q21 32 22 60" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M31 18 Q32 30 30 56" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /></g>,
  bun:       c => <g><ellipse cx="24" cy="21" rx="12" ry="7" fill={c} /><rect x="12" y="20" width="24" height="6" fill={c} /><circle cx="24" cy="9" r="9" fill={c} /></g>,
  afro:      c => <g><circle cx="24" cy="16" r="16" fill={c} /><circle cx="11" cy="22" r="8" fill={c} /><circle cx="37" cy="22" r="8" fill={c} /><circle cx="24" cy="4" r="7" fill={c} /></g>,
  ponytail:  c => <g><ellipse cx="24" cy="20" rx="13" ry="8" fill={c} /><rect x="11" y="19" width="26" height="6" fill={c} /><path d="M24 12 Q29 2 27 -2" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" /><rect x="21" y="11" width="6" height="4" fill={c} /></g>,
  waves:     c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 20 Q7 28 11 34 Q7 40 11 46 Q9 52 12 56" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 20 Q41 28 37 34 Q41 40 37 46 Q39 52 36 56" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /></g>,
  pixie:     c => <g><ellipse cx="24" cy="20" rx="12" ry="7" fill={c} /><rect x="12" y="19" width="24" height="6" fill={c} /><path d="M17 19 Q21 11 28 13" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /></g>,
  locs:      c => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} />{[13,16,19,22,25,28,31,34].map((x,i)=><rect key={x} x={x} y="20" width="3" height={20+(i%3)*7} rx="1.5" fill={c} />)}</g>,
  mohawk:    c => <g><rect x="20" y="3" width="8" height="22" rx="4" fill={c} /><rect x="11" y="20" width="9" height="4" rx="2" fill={c} /><rect x="28" y="20" width="9" height="4" rx="2" fill={c} /></g>,
  bob:       c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 17 Q9 28 11 37" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 17 Q39 28 37 37" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M11 37 Q24 42 37 37" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" /></g>,
  sideswept: c => <g><ellipse cx="24" cy="18" rx="13" ry="8" fill={c} /><rect x="11" y="18" width="26" height="5" fill={c} /><path d="M37 17 Q40 30 38 52" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M22 18 Q32 11 37 8" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" /></g>,
  spacebuns: c => <g><ellipse cx="24" cy="21" rx="13" ry="7" fill={c} /><rect x="11" y="20" width="26" height="5" fill={c} /><circle cx="13" cy="12" r="7" fill={c} /><circle cx="35" cy="12" r="7" fill={c} /></g>,
}

// ─── Tops: (color, gender, fullBody) ─────────────────────────────────────────
const TOPS = {

  tshirt: (c, g, full) => (
    <g>
      <path d="M12 40 L11 65 Q12 66 24 66 Q36 66 37 65 L36 40 Z" fill={c} />
      <path d="M19 40 Q24 46 29 40" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="rgba(0,0,0,0.05)" />
      <line x1="24" y1="47" x2="24" y2="64" stroke="rgba(0,0,0,0.05)" strokeWidth="0.9" />
      <path d="M12 40 L11 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 40 L37 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 40 Q5 48 7 53 L15 52 Q15 48 15 40 Z" fill={c} />
        <path d="M40 40 Q43 48 41 53 L33 52 Q33 48 33 40 Z" fill={c} />
        <path d="M8 51 Q11 54 15 51" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
        <path d="M33 51 Q37 54 40 51" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
      </>}
    </g>
  ),

  shirt: (c, g, full) => (
    <g>
      <path d="M12 38 L11 65 Q12 66 24 66 Q36 66 37 65 L36 38 Z" fill={c} />
      <rect x="22.5" y="38" width="3" height="27" fill="rgba(255,255,255,0.1)" />
      {[44,50,56,62].map(y => <circle key={y} cx="24" cy={y} r="0.8" fill="rgba(255,255,255,0.4)" />)}
      <path d="M19 38 L16 43 L24 41 L32 43 L29 38" fill={c} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M12 38 L11 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 38 L37 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <path d="M7 60 Q11 62 15 60" stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
        <path d="M33 60 Q37 62 41 60" stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
      </>}
    </g>
  ),

  hoodie: (c, g, full) => (
    <g>
      <path d="M11 38 L10 65 Q11 66 24 66 Q37 66 38 65 L37 38 Z" fill={c} />
      <path d="M18 38 Q24 48 30 38" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" fill="rgba(0,0,0,0.1)" />
      <rect x="19" y="54" width="10" height="7" rx="2" fill="rgba(0,0,0,0.15)" />
      <path d="M11 38 L10 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M37 38 L38 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <path d="M7 60 Q11 64 15 60" stroke="rgba(0,0,0,0.2)" strokeWidth="3" fill="none" />
        <path d="M33 60 Q37 64 41 60" stroke="rgba(0,0,0,0.2)" strokeWidth="3" fill="none" />
      </>}
    </g>
  ),

  jacket: (c, g, full) => (
    <g>
      <path d="M11 38 L10 65 Q11 66 24 66 Q37 66 38 65 L37 38 Z" fill={c} />
      <path d="M21 38 L24 48 L27 38" fill="rgba(255,255,255,0.2)" />
      <line x1="11" y1="40" x2="11" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="37" y1="40" x2="37" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="24" cy="52" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="59" r="1" fill="rgba(255,255,255,0.4)" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <path d="M7 60 Q11 62 15 60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M33 60 Q37 62 41 60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      </>}
    </g>
  ),

  sweater: (c, g, full) => (
    <g>
      <path d="M12 38 L11 65 Q12 66 24 66 Q36 66 37 65 L36 38 Z" fill={c} />
      <rect x="19" y="32" width="10" height="8" rx="4" fill={c} />
      <rect x="11" y="62" width="26" height="3.5" rx="1.5" fill="rgba(0,0,0,0.13)" />
      {[12,14,16,18,20,22,24,26,28,30,32,34,36].map(x=>(
        <line key={x} x1={x} y1="62" x2={x} y2="65.5" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      ))}
      <path d="M12 38 L11 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 38 L37 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <rect x="7" y="59" width="8" height="4.5" rx="2" fill="rgba(0,0,0,0.18)" />
        <rect x="33" y="59" width="8" height="4.5" rx="2" fill="rgba(0,0,0,0.18)" />
      </>}
    </g>
  ),

  turtleneck: (c, g, full) => (
    <g>
      <path d="M12 38 L11 65 Q12 66 24 66 Q36 66 37 65 L36 38 Z" fill={c} />
      <rect x="18" y="29" width="12" height="12" rx="5.5" fill={c} />
      <rect x="19" y="30" width="10" height="10" rx="4.5" fill="rgba(0,0,0,0.09)" />
      <path d="M12 38 L11 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 38 L37 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <rect x="7" y="60" width="8" height="3" rx="1.5" fill="rgba(0,0,0,0.14)" />
        <rect x="33" y="60" width="8" height="3" rx="1.5" fill="rgba(0,0,0,0.14)" />
      </>}
    </g>
  ),

  tank: (c, g, full) => (
    g === 'feminine'
      ? <g>
          <path d="M15 38 L14 65 Q15 66 24 66 Q33 66 34 65 L33 38 Z" fill={c} />
          <path d="M15 33 L15 38 L19 38 L20 33 Z" fill={c} />
          <path d="M33 33 L33 38 L29 38 L28 33 Z" fill={c} />
          <path d="M15 38 L14 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
          <path d="M33 38 L34 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
        </g>
      : <g>
          <path d="M16 38 L15 65 Q16 66 24 66 Q32 66 33 65 L32 38 Z" fill={c} />
          <path d="M16 33 L16 38 L20 38 L20 33 Z" fill={c} />
          <path d="M32 33 L32 38 L28 38 L28 33 Z" fill={c} />
          <path d="M16 38 L15 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
          <path d="M32 38 L33 65" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
        </g>
  ),

  kameez: (c, g, full) => {
    const trim = 'rgba(218,165,32,0.75)'
    return (
      <g>
        {/* Long A-line body to mid-calf */}
        <path d="M15 40 L12 81 Q12 87 24 87 Q36 87 36 81 L33 40 Z" fill={c} />
        <path d="M15 40 L12 81" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        <path d="M33 40 L36 81" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        {/* Yoke panel */}
        <rect x="15" y="40" width="18" height="10" rx="1" fill="rgba(0,0,0,0.15)" />
        <rect x="15" y="50" width="18" height="1.3" fill={trim} />
        {[17.5,20.5,23.5,26.5,29.5].map(x=>(
          <circle key={x} cx={x} cy="45" r="0.65" fill={trim} opacity="0.85" />
        ))}
        {/* Mandarin collar */}
        <rect x="20" y="33" width="8" height="8" rx="2" fill={c} />
        <rect x="20" y="33" width="8" height="1.8" rx="0.9" fill={trim} />
        <line x1="24" y1="40" x2="24" y2="51" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
        {/* Hem border + side slits */}
        <rect x="12" y="81" width="24" height="3.5" fill={trim} />
        <line x1="14" y1="77" x2="12" y2="84.5" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        <line x1="34" y1="77" x2="36" y2="84.5" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        {full && <>
          <path d="M7 40 Q5 50 7 57 L14.5 57 Q15 50 15 40 Z" fill={c} />
          <path d="M41 40 Q43 50 41 57 L33.5 57 Q33 50 33 40 Z" fill={c} />
          <rect x="7" y="54" width="7.5" height="3" rx="1.5" fill={trim} />
          <rect x="33.5" y="54" width="7.5" height="3" rx="1.5" fill={trim} />
        </>}
      </g>
    )
  },

  shawl: (c, g, full) => (
    <g>
      <path d="M13 38 L12 65 Q13 66 24 66 Q35 66 36 65 L35 38 Z" fill={c} />
      <path d="M11 33 Q16 50 20 65 Q14 66 12 64 Q7 48 10 33 Z" fill={c} opacity="0.52" />
      <path d="M37 33 Q32 50 28 65 Q34 66 36 64 Q41 48 38 33 Z" fill={c} opacity="0.47" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} opacity="0.75" />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} opacity="0.75" />
      </>}
    </g>
  ),

  suit: (c, g, full) => (
    <g>
      <path d="M11 38 L10 65 Q11 66 24 66 Q37 66 38 65 L37 38 Z" fill={c} />
      <path d="M21 38 L17 50 L24 48 L31 50 L27 38" fill={c} stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
      <path d="M21 38 L24 48 L27 38" fill="rgba(255,255,255,0.42)" />
      <path d="M23 38 L22.5 48 L24 51 L25.5 48 L25 38 Z" fill="#A32D2D" opacity="0.9" />
      <rect x="20" y="60" width="3.5" height="2" rx="0.5" fill="rgba(255,255,255,0.28)" />
      <rect x="25" y="60" width="3.5" height="2" rx="0.5" fill="rgba(255,255,255,0.28)" />
      {full && <>
        <path d="M8 40 Q5 52 7 63 L15 63 Q15 52 15 40 Z" fill={c} />
        <path d="M40 40 Q43 52 41 63 L33 63 Q33 52 33 40 Z" fill={c} />
        <rect x="7" y="59" width="8" height="4.5" rx="2" fill="rgba(255,255,255,0.11)" />
        <rect x="33" y="59" width="8" height="4.5" rx="2" fill="rgba(255,255,255,0.11)" />
        <circle cx="10.5" cy="62" r="0.7" fill="rgba(255,255,255,0.38)" />
        <circle cx="37.5" cy="62" r="0.7" fill="rgba(255,255,255,0.38)" />
      </>}
    </g>
  ),
}

// ─── Bottoms: (color, skin, isFeminine) ──────────────────────────────────────
// COVERAGE RULE: every bottom MUST cover leg skin at x=15–23 (left) and
// x=25–33 (right), y=65–87. Trouser-types use 3 rects: crotch + two legs.
const BOTTOMS = {

  // Jeans: solid coverage via crotch rect + two leg rects + inner seam line
  jeans: (c, skin, fem) => {
    const lx = fem ? 11 : 13   // left outer x (fem = slightly wider hips)
    const rx = fem ? 37 : 35   // right outer x
    return (
      <g>
        {/* Crotch + upper leg — solid coverage */}
        <rect x={lx} y="65" width={rx - lx} height="9" fill={c} />
        {/* Left leg */}
        <rect x={lx} y="74" width={24 - lx} height="14" rx="2" fill={c} />
        {/* Right leg */}
        <rect x="24" y="74" width={rx - 24} height="14" rx="2" fill={c} />
        {/* Waistband */}
        <rect x={lx} y="65" width={rx - lx} height="3.5" rx="1" fill="rgba(0,0,0,0.25)" />
        {/* Belt loops */}
        <rect x="17" y="64.5" width="2" height="4" rx="0.5" fill="rgba(0,0,0,0.3)" />
        <rect x="29" y="64.5" width="2" height="4" rx="0.5" fill="rgba(0,0,0,0.3)" />
        {/* Inner seam */}
        <line x1="24" y1="74" x2="24" y2="88" stroke="rgba(0,0,0,0.16)" strokeWidth="1.3" />
        {/* Pocket arcs */}
        <path d="M14 72 Q18 73.5 22 72" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
        <path d="M26 72 Q30 73.5 34 72" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
      </g>
    )
  },

  shorts: (c, skin, fem) => {
    const lx = fem ? 11 : 13
    const rx = fem ? 37 : 35
    return (
      <g>
        {/* Crotch */}
        <rect x={lx} y="65" width={rx - lx} height="9" fill={c} />
        {/* Left leg */}
        <rect x={lx} y="74" width={24 - lx} height="8" rx="2" fill={c} />
        {/* Right leg */}
        <rect x="24" y="74" width={rx - 24} height="8" rx="2" fill={c} />
        {/* Waistband */}
        <rect x={lx} y="65" width={rx - lx} height="3.5" rx="1" fill="rgba(0,0,0,0.22)" />
        {/* Inner seam */}
        <line x1="24" y1="74" x2="24" y2="82" stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" />
      </g>
    )
  },

  joggers: (c, skin, fem) => {
    const lx = fem ? 11 : 13
    const rx = fem ? 37 : 35
    return (
      <g>
        {/* Crotch */}
        <rect x={lx} y="65" width={rx - lx} height="9" fill={c} />
        {/* Left leg — round ankle (rx=4) */}
        <rect x={lx} y="74" width={24 - lx} height="12" rx="4" fill={c} />
        {/* Right leg */}
        <rect x="24" y="74" width={rx - 24} height="12" rx="4" fill={c} />
        {/* Draw cord */}
        <path d="M20 65 L22 67.5 L26 67.5 L28 65" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        {/* Ankle cuffs */}
        <rect x={lx} y="82" width={24 - lx} height="4" rx="2" fill="rgba(0,0,0,0.2)" />
        <rect x="24" y="82" width={rx - 24} height="4" rx="2" fill="rgba(0,0,0,0.2)" />
      </g>
    )
  },

  skirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="65" width="22" height="3" rx="1.5" fill="rgba(0,0,0,0.22)" />
      {/* Flared A-line — covers full width, no leg gaps possible */}
      <path d="M14 68 Q9 76 7 87 L41 87 Q39 76 34 68 Z" fill={c} />
      <line x1="20" y1="68" x2="17" y2="87" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
      <line x1="28" y1="68" x2="31" y2="87" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
    </g>
  ),

  longskirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="65" width="22" height="3" rx="1.5" fill="rgba(0,0,0,0.22)" />
      <path d="M14 68 Q9 79 6 91 L42 91 Q39 79 34 68 Z" fill={c} />
      <line x1="18" y1="68" x2="14" y2="91" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <line x1="30" y1="68" x2="34" y2="91" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M7 90 Q24 93 41 90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none" />
    </g>
  ),

  saree: (c, skin, fem) => {
    const gold = 'rgba(218,165,32,0.72)'
    return (
      <g>
        {/* Bare midriff */}
        <rect x="13" y="52" width="22" height="7" fill={skin} />
        {/* Skirt — path wide enough to cover legs */}
        <path d="M12 59 L10 91 L38 91 L36 59 Z" fill={c} />
        {/* Wrap fold shadow */}
        <path d="M31 59 L33 91 L38 91 L36 59 Z" fill="rgba(0,0,0,0.13)" />
        {/* Pleats */}
        <line x1="17" y1="59" x2="16" y2="91" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="20" y1="59" x2="19" y2="91" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <line x1="23" y1="59" x2="22" y2="91" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Waist tuck */}
        <rect x="12" y="59" width="24" height="2.5" rx="1" fill="rgba(0,0,0,0.2)" />
        {/* Gold hem border */}
        <rect x="10" y="87" width="28" height="4" fill={gold} />
        <line x1="10" y1="89.2" x2="38" y2="89.2" stroke="rgba(255,255,255,0.24)" strokeWidth="0.5" />
      </g>
    )
  },

  // Salwar: wide patiala style — legs meet at centre x=24
  salwar: (c, skin, fem) => (
    <g>
      {/* Left wide leg: outer x=10, inner x=24 */}
      <path d="M10 65 Q7 78 11 87 L24 87 Q22 78 21 65 Z" fill={c} />
      {/* Right wide leg: inner x=24, outer x=38 */}
      <path d="M38 65 Q41 78 37 87 L24 87 Q26 78 27 65 Z" fill={c} />
      {/* Crotch piece connecting legs */}
      <rect x="21" y="65" width="6" height="9" fill={c} />
      {/* Ankle gathers */}
      <rect x="11" y="83" width="13" height="2" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x="11" y="85" width="13" height="2" rx="1" fill="rgba(255,255,255,0.11)" />
      <rect x="24" y="83" width="13" height="2" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x="24" y="85" width="13" height="2" rx="1" fill="rgba(255,255,255,0.11)" />
    </g>
  ),

  // Formal trousers: same solid-coverage approach as jeans but sharper
  formal: (c, skin, fem) => {
    const lx = fem ? 11 : 13
    const rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="65" width={rx - lx} height="9" fill={c} />
        <rect x={lx} y="74" width={24 - lx} height="14" rx="2" fill={c} />
        <rect x="24" y="74" width={rx - 24} height="14" rx="2" fill={c} />
        {/* Belt */}
        <rect x={lx} y="65" width={rx - lx} height="3.5" rx="1" fill="rgba(0,0,0,0.4)" />
        <rect x="22" y="65" width="4" height="3.5" rx="0.5" fill="#C47A1F" />
        {/* Crease lines */}
        <line x1="18.5" y1="74" x2="17.5" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <line x1="29.5" y1="74" x2="30.5" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <line x1="24" y1="74" x2="24" y2="88" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </g>
    )
  },

  // Dhoti: two wrapping halves meeting at centre
  dhoti: (c, skin, fem) => (
    <g>
      {/* Left wrap: x=13 to x=24 */}
      <path d="M13 65 Q11 77 12 87 L24 87 L24 65 Z" fill={c} />
      {/* Right wrap: x=24 to x=35 */}
      <path d="M35 65 Q37 77 36 87 L24 87 L24 65 Z" fill={c} />
      {/* Centre drape fold */}
      <path d="M24 65 Q27 73 26 81 Q25 85 24 87" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      <line x1="17" y1="65" x2="15" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <line x1="20" y1="65" x2="19" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
    </g>
  ),
}

// ─── Saree pallu — rendered AFTER top so it drapes over blouse ───────────
function SAREE_PALLU(c) {
  const gold = 'rgba(218,165,32,0.72)'
  return (
    <g>
      {/* Pallu hanging from left shoulder */}
      <path d="M10 40 Q9 56 9 73 L13 73 Q13 56 14 40 Z" fill={c} opacity="0.62" />
      {/* Pallu crossing chest */}
      <path d="M34 40 Q28 46 20 59 L22 59 Q30 46 36 40 Z" fill={c} opacity="0.57" />
      {/* Gold borders */}
      <path d="M34 40 Q28 46 20 59" stroke={gold} strokeWidth="1.2" fill="none" />
      <path d="M10 40 Q9 56 9 73" stroke={gold} strokeWidth="1.2" fill="none" />
      <line x1="9" y1="72" x2="13" y2="72" stroke={gold} strokeWidth="1" />
    </g>
  )
}

// ─── Beards ───────────────────────────────────────────────────────────────────
const BEARDS = {
  none:     ()  => null,
  stubble:  (c) => (
    <g fill={c} opacity="0.38">
      {[[18,30],[20,31.5],[22,32.5],[24,33],[26,32.5],[28,31.5],[30,30],
        [17,28.5],[19,30],[21,31],[23,31.5],[25,31.5],[27,31],[29,30],[31,28.5],
      ].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="0.9" />)}
    </g>
  ),
  mustache: (c) => <path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} />,
  goatee:   (c) => <g><path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} /><path d="M22 32 Q24 39 22 43 Q24 45 26 43 Q24 39 26 32 Z" fill={c} /></g>,
  full:     (c) => <path d="M15 30 Q15 42 24 45 Q33 42 33 30 Q29 33 24 34 Q19 33 15 30 Z" fill={c} />,
  extended: (c) => <path d="M14 28 Q13 45 24 50 Q35 45 34 28 Q30 32 24 34 Q18 32 14 28 Z" fill={c} />,
}

// ─── Accessories ─────────────────────────────────────────────────────────────
const ACCESSORY_RENDERERS = {
  Glasses:    () => <g>
    <rect x="14" y="21.5" width="8" height="5.5" rx="2.5" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
    <rect x="26" y="21.5" width="8" height="5.5" rx="2.5" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" fill="rgba(150,200,255,0.1)" />
    <line x1="22" y1="24.3" x2="26" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
    <line x1="10" y1="24.3" x2="14" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
    <line x1="34" y1="24.3" x2="38" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.8" />
  </g>,
  Sunglasses: () => <g>
    <rect x="13" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.78)" />
    <rect x="25" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.78)" />
    <line x1="23" y1="24.3" x2="25" y2="24.3" stroke="#555" strokeWidth="0.8" />
    <line x1="10" y1="24.3" x2="13" y2="24.3" stroke="#555" strokeWidth="0.8" />
    <line x1="35" y1="24.3" x2="38" y2="24.3" stroke="#555" strokeWidth="0.8" />
  </g>,
  Cap: (_h, acc) => <g>
    <path d="M11 20 Q12 10 24 9 Q36 10 37 20 Z" fill={acc||'#222'} />
    <rect x="8" y="18.5" width="18" height="3.5" rx="1.5" fill={acc?acc+'dd':'#111'} />
    <circle cx="24" cy="10" r="2" fill="rgba(255,255,255,0.28)" />
  </g>,
  Beanie: (_h, acc) => <g>
    <path d="M11 22 Q11 9 24 8 Q37 9 37 22 Z" fill={acc||'#444'} />
    <rect x="11" y="20" width="26" height="4" rx="2" fill={acc||'#444'} />
    <circle cx="24" cy="8" r="3.5" fill={acc||'#444'} />
    {[16,20,24,28,32].map(x=>(
      <line key={x} x1={x} y1={x===16||x===32?14:x===20||x===28?12:11} x2={x} y2="21"
        stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
    ))}
  </g>,
  Earrings: () => <g>
    <circle cx="13" cy="29" r="2" fill="#FFD700" />
    <circle cx="35" cy="29" r="2" fill="#FFD700" />
  </g>,
  Freckles: () => <g>
    <circle cx="19" cy="27"   r="0.9" fill="rgba(0,0,0,0.18)" />
    <circle cx="22" cy="26"   r="0.9" fill="rgba(0,0,0,0.18)" />
    <circle cx="26" cy="26"   r="0.9" fill="rgba(0,0,0,0.18)" />
    <circle cx="29" cy="27"   r="0.9" fill="rgba(0,0,0,0.18)" />
    <circle cx="20" cy="29.5" r="0.7" fill="rgba(0,0,0,0.13)" />
    <circle cx="28" cy="29.5" r="0.7" fill="rgba(0,0,0,0.13)" />
    <circle cx="24" cy="28"   r="0.7" fill="rgba(0,0,0,0.13)" />
  </g>,
  Blush: () => <g>
    <circle cx="17" cy="28" r="4.5" fill="rgba(255,100,100,0.22)" />
    <circle cx="31" cy="28" r="4.5" fill="rgba(255,100,100,0.22)" />
  </g>,
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AvatarSVG({ config = {}, extras = [], size = 64, fullBody = false }) {
  const cfg         = { ...AVATAR_DEFAULTS, ...config }
  const skin        = SKIN_TONES[cfg.skinIndex]                 ?? SKIN_TONES[0]
  const hairColor   = HAIR_COLORS[cfg.hairColorIndex]           ?? HAIR_COLORS[0]
  const topColor    = TOP_COLORS[cfg.topColorIndex]             ?? TOP_COLORS[0]
  const bottomColor = BOTTOM_COLORS[cfg.bottomColorIndex]       ?? BOTTOM_COLORS[0]
  const shoeColor   = SHOE_COLORS[cfg.shoeColorIndex]           ?? SHOE_COLORS[0]
  const accentColor = ACCESSORY_COLORS[cfg.accessoryColorIndex] ?? ACCESSORY_COLORS[0]

  // Gender flags
  const isFem  = cfg.gender === 'feminine'
  const isMasc = cfg.gender === 'masculine'
  const isNB   = cfg.gender === 'non-binary' || cfg.gender === 'fluid'

  // Gender-responsive facial features
  const eyeRx     = isFem ? 2.65 : isNB ? 2.45 : 2.3
  const eyeRy     = isFem ? 1.95 : isNB ? 1.78 : 1.62
  const browW     = isMasc ? 1.8 : isNB ? 1.3 : 1.05
  const lipStartX = isFem ? 21   : 21.8
  const lipEndX   = isFem ? 27   : 26.2
  const lipCy     = isFem ? 32.5 : 31.6
  const lipColor  = cfg.skinIndex <= 2 ? 'rgba(172,88,68,0.8)' : 'rgba(142,66,46,0.8)'
  const irisColor = cfg.skinIndex >= 8 ? 'rgba(45,28,12,0.92)' : 'rgba(55,38,18,0.92)'

  const faceFn   = FACE_PATHS[FACE_SHAPES[cfg.faceShapeIndex]] ?? FACE_PATHS.oval
  const hairFn   = HAIR_PATHS[cfg.hairStyle]  ?? HAIR_PATHS.short
  const topFn    = TOPS[cfg.topStyle]         ?? TOPS.tshirt
  const bottomFn = BOTTOMS[cfg.bottomStyle]   ?? BOTTOMS.jeans
  const beardFn  = BEARDS[cfg.beardStyle]     ?? BEARDS.none
  const bodyScale = BUILD_SCALE[cfg.build]    ?? 1
  const bodyXform = `translate(24,0) scale(${bodyScale},1) translate(-24,0)`
  const headwear  = extras.filter(e => e === 'Cap' || e === 'Beanie')

  const viewH = fullBody ? 96 : 64
  const svgH  = Math.round(size * viewH / 48)

  return (
    <svg
      width={size} height={svgH}
      viewBox={`0 0 48 ${viewH}`}
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Hair behind head ── */}
      {hairFn(hairColor)}

      {/* ── Face ── */}
      {faceFn(skin)}

      {/* ── Face detail: highlight ── */}
      <ellipse cx="21" cy="22" rx="4" ry="5" fill="rgba(255,255,255,0.06)" />

      {/* ── Cheek blush (always subtle) ── */}
      <ellipse cx="17" cy="28.5" rx="4"   ry="2.5" fill="rgba(220,110,90,0.11)" />
      <ellipse cx="31" cy="28.5" rx="4"   ry="2.5" fill="rgba(220,110,90,0.11)" />
      {extras.includes('Blush') && ACCESSORY_RENDERERS.Blush()}

      {/* ── Eyes: sclera + iris + pupil + catchlight ── */}
      <ellipse cx="20" cy="24"     rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.93)" />
      <circle  cx="20" cy="24"     r={eyeRx * 0.57}       fill={irisColor} />
      <circle  cx="20" cy="24"     r={eyeRx * 0.29}       fill="#0d0d0d" />
      <circle  cx={20 + eyeRx * 0.28} cy={24 - eyeRy * 0.37} r={eyeRx * 0.16} fill="rgba(255,255,255,0.87)" />

      <ellipse cx="28" cy="24"     rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.93)" />
      <circle  cx="28" cy="24"     r={eyeRx * 0.57}       fill={irisColor} />
      <circle  cx="28" cy="24"     r={eyeRx * 0.29}       fill="#0d0d0d" />
      <circle  cx={28 + eyeRx * 0.28} cy={24 - eyeRy * 0.37} r={eyeRx * 0.16} fill="rgba(255,255,255,0.87)" />

      {/* ── Eyelashes: feminine only ── */}
      {isFem && (
        <g stroke={hairColor} strokeWidth="0.65" strokeLinecap="round" opacity="0.68">
          <line x1="17.8" y1="22.5" x2="17.3" y2="21.4" />
          <line x1="19.3" y1="22.2" x2="19"   y2="21.1" />
          <line x1="21"   y1="22.5" x2="21.4" y2="21.4" />
          <line x1="26.6" y1="22.5" x2="26.2" y2="21.4" />
          <line x1="28.2" y1="22.2" x2="28"   y2="21.1" />
          <line x1="29.8" y1="22.5" x2="30.3" y2="21.4" />
        </g>
      )}

      {/* ── Non-binary/fluid: thin upper eyelid line instead of lashes ── */}
      {isNB && (
        <g stroke={hairColor} strokeWidth="0.5" strokeLinecap="round" opacity="0.45">
          <path d="M17.7 22.7 Q20 21.8 22.3 22.7" fill="none" />
          <path d="M25.7 22.7 Q28 21.8 30.3 22.7" fill="none" />
        </g>
      )}

      {/* ── Eyebrows (gender-responsive thickness) ── */}
      <path d={`M${isFem?18:17.5} ${isFem?21.5:21.8} Q20 ${isFem?20.2:20.4} ${isFem?22.5:22.5} ${isFem?21.2:21.3}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />
      <path d={`M${isFem?25.5:25.5} ${isFem?21.2:21.3} Q28 ${isFem?20.2:20.4} ${isFem?30:30.5} ${isFem?21.5:21.8}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />

      {/* ── Nose ── */}
      <ellipse cx="24" cy="27.8" rx="0.88" ry="0.52" fill="rgba(0,0,0,0.16)" />

      {/* ── Lips (gender-responsive width + curve) ── */}
      <path d={`M${lipStartX} 30.5 Q24 ${lipCy} ${lipEndX} 30.5`}
        stroke={lipColor} strokeWidth={isFem ? 1.45 : 1.15}
        fill="none" strokeLinecap="round" />
      {/* Upper lip bow for feminine */}
      {isFem && (
        <path d="M21.2 30.5 Q22.5 29.8 24 30.2 Q25.5 29.8 26.8 30.5"
          stroke={lipColor} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
      )}

      {/* ── Extras on face ── */}
      {extras.includes('Freckles')    && ACCESSORY_RENDERERS.Freckles()}
      {beardFn(hairColor)}
      {extras.includes('Earrings')    && ACCESSORY_RENDERERS.Earrings()}
      {extras.includes('Glasses')     && ACCESSORY_RENDERERS.Glasses()}
      {extras.includes('Sunglasses')  && ACCESSORY_RENDERERS.Sunglasses()}

      {/* ── Body group (build-scaled) ── */}
      <g transform={bodyXform}>

        {/* Neck */}
        <rect x="20" y="37" width="8" height="5.5" fill={skin} />

        {/* Arm skin bases — rendered before top so sleeves cover them */}
        {fullBody && <>
          <path d="M8 42 C6 50 6 59 8 65 Q10 68 12.5 67.5 Q14.5 67.5 15 63 C15 57 15 50 15 42 Z" fill={skin} />
          <ellipse cx="11" cy="68" rx="3.2" ry="2.3" fill={skin} />
          <path d="M40 42 C42 50 42 59 40 65 Q38 68 35.5 67.5 Q33.5 67.5 33 63 C33 57 33 50 33 42 Z" fill={skin} />
          <ellipse cx="37" cy="68" rx="3.2" ry="2.3" fill={skin} />
        </>}

        {/* Leg skin bases — covered by bottom style below */}
        {fullBody && <>
          <path d="M15 65 L14 87 Q14 88 19 88 Q22.5 88 23 87 L23 65 Z" fill={skin} />
          <path d="M25 65 L25 87 Q25.5 88 29 88 Q34 88 34 87 L33 65 Z" fill={skin} />
        </>}

        {/* Bottom BEFORE top — long tops (kameez) will cover it */}
        {fullBody && bottomFn(bottomColor, skin, isFem)}

        {/* Top — renders over bottom */}
        {topFn(topColor, cfg.gender, fullBody)}

        {/* Saree pallu — AFTER top so it drapes over the blouse */}
        {fullBody && cfg.bottomStyle === 'saree' && SAREE_PALLU(bottomColor)}

        {/* Shoes */}
        {fullBody && <>
          <path d="M13 87 L12 91 Q12 93 19 93 Q24 93 24 90 L24 87 Z" fill={shoeColor} />
          <path d="M24 87 L24 90 Q24 93 29 93 Q36 93 36 91 L35 87 Z" fill={shoeColor} />
          <path d="M14 89 Q17.5 88.2 22 89" stroke="rgba(255,255,255,0.1)"  strokeWidth="0.6" fill="none" />
          <path d="M26 89 Q29.5 88.2 34 89" stroke="rgba(255,255,255,0.1)"  strokeWidth="0.6" fill="none" />
        </>}

      </g>

      {/* Headwear — on top of everything */}
      {headwear.map(h => (
        <g key={h}>{ACCESSORY_RENDERERS[h] && ACCESSORY_RENDERERS[h](hairColor, accentColor)}</g>
      ))}
    </svg>
  )
}
