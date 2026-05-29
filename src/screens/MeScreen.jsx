import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'

export default function MeScreen() {
  const navigate = useNavigate()
  const { session, profile, logout, ghostMode, setGhostMode, visibilityRadius, setVisibilityRadius } = useApp()

  const username    = profile?.username || session?.user?.email?.split('@')[0] || 'You'
  const avatarConfig = profile?.avatar_config || {}
  const avatarExtras = profile?.avatar_extras  || []

  const [pingsOn,      setPingsOn]      = useState(true)
  const [privacyOpen,  setPrivacyOpen]  = useState(false)
  const [radiusOpen,   setRadiusOpen]   = useState(false)
  const [pingPolicy,   setPingPolicy]   = useState('everyone') // 'everyone' | 'approved' | 'nobody'

  const handleLogout = async () => { await logout() }

  const PING_POLICIES = [
    { key: 'everyone', label: 'Everyone nearby' },
    { key: 'approved', label: 'Approved only' },
    { key: 'nobody',   label: 'Nobody (do not disturb)' },
  ]

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '0.5px solid var(--border)',
        flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff' }}>Profile</h1>
        <button onClick={handleLogout} style={{
          background: 'rgba(220,50,50,0.12)', border: '0.5px solid rgba(220,50,50,0.3)',
          borderRadius: 14, padding: '5px 12px', fontSize: 12,
          color: '#ff7b7b', cursor: 'pointer',
        }}>Log out</button>
      </div>

      <div className="scroll-area" style={{ padding: '24px 20px' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              border: '2.5px solid var(--accent)', background: '#1e1b4b',
              overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            }}>
              <AvatarSVG config={avatarConfig} extras={avatarExtras} size={98} />
            </div>
            <button onClick={() => navigate('/avatar-creator')} style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--accent)', color: '#fff', fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} aria-label="Edit avatar">✏</button>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#fff', textAlign: 'center' }}>{username}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 2 }}>
              <span style={{ color: 'var(--green)', fontSize: 10 }}>●</span> Active now
            </div>
          </div>
        </div>

        {/* ── Ghost mode ── */}
        <SettingRow icon="👻" label="Ghost mode" sublabel={ghostMode ? 'You are hidden from the map' : 'Hide yourself from the map'}>
          <Toggle on={ghostMode} onToggle={() => setGhostMode(g => !g)} />
        </SettingRow>

        {/* ── Visibility radius (collapsible) ── */}
        <div style={{ borderBottom: '0.5px solid var(--border)' }}>
          <button onClick={() => setRadiusOpen(o => !o)} style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', textAlign: 'left',
          }}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>◎</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#fff' }}>Visibility radius</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                {visibilityRadius}m — see &amp; interact within this distance
              </div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: 14, transform: radiusOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
          </button>

          {radiusOpen && (
            <div style={{ paddingLeft: 40, paddingBottom: 14 }}>
              <input
                type="range" min={10} max={500} step={10}
                value={visibilityRadius}
                onChange={e => setVisibilityRadius(Number(e.target.value))}
                onMouseUp={() => setRadiusOpen(false)}
                onTouchEnd={() => setRadiusOpen(false)}
                style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                <span>10m</span><span style={{ fontWeight: 600, color: 'var(--accent)' }}>{visibilityRadius}m</span><span>500m</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Ping notifications ── */}
        <SettingRow icon="🔔" label="Ping notifications" sublabel={pingsOn ? 'On' : 'Off'}>
          <Toggle on={pingsOn} onToggle={() => setPingsOn(p => !p)} />
        </SettingRow>

        {/* ── Privacy (collapsible, auto-closes on selection) ── */}
        <div style={{ borderBottom: '0.5px solid var(--border)' }}>
          <button onClick={() => setPrivacyOpen(o => !o)} style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', textAlign: 'left',
          }}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>🔒</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#fff' }}>Privacy</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                Who can ping you: {PING_POLICIES.find(p => p.key === pingPolicy)?.label}
              </div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: 14, transform: privacyOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
          </button>

          {privacyOpen && (
            <div style={{ paddingLeft: 40, paddingBottom: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PING_POLICIES.map(p => (
                <button key={p.key} onClick={() => { setPingPolicy(p.key); setPrivacyOpen(false) }} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: pingPolicy === p.key ? 'rgba(127,119,221,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `0.5px solid ${pingPolicy === p.key ? 'var(--accent-border)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${pingPolicy === p.key ? 'var(--accent)' : 'rgba(255,255,255,0.3)'}`,
                    background: pingPolicy === p.key ? 'var(--accent)' : 'transparent',
                  }} />
                  <span style={{ fontSize: 13, color: pingPolicy === p.key ? '#fff' : 'rgba(255,255,255,0.6)' }}>{p.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Account info */}
        <div style={{ marginTop: 24, padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '0.5px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Signed in as</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</div>
        </div>

        {/* Map attribution note */}
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
          Map tiles © <a href="https://carto.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.3)' }}>CARTO</a> &amp; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.3)' }}>OpenStreetMap</a> contributors
        </p>

      </div>

      <BottomNav pingsCount={0} />
    </div>
  )
}

// ─── Reusable helpers ─────────────────────────────────────────────────────────
function SettingRow({ icon, label, sublabel, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '0.5px solid var(--border)' }}>
      <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: '#fff' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{sublabel}</div>
      </div>
      {children}
    </div>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width: 40, height: 22, borderRadius: 11, cursor: 'pointer', flexShrink: 0,
      background: on ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
      position: 'relative', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 2, borderRadius: '50%',
        width: 18, height: 18, background: '#fff',
        left: on ? 20 : 2, transition: 'left 0.2s',
      }} />
    </div>
  )
}
