// AvatarSVG v2 — high-fidelity illustrated avatar
// Full-body viewBox: "0 0 48 120"  (face ~33% height, body 67%)
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

// Ears visible for these hairstyles (others cover the ears)
const EAR_VISIBLE = new Set(['short','curly','afro','pixie','mohawk','ponytail','bun','spacebuns'])

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
  short: c => (
    <g>
      <ellipse cx="24" cy="19" rx="13" ry="8" fill={c} />
      <rect x="11" y="18" width="26" height="7" fill={c} />
      <path d="M13 22 Q18 20 24 19 Q30 20 35 22"
        stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none" />
    </g>
  ),
  long: c => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={c} />
      <path d="M11 18 Q7 32 8 60" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M37 18 Q41 32 40 60" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M20 12 Q24 10 28 12" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  curly: c => (
    <g>
      <ellipse cx="24" cy="16" rx="14" ry="9" fill={c} />
      <circle cx="13" cy="19" r="5.5" fill={c} />
      <circle cx="35" cy="19" r="5.5" fill={c} />
      <circle cx="18" cy="11" r="5"   fill={c} />
      <circle cx="30" cy="11" r="5"   fill={c} />
      <circle cx="24" cy="8"  r="5"   fill={c} />
      <circle cx="11" cy="24" r="4"   fill={c} />
      <circle cx="37" cy="24" r="4"   fill={c} />
      <circle cx="18" cy="10" r="1.5" fill="rgba(255,255,255,0.14)" />
      <circle cx="30" cy="10" r="1.5" fill="rgba(255,255,255,0.14)" />
    </g>
  ),
  braids: c => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="8" fill={c} />
      <path d="M14 20 Q13 38 14 70" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M22 20 Q21 40 22 75" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M30 20 Q31 38 30 70" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {[24,32,40,48,56,64].map(y => (
        <line key={y} x1="12.5" y1={y} x2="15.5" y2={y+2}
          stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      ))}
    </g>
  ),
  bun: c => (
    <g>
      {/* Hair base over head */}
      <ellipse cx="24" cy="21" rx="12" ry="7" fill={c} />
      <rect x="12" y="20" width="24" height="6" fill={c} />
      {/* Bun outer mass */}
      <circle cx="24" cy="9.5" r="9" fill={c} />
      {/* Bun center shadow — donut ring */}
      <circle cx="24" cy="9.5" r="5.8" fill="rgba(0,0,0,0.22)" />
      {/* Bun center fill */}
      <circle cx="24" cy="9.5" r="4.8" fill={c} />
      {/* Hair wrap lines */}
      <path d="M15.5 9.5 Q24 5.2 32.5 9.5"
        stroke="rgba(0,0,0,0.2)" strokeWidth="0.7" fill="none" />
      <path d="M15.5 9.5 Q24 13.8 32.5 9.5"
        stroke="rgba(0,0,0,0.14)" strokeWidth="0.7" fill="none" />
      {/* Shine highlight */}
      <ellipse cx="21.5" cy="7.2" rx="3.2" ry="1.6"
        fill="rgba(255,255,255,0.16)" transform="rotate(-20,21.5,7.2)" />
    </g>
  ),
  afro: c => (
    <g>
      <circle cx="24" cy="16" r="16" fill={c} />
      <circle cx="11" cy="22" r="8"  fill={c} />
      <circle cx="37" cy="22" r="8"  fill={c} />
      <circle cx="24" cy="4"  r="7"  fill={c} />
      {/* Texture shadows */}
      <circle cx="18" cy="7"  r="2.2" fill="rgba(0,0,0,0.1)" />
      <circle cx="28" cy="6"  r="2.2" fill="rgba(0,0,0,0.1)" />
      <circle cx="12" cy="14" r="2"   fill="rgba(0,0,0,0.1)" />
      <circle cx="36" cy="14" r="2"   fill="rgba(0,0,0,0.1)" />
      {/* Shine */}
      <ellipse cx="20" cy="9" rx="5" ry="3" fill="rgba(255,255,255,0.1)" transform="rotate(-20,20,9)" />
    </g>
  ),
  ponytail: c => (
    <g>
      <ellipse cx="24" cy="20" rx="13" ry="8" fill={c} />
      <rect x="11" y="19" width="26" height="6" fill={c} />
      <path d="M24 12 Q30 2 28 -2" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="21" y="11" width="6" height="5" fill={c} />
      {/* Hair tie */}
      <rect x="21" y="11" width="6" height="2.5" rx="1.2" fill="rgba(0,0,0,0.28)" />
      <path d="M20 15 Q24 13 28 15"
        stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" />
    </g>
  ),
  waves: c => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={c} />
      <path d="M11 20 Q7 30 11 40 Q7 48 11 56 Q9 62 12 68"
        stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M37 20 Q41 30 37 40 Q41 48 37 56 Q39 62 36 68"
        stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M20 12 Q24 10 28 12"
        stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  pixie: c => (
    <g>
      <ellipse cx="24" cy="20" rx="12" ry="7" fill={c} />
      <rect x="12" y="19" width="24" height="6" fill={c} />
      <path d="M17 19 Q21 11 29 13" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M20 15 Q24 12 27 14"
        stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
    </g>
  ),
  locs: c => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="8" fill={c} />
      {[13,16,19,22,25,28,31,34].map((x,i) => (
        <g key={x}>
          <rect x={x} y="20" width="3" height={26+(i%3)*9} rx="1.5" fill={c} />
          <line x1={x+1.5} y1="25" x2={x+1.5} y2={38+(i%3)*8}
            stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        </g>
      ))}
    </g>
  ),
  mohawk: c => (
    <g>
      <rect x="20" y="3" width="8" height="22" rx="4" fill={c} />
      <rect x="11" y="20" width="9" height="4" rx="2" fill={c} />
      <rect x="28" y="20" width="9" height="4" rx="2" fill={c} />
      <path d="M23 6 Q24 5 25 6 Q24 9 23 6"  fill="rgba(255,255,255,0.18)" />
      <path d="M23 11 Q24 10 25 11 Q24 14 23 11" fill="rgba(255,255,255,0.12)" />
    </g>
  ),
  bob: c => (
    <g>
      <ellipse cx="24" cy="17" rx="13" ry="9" fill={c} />
      <path d="M11 17 Q9 30 11 42"  stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M37 17 Q39 30 37 42" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M11 42 Q24 47 37 42" stroke={c} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M20 12 Q24 10 28 12" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
    </g>
  ),
  sideswept: c => (
    <g>
      <ellipse cx="24" cy="18" rx="13" ry="8" fill={c} />
      <rect x="11" y="18" width="26" height="5" fill={c} />
      <path d="M37 17 Q41 34 38 62" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M22 18 Q32 11 38 8"  stroke={c} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M24 13 Q30 10 36 9"  stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
    </g>
  ),
  spacebuns: c => (
    <g>
      <ellipse cx="24" cy="21" rx="13" ry="7" fill={c} />
      <rect x="11" y="20" width="26" height="5" fill={c} />
      {/* Left bun */}
      <circle cx="13" cy="12" r="7"   fill={c} />
      <circle cx="13" cy="12" r="4.2" fill="rgba(0,0,0,0.2)" />
      <circle cx="13" cy="12" r="3.2" fill={c} />
      {/* Right bun */}
      <circle cx="35" cy="12" r="7"   fill={c} />
      <circle cx="35" cy="12" r="4.2" fill="rgba(0,0,0,0.2)" />
      <circle cx="35" cy="12" r="3.2" fill={c} />
      {/* Shine */}
      <ellipse cx="11" cy="10" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="33" cy="10" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.15)" />
    </g>
  ),
}

// ─── Tops ─────────────────────────────────────────────────────────────────────
const TOPS = {

  tshirt: (c, g, full) => (
    <g>
      <path d="M12 44 L11 80 Q12 81 24 81 Q36 81 37 80 L36 44 Z" fill={c} />
      {/* Collar shadow */}
      <path d="M19 44 Q24 51 29 44"
        stroke="rgba(0,0,0,0.14)" strokeWidth="1" fill="rgba(0,0,0,0.06)" />
      {/* Side seams */}
      <path d="M12 44 L11 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      <path d="M36 44 L37 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      {/* Center fold */}
      <line x1="24" y1="52" x2="24" y2="79" stroke="rgba(0,0,0,0.05)" strokeWidth="0.8" />
      {full && <>
        {/* Short sleeves */}
        <path d="M8 44 Q5 54 7 62 L15 61 Q15 54 15 44 Z" fill={c} />
        <path d="M40 44 Q43 54 41 62 L33 61 Q33 54 33 44 Z" fill={c} />
        <path d="M8 61  Q11 63 15 61"  stroke="rgba(0,0,0,0.12)" strokeWidth="0.9" fill="none" />
        <path d="M33 61 Q37 63 40 61" stroke="rgba(0,0,0,0.12)" strokeWidth="0.9" fill="none" />
      </>}
    </g>
  ),

  shirt: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      {/* Placket */}
      <rect x="22.5" y="42" width="3" height="38" fill="rgba(255,255,255,0.1)" />
      {[50,58,66,74].map(y => <circle key={y} cx="24" cy={y} r="0.9" fill="rgba(255,255,255,0.45)" />)}
      {/* Collar */}
      <path d="M19 42 L16 48 L24 46 L32 48 L29 42"
        fill={c} stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 58 7 78 L15 78 Q15 58 15 44 Z" fill={c} />
        <path d="M40 44 Q43 58 41 78 L33 78 Q33 58 33 44 Z" fill={c} />
        <path d="M7 75  Q11 77 15 75"  stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
        <path d="M33 75 Q37 77 41 75" stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" fill="none" />
      </>}
    </g>
  ),

  hoodie: (c, g, full) => (
    <g>
      <path d="M11 42 L10 80 Q11 81 24 81 Q37 81 38 80 L37 42 Z" fill={c} />
      {/* Hood drawstring */}
      <path d="M18 42 Q24 53 30 42"
        stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" fill="rgba(0,0,0,0.1)" />
      {/* Kangaroo pocket */}
      <rect x="19" y="64" width="10" height="9" rx="2" fill="rgba(0,0,0,0.16)" />
      <path d="M11 42 L10 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      <path d="M37 42 L38 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <path d="M7 75  Q11 79 15 75"  stroke="rgba(0,0,0,0.22)" strokeWidth="3" fill="none" />
        <path d="M33 75 Q37 79 41 75" stroke="rgba(0,0,0,0.22)" strokeWidth="3" fill="none" />
      </>}
    </g>
  ),

  jacket: (c, g, full) => (
    <g>
      <path d="M11 42 L10 80 Q11 81 24 81 Q37 81 38 80 L37 42 Z" fill={c} />
      <path d="M21 42 L24 54 L27 42" fill="rgba(255,255,255,0.2)" />
      <line x1="11" y1="44" x2="11" y2="79" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="37" y1="44" x2="37" y2="79" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="24" cy="63" r="1"   fill="rgba(255,255,255,0.4)" />
      <circle cx="24" cy="72" r="1"   fill="rgba(255,255,255,0.4)" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <path d="M7 75  Q11 77 15 75"  stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M33 75 Q37 77 41 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      </>}
    </g>
  ),

  sweater: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      {/* Neck ribbing */}
      <rect x="19" y="35" width="10" height="9" rx="4.5" fill={c} />
      {/* Hem ribbing */}
      <rect x="11" y="77" width="26" height="4" rx="2" fill="rgba(0,0,0,0.14)" />
      {[13,15,17,19,21,23,25,27,29,31,33,35].map(x => (
        <line key={x} x1={x} y1="77" x2={x} y2="81"
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      ))}
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <rect x="7"  y="73" width="8" height="5.5" rx="2.5" fill="rgba(0,0,0,0.2)" />
        <rect x="33" y="73" width="8" height="5.5" rx="2.5" fill="rgba(0,0,0,0.2)" />
      </>}
    </g>
  ),

  turtleneck: (c, g, full) => (
    <g>
      <path d="M12 42 L11 80 Q12 81 24 81 Q36 81 37 80 L36 42 Z" fill={c} />
      <rect x="18" y="30" width="12" height="14" rx="6" fill={c} />
      <rect x="19" y="31" width="10" height="12" rx="5" fill="rgba(0,0,0,0.1)" />
      <path d="M12 42 L11 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      <path d="M36 42 L37 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2.5" fill="none" />
      {full && <>
        <path d="M8 44 Q5 60 7 78 L15 78 Q15 60 15 44 Z" fill={c} />
        <path d="M40 44 Q43 60 41 78 L33 78 Q33 60 33 44 Z" fill={c} />
        <rect x="7"  y="74" width="8" height="4" rx="2" fill="rgba(0,0,0,0.15)" />
        <rect x="33" y="74" width="8" height="4" rx="2" fill="rgba(0,0,0,0.15)" />
      </>}
    </g>
  ),

  tank: (c, g, full) => (
    g === 'feminine'
      ? <g>
          <path d="M15 42 L14 80 Q15 81 24 81 Q33 81 34 80 L33 42 Z" fill={c} />
          <path d="M15 37 L15 42 L19 42 L20 37 Z" fill={c} />
          <path d="M33 37 L33 42 L29 42 L28 37 Z" fill={c} />
          <path d="M15 42 L14 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2" fill="none" />
          <path d="M33 42 L34 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2" fill="none" />
          {/* Waist dip */}
          <path d="M14 62 Q19 64 24 63 Q29 64 34 62"
            stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" fill="none" />
        </g>
      : <g>
          <path d="M16 42 L15 80 Q16 81 24 81 Q32 81 33 80 L32 42 Z" fill={c} />
          <path d="M16 37 L16 42 L20 42 L20 37 Z" fill={c} />
          <path d="M32 37 L32 42 L28 42 L28 37 Z" fill={c} />
          <path d="M16 42 L15 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2" fill="none" />
          <path d="M32 42 L33 80" stroke="rgba(0,0,0,0.09)" strokeWidth="2" fill="none" />
        </g>
  ),

  kameez: (c, g, full) => {
    const trim = 'rgba(218,165,32,0.82)'
    return (
      <g>
        {/* Long A-line kurta body */}
        <path d="M15 44 Q13 72 12 100 Q12 108 24 108 Q36 108 36 100 Q35 72 33 44 Z" fill={c} />
        {/* Side shading */}
        <path d="M15 44 Q13 72 12 100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        <path d="M33 44 Q35 72 36 100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
        {/* Yoke panel */}
        <path d="M15 44 Q15 57 24 58 Q33 57 33 44 Z" fill="rgba(0,0,0,0.16)" />
        <path d="M15 57 Q24 59 33 57" stroke={trim} strokeWidth="1.5" fill="none" />
        {/* Yoke embroidery dots */}
        {[17.5,20.5,23.5,26.5,29.5].map(x => (
          <circle key={x} cx={x} cy="51" r="0.75" fill={trim} opacity="0.9" />
        ))}
        {/* Mandarin collar */}
        <rect x="20" y="37" width="8" height="9" rx="2" fill={c} />
        <rect x="20" y="37" width="8" height="2.2" rx="1" fill={trim} />
        {/* Center line */}
        <line x1="24" y1="44" x2="24" y2="58" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
        {/* Hem trim */}
        <path d="M12 100 Q24 104 36 100 L36 104 Q24 108 12 104 Z" fill={trim} />
        <path d="M12 102 Q24 106 36 102" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" fill="none" />
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
      <path d="M21 42 L17 56 L24 54 L31 56 L27 42"
        fill={c} stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
      <path d="M21 42 L24 54 L27 42" fill="rgba(255,255,255,0.42)" />
      {/* Tie */}
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

// ─── Bottoms ──────────────────────────────────────────────────────────────────
const BOTTOMS = {

  jeans: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="21" rx="2" fill={c} />
        <rect x="24" y="91" width={rx-24} height="21" rx="2" fill={c} />
        {/* Waistband */}
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.26)" />
        {/* Belt loops */}
        <rect x="17" y="79" width="2" height="5" rx="0.5" fill="rgba(0,0,0,0.32)" />
        <rect x="29" y="79" width="2" height="5" rx="0.5" fill="rgba(0,0,0,0.32)" />
        {/* Inseam */}
        <line x1="24" y1="91" x2="24" y2="112" stroke="rgba(0,0,0,0.18)" strokeWidth="1.3" />
        {/* Highlight */}
        <path d="M14 88 Q18 90 22 88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
        <path d="M26 88 Q30 90 34 88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" fill="none" />
        {/* Thigh highlight */}
        <path d="M15 95 Q17 98 18 104" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none" />
        <path d="M33 95 Q31 98 30 104" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none" />
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
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.23)" />
        <line x1="24" y1="91" x2="24" y2="102" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" />
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
        <path d="M20 80 L22 83 L26 83 L28 80"
          stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        {/* Ankle cuffs */}
        <rect x={lx} y="104" width={24-lx} height="5" rx="2.5" fill="rgba(0,0,0,0.22)" />
        <rect x="24" y="104" width={rx-24} height="5" rx="2.5" fill="rgba(0,0,0,0.22)" />
      </g>
    )
  },

  skirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="80" width="22" height="3.5" rx="1.5" fill="rgba(0,0,0,0.23)" />
      <path d="M14 83.5 Q9 96 7 112 L41 112 Q39 96 34 83.5 Z" fill={c} />
      {/* Fabric folds */}
      <line x1="20" y1="84" x2="17" y2="112" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
      <line x1="28" y1="84" x2="31" y2="112" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
      <line x1="24" y1="84" x2="24" y2="112" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
      {/* Hem shadow */}
      <path d="M8 110 Q24 113 40 110" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none" />
    </g>
  ),

  longskirt: (c, skin, fem) => (
    <g>
      <rect x="13" y="80" width="22" height="3.5" rx="1.5" fill="rgba(0,0,0,0.23)" />
      <path d="M14 83.5 Q9 98 6 115 L42 115 Q39 98 34 83.5 Z" fill={c} />
      <line x1="18" y1="84" x2="14" y2="115" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      <line x1="30" y1="84" x2="34" y2="115" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      <path d="M7 114 Q24 117 41 114" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none" />
    </g>
  ),

  saree: (c, skin, fem) => {
    const gold      = 'rgba(218,165,32,0.92)'
    const goldLight = 'rgba(255,215,80,0.55)'
    return (
      <g>
        {/* Midriff skin between choli and skirt */}
        <rect x="13" y="65" width="22" height="10" fill={skin} />
        {/* Midriff shadow at waist */}
        <path d="M13 73 Q24 75 35 73" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />

        {/* Petticoat underlayer (slightly visible at hem) */}
        <path d="M12 75 Q9 94 7 116 L41 116 Q39 94 36 75 Z"
          fill={skin} opacity="0.5" />

        {/* Main saree skirt fabric */}
        <path d="M13 75 Q10 94 8 116 L40 116 Q38 94 35 75 Z" fill={c} />

        {/* Left-side fold shadows */}
        <path d="M14 75 Q12 94 11 116 L13 116 Q14 94 15 75 Z"
          fill="rgba(0,0,0,0.12)" />
        <path d="M19 75 Q17 94 17 116 L19 116 Q20 94 21 75 Z"
          fill="rgba(0,0,0,0.08)" />

        {/* Center box pleats */}
        <path d="M21 75 Q20 94 20 116 L24 116 Q24 94 24 75 Z"
          fill="rgba(0,0,0,0.13)" />
        <path d="M24 75 Q24 94 24 116 L28 116 Q28 94 27 75 Z"
          fill="rgba(0,0,0,0.1)" />

        {/* Right-side fold shadows */}
        <path d="M30 75 Q31 94 31 116 L33 116 Q32 94 32 75 Z"
          fill="rgba(0,0,0,0.08)" />

        {/* Fabric highlight streaks */}
        <path d="M16 75 Q15 95 15 116" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" fill="none" />
        <path d="M33 75 Q34 95 34 116" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" fill="none" />

        {/* Waistband */}
        <rect x="12" y="73" width="24" height="4" rx="1.5" fill="rgba(0,0,0,0.3)" />
        <rect x="13" y="74" width="22" height="1.8" rx="0.9" fill="rgba(255,255,255,0.06)" />

        {/* Gold border — wide zari at hem */}
        <path d="M8 110 Q24 114 40 110 L40 116 Q24 120 8 116 Z" fill={gold} />
        {/* Gold border highlight */}
        <path d="M8 110 Q24 113 40 110"
          stroke={goldLight} strokeWidth="0.9" fill="none" />
        {/* Gold border inner detail line */}
        <path d="M8 108 Q24 111 40 108"
          stroke={gold} strokeWidth="0.7" fill="none" opacity="0.65" />
        {/* Gold border pattern dots */}
        {[10,14,18,22,26,30,34,38].map(x => (
          <circle key={x} cx={x} cy="113" r="0.6" fill={goldLight} />
        ))}
      </g>
    )
  },

  salwar: (c, skin, fem) => (
    <g>
      {/* Wide left leg */}
      <path d="M10 80 Q7 96 11 110 L24 110 Q22 96 21 80 Z" fill={c} />
      {/* Wide right leg */}
      <path d="M38 80 Q41 96 37 110 L24 110 Q26 96 27 80 Z" fill={c} />
      {/* Crotch fill */}
      <rect x="21" y="80" width="6" height="12" fill={c} />
      {/* Ankle gathers */}
      <rect x="11" y="105" width="13" height="2.5" rx="1.2" fill="rgba(255,255,255,0.17)" />
      <rect x="11" y="107.5" width="13" height="2.5" rx="1.2" fill="rgba(255,255,255,0.12)" />
      <rect x="24" y="105" width="13" height="2.5" rx="1.2" fill="rgba(255,255,255,0.17)" />
      <rect x="24" y="107.5" width="13" height="2.5" rx="1.2" fill="rgba(255,255,255,0.12)" />
    </g>
  ),

  formal: (c, skin, fem) => {
    const lx = fem ? 11 : 13, rx = fem ? 37 : 35
    return (
      <g>
        <rect x={lx} y="80" width={rx-lx} height="11" fill={c} />
        <rect x={lx} y="91" width={24-lx} height="21" rx="2" fill={c} />
        <rect x="24" y="91" width={rx-24} height="21" rx="2" fill={c} />
        <rect x={lx} y="80" width={rx-lx} height="4" rx="1" fill="rgba(0,0,0,0.42)" />
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

// ─── Saree pallu (redesigned diagonal drape) ──────────────────────────────────
function SAREE_PALLU(c) {
  const gold      = 'rgba(218,165,32,0.92)'
  const goldLight = 'rgba(255,215,80,0.55)'
  return (
    <g>
      {/* Main pallu body — diagonal filled shape from right hip to left shoulder */}
      <path
        d="M33 76 Q25 66 17 56 Q13 50 10 44
           L7 44 Q9 49 13 55 Q21 65 29 76 Z"
        fill={c} opacity="0.88"
      />
      {/* Pallu inner fold line */}
      <path d="M30 76 Q22 66 14 56 Q11 50 9 44"
        stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none" />
      {/* Pallu fabric sheen */}
      <path d="M29 76 Q21 66 13 56 Q10 50 8.5 44"
        stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
      {/* Gold zari border on pallu edge */}
      <path d="M33 76 Q25 66 17 56 Q13 50 10 44"
        stroke={gold} strokeWidth="1.4" fill="none" />
      <path d="M33 76 Q25 66 17 56 Q13 50 10 44"
        stroke={goldLight} strokeWidth="0.5" fill="none" />

      {/* Hanging pallu end from left shoulder */}
      <path d="M7 44 Q6 52 7 65 Q7.5 71 8 78
               L13 78 Q12.5 71 12 65 Q11 52 12 44 Z"
        fill={c} opacity="0.82" />
      {/* Gold hem on hanging end */}
      <path d="M8 73 Q10.5 75 13 73 L13 78 Q10.5 80 8 78 Z" fill={gold} />
      <path d="M8 73 Q10.5 75 13 73"
        stroke={goldLight} strokeWidth="0.6" fill="none" />
      {/* Gold dots on hanging hem */}
      {[8.5,10,11.5].map(x => (
        <circle key={x} cx={x} cy="75.5" r="0.55" fill={goldLight} />
      ))}

      {/* Fold texture lines on main pallu */}
      <path d="M10 44 Q16 54 22 64 Q26 70 29 76"
        stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" fill="none" />
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
      ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="0.9" />)}
    </g>
  ),
  mustache: (c) => (
    <path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} />
  ),
  goatee:   (c) => (
    <g>
      <path d="M18 29 Q20 32 24 30 Q28 32 30 29 Q28 27 24 28 Q20 27 18 29 Z" fill={c} />
      <path d="M22 32 Q24 39 22 43 Q24 45 26 43 Q24 39 26 32 Z" fill={c} />
    </g>
  ),
  full:     (c) => (
    <path d="M15 30 Q15 42 24 45 Q33 42 33 30 Q29 33 24 34 Q19 33 15 30 Z" fill={c} />
  ),
  extended: (c) => (
    <path d="M14 28 Q13 45 24 50 Q35 45 34 28 Q30 32 24 34 Q18 32 14 28 Z" fill={c} />
  ),
}

// ─── Accessories ─────────────────────────────────────────────────────────────
const ACC = {
  Glasses: () => (
    <g>
      <rect x="14" y="21.5" width="8" height="5.5" rx="2.5"
        stroke="rgba(180,180,180,0.9)" strokeWidth="0.85" fill="rgba(150,200,255,0.1)" />
      <rect x="26" y="21.5" width="8" height="5.5" rx="2.5"
        stroke="rgba(180,180,180,0.9)" strokeWidth="0.85" fill="rgba(150,200,255,0.1)" />
      <line x1="22" y1="24.3" x2="26" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.85" />
      <line x1="10" y1="24.3" x2="14" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.85" />
      <line x1="34" y1="24.3" x2="38" y2="24.3" stroke="rgba(180,180,180,0.9)" strokeWidth="0.85" />
    </g>
  ),
  Sunglasses: () => (
    <g>
      <rect x="13" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.8)" />
      <rect x="25" y="21.5" width="10" height="5.5" rx="2" fill="rgba(0,0,0,0.8)" />
      <line x1="23" y1="24.3" x2="25" y2="24.3" stroke="#555" strokeWidth="0.8" />
      <line x1="10" y1="24.3" x2="13" y2="24.3" stroke="#555" strokeWidth="0.8" />
      <line x1="35" y1="24.3" x2="38" y2="24.3" stroke="#555" strokeWidth="0.8" />
    </g>
  ),
  Cap: (_h, acc) => (
    <g>
      <path d="M11 20 Q12 10 24 9 Q36 10 37 20 Z" fill={acc||'#222'} />
      <rect x="8" y="18.5" width="18" height="3.5" rx="1.5" fill={acc?acc+'dd':'#111'} />
      <circle cx="24" cy="10" r="2" fill="rgba(255,255,255,0.28)" />
    </g>
  ),
  Beanie: (_h, acc) => (
    <g>
      <path d="M11 22 Q11 9 24 8 Q37 9 37 22 Z" fill={acc||'#444'} />
      <rect x="11" y="20" width="26" height="4" rx="2" fill={acc||'#444'} />
      <circle cx="24" cy="8" r="3.5" fill={acc||'#444'} />
      {[16,20,24,28,32].map(x => (
        <line key={x} x1={x} y1={x===16||x===32?14:x===20||x===28?12:11} x2={x} y2="21"
          stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
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
      <circle cx="19" cy="27"   r="0.9" fill="rgba(0,0,0,0.18)" />
      <circle cx="22" cy="26"   r="0.9" fill="rgba(0,0,0,0.18)" />
      <circle cx="26" cy="26"   r="0.9" fill="rgba(0,0,0,0.18)" />
      <circle cx="29" cy="27"   r="0.9" fill="rgba(0,0,0,0.18)" />
      <circle cx="20" cy="29.5" r="0.7" fill="rgba(0,0,0,0.13)" />
      <circle cx="28" cy="29.5" r="0.7" fill="rgba(0,0,0,0.13)" />
      <circle cx="24" cy="28"   r="0.7" fill="rgba(0,0,0,0.13)" />
    </g>
  ),
  Blush: () => (
    <g>
      <circle cx="17" cy="28" r="4.5" fill="rgba(255,100,100,0.22)" />
      <circle cx="31" cy="28" r="4.5" fill="rgba(255,100,100,0.22)" />
    </g>
  ),
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

  // Gender-responsive eye sizing
  const eyeRx  = isFem ? 2.7  : isNB ? 2.5  : 2.3
  const eyeRy  = isFem ? 2.0  : isNB ? 1.82 : 1.65
  const browW  = isMasc ? 1.8 : isNB ? 1.35 : 1.1
  const lipSX  = isFem ? 21.0 : 21.8
  const lipEX  = isFem ? 27.0 : 26.2
  const lipCY  = isFem ? 33.2 : 32.4
  const lipStW = isFem ? 1.5  : 1.2
  const lipCol = cfg.skinIndex <= 2 ? 'rgba(172,88,68,0.85)' : 'rgba(142,66,46,0.85)'
  const irisC  = cfg.skinIndex >= 8 ? 'rgba(45,28,12,0.95)'  : 'rgba(55,38,18,0.92)'

  const faceFn    = FACE_PATHS[FACE_SHAPES[cfg.faceShapeIndex]] ?? FACE_PATHS.oval
  const hairFn    = HAIR_PATHS[cfg.hairStyle]   ?? HAIR_PATHS.short
  const topFn     = TOPS[cfg.topStyle]          ?? TOPS.tshirt
  const bottomFn  = BOTTOMS[cfg.bottomStyle]    ?? BOTTOMS.jeans
  const beardFn   = BEARDS[cfg.beardStyle]      ?? BEARDS.none
  const bodyScale = BUILD_SCALE[cfg.build]      ?? 1
  const bodyXform = `translate(24,0) scale(${bodyScale},1) translate(-24,0)`
  const headwear  = extras.filter(e => e === 'Cap' || e === 'Beanie')
  const showEars  = EAR_VISIBLE.has(cfg.hairStyle)

  const viewH = fullBody ? 120 : 64
  const svgH  = Math.round(size * viewH / 48)

  // Unique gradient IDs per instance
  const gradId  = `skin-${cfg.skinIndex}-${cfg.faceShapeIndex}`
  const neckGrd = `neck-${cfg.skinIndex}`

  return (
    <svg
      width={size} height={svgH}
      viewBox={`0 0 48 ${viewH}`}
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Face radial gradient: highlight top-right, shadow bottom-left */}
        <radialGradient id={gradId} cx="62%" cy="26%" r="68%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.2)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
        </radialGradient>
        {/* Neck gradient */}
        <linearGradient id={neckGrd} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.12)" />
          <stop offset="30%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="70%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      </defs>

      {/* ── Hair layer behind head ── */}
      {hairFn(hairColor)}

      {/* ── Ears (behind face) ── */}
      {showEars && <>
        <ellipse cx="13" cy="26.5" rx="2.3" ry="2.9" fill={skin} />
        <ellipse cx="35" cy="26.5" rx="2.3" ry="2.9" fill={skin} />
      </>}

      {/* ── Face base + shading overlay ── */}
      {faceFn(skin)}
      <ellipse cx="24" cy="26" rx="11" ry="13" fill={`url(#${gradId})`} />

      {/* ── Ear canal detail (after face, so it's on top of the ear but not the face) ── */}
      {showEars && <>
        <ellipse cx="13" cy="26.8" rx="1.3" ry="1.7" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="35" cy="26.8" rx="1.3" ry="1.7" fill="rgba(0,0,0,0.12)" />
      </>}

      {/* ── Jaw shadow ── */}
      <ellipse cx="24" cy="37.5" rx="8" ry="2.2" fill="rgba(0,0,0,0.08)" />

      {/* ── Cheek warmth ── */}
      <ellipse cx="17.5" cy="29" rx="4"   ry="2.6" fill="rgba(220,110,90,0.12)" />
      <ellipse cx="30.5" cy="29" rx="4"   ry="2.6" fill="rgba(220,110,90,0.12)" />
      {extras.includes('Blush') && ACC.Blush()}

      {/* ── Bindi (feminine only) ── */}
      {isFem && (
        <circle cx="24" cy="14.8" r="1.15" fill="#CC0000" />
      )}

      {/* ── Eyes — sclera + iris + pupil + catchlight ── */}
      {/* Left eye */}
      <ellipse cx="20" cy="24" rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.95)" />
      <circle  cx="20" cy="24" r={eyeRx*0.6}          fill={irisC} />
      {/* Limbal ring */}
      <circle  cx="20" cy="24" r={eyeRx*0.6}
        fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.35" />
      <circle  cx="20" cy="24" r={eyeRx*0.3}           fill="#0d0d0d" />
      <circle  cx={20+eyeRx*0.28} cy={24-eyeRy*0.4} r={eyeRx*0.17} fill="rgba(255,255,255,0.9)" />
      {/* Upper eyelid arc */}
      <path d={`M${20-eyeRx+0.4} 24 Q20 ${24-eyeRy-1.1} ${20+eyeRx-0.4} 24`}
        stroke="rgba(0,0,0,0.5)" strokeWidth="0.85" fill="none" strokeLinecap="round" />
      {/* Lower lid shadow */}
      <path d={`M${20-eyeRx+0.5} 24 Q20 ${24+eyeRy+0.5} ${20+eyeRx-0.5} 24`}
        stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* Right eye */}
      <ellipse cx="28" cy="24" rx={eyeRx} ry={eyeRy} fill="rgba(255,255,255,0.95)" />
      <circle  cx="28" cy="24" r={eyeRx*0.6}          fill={irisC} />
      <circle  cx="28" cy="24" r={eyeRx*0.6}
        fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.35" />
      <circle  cx="28" cy="24" r={eyeRx*0.3}           fill="#0d0d0d" />
      <circle  cx={28+eyeRx*0.28} cy={24-eyeRy*0.4} r={eyeRx*0.17} fill="rgba(255,255,255,0.9)" />
      <path d={`M${28-eyeRx+0.4} 24 Q28 ${24-eyeRy-1.1} ${28+eyeRx-0.4} 24`}
        stroke="rgba(0,0,0,0.5)" strokeWidth="0.85" fill="none" strokeLinecap="round" />
      <path d={`M${28-eyeRx+0.5} 24 Q28 ${24+eyeRy+0.5} ${28+eyeRx-0.5} 24`}
        stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" fill="none" strokeLinecap="round" />

      {/* ── Eyelashes (feminine) ── */}
      {isFem && (
        <g stroke={hairColor} strokeWidth="0.7" strokeLinecap="round" opacity="0.72">
          <line x1="17.5" y1="22.4" x2="17.0" y2="21.2" />
          <line x1="19.2" y1="22.1" x2="18.9" y2="20.9" />
          <line x1="21.0" y1="22.4" x2="21.5" y2="21.2" />
          <line x1="26.5" y1="22.4" x2="26.1" y2="21.2" />
          <line x1="28.2" y1="22.1" x2="28.0" y2="20.9" />
          <line x1="30.0" y1="22.4" x2="30.5" y2="21.2" />
        </g>
      )}
      {/* Non-binary: painted eyelid arc */}
      {isNB && (
        <g stroke={hairColor} strokeWidth="0.5" strokeLinecap="round" opacity="0.45">
          <path d="M17.7 22.7 Q20 21.8 22.3 22.7" fill="none" />
          <path d="M25.7 22.7 Q28 21.8 30.3 22.7" fill="none" />
        </g>
      )}

      {/* ── Eyebrows ── */}
      <path
        d={`M${isFem?18:17.5} ${isFem?21.5:21.8} Q20 ${isFem?20.0:20.3} 22.5 ${isFem?21.1:21.2}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />
      <path
        d={`M25.5 ${isFem?21.1:21.2} Q28 ${isFem?20.0:20.3} ${isFem?30:30.5} ${isFem?21.5:21.8}`}
        stroke={hairColor} strokeWidth={browW} fill="none" strokeLinecap="round" />

      {/* ── Nose — bridge + nostrils ── */}
      {/* Bridge lines */}
      <path d="M22.4 23.2 Q22 26 21.5 28.2"
        stroke="rgba(0,0,0,0.11)" strokeWidth="0.65" fill="none" />
      <path d="M25.6 23.2 Q26 26 26.5 28.2"
        stroke="rgba(0,0,0,0.11)" strokeWidth="0.65" fill="none" />
      {/* Nostrils */}
      <ellipse cx="22.1" cy="28.8" rx="1.5" ry="0.75" fill="rgba(0,0,0,0.14)" />
      <ellipse cx="25.9" cy="28.8" rx="1.5" ry="0.75" fill="rgba(0,0,0,0.14)" />
      {/* Nose tip highlight */}
      <ellipse cx="24" cy="27.8" rx="1.3" ry="0.6" fill="rgba(255,255,255,0.12)" />

      {/* ── Lips — cupid's bow + lower lip ── */}
      {/* Upper lip / cupid's bow */}
      <path d={`M${lipSX} 31.2 Q22.2 29.6 24 30.4 Q25.8 29.6 ${lipEX} 31.2`}
        stroke={lipCol} strokeWidth={lipStW} fill="rgba(0,0,0,0.04)" strokeLinecap="round" />
      {/* Lower lip */}
      <path d={`M${lipSX} 31.2 Q24 ${lipCY} ${lipEX} 31.2`}
        stroke={lipCol} strokeWidth={lipStW} fill="rgba(180,70,55,0.07)" strokeLinecap="round" />
      {/* Center crease */}
      <path d={`M${lipSX+0.6} 31.2 Q24 31.7 ${lipEX-0.6} 31.2`}
        stroke={lipCol} strokeWidth="0.65" fill="none" strokeLinecap="round" />
      {/* Lower lip highlight */}
      {isFem && (
        <ellipse cx="24" cy={lipCY-0.5} rx="2.2" ry="0.55" fill="rgba(255,255,255,0.16)" />
      )}

      {/* ── Face extras ── */}
      {extras.includes('Freckles')   && ACC.Freckles()}
      {beardFn(hairColor)}
      {extras.includes('Earrings')   && ACC.Earrings()}
      {extras.includes('Glasses')    && ACC.Glasses()}
      {extras.includes('Sunglasses') && ACC.Sunglasses()}

      {/* ── Body group (build-scaled) ── */}
      <g transform={bodyXform}>

        {/* Neck */}
        <rect x="20" y="38" width="8" height="8" fill={skin} />
        {/* Neck side shadow */}
        <rect x="20" y="38" width="8" height="8" fill={`url(#${neckGrd})`} />
        {/* Collarbone hint */}
        <path d="M17 44 Q24 46 31 44"
          stroke="rgba(0,0,0,0.07)" strokeWidth="1" fill="none" />

        {/* Arm skin — proper tapered shape */}
        {fullBody && <>
          {/* Left arm */}
          <path d="M8 46 C6 60 6 72 8 80 Q9 84 11 85 Q13 84 14 80 C14 72 14 60 13 46 Z"
            fill={skin} />
          {/* Left arm highlight */}
          <path d="M8.5 50 C7.5 62 7.5 72 9 80"
            stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
          {/* Left arm shadow (inner) */}
          <path d="M13.5 48 C13 60 13 72 13 80"
            stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
          {/* Left hand */}
          <ellipse cx="11" cy="85.5" rx="3.2" ry="2.2" fill={skin} />
          {/* Left finger hint */}
          <path d="M8.5 85 Q9 88 11 88 Q13 88 13.5 85"
            stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" fill="none" />

          {/* Right arm */}
          <path d="M40 46 C42 60 42 72 40 80 Q39 84 37 85 Q35 84 34 80 C34 72 34 60 35 46 Z"
            fill={skin} />
          {/* Right arm highlight */}
          <path d="M39.5 50 C40.5 62 40.5 72 39 80"
            stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
          {/* Right arm shadow (inner) */}
          <path d="M34.5 48 C35 60 35 72 35 80"
            stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
          {/* Right hand */}
          <ellipse cx="37" cy="85.5" rx="3.2" ry="2.2" fill={skin} />
          <path d="M34.5 85 Q35 88 37 88 Q39 88 39.5 85"
            stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" fill="none" />
        </>}

        {/* Leg skin */}
        {fullBody && <>
          <path d="M15 80 L14 111 Q14 112 19 112 Q22.5 112 23 111 L23 80 Z" fill={skin} />
          {/* Left leg inner shadow */}
          <path d="M23 82 L22.5 111" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
          <path d="M25 80 L25 111 Q25.5 112 29 112 Q34 112 34 111 L33 80 Z" fill={skin} />
          {/* Right leg inner shadow */}
          <path d="M25 82 L25.5 111" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
        </>}

        {/* Bottom rendered before top (long tops like kameez cover legs) */}
        {fullBody && bottomFn(bottomColor, skin, isFem)}

        {/* Top over bottom */}
        {topFn(topColor, cfg.gender, fullBody)}

        {/* Saree pallu AFTER top */}
        {fullBody && cfg.bottomStyle === 'saree' && SAREE_PALLU(bottomColor)}

        {/* Shoes */}
        {fullBody && <>
          <path d="M13 111 L12 116 Q12 118 19 118 Q24 118 24 115 L24 111 Z" fill={shoeColor} />
          <path d="M24 111 L24 115 Q24 118 29 118 Q36 118 36 116 L35 111 Z" fill={shoeColor} />
          {/* Shoe highlight */}
          <path d="M14 113 Q17.5 112 22 113"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none" />
          <path d="M26 113 Q29.5 112 34 113"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none" />
          {/* Shoe sole line */}
          <path d="M12 116 Q18 117.5 24 117 Q30 117.5 36 116"
            stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" fill="none" />
        </>}

      </g>

      {/* ── Headwear (top of everything) ── */}
      {headwear.map(h => (
        <g key={h}>{ACC[h] && ACC[h](hairColor, accentColor)}</g>
      ))}
    </svg>
  )
}
