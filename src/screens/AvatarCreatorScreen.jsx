import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarSVG, {
  SKIN_TONES, HAIR_COLORS, TOP_COLORS, ACCESSORY_COLORS,
  HAIR_STYLES, TOP_STYLES, FACE_SHAPES, EXTRAS_OPTIONS, AVATAR_DEFAULTS,
} from '../components/AvatarSVG'

const TABS = ['Body', 'Hair', 'Outfit', 'Extras']

const GENDER_OPTIONS = ['Masculine', 'Feminine', 'Non-binary', 'Fluid']
const BUILDS         = ['Slim', 'Average', 'Athletic', 'Plus']

const FACE_SHAPE_LABELS = ['Oval', 'Round', 'Square', 'Heart', 'Angular']

const HAIR_STYLE_LABELS = {
  short:     'Short',      long:      'Long',
  curly:     'Curly',      braids:    'Braids',
  bun:       'Bun',        afro:      'Afro',
  ponytail:  'Ponytail',   waves:     'Waves',
  pixie:     'Pixie',      locs:      'Locs',
  mohawk:    'Mohawk',     bob:       'Bob',
  sideswept: 'Side Swept', spacebuns: 'Space Buns',
}

const TOP_STYLE_LABELS = {
  casual:     'Casual',     formal:     'Formal',
  sporty:     'Sporty',     hoodie:     'Hoodie',
  dress:      'Dress',      jacket:     'Jacket',
  tank:       'Tank',       turtleneck: 'Turtleneck',
  crop:       'Crop',       suit:       'Suit',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, color: 'var(--text-muted)',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      margin: '16px 0 8px',
    }}>
      {children}
    </div>
  )
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 30, borderRadius: 15, padding: '0 13px', fontSize: 12,
        background: selected ? 'var(--accent-soft)' : 'rgba(255,255,255,0.05)',
        border: `0.5px solid ${selected ? 'var(--accent-border)' : 'rgba(255,255,255,0.1)'}`,
        color: selected ? 'var(--on-dark)' : 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

function ColorDot({ color, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26, height: 26, borderRadius: '50%',
        background: color, border: 'none', padding: 0,
        boxShadow: selected ? `0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` : 'none',
        cursor: 'pointer', flexShrink: 0,
      }}
      aria-label={`Color ${color}`}
    />
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function AvatarCreatorScreen() {
  const navigate = useNavigate()
  const [tab, setTab]     = useState(0)
  const [cfg, setCfg]     = useState(AVATAR_DEFAULTS)
  const [extras, setExtras] = useState([])

  const set = (key, val) => setCfg(c => ({ ...c, [key]: val }))

  const toggleExtra = (e) =>
    setExtras(prev =>
      prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]
    )

  const randomize = () => {
    setCfg({
      skinIndex:           Math.floor(Math.random() * SKIN_TONES.length),
      faceShapeIndex:      Math.floor(Math.random() * FACE_SHAPES.length),
      hairStyle:           HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)],
      hairColorIndex:      Math.floor(Math.random() * HAIR_COLORS.length),
      topStyle:            TOP_STYLES[Math.floor(Math.random() * TOP_STYLES.length)],
      topColorIndex:       Math.floor(Math.random() * TOP_COLORS.length),
      accessoryColorIndex: Math.floor(Math.random() * ACCESSORY_COLORS.length),
      gender:              'neutral',
    })
    setExtras([])
  }

  const hasHeadwear = extras.includes('Cap') || extras.includes('Beanie')

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 12,
        borderBottom: '0.5px solid var(--border)', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', padding: 4, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          aria-label="Back"
        >
          ←
        </button>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#fff' }}>
          Create your avatar
        </span>
        <button
          onClick={() => navigate('/map')}
          style={{
            height: 32, borderRadius: 16, padding: '0 16px',
            background: 'var(--accent)', color: '#fff', fontSize: 13,
            fontWeight: 500, cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>

      {/* Preview */}
      <div style={{
        height: 180, background: '#13172a',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          border: '2.5px solid var(--accent)', background: '#1e1b4b',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <AvatarSVG config={cfg} extras={extras} size={110} />
        </div>

        <button
          onClick={randomize}
          style={{
            position: 'absolute', bottom: 12, right: 14,
            height: 28, borderRadius: 14, padding: '0 12px',
            background: 'var(--accent-soft)', border: '0.5px solid var(--accent-border)',
            color: 'var(--on-dark)', fontSize: 11, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          ↻ Randomize
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              flex: 1, height: 40, background: 'none', fontSize: 12,
              color: tab === i ? 'var(--on-dark)' : 'var(--text-muted)',
              borderBottom: `2px solid ${tab === i ? 'var(--accent)' : 'transparent'}`,
              fontWeight: tab === i ? 500 : 400, cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Options */}
      <div className="scroll-area" style={{ padding: '4px 16px 24px' }}>

        {/* ── Body ── */}
        {tab === 0 && (
          <>
            <SectionLabel>Gender expression</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GENDER_OPTIONS.map(g => (
                <Chip key={g} label={g}
                  selected={cfg.gender === g.toLowerCase()}
                  onClick={() => set('gender', g.toLowerCase())} />
              ))}
            </div>

            <SectionLabel>Skin tone</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SKIN_TONES.map((c, i) => (
                <ColorDot key={c} color={c}
                  selected={cfg.skinIndex === i}
                  onClick={() => set('skinIndex', i)} />
              ))}
            </div>

            <SectionLabel>Face shape</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FACE_SHAPE_LABELS.map((label, i) => (
                <Chip key={label} label={label}
                  selected={cfg.faceShapeIndex === i}
                  onClick={() => set('faceShapeIndex', i)} />
              ))}
            </div>

            <SectionLabel>Build</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BUILDS.map(b => (
                <Chip key={b} label={b}
                  selected={cfg.build === b.toLowerCase()}
                  onClick={() => set('build', b.toLowerCase())} />
              ))}
            </div>
          </>
        )}

        {/* ── Hair ── */}
        {tab === 1 && (
          <>
            <SectionLabel>Hair style</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HAIR_STYLES.map(s => (
                <Chip key={s} label={HAIR_STYLE_LABELS[s] || s}
                  selected={cfg.hairStyle === s}
                  onClick={() => set('hairStyle', s)} />
              ))}
            </div>

            <SectionLabel>Hair colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HAIR_COLORS.map((c, i) => (
                <ColorDot key={c} color={c}
                  selected={cfg.hairColorIndex === i}
                  onClick={() => set('hairColorIndex', i)} />
              ))}
            </div>
          </>
        )}

        {/* ── Outfit ── */}
        {tab === 2 && (
          <>
            <SectionLabel>Style</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TOP_STYLES.map(s => (
                <Chip key={s} label={TOP_STYLE_LABELS[s] || s}
                  selected={cfg.topStyle === s}
                  onClick={() => set('topStyle', s)} />
              ))}
            </div>

            <SectionLabel>Colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TOP_COLORS.map((c, i) => (
                <ColorDot key={c} color={c}
                  selected={cfg.topColorIndex === i}
                  onClick={() => set('topColorIndex', i)} />
              ))}
            </div>
          </>
        )}

        {/* ── Extras ── */}
        {tab === 3 && (
          <>
            <SectionLabel>Accessories</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EXTRAS_OPTIONS.map(e => (
                <Chip key={e} label={e}
                  selected={extras.includes(e)}
                  onClick={() => toggleExtra(e)} />
              ))}
            </div>

            {hasHeadwear && (
              <>
                <SectionLabel>Hat colour</SectionLabel>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ACCESSORY_COLORS.map((c, i) => (
                    <ColorDot key={c} color={c}
                      selected={cfg.accessoryColorIndex === i}
                      onClick={() => set('accessoryColorIndex', i)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  )
}
