import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  // undefined = still loading | null = not logged in | object = logged in
  const [session, setSession] = useState(undefined)
  // undefined = still loading | null = no profile yet | object = has profile
  const [profile, setProfile] = useState(undefined)

  // Shared map settings — initialised from profile on login, persisted on change
  const [ghostMode,        setGhostModeState]        = useState(false)
  const [visibilityRadius, setVisibilityRadiusState] = useState(100)
  const [pingPolicy,       setPingPolicyState]       = useState('everyone')

  // Global unread badge count (pending close requests + unseen waves)
  const [pingsCount, setPingsCount] = useState(0)

  async function loadProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) {
      setProfile(data)
      // Hydrate settings from persisted profile values
      if (data.ghost_mode        != null) setGhostModeState(data.ghost_mode)
      if (data.visibility_radius != null) setVisibilityRadiusState(data.visibility_radius)
      if (data.ping_policy       != null) setPingPolicyState(data.ping_policy)
    } else {
      setProfile(null)
    }
  }

  // ── Setters that also persist to Supabase ─────────────────────────────────
  const setGhostMode = useCallback(async (val) => {
    const next = typeof val === 'function' ? val(false) : val
    setGhostModeState(next)
    const uid = (await supabase.auth.getUser()).data.user?.id
    if (uid) await supabase.from('profiles').update({ ghost_mode: next }).eq('id', uid)
  }, [])

  const setVisibilityRadius = useCallback(async (val) => {
    setVisibilityRadiusState(val)
    const uid = (await supabase.auth.getUser()).data.user?.id
    if (uid) await supabase.from('profiles').update({ visibility_radius: val }).eq('id', uid)
  }, [])

  const setPingPolicy = useCallback(async (val) => {
    setPingPolicyState(val)
    const uid = (await supabase.auth.getUser()).data.user?.id
    if (uid) await supabase.from('profiles').update({ ping_policy: val }).eq('id', uid)
  }, [])

  // ── Global pingsCount ─────────────────────────────────────────────────────
  const refreshPingsCount = useCallback(async (userId) => {
    if (!userId) return
    const [{ count: reqCount }, { data: waves }] = await Promise.all([
      supabase
        .from('close_requests')
        .select('id', { count: 'exact', head: true })
        .eq('to_id', userId)
        .in('status', ['pending', 'maybe']),
      supabase
        .from('hi_waves')
        .select('id')
        .eq('to_id', userId)
        .eq('seen', false),
    ])
    setPingsCount((reqCount ?? 0) + (waves?.length ?? 0))
  }, [])

  useEffect(() => {
    // Safety net — if Supabase never responds, unblock the UI after 4s
    const fallback = setTimeout(() => {
      setSession(s => s === undefined ? null : s)
    }, 4000)

    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(fallback)
      setSession(session ?? null)
      if (session) {
        loadProfile(session.user.id)
        refreshPingsCount(session.user.id)
      }
    })

    // React to login / logout / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null)
        if (session) {
          setProfile(undefined) // reset to loading while we fetch
          loadProfile(session.user.id)
          refreshPingsCount(session.user.id)
        } else {
          setProfile(null)
          setPingsCount(0)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [refreshPingsCount])

  // Realtime subscription for pingsCount — updates badge from any screen
  useEffect(() => {
    let userId
    supabase.auth.getUser().then(({ data }) => {
      userId = data.user?.id
      if (!userId) return

      const ch = supabase
        .channel('global-pings-count')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'close_requests' },
          () => refreshPingsCount(userId))
        .on('postgres_changes', { event: '*', schema: 'public', table: 'hi_waves' },
          () => refreshPingsCount(userId))
        .subscribe()

      return () => supabase.removeChannel(ch)
    })
  }, [refreshPingsCount])

  const logout = () => supabase.auth.signOut()

  return (
    <AppCtx.Provider value={{
      session, profile, setProfile, loadProfile, logout,
      ghostMode, setGhostMode,
      visibilityRadius, setVisibilityRadius,
      pingPolicy, setPingPolicy,
      pingsCount,
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
