import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import CloseLogo from '../components/CloseLogo'
import AvatarSVG from '../components/AvatarSVG'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

// Mock nearby users for demo
const MOCK_USERS = [
  { id: 1, name: 'Anika',  distance: 43,  avatar: { skinIndex: 1, hairStyle: 'long',   hairColorIndex: 2, topStyle: 'casual', topColorIndex: 3 }, lat: 0.0007,  lng: -0.0009, moving: false },
  { id: 2, name: 'Rohan',  distance: 91,  avatar: { skinIndex: 2, hairStyle: 'short',  hairColorIndex: 1, topStyle: 'sporty', topColorIndex: 0 }, lat: -0.0005, lng: 0.0011,  moving: true  },
  { id: 3, name: 'Dev',    distance: 120, avatar: { skinIndex: 3, hairStyle: 'curly',  hairColorIndex: 0, topStyle: 'hoodie', topColorIndex: 1 }, lat: 0.0003,  lng: 0.0006,  moving: true  },
  { id: 4, name: 'Priya',  distance: 158, avatar: { skinIndex: 1, hairStyle: 'braids', hairColorIndex: 4, topStyle: 'formal', topColorIndex: 5 }, lat: -0.001,  lng: -0.0004, moving: false },
]

// CSS map (shown when no Mapbox token)
function MockMap({ users, onUserClick, ghostMode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#1a1f2e',
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '44px 44px',
    }}>
      {/* Roads */}
      {[
        { top: '32%', height: 7, width: '100%' },
        { top: '55%', height: 10, width: '100%' },
        { top: '74%', height: 6, width: '100%' },
      ].map((r, i) => (
        <div key={i} style={{ position: 'absolute', background: `rgba(255,255,255,${0.06 + (i === 1 ? 0.05 : 0)})`, borderRadius: 2, ...r }} />
      ))}
      {[
        { left: '22%', width: 7, height: '100%' },
        { left: '50%', width: 10, height: '100%' },
        { left: '76%', width: 6, height: '100%' },
      ].map((r, i) => (
        <div key={i} style={{ position: 'absolute', background: `rgba(255,255,255,${0.06 + (i === 1 ? 0.05 : 0)})`, borderRadius: 2, ...r }} />
      ))}

      {/* Proximity ring around "me" */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: 220, height: 220,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '1px dashed rgba(127,119,221,0.25)',
        pointerEvents: 'none',
      }} />

      {/* Me */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* pulse rings */}
        {[0, 1].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: 56, height: 56,
            borderRadius: '50%',
            border: '1.5px solid rgba(127,119,221,0.5)',
            top: '50%', left: '50%',
            animation: `pulse-ring 2s ease-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
        <div style={{
          width: 48, height: 48,
          borderRadius: '50%',
          border: '2.5px solid var(--accent)',
          background: '#1e1b4b',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          <AvatarSVG size={46} />
        </div>
        <span style={{ fontSize: 10, color: 'var(--on-dark)', background: 'rgba(60,52,137,0.75)', padding: '1px 6px', borderRadius: 4, marginTop: 2, whiteSpace: 'nowrap' }}>You</span>
      </div>

      {/* Other users */}
      {users.map((u, i) => {
        const positions = [
          { left: '28%', top: '35%' },
          { left: '68%', top: '38%' },
          { left: '40%', top: '66%' },
          { left: '74%', top: '62%' },
        ]
        const pos = positions[i] || { left: '30%', top: '30%' }
        const dimmed = ghostMode && i === 3
        return (
          <div
            key={u.id}
            style={{ position: 'absolute', ...pos, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', opacity: dimmed ? 0.3 : 1 }}
            onClick={() => !dimmed && onUserClick(u)}
          >
            <div style={{
              width: 38, height: 38,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.5)',
              background: '#1a1a2e',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              <AvatarSVG config={u.avatar} size={36} />
            </div>
            {!dimmed && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.55)', padding: '1px 5px', borderRadius: 4, marginTop: 2, whiteSpace: 'nowrap' }}>{u.name}</span>}
          </div>
        )
      })}
    </div>
  )
}

// Real Mapbox map
function MapboxMap({ onLoad }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let map
    import('mapbox-gl').then(({ default: mapboxgl }) => {
      mapboxgl.accessToken = MAPBOX_TOKEN
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map = new mapboxgl.Map({
            container: containerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 15,
          })
          mapRef.current = map
          map.on('load', () => onLoad && onLoad(map, mapboxgl))
        },
        () => {
          map = new mapboxgl.Map({
            container: containerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [77.2090, 28.6139], // Delhi default
            zoom: 15,
          })
          mapRef.current = map
          map.on('load', () => onLoad && onLoad(map, mapboxgl))
        }
      )
    })
    return () => mapRef.current?.remove()
  }, [])

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
}

// Profile bottom sheet
function ProfileSheet({ user, onClose, onPing }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
      {/* Scrim */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', animation: 'fadeIn 0.2s ease' }} />

      {/* Sheet */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'var(--bg-2)',
        borderRadius: '20px 20px 0 0',
        borderTop: '0.5px solid rgba(255,255,255,0.1)',
        padding: '12px 20px 32px',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 16px' }} />

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            border: '2.5px solid var(--accent)',
            background: '#1e1b4b',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
            <AvatarSVG config={user.avatar} size={78} />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{user.name}</h2>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <span style={{ color: 'var(--accent)', fontSize: 13 }}>◎</span>
          {user.distance}m away · {user.moving ? 'moving' : 'stationary'}
        </p>

        {/* Interest tags */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {['music', 'coffee', 'travel'].map(tag => (
            <span key={tag} style={{
              background: 'var(--accent-soft)',
              border: '0.5px solid var(--accent-border)',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              color: 'var(--on-dark)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => onPing(user)}
            style={{
              flex: 1,
              height: 46,
              borderRadius: 23,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            ↗ Ping
          </button>
          <button style={{
            width: 46, height: 46,
            borderRadius: '50%',
            background: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 18,
          }}>⋯</button>
          <button style={{
            width: 46, height: 46,
            borderRadius: '50%',
            background: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 18,
          }}>✕</button>
        </div>
      </div>
    </div>
  )
}

export default function MapScreen() {
  const navigate = useNavigate()
  const [ghostMode, setGhostMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [nearbyCount] = useState(MOCK_USERS.length)

  const handlePing = (user) => {
    setSelectedUser(null)
    navigate(`/chat/${user.id}`, { state: { user } })
  }

  return (
    <div className="screen">
      {/* Status bar */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)', background: 'transparent', flexShrink: 0 }} />

      {/* Map area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {MAPBOX_TOKEN
          ? <MapboxMap />
          : <MockMap users={MOCK_USERS} onUserClick={setSelectedUser} ghostMode={ghostMode} />
        }

        {/* Top bar */}
        <div style={{
          position: 'absolute', top: 12, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 5, pointerEvents: 'none',
        }}>
          <div style={{ pointerEvents: 'all' }}>
            <div style={{
              background: 'rgba(14,17,32,0.88)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              borderRadius: 20,
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <CloseLogo size="sm" />
            </div>
          </div>
          <div style={{
            background: 'rgba(14,17,32,0.88)',
            border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: 20,
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>●</span>
            {nearbyCount} nearby
          </div>
        </div>

        {/* Ghost mode toggle */}
        <button
          onClick={() => setGhostMode(g => !g)}
          style={{
            position: 'absolute', bottom: 16, left: 14,
            background: ghostMode ? 'rgba(127,119,221,0.25)' : 'rgba(14,17,32,0.88)',
            border: `0.5px solid ${ghostMode ? 'var(--accent-border)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 20,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: ghostMode ? 'var(--on-dark)' : 'rgba(255,255,255,0.65)',
            zIndex: 5,
          }}
        >
          👻 {ghostMode ? 'Ghosted' : 'Ghost mode'}
        </button>

        {/* Re-center FAB */}
        <button
          style={{
            position: 'absolute', bottom: 16, right: 14,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            color: '#fff',
            zIndex: 5,
          }}
          aria-label="Center map on me"
        >
          ◎
        </button>

        {/* Profile sheet */}
        {selectedUser && (
          <ProfileSheet
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onPing={handlePing}
          />
        )}
      </div>

      <BottomNav pingsCount={3} />
    </div>
  )
}
