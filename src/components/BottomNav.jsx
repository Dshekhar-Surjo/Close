import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/map',    icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', label: 'Map',    vb: '0 0 24 24' },
  { path: '/nearby', icon: 'M13 10V3L4 14h7v7l9-11h-7z',                                                                                                                                           label: 'Nearby', vb: '0 0 24 24' },
  { path: '/pings',  icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',                                                                                                 label: 'Pings',  vb: '0 0 24 24' },
  { path: '/me',     icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',                                                     label: 'Me',     vb: '0 0 24 24' },
]

export default function BottomNav({ pingsCount = 0 }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{
      height: 'var(--nav-h)',
      background: 'rgba(14,17,32,0.96)',
      borderTop: '0.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexShrink: 0,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      {TABS.map(tab => {
        const active = pathname.startsWith(tab.path)
        const hasBadge = tab.path === '/pings' && pingsCount > 0
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: 0,
              position: 'relative',
            }}
            aria-label={tab.label}
          >
            <div style={{ position: 'relative' }}>
              <svg
                width="22"
                height="22"
                viewBox={tab.vb}
                fill={active ? 'var(--accent)' : 'rgba(255,255,255,0.32)'}
              >
                <path d={tab.icon} />
              </svg>
              {hasBadge && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  fontSize: 9,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}>
                  {pingsCount > 9 ? '9+' : pingsCount}
                </span>
              )}
            </div>
            <span style={{
              fontSize: 10,
              color: active ? 'var(--accent)' : 'rgba(255,255,255,0.28)',
              fontWeight: active ? 500 : 400,
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
