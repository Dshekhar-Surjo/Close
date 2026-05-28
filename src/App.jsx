import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen       from './screens/SplashScreen'
import AvatarCreatorScreen from './screens/AvatarCreatorScreen'
import MapScreen          from './screens/MapScreen'
import NearbyScreen       from './screens/NearbyScreen'
import PingsScreen        from './screens/PingsScreen'
import ChatScreen         from './screens/ChatScreen'
import MeScreen           from './screens/MeScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<SplashScreen />} />
        <Route path="/avatar-creator" element={<AvatarCreatorScreen />} />
        <Route path="/map"            element={<MapScreen />} />
        <Route path="/nearby"         element={<NearbyScreen />} />
        <Route path="/pings"          element={<PingsScreen />} />
        <Route path="/chat/:id"       element={<ChatScreen />} />
        <Route path="/me"             element={<MeScreen />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
