import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AvatarSVG from '../components/AvatarSVG'

function formatMsgTime(iso) {
  const d = new Date(iso)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

// Status helpers
// closeReq: null (none) | { id, from_id, to_id, status }
function deriveCloseState(closeReq, myId) {
  if (!closeReq) return 'none'
  if (closeReq.status === 'accepted') return 'accepted'
  if (closeReq.status === 'declined') return 'declined'
  if (closeReq.status === 'maybe')    return closeReq.from_id === myId ? 'sent_maybe' : 'received_maybe'
  if (closeReq.status === 'pending')  return closeReq.from_id === myId ? 'sent' : 'received'
  return 'none'
}

export default function ChatScreen() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id }    = useParams()
  const { session } = useApp()

  const user   = state?.user || { id, name: 'Unknown', avatar: {}, extras: [], distance: '—', moving: false }
  const myId   = session?.user?.id
  const theirId = user.id

  const [messages,     setMessages]     = useState([])
  const [input,        setInput]        = useState('')
  const [closeReq,     setCloseReq]     = useState(null)
  const [closeLoading, setCloseLoading] = useState(false)
  const [sending,      setSending]      = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Load message history
  const loadMessages = useCallback(async () => {
    if (!myId || !theirId) return
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(`and(from_id.eq.${myId},to_id.eq.${theirId}),and(from_id.eq.${theirId},to_id.eq.${myId})`)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }, [myId, theirId])

  useEffect(() => { loadMessages() }, [loadMessages])

  // Realtime: append new messages as they arrive
  useEffect(() => {
    if (!myId || !theirId) return
    const ch = supabase
      .channel(`chat-${[myId, theirId].sort().join('-')}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        ({ new: msg }) => {
          const isOurs =
            (msg.from_id === myId && msg.to_id === theirId) ||
            (msg.from_id === theirId && msg.to_id === myId)
          if (isOurs) setMessages(prev => [...prev, msg])
        })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [myId, theirId])

  // Load existing close request
  const loadCloseReq = useCallback(async () => {
    if (!myId || !theirId) return
    const { data } = await supabase
      .from('close_requests')
      .select('*')
      .or(`and(from_id.eq.${myId},to_id.eq.${theirId}),and(from_id.eq.${theirId},to_id.eq.${myId})`)
      .maybeSingle()
    setCloseReq(data ?? null)
  }, [myId, theirId])

  useEffect(() => { loadCloseReq() }, [loadCloseReq])

  // Realtime: watch close_requests for changes
  useEffect(() => {
    if (!myId || !theirId) return
    const ch = supabase
      .channel(`close-req-${myId}-${theirId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'close_requests' },
        () => loadCloseReq())
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [myId, theirId, loadCloseReq])

  const sendCloseRequest = async () => {
    if (!myId) return
    setCloseLoading(true)
    await supabase.from('close_requests').upsert(
      { from_id: myId, to_id: theirId, status: 'pending' },
      { onConflict: 'from_id,to_id' }
    )
    await loadCloseReq()
    setCloseLoading(false)
  }

  const respondToRequest = async (status) => {
    if (!closeReq) return
    setCloseLoading(true)
    await supabase.from('close_requests').update({ status }).eq('id', closeReq.id)
    await loadCloseReq()
    setCloseLoading(false)
  }

  const send = async () => {
    const text = input.trim()
    if (!text || sending || !myId) return
    setSending(true)
    setInput('')
    await supabase.from('messages').insert({ from_id: myId, to_id: theirId, text })
    setSending(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const closeState = deriveCloseState(closeReq, myId)
  const isClose    = closeState === 'accepted'

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        height: 56, background: 'rgba(14,17,32,0.98)',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, flexShrink: 0,
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 20, padding: '4px 6px 4px 0' }} aria-label="Back">←</button>

        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          border: `1.5px solid ${isClose ? '#f9c74f' : 'var(--accent)'}`,
          background: '#1e1b4b', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          <AvatarSVG config={user.avatar} extras={user.extras || []} size={34} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
            {user.name}
            {isClose && <span style={{ fontSize: 11, color: '#f9c74f' }}>◈ close</span>}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ color: 'var(--accent)', fontSize: 10 }}>◎</span>
            {user.distance ? `${user.distance}m` : (isClose ? 'far away' : '—')} · {user.moving ? 'moving' : 'stationary'}
          </div>
        </div>

        <div style={{
          background: isClose ? 'rgba(249,199,79,0.12)' : 'var(--accent-soft)',
          border: `0.5px solid ${isClose ? 'rgba(249,199,79,0.35)' : 'var(--accent-border)'}`,
          borderRadius: 10, padding: '3px 9px', fontSize: 10,
          color: isClose ? '#f9c74f' : 'var(--on-dark)',
          display: 'flex', alignItems: 'center', gap: 3,
        }}>
          {isClose ? '◈ close friends' : '⏱ ephemeral'}
        </div>
      </div>

      {/* Messages */}
      <div className="scroll-area" style={{ padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.length > 0 && (
          <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-dim)', marginBottom: 4 }}>
            {new Date(messages[0].created_at).toLocaleDateString()}
          </div>
        )}

        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 13, color: 'var(--text-dim)' }}>
            No messages yet — say hi!
          </div>
        )}
        {messages.map(m => {
          const isMe = m.from_id === myId
          return (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '72%', padding: '9px 14px', borderRadius: 18,
                borderBottomLeftRadius:  !isMe ? 4 : 18,
                borderBottomRightRadius: isMe  ? 4 : 18,
                background: isMe ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                color: isMe ? '#fff' : 'rgba(255,255,255,0.85)',
                fontSize: 14, lineHeight: 1.45,
              }}>
                {m.text}
              </div>
              <span style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 2 }}>
                {formatMsgTime(m.created_at)}
              </span>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Close request panel ── */}
      <ClosePanel
        state={closeState}
        loading={closeLoading}
        theirName={user.name}
        onSend={sendCloseRequest}
        onRespond={respondToRequest}
      />

      {/* Ephemeral / close notice */}
      <div style={{
        margin: '0 12px 8px',
        background: isClose ? 'rgba(249,199,79,0.06)' : 'rgba(127,119,221,0.07)',
        border: `0.5px solid ${isClose ? 'rgba(249,199,79,0.2)' : 'rgba(127,119,221,0.2)'}`,
        borderRadius: 10, padding: '7px 12px',
        display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, color: isClose ? '#f9c74f' : 'var(--accent)' }}>
          {isClose ? '◈' : 'ℹ'}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {isClose
            ? 'You\'re close — chat and map visibility stay on even far apart'
            : 'Chat disappears when you\'re both 500m+ apart'}
        </span>
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 12px 20px', display: 'flex', alignItems: 'center', gap: 8,
        borderTop: '0.5px solid var(--border)', flexShrink: 0,
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message ${user.name}…`}
          style={{
            flex: 1, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            padding: '0 16px', fontSize: 14, color: '#fff',
          }}
        />
        <button onClick={send} disabled={sending || !input.trim()} style={{
          width: 40, height: 40, borderRadius: '50%',
          background: input.trim() ? 'var(--accent)' : 'rgba(127,119,221,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: '#fff', transition: 'background 0.2s',
          opacity: sending ? 0.6 : 1,
        }} aria-label="Send">↗</button>
      </div>
    </div>
  )
}

// ─── Close request panel ──────────────────────────────────────────────────────
function ClosePanel({ state, loading, theirName, onSend, onRespond }) {
  if (state === 'accepted') return null // already shown in header/notice

  const base = {
    margin: '0 12px 4px', borderRadius: 14, padding: '12px 14px',
    display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0,
  }

  if (state === 'none' || state === 'declined') return (
    <div style={{ ...base, background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>🤝</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          Want to stay connected beyond proximity?
        </span>
      </div>
      <button onClick={onSend} disabled={loading} style={{
        height: 36, borderRadius: 18, background: 'var(--accent)',
        color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
        opacity: loading ? 0.6 : 1,
      }}>
        {loading ? 'Sending…' : 'Can we be close? 🤝'}
      </button>
    </div>
  )

  if (state === 'sent') return (
    <div style={{ ...base, background: 'rgba(127,119,221,0.08)', border: '0.5px solid rgba(127,119,221,0.2)' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
        🤝 Close request sent · waiting for {theirName}…
      </div>
    </div>
  )

  if (state === 'sent_maybe') return (
    <div style={{ ...base, background: 'rgba(127,119,221,0.08)', border: '0.5px solid rgba(127,119,221,0.2)' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
        🤝 {theirName} said maybe — still waiting
      </div>
    </div>
  )

  if (state === 'received' || state === 'received_maybe') return (
    <div style={{ ...base, background: 'rgba(249,199,79,0.08)', border: '0.5px solid rgba(249,199,79,0.25)' }}>
      <div style={{ fontSize: 12, color: 'rgba(249,199,79,0.9)', fontWeight: 500 }}>
        🤝 {theirName} wants to be close with you!
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onRespond('accepted')} disabled={loading} style={{
          flex: 1, height: 34, borderRadius: 17, background: '#f9c74f',
          color: '#1a1a1a', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}>Accept</button>
        <button onClick={() => onRespond('maybe')} disabled={loading} style={{
          flex: 1, height: 34, borderRadius: 17,
          background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer',
        }}>Maybe later</button>
        <button onClick={() => onRespond('declined')} disabled={loading} style={{
          width: 34, height: 34, borderRadius: 17,
          background: 'rgba(255,80,80,0.1)', border: '0.5px solid rgba(255,80,80,0.2)',
          color: '#ff7b7b', fontSize: 14, cursor: 'pointer',
        }}>✕</button>
      </div>
    </div>
  )

  return null
}
