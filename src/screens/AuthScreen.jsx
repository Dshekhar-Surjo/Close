import { supabase } from '../lib/supabase'
import CloseLogo from '../components/CloseLogo'

export default function AuthScreen() {
  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  return (
    <div className="screen" style={{
      background: '#0e1120',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
    }}>

      {/* Logo + rings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginBottom: 44 }}>
        <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[160, 130, 104].map((d, i) => (
            <div key={d} style={{
              position: 'absolute', width: d, height: d, borderRadius: '50%',
              border: `1px solid rgba(127,119,221,${0.08 + i * 0.07})`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
          <div style={{
            width: 68, height: 68, borderRadius: '50%',
            background: '#1e1b4b', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CloseLogo size="sm" />
          </div>
        </div>

        <CloseLogo size="lg" />

        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, textAlign: 'center', lineHeight: 1.6 }}>
          See who's around you, right now.
        </p>
      </div>

      {/* Google sign-in */}
      <button
        onClick={handleGoogle}
        style={{
          width: '100%', height: 50, borderRadius: 25,
          background: '#fff', color: '#111',
          fontSize: 15, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 12,
        }}
      >
        {/* Google G logo */}
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
        </svg>
        Continue with Google
      </button>

      <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
        By continuing you agree to our Terms &amp; Privacy Policy
      </p>
    </div>
  )
}
