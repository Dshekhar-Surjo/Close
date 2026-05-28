import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'

const THREADS = [
  { id: 1, name: 'Anika',  avatar: { skinIndex: 1, hairStyle: 'long',  hairColorIndex: 2, topStyle: 'casual', topColorIndex: 3 }, lastMsg: 'do you commute this way daily?', time: '9:41', unread: 2, distance: 43  },
  { id: 2, name: 'Rohan',  avatar: { skinIndex: 2, hairStyle: 'short', hairColorIndex: 1, topStyle: 'sporty', topColorIndex: 0 }, lastMsg: 'hey! saw you near the coffee shop', time: '8:55', unread: 1, distance: 91  },
  { id: 3, name: 'Dev',    avatar: { skinIndex: 3, hairStyle: 'curly', hairColorIndex: 0, topStyle: 'hoodie', topColorIndex: 1 }, lastMsg: 'cool, what are you working on?',    time: 'Yesterday', unread: 0, distance: null },
]

export default function PingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <div style={{ padding: '16px 16px 12px', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Pings</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Conversations disappear when you drift apart</p>
      </div>

      <div className="scroll-area">
        {THREADS.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 32px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <p style={{ fontSize: 14 }}>No pings yet. Go explore nearby and start a conversation.</p>
          </div>
        )}
        {THREADS.map(t => (
          <div
            key={t.id}
            onClick={() => navigate(`/chat/${t.id}`, { state: { user: t } })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderBottom: '0.5px solid var(--border)',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                border: '1.5px solid rgba(127,119,221,0.45)',
                background: '#1e1b4b',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
                <AvatarSVG config={t.avatar} size={46} />
              </div>
              {t.distance && (
                <div style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  border: '1.5px solid var(--bg)',
                }} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: t.unread > 0 ? 600 : 500, color: t.unread > 0 ? '#fff' : 'rgba(255,255,255,0.8)' }}>{t.name}</span>
                <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{t.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: 12,
                  color: t.unread > 0 ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}>
                  {t.lastMsg}
                </span>
                {t.unread > 0 && (
                  <div style={{
                    width: 18, height: 18,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    fontSize: 10,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: 8,
                    fontWeight: 600,
                  }}>
                    {t.unread}
                  </div>
                )}
              </div>
              {t.distance && (
                <div style={{ fontSize: 10, color: 'var(--accent)', marginTop: 2 }}>◎ {t.distance}m away</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav pingsCount={3} />
    </div>
  )
}
