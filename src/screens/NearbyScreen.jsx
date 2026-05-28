import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'

const MOCK_USERS = [
  { id: 1, name: 'Anika',  distance: 43,  avatar: { skinIndex: 1, hairStyle: 'long',   hairColorIndex: 2, topStyle: 'casual', topColorIndex: 3 }, moving: false, ghosted: false },
  { id: 2, name: 'Rohan',  distance: 91,  avatar: { skinIndex: 2, hairStyle: 'short',  hairColorIndex: 1, topStyle: 'sporty', topColorIndex: 0 }, moving: true,  ghosted: false },
  { id: 3, name: 'Dev',    distance: 120, avatar: { skinIndex: 3, hairStyle: 'curly',  hairColorIndex: 0, topStyle: 'hoodie', topColorIndex: 1 }, moving: true,  ghosted: false },
  { id: 4, name: '—',      distance: 0,   avatar: { skinIndex: 1, hairStyle: 'braids', hairColorIndex: 4, topStyle: 'formal', topColorIndex: 5 }, moving: false, ghosted: true  },
  { id: 5, name: 'Meera',  distance: 158, avatar: { skinIndex: 0, hairStyle: 'bun',    hairColorIndex: 1, topStyle: 'casual', topColorIndex: 4 }, moving: true,  ghosted: false },
]

export default function NearbyScreen() {
  const navigate = useNavigate()
  const [users] = useState(MOCK_USERS)

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '0.5px solid var(--border)',
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Nearby</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {users.filter(u => !u.ghosted).length} people within 200m of you
        </p>
      </div>

      {/* List */}
      <div className="scroll-area">
        {users.map(u => (
          <div
            key={u.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 16px',
              borderBottom: '0.5px solid var(--border)',
              opacity: u.ghosted ? 0.35 : 1,
              cursor: u.ghosted ? 'default' : 'pointer',
            }}
            onClick={() => !u.ghosted && navigate(`/chat/${u.id}`, { state: { user: u } })}
          >
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 46, height: 46,
                borderRadius: '50%',
                border: `1.5px solid ${u.ghosted ? 'rgba(255,255,255,0.15)' : 'rgba(127,119,221,0.45)'}`,
                background: '#1e1b4b',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
                <AvatarSVG config={u.avatar} size={44} />
              </div>
              {!u.ghosted && (
                <div style={{
                  position: 'absolute',
                  bottom: 1, right: 1,
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  border: '1.5px solid var(--bg)',
                }} />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 6 }}>
                {u.name}
                {u.ghosted && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(ghosted)</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                {u.ghosted
                  ? <>👻 not visible</>
                  : <><span style={{ color: 'var(--accent)' }}>◎</span> {u.distance}m · {u.moving ? 'moving' : 'stationary'}</>
                }
              </div>
            </div>

            {/* Ping button */}
            <button
              disabled={u.ghosted}
              onClick={(e) => { e.stopPropagation(); !u.ghosted && navigate(`/chat/${u.id}`, { state: { user: u } }) }}
              style={{
                height: 32,
                borderRadius: 16,
                padding: '0 14px',
                background: 'var(--accent-soft)',
                border: '0.5px solid var(--accent-border)',
                color: 'var(--on-dark)',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: u.ghosted ? 0.4 : 1,
                cursor: u.ghosted ? 'not-allowed' : 'pointer',
              }}
            >
              ↗ Ping
            </button>
          </div>
        ))}
      </div>

      <BottomNav pingsCount={3} />
    </div>
  )
}
