import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  // undefined = still loading | null = not logged in | object = logged in
  const [session, setSession] = useState(undefined)
  // undefined = still loading | null = no profile yet | object = has profile
  const [profile, setProfile] = useState(undefined)

  async function loadProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data ?? null)
  }

  useEffect(() => {
    // Safety net — if Supabase never responds, unblock the UI after 4s
    const fallback = setTimeout(() => {
      setSession(s => s === undefined ? null : s)
    }, 4000)

    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(fallback)
      setSession(session ?? null)
      if (session) loadProfile(session.user.id)
    })

    // React to login / logout / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null)
        if (session) {
          setProfile(undefined) // reset to loading while we fetch
          loadProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const logout = () => supabase.auth.signOut()

  return (
    <AppCtx.Provider value={{ session, profile, setProfile, loadProfile, logout }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
