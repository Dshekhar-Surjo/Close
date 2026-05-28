import { useNavigate } from 'react-router-dom'
import CloseLogo from '../components/CloseLogo'

export default function SplashScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen" style={{ background: '#0e1120', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>

      {/* Rings + logo mark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginBottom: 36 }}>
        <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer rings */}
          {[160, 130, 104].map((d, i) => (
            <div key={d} style={{
              position: 'absolute',
              width: d,
              height: d,
              borderRadius: '50%',
              border: `1px solid rgba(127,119,221,${0.08 + i * 0.07})`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
          {/* Center dot */}
          <div style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: '#1e1b4b',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CloseLogo size="sm" />
          </div>
        </div>

        {/* Full wordmark */}
        <CloseLogo size="lg" />
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.38)',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 1.6,
        marginBottom: 52,
      }}>
        See who's around you, right now.
      </p>

      {/* CTAs */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => navigate('/avatar-creator')}
          style={{
            width: '100%',
            height: 50,
            borderRadius: 25,
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: 0.3,
          }}
        >
          Get started
        </button>
        <button
          onClick={() => navigate('/map')}
          style={{
            width: '100%',
            height: 50,
            borderRadius: 25,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 15,
          }}
        >
          I already have an account
        </button>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, marginTop: 28, textAlign: 'center' }}>
        By continuing you agree to our Terms &amp; Privacy Policy
      </p>
    </div>
  )
}
