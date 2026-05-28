// Layered SVG avatar system
// Each layer is a pure SVG path group so it composites cleanly

const SKIN_TONES = ['#FDBCAD', '#F0A882', '#C5703A', '#8D4E28', '#4A2912']

const HAIR_COLORS = ['#3C3489', '#2C2C2A', '#A32D2D', '#EF9F27', '#F5F0E8']

// Hair paths keyed by style
const HAIR_PATHS = {
  short: (color) => (
    <g>
      <ellipse cx="24" cy="20" rx="13" ry="8" fill={color} />
      <rect x="11" y="19" width="26" height="6" fill={color} />
    </g>
  ),
  long: (color) => (
    <g>
      <ellipse cx="24" cy="18" rx="13" ry="8" fill={color} />
      <rect x="11" y="18" width="5" height="28" rx="2" fill={color} />
      <rect x="32" y="18" width="5" height="28" rx="2" fill={color} />
    </g>
  ),
  curly: (color) => (
    <g>
      <ellipse cx="24" cy="17" rx="14" ry="10" fill={color} />
      <circle cx="11" cy="21" r="5" fill={color} />
      <circle cx="37" cy="21" r="5" fill={color} />
      <circle cx="24" cy="10" r="5" fill={color} />
    </g>
  ),
  braids: (color) => (
    <g>
      <ellipse cx="24" cy="18" rx="13" ry="8" fill={color} />
      <rect x="14" y="18" width="4" height="32" rx="2" fill={color} />
      <rect x="30" y="18" width="4" height="32" rx="2" fill={color} />
      <rect x="22" y="18" width="4" height="36" rx="2" fill={color} />
    </g>
  ),
  bun: (color) => (
    <g>
      <ellipse cx="24" cy="20" rx="13" ry="7" fill={color} />
      <circle cx="24" cy="10" r="8" fill={color} />
    </g>
  ),
}

// Outfit/top paths by style + color
const TOPS = {
  casual:  (color) => <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />,
  formal:  (color) => (
    <g>
      <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />
      <rect x="21" y="38" width="6" height="26" fill="rgba(255,255,255,0.15)" />
    </g>
  ),
  sporty:  (color) => (
    <g>
      <rect x="12" y="38" width="24" height="26" rx="4" fill={color} />
      <rect x="12" y="43" width="24" height="3" fill="rgba(255,255,255,0.2)" />
    </g>
  ),
  hoodie:  (color) => (
    <g>
      <rect x="11" y="38" width="26" height="26" rx="5" fill={color} />
      <path d="M18 38 Q24 46 30 38" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
    </g>
  ),
}

const TOP_COLORS = ['#185FA5', '#0F6E56', '#BA7517', '#D4537E', '#534AB7', '#A32D2D']

export const AVATAR_DEFAULTS = {
  skinIndex: 0,
  hairStyle: 'short',
  hairColorIndex: 0,
  topStyle: 'casual',
  topColorIndex: 0,
  gender: 'neutral',
}

export default function AvatarSVG({ config = {}, size = 64 }) {
  const cfg = { ...AVATAR_DEFAULTS, ...config }
  const skin = SKIN_TONES[cfg.skinIndex] ?? SKIN_TONES[0]
  const hairColor = HAIR_COLORS[cfg.hairColorIndex] ?? HAIR_COLORS[0]
  const topColor = TOP_COLORS[cfg.topColorIndex] ?? TOP_COLORS[0]

  const hairFn = HAIR_PATHS[cfg.hairStyle] ?? HAIR_PATHS.short
  const topFn  = TOPS[cfg.topStyle] ?? TOPS.casual

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hair (behind head) */}
      {hairFn(hairColor)}

      {/* Head */}
      <ellipse cx="24" cy="26" rx="11" ry="13" fill={skin} />

      {/* Face details */}
      {/* Eyes */}
      <circle cx="20" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />
      <circle cx="28" cy="24" r="1.5" fill="rgba(0,0,0,0.5)" />
      {/* Smile */}
      <path d="M21 29 Q24 32 27 29" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="20" y="37" width="8" height="5" fill={skin} />

      {/* Top/outfit */}
      {topFn(topColor)}
    </svg>
  )
}

// Export color/option arrays for the creator UI
export { SKIN_TONES, HAIR_COLORS, TOP_COLORS }
export const HAIR_STYLES = ['short', 'long', 'curly', 'braids', 'bun']
export const TOP_STYLES  = ['casual', 'formal', 'sporty', 'hoodie']
