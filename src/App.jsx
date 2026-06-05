import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

// Eagerly loaded — needed before/during auth
import SplashScreen        from './screens/SplashScreen'
import AuthScreen          from './screens/AuthScreen'
import AvatarCreatorScreen from './screens/AvatarCreatorScreen'
import MapScreen           from './screens/MapScreen'

// Lazy-loaded — fetched only when the user first navigates there
const NearbyScreen = lazy(() => import('./screens/NearbyScreen'))
const PingsScreen  = lazy(() => import('./screens/PingsScreen'))
const ChatScreen   = lazy(() => import('./screens/ChatScreen'))
const MeScreen     = lazy(() => import('./screens/MeScreen'))

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

  if (session === undefined) return <Spinner />

  if (!session) {
    return (
      <Routes>
        <Route path="/"     element={<SplashScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="*"     element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  if (profile === undefined) return <Spinner />

  if (!profile || !profile.avatar_url) {
    return <AvatarCreatorScreen />
  }

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
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
