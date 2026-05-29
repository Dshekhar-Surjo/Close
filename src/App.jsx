import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import SplashScreen        from './screens/SplashScreen'
import AuthScreen          from './screens/AuthScreen'
import AvatarCreatorScreen from './screens/AvatarCreatorScreen'
import MapScreen           from './screens/MapScreen'
import NearbyScreen        from './screens/NearbyScreen'
import PingsScreen         from './screens/PingsScreen'
import ChatScreen          from './screens/ChatScreen'
import MeScreen            from './screens/MeScreen'

function Spinner() {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0e1120',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid rgba(127,119,221,0.25)',
        borderTopColor: 'var(--accent)',
        animation: 'spin-slow 0.8s linear infinite',
      }} />
    </div>
  )
}

function AppRoutes() {
  const { session, profile } = useApp()

  // Still reading session from Supabase storage — show a spinner
  if (session === undefined) return <Spinner />

  // Not logged in → only splash + auth are accessible
  if (!session) {
    return (
      <Routes>
        <Route path="/"     element={<SplashScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="*"     element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // Logged in but no avatar created yet → force avatar setup
  // (profile is null while loading; show spinner to avoid flash)
  if (profile === null) return <Spinner />
  if (!profile.avatar_config || Object.keys(profile.avatar_config).length === 0) {
    return <AvatarCreatorScreen />
  }

  // Fully authenticated with a saved avatar
  return (
    <Routes>
      <Route path="/"               element={<Navigate to="/map" replace />} />
      <Route path="/map"            element={<MapScreen />} />
      <Route path="/avatar-creator" element={<AvatarCreatorScreen />} />
      <Route path="/nearby"         element={<NearbyScreen />} />
      <Route path="/pings"          element={<PingsScreen />} />
      <Route path="/chat/:id"       element={<ChatScreen />} />
      <Route path="/me"             element={<MeScreen />} />
      <Route path="*"               element={<Navigate to="/map" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
