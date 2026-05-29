import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'

export default function MeScreen() {
  const navigate = useNavigate()
  const { session, profile, logout } = useApp()

  const username = profile?.username || session?.user?.email?.split('@')[0] || 'You'
  const avatarConfig = profile?.avatar_config || {}
  const avatarExtras = profile?.avatar_extras  || []

  const handleLogout = async () => {
    await logout()
    // AppContext will clear session → App.jsx routes back to SplashScreen
  }

  return (
    <div className="screen">
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '0.5px solid var(--border)',
        flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff' }}>Profile</h1>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(220,50,50,0.12)', border: '0.5px solid rgba(220,50,50,0.3)',
            borderRadius: 14, padding: '5px 12px', fontSize: 12,
            color: '#ff7b7b', cursor: 'pointer',
          }}
        >
          Log out
        </button>
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
            <button
              onClick={() => navigate('/avatar-creator')}
              style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 30, height: 30, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff', fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Edit avatar"
            >✏</button>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#fff', textAlign: 'center' }}>
              {username}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 2 }}>
              <span style={{ color: 'var(--green)', fontSize: 10 }}>●</span> Active now
            </div>
          </div>
        </div>

        {/* Settings rows */}
        {[
          { icon: '👻', label: 'Ghost mode',       sublabel: 'Hide yourself from the map', toggle: true,  val: false },
          { icon: '◎',  label: 'Visibility radius', sublabel: '100m',                       toggle: false },
          { icon: '🔔', label: 'Ping notifications',sublabel: 'On',                         toggle: false },
          { icon: '🔒', label: 'Privacy',           sublabel: 'Manage who can see you',     toggle: false },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 0', borderBottom: '0.5px solid var(--border)',
          }}>
            <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{row.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#fff' }}>{row.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{row.sublabel}</div>
            </div>
            {row.toggle
              ? <div style={{ width: 40, height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 2, top: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                </div>
              : <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</span>
            }
          </div>
        ))}

        {/* Account info */}
        <div style={{ marginTop: 24, padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '0.5px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Signed in as</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{session?.user?.email}</div>
        </div>

      </div>

      <BottomNav pingsCount={0} />
    </div>
  )
}
