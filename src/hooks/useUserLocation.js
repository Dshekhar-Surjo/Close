import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const UPSERT_INTERVAL_MS = 5000

/**
 * Tracks the user's GPS position and pushes it to Supabase every 5 seconds.
 * Ghost mode prevents location from being shared.
 *
 * @param {string|null} userId  - auth user ID
 * @param {{ ghostMode?: boolean }} options
 * @returns {{ lat: number, lng: number } | null}
 */
export function useUserLocation(userId, { ghostMode = false } = {}) {
  const [location, setLocation] = useState(null)
  const currentLoc = useRef(null)
  const ghostRef   = useRef(ghostMode)

  // Keep ghostRef in sync so the interval always reads the latest value
  useEffect(() => { ghostRef.current = ghostMode }, [ghostMode])

  useEffect(() => {
    if (!userId) return

    // Continuous GPS watch (fires whenever the device reports a new position)
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lng: coords.longitude }
        currentLoc.current = loc
        setLocation(loc)
      },
      (err) => console.warn('[location] GPS error:', err),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    )

    // Push to Supabase every 5 s (decoupled from GPS events)
    const timer = setInterval(() => {
      if (ghostRef.current || !currentLoc.current) return
      supabase.from('locations').upsert({
        user_id:    userId,
        lat:        currentLoc.current.lat,
        lng:        currentLoc.current.lng,
        updated_at: new Date().toISOString(),
      })
    }, UPSERT_INTERVAL_MS)

    return () => {
      navigator.geolocation.clearWatch(watchId)
      clearInterval(timer)
    }
  }, [userId]) // re-run only if userId changes (login/logout)

  return location
}
