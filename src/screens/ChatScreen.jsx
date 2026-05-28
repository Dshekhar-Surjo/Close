import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import AvatarSVG from '../components/AvatarSVG'

const MOCK_MESSAGES = [
  { id: 1, from: 'them', text: "hey! saw you near the metro — waiting for the blue line? 👀", time: '9:38' },
  { id: 2, from: 'me',   text: "haha yeah, stuck here for 10 mins",                           time: '9:39' },
  { id: 3, from: 'them', text: "same 😅 it's packed today",                                   time: '9:40' },
  { id: 4, from: 'me',   text: "do you commute this way daily?",                               time: '9:41' },
]

export default function ChatScreen() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  const user = state?.user || { id, name: 'Unknown', avatar: {}, distance: '—', moving: false }

  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages(m => [...m, { id: Date.now(), from: 'me', text, time }])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        height: 56,
        background: 'rgba(14,17,32,0.98)',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
        flexShrink: 0,
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 20, padding: '4px 6px 4px 0' }} aria-label="Back">←</button>

        <div style={{
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          background: '#1e1b4b',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          <AvatarSVG config={user.avatar} size={34} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{user.name}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ color: 'var(--accent)', fontSize: 10 }}>◎</span>
            {user.distance ? `${user.distance}m` : '—'} · {user.moving ? 'moving' : 'stationary'}
          </div>
        </div>

        {/* Ephemeral badge */}
        <div style={{
          background: 'var(--accent-soft)',
          border: '0.5px solid var(--accent-border)',
          borderRadius: 10,
          padding: '3px 9px',
          fontSize: 10,
          color: 'var(--on-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}>
          ⏱ ephemeral
        </div>
      </div>

      {/* Messages */}
      <div className="scroll-area" style={{ padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-dim)', marginBottom: 4 }}>just now</div>

        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '72%',
              padding: '9px 14px',
              borderRadius: 18,
              borderBottomLeftRadius:  m.from === 'them' ? 4 : 18,
              borderBottomRightRadius: m.from === 'me'   ? 4 : 18,
              background: m.from === 'me' ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
              color: m.from === 'me' ? '#fff' : 'rgba(255,255,255,0.85)',
              fontSize: 14,
              lineHeight: 1.45,
            }}>
              {m.text}
            </div>
            <span style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 2 }}>{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Ephemeral notice */}
      <div style={{
        margin: '0 12px 8px',
        background: 'rgba(127,119,221,0.07)',
        border: '0.5px solid rgba(127,119,221,0.2)',
        borderRadius: 10,
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, color: 'var(--accent)' }}>ℹ</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Chat disappears when you're both 500m+ apart
        </span>
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderTop: '0.5px solid var(--border)',
        flexShrink: 0,
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message ${user.name}…`}
          style={{
            flex: 1,
            height: 40,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            padding: '0 16px',
            fontSize: 14,
            color: '#fff',
          }}
        />
        <button
          onClick={send}
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            background: input.trim() ? 'var(--accent)' : 'rgba(127,119,221,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#fff',
            transition: 'background 0.2s',
          }}
          aria-label="Send"
        >
          ↗
        </button>
      </div>
    </div>
  )
}
