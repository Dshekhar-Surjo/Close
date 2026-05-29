// AvatarSVG — illustrated SVG avatar
// Full-body viewBox: "0 0 48 120"  (face ~33% height, body 67% — matches preview proportions)
// Bust viewBox:      "0 0 48 64"   (map pins, nearby list)
// Props: config, extras, size (width px), fullBody (bool)

// ─── Palettes ────────────────────────────────────────────────────────────────
export const SKIN_TONES = [
  '#FDDBB4','#F5C89A','#EDAC74','#D4845A','#C06E3A',
  '#A55B28','#8D4A1E','#6B3418','#4A2412','#2C1208',
]
export const HAIR_COLORS = [
  '#1A1A1A','#3D2B1F','#6B3A2A','#8B5E3C','#C19A6B',
  '#D4A017','#E8E0C8','#A32D2D','#C4547A','#7B4BC4',
  '#3A89C4','#5AAF6B',
]
export const TOP_COLORS = [
  '#185FA5','#0F6E56','#BA7517','#D4537E','#534AB7',
  '#A32D2D','#1A1A2E','#2D5016','#7B4BC4','#C47A1F',
  '#2C7873','#8B2252',
]
export const BOTTOM_COLORS = [
  '#1A1A2E','#185FA5','#3C3C3C','#0F6E56','#BA7517',
  '#A32D2D','#2D5016','#4A3728','#534AB7','#8B2252',
  '#1C1C1C','#D4537E',
]
export const SHOE_COLORS = [
  '#1A1A1A','#4A3728','#8B7355','#D2B48C',
  '#F0F0F0','#A32D2D','#185FA5','#2D5016',
]
export const ACCESSORY_COLORS = [
  '#1A1A1A','#8B0000','#1A3A5C','#2D5016',
  '#6B3A2A','#FFD700','#C0C0C0','#FF6B6B',
]

// ─── Enums ───────────────────────────────────────────────────────────────────
export const FACE_SHAPES   = ['oval','round','square','heart','angular']
export const HAIR_STYLES   = [
  'short','long','curly','braids','bun',
  'afro','ponytail','waves','pixie','locs',
  'mohawk','bob','sideswept','spacebuns',
]
export const TOP_STYLES    = [
  'tshirt','shirt','hoodie','jacket','sweater',
  'turtleneck','tank','kameez','shawl','suit',
]
export const BOTTOM_STYLES = [
  'jeans','shorts','joggers','skirt','longskirt',
  'saree','salwar','formal','dhoti',
]
export const BEARD_STYLES  = ['none','stubble','mustache','goatee','full','extended']
export const EXTRAS_OPTIONS = ['Glasses','Sunglasses','Cap','Beanie','Earrings','Freckles','Blush']

// ─── Defaults ────────────────────────────────────────────────────────────────
export const AVATAR_DEFAULTS = {
  skinIndex:0, faceShapeIndex:0,
  hairStyle:'short', hairColorIndex:0,
  topStyle:'tshirt', topColorIndex:0,
  bottomStyle:'jeans', bottomColorIndex:0,
  beardStyle:'none', shoeColorIndex:0,
  accessoryColorIndex:0, gender:'neutral', build:'average',
}

const BUILD_SCALE = { slim:0.78, average:1, athletic:1.12, plus:1.3 }

// ─── Coordinate landmarks (full-body, viewBox 0 0 48 120) ───────────────────
// Face:    cy=26 ry=13  → y=13–39   (33% of 120 — preview proportions)
// Neck:    y=38–46
// Torso:   y=44–80      (36 units — vs 25 before)
// Arm:     y=44–82      hand ellipse cy=84
// LegTop:  y=80
// Crotch:  y=80–91
// Ankle:   y=112
// Shoe:    y=112–120

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
  long:      c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 17 Q8 30 9 58" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 17 Q40 30 39 58" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /></g>,
  curly:     c => <g><ellipse cx="24" cy="16" rx="14" ry="9" fill={c} /><circle cx="13" cy="19" r="5.5" fill={c} /><circle cx="35" cy="19" r="5.5" fill={c} /><circle cx="18" cy="11" r="5" fill={c} /><circle cx="30" cy="11" r="5" fill={c} /><circle cx="24" cy="8" r="5" fill={c} /><circle cx="11" cy="24" r="4" fill={c} /><circle cx="37" cy="24" r="4" fill={c} /></g>,
  braids:    c => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} /><path d="M13 20 Q12 38 14 70" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M22 20 Q21 40 22 75" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M31 20 Q32 38 30 70" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /></g>,
  bun:       c => <g><ellipse cx="24" cy="21" rx="12" ry="7" fill={c} /><rect x="12" y="20" width="24" height="6" fill={c} /><circle cx="24" cy="9" r="9" fill={c} /></g>,
  afro:      c => <g><circle cx="24" cy="16" r="16" fill={c} /><circle cx="11" cy="22" r="8" fill={c} /><circle cx="37" cy="22" r="8" fill={c} /><circle cx="24" cy="4" r="7" fill={c} /></g>,
  ponytail:  c => <g><ellipse cx="24" cy="20" rx="13" ry="8" fill={c} /><rect x="11" y="19" width="26" height="6" fill={c} /><path d="M24 12 Q29 2 27 -2" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" /><rect x="21" y="11" width="6" height="4" fill={c} /></g>,
  waves:     c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 20 Q7 30 11 38 Q7 46 11 54 Q9 62 12 68" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 20 Q41 30 37 38 Q41 46 37 54 Q39 62 36 68" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /></g>,
  pixie:     c => <g><ellipse cx="24" cy="20" rx="12" ry="7" fill={c} /><rect x="12" y="19" width="24" height="6" fill={c} /><path d="M17 19 Q21 11 28 13" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" /></g>,
  locs:      c => <g><ellipse cx="24" cy="17" rx="13" ry="8" fill={c} />{[13,16,19,22,25,28,31,34].map((x,i)=><rect key={x} x={x} y="20" width="3" height={26+(i%3)*9} rx="1.5" fill={c} />)}</g>,
  mohawk:    c => <g><rect x="20" y="3" width="8" height="22" rx="4" fill={c} /><rect x="11" y="20" width="9" height="4" rx="2" fill={c} /><rect x="28" y="20" width="9" height="4" rx="2" fill={c} /></g>,
  bob:       c => <g><ellipse cx="24" cy="17" rx="13" ry="9" fill={c} /><path d="M11 17 Q9 30 11 42" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M37 17 Q39 30 37 42" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M11 42 Q24 47 37 42" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" /></g>,
  sideswept: c => <g><ellipse cx="24" cy="18" rx="13" ry="8" fill={c} /><rect x="11" y="18" width="26" height="5" fill={c} /><path d="M37 17 Q40 34 38 62" stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" /><path d="M22 18 Q32 11 37 8" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" /></g>,
  spacebuns: c => <g><ellipse cx="24" cy="21" rx="13" ry="7" fill={c} /><rect x="11" y="20" width="26" height="5" fill={c} /><circle cx="13" cy="12" r="7" fill={c} /><circle cx="35" cy="12" r="7" fill={c} /></g>,
}

// ─── Tops — torso y=44–80, arms y=44–80 ──────────────────────────────────────
const TOPS = {

  tshirt: (c, g, full) => (
    <g>
      <path d="M12 44 L11 80 Q12 81 24 81 Q36 81 37 80 L36 44 Z" fill={c} />
      <path d="M19 44 Q24 51 29 44" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="rgba(0,0,0,0.05)" />
      <line x1="24" y1="52" x2="24" y2="79" stroke="rgba(0,0,0,0.05)" strokeWidth="0.9" />
      <path d="M12 44 L11 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 44 L37 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        {/* Short sleeves */}
        <path d="M8 44 Q5 54 7 62 L15 61 Q15 54 15 44 Z" fill={c} />
        <path d="M40 44 Q43 54 41 62 L33 61 Q33 54 33 44 Z" fill={c} />
        <path d="M8 60 Q11 63 15 60"  stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
        <path d="M33 60 Q37 63 40 60" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
      </>}
    </g>
  ),

  shirt: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      <rect x="22.5" y="42" width="3" height="38" fill="rgba(255,255,255,0.1)" />
      {[50,58,66,74].map(y => <circle key={y} cx="24" cy={y} r="0.9" fill="rgba(255,255,255,0.4)" />)}
      <path d="M19 42 L16 48 L24 46 L32 48 L29 42" fill={c} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 58 7 78 L15 78 Q15 58 15 44 Z" fill={c} />
        <path d="M40 44 Q43 58 41 78 L33 78 Q33 58 33 44 Z" fill={c} />
        <path d="M7 75 Q11 77 15 75"  stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
        <path d="M33 75 Q37 77 41 75" stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
      </>}
    </g>
  ),

  hoodie: (c, g, full) => (
    <g>
      <path d="M11 42 L10 80 Q11 81 24 81 Q37 81 38 80 L37 42 Z" fill={c} />
      <path d="M18 42 Q24 53 30 42" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" fill="rgba(0,0,0,0.1)" />
      <rect x="19" y="64" width="10" height="9" rx="2" fill="rgba(0,0,0,0.15)" />
      <path d="M11 42 L10 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M37 42 L38 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <path d="M7 75 Q11 79 15 75"  stroke="rgba(0,0,0,0.2)" strokeWidth="3" fill="none" />
        <path d="M33 75 Q37 79 41 75" stroke="rgba(0,0,0,0.2)" strokeWidth="3" fill="none" />
      </>}
    </g>
  ),

  jacket: (c, g, full) => (
    <g>
      <path d="M11 42 L10 80 Q11 81 24 81 Q37 81 38 80 L37 42 Z" fill={c} />
      <path d="M21 42 L24 54 L27 42" fill="rgba(255,255,255,0.2)" />
      <line x1="11" y1="44" x2="11" y2="79" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="37" y1="44" x2="37" y2="79" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="24" cy="63" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="72" r="1" fill="rgba(255,255,255,0.4)" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <path d="M7 75 Q11 77 15 75"  stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M33 75 Q37 77 41 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      </>}
    </g>
  ),

  sweater: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      <rect x="19" y="35" width="10" height="9" rx="4.5" fill={c} />
      <rect x="11" y="77" width="26" height="4" rx="2" fill="rgba(0,0,0,0.13)" />
      {[13,15,17,19,21,23,25,27,29,31,33,35].map(x=>(
        <line key={x} x1={x} y1="77" x2={x} y2="81" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      ))}
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <rect x="7"  y="73" width="8" height="5.5" rx="2.5" fill="rgba(0,0,0,0.18)" />
        <rect x="33" y="73" width="8" height="5.5" rx="2.5" fill="rgba(0,0,0,0.18)" />
      </>}
    </g>
  ),

  turtleneck: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      <rect x="18" y="30" width="12" height="14" rx="6" fill={c} />
      <rect x="19" y="31" width="10" height="12" rx="5" fill="rgba(0,0,0,0.09)" />
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <rect x="7"  y="74" width="8" height="4" rx="2" fill="rgba(0,0,0,0.14)" />
        <rect x="33" y="74" width="8" height="4" rx="2" fill="rgba(0,0,0,0.14)" />
      </>}
    </g>
  ),

  tank: (c, g, full) => (
    g === 'feminine'
      ? <g>
          <path d="M15 42 L14 80 Q15 81 24 81 Q33 81 34 80 L33 42 Z" fill={c} />
          <path d="M15 37 L15 42 L19 42 L20 37 Z" fill={c} />
          <path d="M33 37 L33 42 L29 42 L28 37 Z" fill={c} />
          <path d="M15 42 L14 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
          <path d="M33 42 L34 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
        </g>
      : <g>
          <path d="M16 42 L15 80 Q16 81 24 81 Q32 81 33 80 L32 42 Z" fill={c} />
          <path d="M16 37 L16 42 L20 42 L20 37 Z" fill={c} />
          <path d="M32 37 L32 42 L28 42 L28 37 Z" fill={c} />
          <path d="M16 42 L15 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
          <path d="M32 42 L33 80" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" />
        </g>
  ),

  kameez: (c, g, full) => {
    const trim = 'rgba(218,165,32,0.78)'
    return (
      <g>
        {/* Long A-line body — reaches below knees, covers legs */}
        <path d="M15 44 L12 100 Q12 108 24 108 Q36 108 36 100 L33 44 Z" fill={c} />
        <path d="M15 44 L12 100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        <path d="M33 44 L36 100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        {/* Yoke */}
        <rect x="15" y="44" width="18" height="13" rx="1" fill="rgba(0,0,0,0.15)" />
        <rect x="15" y="57" width="18" height="1.5" fill={trim} />
        {[17.5,20.5,23.5,26.5,29.5].map(x=>(
          <circle key={x} cx={x} cy="51" r="0.7" fill={trim} opacity="0.85" />
        ))}
        {/* Mandarin collar */}
        <rect x="20" y="37" width="8" height="9" rx="2" fill={c} />
        <rect x="20" y="37" width="8" height="2" rx="1" fill={trim} />
        <line x1="24" y1="44" x2="24" y2="58" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
        {/* Hem */}
        <rect x="12" y="100" width="24" height="4" fill={trim} />
        <line x1="14" y1="96" x2="12" y2="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        <line x1="34" y1="96" x2="36" y2="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        {full && <>
          {/* 3/4 sleeves */}
          <path d="M7 44 Q5 58 7 70 L14.5 70 Q15 58 15 44 Z" fill={c} />
          <path d="M41 44 Q43 58 41 70 L33.5 70 Q33 58 33 44 Z" fill={c} />
          <rect x="7"    y="67" width="7.5" height="3.5" rx="1.5" fill={trim} />
          <rect x="33.5" y="67" width="7.5" height="3.5" rx="1.5" fill={trim} />
        </>}
      </g>
    )
  },

  shawl: (c, g, full) => (
    <g>
      <path d="M13 42 L12 80 Q13 81 24 81 Q35 81 36 80 L35 42 Z" fill={c} />
      <path d="M11 37 Q16 58 20 80 Q14 81 12 79 Q7 60 10 37 Z" fill={c} opacity="0.52" />
      <path d="M37 37 Q32 58 28 80 Q34 81 36 79 Q41 60 38 37 Z" fill={c} opacity="0.47" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} opacity="0.75" />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} opacity="0.75" />
      </>}
    </g>
  ),

  suit: (c, g, full) => (
    <g>
      <path d="M11 42 L10 80 Q11 81 24 81 Q37 81 38 80 L37 42 Z" fill={c} />
      <path d="M21 42 L17 56 L24 54 L31 56 L27 42" fill={c} stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
      <path d="M21 42 L24 54 L27 42" fill="rgba(255,255,255,0.42)" />
      <path d="M23 42 L22.5 54 L24 57 L25.5 54 L25 42 Z" fill="#A32D2D" opacity="0.9" />
      <rect x="20" y="74" width="3.5" height="2.5" rx="0.5" fill="rgba(255,255,255,0.28)" />
      <rect x="25" y="74" width="3.5" height="2.5" rx="0.5" fill="rgba(255,255,255,0.28)" />
      <line x1="14" y1="56" x2="14" y2="79" stroke="rgba(255,255,255,0.07)" strokeWidth="0.9" />
      <line x1="34" y1="56" x2="34" y2="79" stroke="rgba(255,255,255,0.07)" strokeWidth="0.9" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <rect x="7"  y="73" width="8" height="5.5" rx="2.5" fill="rgba(255,255,255,0.11)" />
        <rect x="33" y="73" width="8" height="5.5" rx="2.5" fill="rgba(255,255,255,0.11)" />
        <circle cx="10.5" cy="77" r="0.8" fill="rgba(255,255,255,0.38)" />
        <circle cx="37.5" cy="77" r="0.8" fill="rgba(255,255,255,0.38)" />
      </>}
    </g>
  ),
}

// ─── Bottoms — legs y=80–112, crotch y=80–91 ─────────────────────────────────
// 3-rect coverage rule: crotch(x=lx–rx, y=80–91) + left leg(x=lx–24, y=91–112) + right leg(x=24–rx, y=91–112)
const BOTTOMS = {

  jeans: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="21" rx="2" fill={c} />
        <rect x="24" y="91" width={rx-24} height="21" rx="2" fill={c} />
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.25)" />
        <rect x="17" y="79" width="2" height="5" rx="0.5" fill="rgba(0,0,0,0.3)" />
        <rect x="29" y="79" width="2" height="5" rx="0.5" fill="rgba(0,0,0,0.3)" />
        <line x1="24" y1="91" x2="24" y2="112" stroke="rgba(0,0,0,0.16)" strokeWidth="1.3" />
        <path d="M14 88 Q18 90 22 88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
        <path d="M26 88 Q30 90 34 88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
      </g>
    )
  },

  shorts: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="11" rx="2" fill={c} />
        <rect x="24" y="91" width={rx-24} height="11" rx="2" fill={c} />
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.22)" />
        <line x1="24" y1="91" x2="24" y2="102" stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" />
      </g>
    )
  },

  joggers: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="18" rx="5" fill={c} />
        <rect x="24" y="91" width={rx-24} height="18" rx="5" fill={c} />
        <path d="M20 80 L22 83 L26 83 L28 80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        <rect x={lx} y="104" width={24-lx} height="5" rx="2.5" fill="rgba(0,0,0,0.2)" />
        <rect x="24" y="104" width={rx-24} height="5" rx="2.5" fill="rgba(0,0,0,0.2)" />
      </g>
    )
  },

  skirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="80" width="22" height="3.5" rx="1.5" fill="rgba(0,0,0,0.22)" />
      <path d="M14 83.5 Q9 96 7 112 L41 112 Q39 96 34 83.5 Z" fill={c} />
      <line x1="20" y1="84" x2="17" y2="112" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
      <line x1="28" y1="84" x2="31" y2="112" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
    </g>
  ),

  longskirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="80" width="22" height="3.5" rx="1.5" fill="rgba(0,0,0,0.22)" />
      <path d="M14 83.5 Q9 98 6 115 L42 115 Q39 98 34 83.5 Z" fill={c} />
      <line x1="18" y1="84" x2="14" y2="115" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <line x1="30" y1="84" x2="34" y2="115" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M7 114 Q24 117 41 114" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none" />
    </g>
  ),

  saree: (c, skin, fem) => {
    const gold = 'rgba(218,165,32,0.72)'
    return (
      <g>
        {/* Midriff */}
        <rect x="13" y="64" width="22" height="9" fill={skin} />
        {/* Floor-length skirt — wide enough to cover legs */}
        <path d="M12 73 L10 114 L38 114 L36 73 Z" fill={c} />
        <path d="M31 73 L33 114 L38 114 L36 73 Z" fill="rgba(0,0,0,0.13)" />
        {/* Pleats */}
        <line x1="17" y1="73" x2="16" y2="114" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="20" y1="73" x2="19" y2="114" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <line x1="23" y1="73" x2="22" y2="114" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <rect x="12" y="73" width="24" height="3" rx="1" fill="rgba(0,0,0,0.2)" />
        {/* Gold hem */}
        <rect x="10" y="110" width="28" height="4" fill={gold} />
        <line x1="10" y1="112" x2="38" y2="112" stroke="rgba(255,255,255,0.24)" strokeWidth="0.5" />
      </g>
    )
  },

  salwar: (c, skin, fem) => (
    <g>
      {/* Wide left leg meeting centre at x=24 */}
      <path d="M10 80 Q7 96 11 110 L24 110 Q22 96 21 80 Z" fill={c} />
      {/* Wide right leg */}
      <path d="M38 80 Q41 96 37 110 L24 110 Q26 96 27 80 Z" fill={c} />
      {/* Crotch fill */}
      <rect x="21" y="80" width="6" height="12" fill={c} />
      {/* Ankle gathers */}
      <rect x="11" y="105" width="13" height="2.5" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x="11" y="107.5" width="13" height="2.5" rx="1" fill="rgba(255,255,255,0.11)" />
      <rect x="24" y="105" width="13" height="2.5" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x="24" y="107.5" width="13" height="2.5" rx="1" fill="rgba(255,255,255,0.11)" />
    </g>
  ),

  formal: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="21" rx="2" fill={c} />
        <rect x="24" y="91" width={rx-24} height="21" rx="2" fill={c} />
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.4)" />
        <rect x="22" y="80" width="4" height="4" rx="0.5" fill="#C47A1F" />
        <line x1="24" y1="91" x2="24" y2="112" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="18.5" y1="92" x2="17.5" y2="112" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
        <line x1="29.5" y1="92" x2="30.5" y2="112" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      </g>
    )
  },

  dhoti: (c, skin, fem) => (
    <g>
      <path d="M13 80 Q11 96 12 110 L24 110 L24 80 Z" fill={c} />
      <path d="M35 80 Q37 96 36 110 L24 110 L24 80 Z" fill={c} />
      <path d="M24 80 Q27 92 26 102 Q25 107 24 110"
        stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      <line x1="17" y1="80" x2="15" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <line x1="20" y1="80" x2="19" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
    </g>
  ),
}

// ─── Saree pallu ──────────────────────────────────────────────────────────────
function SAREE_PALLU(c) {
  const gold = 'rgba(218,165,32,0.72)'
  return (
    <g>
      <path d="M10 44 Q9 66 9 88 L13 88 Q13 66 14 44 Z" fill={c} opacity="0.62" />
      <path d="M34 44 Q28 54 20 70 L22 70 Q30 54 36 44 Z" fill={c} opacity="0.57" />
      <path d="M34 44 Q28 54 20 70" stroke={gold} strokeWidth="1.2" fill="none" />
      <path d="M10 44 Q9 66 9 88"   stroke={gold} strokeWidth="1.2" fill="none" />
      <line x1="9" y1="87" x2="13" y2="87" stroke={gold} strokeWidth="1" />
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
const ACC = {
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

  const isFem  = cfg.gender === 'feminine'
  const isMasc = cfg.gender === 'masculine'
  const isNB   = cfg.gender === 'non-binary' || cfg.gender === 'fluid'

  // Gender-responsive face features
  const eyeRx  = isFem ? 2.65 : isNB ? 2.45 : 2.3
  const eyeRy  = isFem ? 1.95 : isNB ? 1.78 : 1.62
  const browW  = isMasc ? 1.8 : isNB ? 1.3 : 1.05
  const lipSX  = isFem ? 21.0 : 21.8
  const lipEX  = isFem ? 27.0 : 26.2
  const lipCY  = isFem ? 32.5 : 31.6
  const lipStW = isFem ? 1.45 : 1.15
  const lipCol = cfg.skinIndex <= 2 ? 'rgba(172,88,68,0.8)' : 'rgba(142,66,46,0.8)'
  const irisC  = cfg.skinIndex >= 8 ? 'rgba(45,28,12,0.92)' : 'rgba(55,38,18,0.92)'

  const faceFn    = FACE_PATHS[FACE_SHAPES[cfg.faceShapeIndex]] ?? FACE_PATHS.oval
  const hairFn    = HAIR_PATHS[cfg.hairStyle]   ?? HAIR_PATHS.short
  const topFn     = TOPS[cfg.topStyle]          ?? TOPS.tshirt
  const bottomFn  = BOTTOMS[cfg.bottomStyle]    ?? BOTTOMS.jeans
  const beardFn   = BEARDS[cfg.beardStyle]      ?? BEARDS.none
  const bodyScale = BUILD_SCALE[cfg.build]      ?? 1
  const bodyXform = `translate(24,0) scale(${bodyScale},1) translate(-24,0)`
  const headwear  = extras.filter(e => e === 'Cap' || e === 'Beanie')

  // Full-body uses 120-unit viewBox for realistic head:body proportions
  const viewH = fullBody ? 120 : 64
  const svgH  = Math.round(size * viewH / 48)

  // Unique gradient ID per instance to avoid clashes when multiple avatars render
  const gradId = `skin-${cfg.skinIndex}-${cfg.faceShapeIndex}`

  return (
    <svg
      width={size} height={svgH}
      viewBox={`0 0 48 ${viewH}`}
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle face shading: bright highlight top-right, slight shadow bottom */}
        <radialGradient id={gradId} cx="62%" cy="28%" r="65%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="60%"  stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.14)" />
        </radialGradient>
      </defs>

      {/* Hair behind head */}
      {hairFn(hairColor)}

      {/* Face base + gradient shading overlay */}
      {faceFn(skin)}
      <ellipse cx="24" cy="26" rx="11" ry="13" fill={`url(#${gradId})`} />

      {/* Cheeks */}
      <ellipse cx="17" cy="28.5" rx="4"   ry="2.5" fill="rgba(220,110,90,0.11)" />
      <ellipse cx="31" cy="28.5" rx="4"   ry="2.5" fill="rgba(220,110,90,0.11)" />
      {extras.includes('Blush') && ACC.Blush()}

      {/* Eyes — sclera + iris + pupil + catchlight */}
      <ellipse cx="20" cy="24" rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.93)" />
      <circle  cx="20" cy="24" r={eyeRx*0.57}         fill={irisC} />
      <circle  cx="20" cy="24" r={eyeRx*0.29}         fill="#0d0d0d" />
      <circle  cx={20+eyeRx*0.28} cy={24-eyeRy*0.38} r={eyeRx*0.16} fill="rgba(255,255,255,0.88)" />

      <ellipse cx="28" cy="24" rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.93)" />
      <circle  cx="28" cy="24" r={eyeRx*0.57}         fill={irisC} />
      <circle  cx="28" cy="24" r={eyeRx*0.29}         fill="#0d0d0d" />
      <circle  cx={28+eyeRx*0.28} cy={24-eyeRy*0.38} r={eyeRx*0.16} fill="rgba(255,255,255,0.88)" />

      {/* Eyelashes — feminine only */}
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
      {/* Non-binary: painted eyelid arc */}
      {isNB && (
        <g stroke={hairColor} strokeWidth="0.5" strokeLinecap="round" opacity="0.45">
          <path d="M17.7 22.7 Q20 21.8 22.3 22.7" fill="none" />
          <path d="M25.7 22.7 Q28 21.8 30.3 22.7" fill="none" />
        </g>
      )}

      {/* Eyebrows */}
      <path d={`M${isFem?18:17.5} ${isFem?21.5:21.8} Q20 ${isFem?20.2:20.4} 22.5 ${isFem?21.2:21.3}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />
      <path d={`M25.5 ${isFem?21.2:21.3} Q28 ${isFem?20.2:20.4} ${isFem?30:30.5} ${isFem?21.5:21.8}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="24" cy="27.8" rx="0.88" ry="0.52" fill="rgba(0,0,0,0.16)" />

      {/* Lips */}
      <path d={`M${lipSX} 30.5 Q24 ${lipCY} ${lipEX} 30.5`}
        stroke={lipCol} strokeWidth={lipStW} fill="none" strokeLinecap="round" />
      {isFem && (
        <path d="M21.2 30.5 Q22.5 29.8 24 30.2 Q25.5 29.8 26.8 30.5"
          stroke={lipCol} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
      )}

      {/* Face extras */}
      {extras.includes('Freckles')   && ACC.Freckles()}
      {beardFn(hairColor)}
      {extras.includes('Earrings')   && ACC.Earrings()}
      {extras.includes('Glasses')    && ACC.Glasses()}
      {extras.includes('Sunglasses') && ACC.Sunglasses()}

      {/* ── Body group (build-scaled) ── */}
      <g transform={bodyXform}>

        {/* Neck */}
        <rect x="20" y="38" width="8" height="8" fill={skin} />

        {/* Arm skin — rendered before top so sleeves overlay */}
        {fullBody && <>
          <path d="M8 46 C6 60 6 72 8 80 Q10 84 12.5 83 Q14.5 83 15 78 C15 70 15 58 15 46 Z" fill={skin} />
          <ellipse cx="11" cy="84" rx="3.2" ry="2.3" fill={skin} />
          <path d="M40 46 C42 60 42 72 40 80 Q38 84 35.5 83 Q33.5 83 33 78 C33 70 33 58 33 46 Z" fill={skin} />
          <ellipse cx="37" cy="84" rx="3.2" ry="2.3" fill={skin} />
        </>}

        {/* Leg skin — covered by bottom style */}
        {fullBody && <>
          <path d="M15 80 L14 111 Q14 112 19 112 Q22.5 112 23 111 L23 80 Z" fill={skin} />
          <path d="M25 80 L25 111 Q25.5 112 29 112 Q34 112 34 111 L33 80 Z" fill={skin} />
        </>}

        {/* Bottom BEFORE top (long tops like kameez cover legs) */}
        {fullBody && bottomFn(bottomColor, skin, isFem)}

        {/* Top over bottom */}
        {topFn(topColor, cfg.gender, fullBody)}

        {/* Saree pallu AFTER top */}
        {fullBody && cfg.bottomStyle === 'saree' && SAREE_PALLU(bottomColor)}

        {/* Shoes */}
        {fullBody && <>
          <path d="M13 111 L12 116 Q12 118 19 118 Q24 118 24 115 L24 111 Z" fill={shoeColor} />
          <path d="M24 111 L24 115 Q24 118 29 118 Q36 118 36 116 L35 111 Z" fill={shoeColor} />
          <path d="M14 113 Q17.5 112 22 113" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" fill="none" />
          <path d="M26 113 Q29.5 112 34 113" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" fill="none" />
        </>}

      </g>

      {/* Headwear on top of everything */}
      {headwear.map(h => (
        <g key={h}>{ACC[h] && ACC[h](hairColor, accentColor)}</g>
      ))}
    </svg>
  )
}
