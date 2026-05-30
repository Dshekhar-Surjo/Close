import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'


export default function PingsScreen() {
  const navigate = useNavigate()
  const { session, pingsCount } = useApp()
  const myId = session?.user?.id

  const [requests,   setRequests]   = useState([])   // incoming pending close requests
  const [waves,      setWaves]      = useState([])   // incoming hi waves
  const [profiles,   setProfiles]   = useState({})   // id → profile
  const [responding, setResponding] = useState({})   // requestId → bool
  const seenMarked   = useRef(false)

  const fetchProfiles = useCallback(async (ids) => {
    if (!ids.length) return
    const { data: profs } = await supabase.from('profiles').select('*').in('id', ids)
    if (profs) {
      const map = {}
      profs.forEach(p => { map[p.id] = p })
      setProfiles(prev => ({ ...prev, ...map }))
    }
  }, [])

  const loadRequests = useCallback(async () => {
    if (!myId) return
    const { data } = await supabase
      .from('close_requests')
      .select('*')
      .eq('to_id', myId)
      .in('status', ['pending', 'maybe'])
      .order('created_at', { ascending: false })
    if (!data) return
    setRequests(data)
    fetchProfiles(data.map(r => r.from_id))
  }, [myId, fetchProfiles])

  const loadWaves = useCallback(async () => {
    if (!myId) return
    const { data } = await supabase
      .from('hi_waves')
      .select('*')
      .eq('to_id', myId)
      .order('created_at', { ascending: false })
      .limit(20)
    if (!data) return
    setWaves(data)
    fetchProfiles(data.map(w => w.from_id))

    // Mark all unseen as seen
    const unseen = data.filter(w => !w.seen).map(w => w.id)
    if (unseen.length && !seenMarked.current) {
      seenMarked.current = true
      await supabase.from('hi_waves').update({ seen: true }).in('id', unseen)
    }
  }, [myId, fetchProfiles])

  useEffect(() => { loadRequests(); loadWaves() }, [loadRequests, loadWaves])

  // Realtime — refresh on any change
  useEffect(() => {
    if (!myId) return
    const ch = supabase
      .channel('pings-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'close_requests' },
        () => loadRequests())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'hi_waves' },
        () => { seenMarked.current = false; loadWaves() })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [myId, loadRequests, loadWaves])

  const respond = async (req, status) => {
    setResponding(r => ({ ...r, [req.id]: true }))
    await supabase.from('close_requests').update({ status }).eq('id', req.id)
    await loadRequests()
    setResponding(r => ({ ...r, [req.id]: false }))
  }

  return (
    <div className="screen">
      <div style={{ padding: '16px 16px 12px', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Pings</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Conversations disappear when you drift apart</p>
      </div>

      <div className="scroll-area">

        {/* ── Close requests section ── */}
        {requests.length > 0 && (
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
              Close requests
            </div>
            {requests.map(req => {
              const prof    = profiles[req.from_id]
              const loading = responding[req.id]
              return (
                <div key={req.id} style={{
                  background: 'rgba(249,199,79,0.07)',
                  border: '0.5px solid rgba(249,199,79,0.25)',
                  borderRadius: 16, padding: '12px 14px', marginBottom: 10,
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    border: '2px solid rgba(249,199,79,0.5)', background: '#1e1b4b',
                    overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  }}>
                    <AvatarSVG config={prof?.avatar_config || {}} extras={prof?.avatar_extras || []} size={46} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 2 }}>
                      {prof?.username || '…'}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(249,199,79,0.75)', marginBottom: 8 }}>
                      🤝 Can we be close?
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => respond(req, 'accepted')} disabled={loading} style={{
                        flex: 1, height: 30, borderRadius: 15, background: '#f9c74f',
                        color: '#1a1a1a', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        opacity: loading ? 0.6 : 1,
                      }}>Accept</button>
                      <button onClick={() => respond(req, 'maybe')} disabled={loading} style={{
                        flex: 1, height: 30, borderRadius: 15,
                        background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.55)', fontSize: 12, cursor: 'pointer',
                      }}>Maybe</button>
                      <button onClick={() => respond(req, 'declined')} disabled={loading} style={{
                        width: 30, height: 30, borderRadius: 15,
                        background: 'rgba(255,80,80,0.1)', border: '0.5px solid rgba(255,80,80,0.2)',
                        color: '#ff7b7b', fontSize: 14, cursor: 'pointer',
                      }}>✕</button>
                    </div>
                  </div>
                </div>
              )
            })}

            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 6 }}>
              Recent pings
            </div>
          </div>
        )}

        {/* ── Hi waves section ── */}
        {waves.length > 0 && (
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
              Waves
            </div>
            {waves.map(wave => {
              const prof = profiles[wave.from_id]
              const timeAgo = formatTime(wave.created_at)
              return (
                <div key={wave.id} style={{
                  background: wave.seen ? 'rgba(255,255,255,0.02)' : 'rgba(127,119,221,0.07)',
                  border: `0.5px solid ${wave.seen ? 'rgba(255,255,255,0.06)' : 'rgba(127,119,221,0.2)'}`,
                  borderRadius: 14, padding: '10px 12px', marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    border: '1.5px solid rgba(127,119,221,0.4)', background: '#1e1b4b',
                    overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  }}>
                    <AvatarSVG config={prof?.avatar_config || {}} extras={prof?.avatar_extras || []} size={38} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: wave.seen ? 400 : 600 }}>
                      {prof?.username || '…'}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}> waved at you 👋</span>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{timeAgo}</div>
                  </div>
                  <button
                    onClick={() => navigate(`/chat/${wave.from_id}`, { state: { user: { id: wave.from_id, name: prof?.username || 'User', avatar: prof?.avatar_config || {}, extras: prof?.avatar_extras || [], distance: null } } })}
                    style={{
                      height: 30, borderRadius: 15, padding: '0 12px',
                      background: 'var(--accent)', color: '#fff', fontSize: 12,
                      fontWeight: 500, cursor: 'pointer', flexShrink: 0,
                    }}
                  >↗ Ping</button>
                </div>
              )
            })}
          </div>
        )}

        {/* Empty state */}
        {requests.length === 0 && waves.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 32px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <p style={{ fontSize: 14 }}>No pings yet.</p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--text-dim)' }}>
              Get close to someone on the map and say Hi or Ping.
            </p>
          </div>
        )}
      </div>

      <BottomNav pingsCount={pingsCount} />
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return d.toLocaleDateString()
}
