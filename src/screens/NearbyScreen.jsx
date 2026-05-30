import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useUserLocation } from '../hooks/useUserLocation'
import { supabase } from '../lib/supabase'
import { haversineM } from '../lib/geo'
import BottomNav from '../components/BottomNav'
import AvatarSVG from '../components/AvatarSVG'


export default function NearbyScreen() {
  const navigate = useNavigate()
  const { session, ghostMode, visibilityRadius, pingsCount } = useApp()
  const userLoc = useUserLocation(session?.user?.id, { ghostMode })

  const [nearbyUsers, setNearbyUsers] = useState([])
  const [loading,     setLoading]     = useState(true)
  const profileCache = useRef({})
  const userLocRef   = useRef(null)
  const didFetch     = useRef(false)

  useEffect(() => { userLocRef.current = userLoc }, [userLoc])

  const fetchNearby = useCallback(async () => {
    const myId  = session?.user?.id
    const myLoc = userLocRef.current
    if (!myId || !myLoc) return

    // Bounding box ≈ ±0.02° (~2 km) keeps the query small
    const pad = 0.02
    const { data: locs } = await supabase
      .from('locations').select('*')
      .gte('lat', myLoc.lat - pad).lte('lat', myLoc.lat + pad)
      .gte('lng', myLoc.lng - pad).lte('lng', myLoc.lng + pad)
    if (!locs) return

    const results = []
    for (const loc of locs) {
      if (loc.user_id === myId) continue
      const dist = haversineM(myLoc.lat, myLoc.lng, loc.lat, loc.lng)
      if (dist > visibilityRadius) continue

      if (!profileCache.current[loc.user_id]) {
        const { data } = await supabase.from('profiles').select('*').eq('id', loc.user_id).single()
        if (data) profileCache.current[loc.user_id] = data
      }
      const prof = profileCache.current[loc.user_id]
      if (!prof) continue

      results.push({
        id: loc.user_id,
        name: prof.username || 'Nearby',
        distance: Math.round(dist),
        avatar: prof.avatar_config || {},
        extras: prof.avatar_extras || [],
      })
    }

    results.sort((a, b) => a.distance - b.distance)
    setNearbyUsers(results)
    setLoading(false)
  }, [session, visibilityRadius])

  // First fetch once GPS arrives; reset on unmount so re-navigation refetches
  useEffect(() => {
    if (userLoc && !didFetch.current) {
      didFetch.current = true
      fetchNearby()
    }
    return () => { didFetch.current = false }
  }, [userLoc, fetchNearby])

  // Realtime updates
  useEffect(() => {
    if (!session) return
    const ch = supabase
      .channel('nearby-list-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'locations' },
        () => fetchNearby())
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [session, fetchNearby])

  return (
    <div className="screen">
      <div style={{ padding: '16px 16px 12px', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Nearby</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {loading
            ? 'Looking around…'
            : `${nearbyUsers.length} ${nearbyUsers.length === 1 ? 'person' : 'people'} within ${visibilityRadius}m`}
        </p>
      </div>

      <div className="scroll-area">
        {/* Waiting for GPS */}
        {!userLoc && (
          <div style={{ textAlign: 'center', padding: '60px 32px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📍</div>
            <p style={{ fontSize: 14 }}>Waiting for GPS…</p>
          </div>
        )}

        {/* No one nearby */}
        {userLoc && !loading && nearbyUsers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 32px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>👀</div>
            <p style={{ fontSize: 14 }}>No one nearby right now.</p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--text-dim)' }}>
              People show up when they're within {visibilityRadius}m.
            </p>
          </div>
        )}

        {/* Real nearby users */}
        {nearbyUsers.map(u => (
          <div
            key={u.id}
            onClick={() => navigate(`/chat/${u.id}`, { state: { user: u } })}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 16px', borderBottom: '0.5px solid var(--border)', cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                border: '1.5px solid rgba(127,119,221,0.45)', background: '#1e1b4b',
                overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              }}>
                <AvatarSVG config={u.avatar} extras={u.extras} size={44} />
              </div>
              <div style={{
                position: 'absolute', bottom: 1, right: 1,
                width: 10, height: 10, borderRadius: '50%',
                background: 'var(--green)', border: '1.5px solid var(--bg)',
              }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                {u.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: 'var(--accent)' }}>◎</span> {u.distance}m away
              </div>
            </div>

            <button
              onClick={e => { e.stopPropagation(); navigate(`/chat/${u.id}`, { state: { user: u } }) }}
              style={{
                height: 32, borderRadius: 16, padding: '0 14px',
                background: 'var(--accent-soft)', border: '0.5px solid var(--accent-border)',
                color: 'var(--on-dark)', fontSize: 12,
                display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
              }}
            >↗ Ping</button>
          </div>
        ))}
      </div>

      <BottomNav pingsCount={pingsCount} />
    </div>
  )
}
