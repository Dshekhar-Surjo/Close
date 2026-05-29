import 'maplibre-gl/dist/maplibre-gl.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useUserLocation } from '../hooks/useUserLocation'
import { supabase } from '../lib/supabase'
import BottomNav from '../components/BottomNav'
import CloseLogo from '../components/CloseLogo'
import AvatarSVG from '../components/AvatarSVG'

// Free dark map — no API key needed
const MAP_STYLE     = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
const NEARBY_RADIUS = 100 // metres

// ─── Haversine distance ───────────────────────────────────────────────────────
function haversineM(lat1, lng1, lat2, lng2) {
  const R  = 6371000
  const f1 = (lat1 * Math.PI) / 180, f2 = (lat2 * Math.PI) / 180
  const df = ((lat2 - lat1) * Math.PI) / 180
  const dl = ((lng2 - lng1) * Math.PI) / 180
  const a  = Math.sin(df / 2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ─── Live Mapbox map with React overlay markers ───────────────────────────────
function LiveMap({ userLoc, nearbyUsers, myProfile, onUserClick, ghostMode, mapInstanceRef }) {
  const containerRef  = useRef(null)
  const mapRef        = useRef(null)
  const userLocRef    = useRef(userLoc)
  const nearbyRef     = useRef(nearbyUsers)
  const [mapLoaded,   setMapLoaded]   = useState(false)
  const [mePos,       setMePos]       = useState(null)
  const [userPositions, setUserPositions] = useState([])

  useEffect(() => { userLocRef.current = userLoc },    [userLoc])
  useEffect(() => { nearbyRef.current  = nearbyUsers }, [nearbyUsers])

  const reproject = useCallback(() => {
    const map = mapRef.current
    if (!map) return
    const loc   = userLocRef.current
    const users = nearbyRef.current

    if (loc) {
      const p = map.project([loc.lng, loc.lat])
      setMePos({ x: p.x, y: p.y })
    }
    setUserPositions(users.map(u => {
      const p = map.project([u.lng, u.lat])
      return { ...u, x: p.x, y: p.y }
    }))
  }, [])

  // Mount map once
  useEffect(() => {
    let map
    import('maplibre-gl').then(({ default: mgl }) => {
      const loc = userLocRef.current
      map = new mgl.Map({
        container:        containerRef.current,
        style:            MAP_STYLE,
        center:           loc ? [loc.lng, loc.lat] : [77.209, 28.614],
        zoom:             17,
        attributionControl: false, // we add compact one below
      })
      // Compact attribution — legal requirement, but small
      map.addControl(new mgl.AttributionControl({ compact: true }), 'bottom-left')

      mapRef.current = map
      if (mapInstanceRef) mapInstanceRef.current = map

      map.on('load', () => { setMapLoaded(true); reproject() })
      map.on('move', reproject)
      map.on('zoom', reproject)
    })
    return () => { mapRef.current?.remove(); mapRef.current = null; setMapLoaded(false) }
  }, [reproject, mapInstanceRef])

  // Fly to user when GPS arrives/changes
  const prevLoc = useRef(null)
  useEffect(() => {
    if (!userLoc || !mapRef.current || !mapLoaded) return
    const prev  = prevLoc.current
    const moved = !prev ||
      Math.abs(prev.lat - userLoc.lat) > 0.00005 ||
      Math.abs(prev.lng - userLoc.lng) > 0.00005
    if (moved) {
      mapRef.current.flyTo({ center: [userLoc.lng, userLoc.lat], zoom: 17 })
      prevLoc.current = userLoc
    }
    reproject()
  }, [userLoc, mapLoaded, reproject])

  useEffect(() => { if (mapLoaded) reproject() }, [nearbyUsers, mapLoaded, reproject])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Map canvas */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Waiting for GPS hint */}
      {!mePos && mapLoaded && !ghostMode && (
        <div style={{
          position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(14,17,32,0.9)', border: '0.5px solid rgba(255,255,255,0.12)',
          borderRadius: 20, padding: '7px 16px', fontSize: 12,
          color: 'rgba(255,255,255,0.65)', zIndex: 10, whiteSpace: 'nowrap',
        }}>
          📍 Waiting for GPS…
        </div>
      )}

      {/* My avatar — hidden in ghost mode */}
      {mePos && !ghostMode && (
        <div style={{
          position: 'absolute', left: mePos.x, top: mePos.y,
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: 'none', zIndex: 10,
        }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              position: 'absolute', width: 52, height: 52, borderRadius: '50%',
              border: '1.5px solid rgba(127,119,221,0.5)',
              top: '50%', left: '50%',
              animation: 'pulse-ring 2s ease-out infinite',
              animationDelay: `${i * 0.8}s`,
            }} />
          ))}
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            border: '2.5px solid var(--accent)', background: '#1e1b4b',
            overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center', zIndex: 1,
          }}>
            <AvatarSVG
              config={myProfile?.avatar_config}
              extras={myProfile?.avatar_extras || []}
              size={44}
            />
          </div>
          <span style={{
            fontSize: 10, color: 'var(--on-dark)',
            background: 'rgba(60,52,137,0.85)',
            padding: '1px 6px', borderRadius: 4, marginTop: 3, whiteSpace: 'nowrap',
          }}>You</span>
        </div>
      )}

      {/* Nearby users */}
      {userPositions.map(u => (
        <div key={u.id} onClick={() => onUserClick(u)} style={{
          position: 'absolute', left: u.x, top: u.y,
          transform: 'translate(-50%, -100%)',
          cursor: 'pointer', zIndex: 8,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)', background: '#1a1a2e',
            overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}>
            <AvatarSVG config={u.avatar} extras={u.extras || []} size={36} />
          </div>
          <span style={{
            fontSize: 10, color: 'rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.6)',
            padding: '1px 5px', borderRadius: 4, marginTop: 3, whiteSpace: 'nowrap',
          }}>{u.name}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Profile bottom sheet ─────────────────────────────────────────────────────
function ProfileSheet({ user, onClose, onPing }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', animation: 'fadeIn 0.2s ease' }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'var(--bg-2)', borderRadius: '20px 20px 0 0',
        borderTop: '0.5px solid rgba(255,255,255,0.1)',
        padding: '12px 20px 32px', animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2.5px solid var(--accent)', background: '#1e1b4b', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <AvatarSVG config={user.avatar} extras={user.extras || []} size={78} />
          </div>
        </div>
        <h2 style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{user.name}</h2>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <span style={{ color: 'var(--accent)', fontSize: 13 }}>◎</span> {user.distance}m away
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onPing(user)} style={{ flex: 1, height: 46, borderRadius: 23, background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>↗ Ping</button>
          <button onClick={onClose} style={{ width: 46, height: 46, borderRadius: '50%', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function MapScreen() {
  const navigate          = useNavigate()
  const { session, profile } = useApp()
  const mapInstanceRef    = useRef(null)

  const [ghostMode,     setGhostMode]     = useState(false)
  const [selectedUser,  setSelectedUser]  = useState(null)
  const [nearbyUsers,   setNearbyUsers]   = useState([])

  const userLoc     = useUserLocation(session?.user?.id, { ghostMode })
  const profileCache = useRef({})
  const userLocRef   = useRef(null)
  const didFetch     = useRef(false)

  useEffect(() => { userLocRef.current = userLoc }, [userLoc])

  const processLoc = useCallback(async (loc) => {
    const myId  = session?.user?.id
    const myLoc = userLocRef.current
    if (!myId || !myLoc || !loc || loc.user_id === myId) return

    const dist = haversineM(myLoc.lat, myLoc.lng, loc.lat, loc.lng)
    if (dist > NEARBY_RADIUS) {
      setNearbyUsers(prev => prev.filter(u => u.id !== loc.user_id))
      return
    }

    if (!profileCache.current[loc.user_id]) {
      const { data } = await supabase.from('profiles').select('*').eq('id', loc.user_id).single()
      if (data) profileCache.current[loc.user_id] = data
    }
    const prof = profileCache.current[loc.user_id]
    if (!prof) return

    const entry = {
      id: loc.user_id, name: prof.username || 'Nearby',
      lat: loc.lat, lng: loc.lng,
      distance: Math.round(dist),
      avatar: prof.avatar_config || {}, extras: prof.avatar_extras || [],
    }
    setNearbyUsers(prev => {
      const exists = prev.some(u => u.id === entry.id)
      return exists ? prev.map(u => u.id === entry.id ? entry : u) : [...prev, entry]
    })
  }, [session])

  useEffect(() => {
    if (!userLoc || !session || didFetch.current) return
    didFetch.current = true
    supabase.from('locations').select('*').then(({ data }) => data?.forEach(processLoc))
  }, [userLoc, session, processLoc])

  useEffect(() => {
    if (!session) return
    const ch = supabase
      .channel('nearby-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'locations' },
        ({ new: loc }) => { if (loc) processLoc(loc) })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [session, processLoc])

  const handlePing = (user) => {
    setSelectedUser(null)
    navigate(`/chat/${user.id}`, { state: { user } })
  }

  const recenter = () => {
    if (userLoc && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({ center: [userLoc.lng, userLoc.lat], zoom: 17 })
    }
  }

  return (
    <div className="screen">
      <div style={{ height: 'env(safe-area-inset-top, 0px)', background: 'transparent', flexShrink: 0 }} />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <LiveMap
          userLoc={userLoc}
          nearbyUsers={nearbyUsers}
          myProfile={profile}
          onUserClick={setSelectedUser}
          ghostMode={ghostMode}
          mapInstanceRef={mapInstanceRef}
        />

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'all', background: 'rgba(14,17,32,0.88)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CloseLogo size="sm" />
          </div>
          <div style={{ background: 'rgba(14,17,32,0.88)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>●</span>
            {nearbyUsers.length} nearby
          </div>
        </div>

        {/* Ghost mode toggle */}
        <button onClick={() => setGhostMode(g => !g)} style={{
          position: 'absolute', bottom: 16, left: 14, zIndex: 5,
          background: ghostMode ? 'rgba(127,119,221,0.25)' : 'rgba(14,17,32,0.88)',
          border: `0.5px solid ${ghostMode ? 'var(--accent-border)' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 20, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: ghostMode ? 'var(--on-dark)' : 'rgba(255,255,255,0.65)', cursor: 'pointer',
        }}>
          👻 {ghostMode ? 'Ghosted' : 'Ghost mode'}
        </button>

        {/* Re-centre button — centres map on your location */}
        <button onClick={recenter} style={{
          position: 'absolute', bottom: 16, right: 14,
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', zIndex: 5, cursor: 'pointer',
        }} aria-label="Centre map on me">
          ◎
        </button>

        {selectedUser && (
          <ProfileSheet user={selectedUser} onClose={() => setSelectedUser(null)} onPing={handlePing} />
        )}
      </div>

      <BottomNav pingsCount={0} />
    </div>
  )
}
