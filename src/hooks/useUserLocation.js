import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const UPSERT_INTERVAL_MS = 5000

/**
 * Tracks the user's GPS position and pushes it to Supabase every 5 seconds.
 * Ghost mode: stops sharing AND deletes the existing location row so others
 * stop seeing the user immediately.
 */
export function useUserLocation(userId, { ghostMode = false } = {}) {
  const [location, setLocation] = useState(null)
  const currentLoc = useRef(null)
  const ghostRef   = useRef(ghostMode)
  const prevGhost  = useRef(ghostMode)

  // When ghost mode turns ON → delete our row from the locations table
  useEffect(() => {
    ghostRef.current = ghostMode
    if (ghostMode && !prevGhost.current && userId) {
      supabase.from('locations').delete().eq('user_id', userId)
    }
    prevGhost.current = ghostMode
  }, [ghostMode, userId])

  useEffect(() => {
    if (!userId) return

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lng: coords.longitude }
        currentLoc.current = loc
        setLocation(loc)
      },
      (err) => console.warn('[location] GPS error:', err),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    )

    const timer = setInterval(() => {
      if (ghostRef.current || !currentLoc.current) return
      supabase.from('locations').upsert({
        user_id:    userId,
        lat:        currentLoc.current.lat,
        lng:        currentLoc.current.lng,
        updated_at: new Date().toISOString(),
      })
    }, UPSERT_INTERVAL_MS)

    // On logout/unmount: delete our location row so we disappear immediately
    return () => {
      navigator.geolocation.clearWatch(watchId)
      clearInterval(timer)
      if (!ghostRef.current) {
        supabase.from('locations').delete().eq('user_id', userId)
      }
    }
  }, [userId])

  return location
}
