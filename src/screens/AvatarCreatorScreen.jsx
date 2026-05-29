import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AvatarSVG, {
  SKIN_TONES, HAIR_COLORS, TOP_COLORS, BOTTOM_COLORS, SHOE_COLORS,
  ACCESSORY_COLORS, HAIR_STYLES, TOP_STYLES, BOTTOM_STYLES, BEARD_STYLES,
  FACE_SHAPES, EXTRAS_OPTIONS, AVATAR_DEFAULTS,
} from '../components/AvatarSVG'

const TABS = ['Body', 'Hair', 'Top', 'Bottom', 'Extras']

const GENDER_OPTIONS = ['Masculine', 'Feminine', 'Non-binary', 'Fluid']
const BUILDS         = ['Slim', 'Average', 'Athletic', 'Plus']

const FACE_SHAPE_LABELS = ['Oval', 'Round', 'Square', 'Heart', 'Angular']

const HAIR_STYLE_LABELS = {
  short: 'Short',     long: 'Long',       curly: 'Curly',
  braids: 'Braids',   bun: 'Bun',         afro: 'Afro',
  ponytail: 'Ponytail', waves: 'Waves',   pixie: 'Pixie',
  locs: 'Locs',       mohawk: 'Mohawk',   bob: 'Bob',
  sideswept: 'Side Swept', spacebuns: 'Space Buns',
}

const TOP_STYLE_LABELS = {
  tshirt: 'T-Shirt', shirt: 'Shirt',     hoodie: 'Hoodie',
  jacket: 'Jacket',  sweater: 'Sweater', turtleneck: 'Turtleneck',
  tank: 'Tank',      kameez: 'Kameez',   shawl: 'Shawl',
  suit: 'Suit',
}

const BOTTOM_STYLE_LABELS = {
  jeans: 'Jeans',       shorts: 'Shorts',   joggers: 'Joggers',
  skirt: 'Skirt',       longskirt: 'Long Skirt', saree: 'Saree',
  salwar: 'Salwar',     formal: 'Trousers', dhoti: 'Dhoti',
}

const BEARD_STYLE_LABELS = {
  none: 'None',       stubble: 'Stubble',   mustache: 'Mustache',
  goatee: 'Goatee',  full: 'Full Beard',   extended: 'Extended',
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
    <button onClick={onClick} style={{
      height: 30, borderRadius: 15, padding: '0 13px', fontSize: 12,
      background: selected ? 'var(--accent-soft)' : 'rgba(255,255,255,0.05)',
      border: `0.5px solid ${selected ? 'var(--accent-border)' : 'rgba(255,255,255,0.1)'}`,
      color: selected ? 'var(--on-dark)' : 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
    }}>
      {label}
    </button>
  )
}

function ColorDot({ color, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 26, height: 26, borderRadius: '50%',
      background: color, border: 'none', padding: 0, flexShrink: 0,
      boxShadow: selected ? `0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` : 'none',
      cursor: 'pointer',
    }} aria-label={`Color ${color}`} />
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function AvatarCreatorScreen() {
  const navigate = useNavigate()
  const { session, setProfile } = useApp()
  const [tab, setTab]       = useState(0)
  const [cfg, setCfg]       = useState(AVATAR_DEFAULTS)
  const [extras, setExtras] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState(null)

  const set = (key, val) => setCfg(c => ({ ...c, [key]: val }))
  const toggleExtra = (e) =>
    setExtras(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e])

  const randomize = () => {
    setCfg({
      skinIndex:           Math.floor(Math.random() * SKIN_TONES.length),
      faceShapeIndex:      Math.floor(Math.random() * FACE_SHAPES.length),
      hairStyle:           HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)],
      hairColorIndex:      Math.floor(Math.random() * HAIR_COLORS.length),
      topStyle:            TOP_STYLES[Math.floor(Math.random() * TOP_STYLES.length)],
      topColorIndex:       Math.floor(Math.random() * TOP_COLORS.length),
      bottomStyle:         BOTTOM_STYLES[Math.floor(Math.random() * BOTTOM_STYLES.length)],
      bottomColorIndex:    Math.floor(Math.random() * BOTTOM_COLORS.length),
      beardStyle:          BEARD_STYLES[Math.floor(Math.random() * BEARD_STYLES.length)],
      shoeColorIndex:      Math.floor(Math.random() * SHOE_COLORS.length),
      accessoryColorIndex: Math.floor(Math.random() * ACCESSORY_COLORS.length),
      gender:              ['masculine','feminine','neutral','non-binary'][Math.floor(Math.random()*4)],
      build:               ['slim','average','athletic','plus'][Math.floor(Math.random()*4)],
    })
    setExtras([])
  }

  const handleSave = async () => {
    if (!session) { navigate('/auth'); return }
    setSaving(true)
    setError(null)

    const username =
      session.user.user_metadata?.full_name ||
      session.user.email?.split('@')[0] ||
      'User'

    const { data, error: err } = await supabase
      .from('profiles')
      .upsert({
        id:            session.user.id,
        username,
        avatar_config: cfg,
        avatar_extras: extras,
        updated_at:    new Date().toISOString(),
      }, { onConflict: 'id' })
      .select()
      .single()

    setSaving(false)
    if (err) { setError('Could not save — please try again.'); return }
    setProfile(data)
    navigate('/map')
  }

  const hasHeadwear = extras.includes('Cap') || extras.includes('Beanie')

  // Avatar preview: full body, 100px wide → height = 100 * 96/48 = 200px
  const PREVIEW_W = 100
  const PREVIEW_H = 200

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
        >←</button>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#fff' }}>
          Create your avatar
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            height: 32, borderRadius: 16, padding: '0 16px',
            background: saving ? 'rgba(127,119,221,0.4)' : 'var(--accent)',
            color: '#fff', fontSize: 13, fontWeight: 500, cursor: saving ? 'default' : 'pointer',
          }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '8px 16px', background: 'rgba(220,50,50,0.15)', color: '#ff7b7b', fontSize: 12, flexShrink: 0 }}>
          {error}
        </div>
      )}

      {/* Preview */}
      <div style={{
        height: 240, background: '#13172a',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{
          width: PREVIEW_W, height: PREVIEW_H,
          borderRadius: 16,
          border: '2.5px solid var(--accent)',
          background: '#1e1b4b',
          overflow: 'hidden',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        }}>
          <AvatarSVG config={cfg} extras={extras} size={PREVIEW_W} fullBody />
        </div>

        <button onClick={randomize} style={{
          position: 'absolute', bottom: 12, right: 14,
          height: 28, borderRadius: 14, padding: '0 12px',
          background: 'var(--accent-soft)', border: '0.5px solid var(--accent-border)',
          color: 'var(--on-dark)', fontSize: 11, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          ↻ Randomize
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            flex: 1, height: 40, background: 'none', fontSize: 11,
            color: tab === i ? 'var(--on-dark)' : 'var(--text-muted)',
            borderBottom: `2px solid ${tab === i ? 'var(--accent)' : 'transparent'}`,
            fontWeight: tab === i ? 500 : 400, cursor: 'pointer',
          }}>{t}</button>
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
                <Chip key={g} label={g} selected={cfg.gender === g.toLowerCase()} onClick={() => set('gender', g.toLowerCase())} />
              ))}
            </div>

            <SectionLabel>Skin tone</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SKIN_TONES.map((c, i) => (
                <ColorDot key={c} color={c} selected={cfg.skinIndex === i} onClick={() => set('skinIndex', i)} />
              ))}
            </div>

            <SectionLabel>Face shape</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FACE_SHAPE_LABELS.map((label, i) => (
                <Chip key={label} label={label} selected={cfg.faceShapeIndex === i} onClick={() => set('faceShapeIndex', i)} />
              ))}
            </div>

            <SectionLabel>Build</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BUILDS.map(b => (
                <Chip key={b} label={b} selected={cfg.build === b.toLowerCase()} onClick={() => set('build', b.toLowerCase())} />
              ))}
            </div>

            <SectionLabel>Beard / facial hair</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BEARD_STYLES.map(s => (
                <Chip key={s} label={BEARD_STYLE_LABELS[s]} selected={cfg.beardStyle === s} onClick={() => set('beardStyle', s)} />
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
                <Chip key={s} label={HAIR_STYLE_LABELS[s] || s} selected={cfg.hairStyle === s} onClick={() => set('hairStyle', s)} />
              ))}
            </div>

            <SectionLabel>Hair colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HAIR_COLORS.map((c, i) => (
                <ColorDot key={c} color={c} selected={cfg.hairColorIndex === i} onClick={() => set('hairColorIndex', i)} />
              ))}
            </div>
          </>
        )}

        {/* ── Top ── */}
        {tab === 2 && (
          <>
            <SectionLabel>Top style</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TOP_STYLES.map(s => (
                <Chip key={s} label={TOP_STYLE_LABELS[s] || s} selected={cfg.topStyle === s} onClick={() => set('topStyle', s)} />
              ))}
            </div>

            <SectionLabel>Top colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TOP_COLORS.map((c, i) => (
                <ColorDot key={c} color={c} selected={cfg.topColorIndex === i} onClick={() => set('topColorIndex', i)} />
              ))}
            </div>
          </>
        )}

        {/* ── Bottom ── */}
        {tab === 3 && (
          <>
            <SectionLabel>Bottom style</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BOTTOM_STYLES.map(s => (
                <Chip key={s} label={BOTTOM_STYLE_LABELS[s] || s} selected={cfg.bottomStyle === s} onClick={() => set('bottomStyle', s)} />
              ))}
            </div>

            <SectionLabel>Bottom colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BOTTOM_COLORS.map((c, i) => (
                <ColorDot key={c} color={c} selected={cfg.bottomColorIndex === i} onClick={() => set('bottomColorIndex', i)} />
              ))}
            </div>

            <SectionLabel>Shoe colour</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SHOE_COLORS.map((c, i) => (
                <ColorDot key={c} color={c} selected={cfg.shoeColorIndex === i} onClick={() => set('shoeColorIndex', i)} />
              ))}
            </div>
          </>
        )}

        {/* ── Extras ── */}
        {tab === 4 && (
          <>
            <SectionLabel>Accessories</SectionLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EXTRAS_OPTIONS.map(e => (
                <Chip key={e} label={e} selected={extras.includes(e)} onClick={() => toggleExtra(e)} />
              ))}
            </div>

            {hasHeadwear && (
              <>
                <SectionLabel>Hat colour</SectionLabel>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ACCESSORY_COLORS.map((c, i) => (
                    <ColorDot key={c} color={c} selected={cfg.accessoryColorIndex === i} onClick={() => set('accessoryColorIndex', i)} />
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
