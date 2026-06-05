import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'

// ─── Filter config ────────────────────────────────────────────────────────────
const GENDER_OPTS = [
  { label: 'Any',    value: '' },
  { label: 'Men',    value: 'male' },
  { label: 'Women',  value: 'female' },
]

// nationality groups mapped to rough appearance diversity
const LOOK_OPTS = [
  { label: 'All looks',  nats: 'us,gb,au,ca,ie,nz,dk,fi,no,nl,es,fr,de,ch' },
  { label: 'South Asian', nats: 'in' },
  { label: 'East Asian',  nats: 'jp,cn,kr' },
  { label: 'Latin',       nats: 'mx,br,es' },
  { label: 'African',     nats: 'ng,za,ke' },
  { label: 'Middle Eastern', nats: 'ir,tr' },
]

const PAGE_SIZE = 24

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildUrl(gender, look, page) {
  const params = new URLSearchParams({
    results: PAGE_SIZE,
    inc: 'picture,name',
    page,
    seed: `close-${look.nats}-${gender || 'any'}-${page}`,
  })
  if (gender) params.set('gender', gender)
  params.set('nat', look.nats)
  return `https://randomuser.me/api/?${params}`
}

// ─── AvatarPhoto (reused here for preview) ───────────────────────────────────
function AvatarPhoto({ url, size = 44, style = {} }) {
  const [err, setErr] = useState(false)
  if (!url || err) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.4, color: 'rgba(255,255,255,0.3)',
        flexShrink: 0, ...style,
      }}>👤</div>
    )
  }
  return (
    <img
      src={url} alt="avatar"
      onError={() => setErr(true)}
      style={{
        width: size, height: size, borderRadius: '50%',
        objectFit: 'cover', flexShrink: 0, display: 'block', ...style,
      }}
    />
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function AvatarCreatorScreen() {
  const navigate = useNavigate()
  const { session, setProfile } = useApp()

  const [username,  setUsername]  = useState(
    () => session?.user?.user_metadata?.full_name?.split(' ')[0] ||
          session?.user?.email?.split('@')[0] || ''
  )
  const [genderIdx, setGenderIdx] = useState(0)
  const [lookIdx,   setLookIdx]   = useState(0)
  const [photos,    setPhotos]    = useState([])
  const [page,      setPage]      = useState(1)
  const [loading,   setLoading]   = useState(false)
  const [hasMore,   setHasMore]   = useState(true)
  const [selected,  setSelected]  = useState(null)
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState(null)

  const gender = GENDER_OPTS[genderIdx].value
  const look   = LOOK_OPTS[lookIdx]

  // fetch a page of portraits
  const fetchPage = useCallback(async (pg, reset = false) => {
    setLoading(true)
    try {
      const res  = await fetch(buildUrl(gender, look, pg))
      const data = await res.json()
      const urls = data.results.map(r => r.picture.large)
      setPhotos(prev => reset ? urls : [...prev, ...urls])
      setHasMore(urls.length === PAGE_SIZE)
    } catch {
      // silently ignore network errors — grid just stays as-is
    }
    setLoading(false)
  }, [gender, look])

  // reset when filters change
  useEffect(() => {
    setPhotos([])
    setPage(1)
    setHasMore(true)
    fetchPage(1, true)
  }, [gender, lookIdx])  // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchPage(next)
  }

  const handleSave = async () => {
    if (!session) { navigate('/auth'); return }
    const trimmedName = username.trim()
    if (!trimmedName) { setError('Please enter a name.'); return }
    if (!selected)    { setError('Please pick an avatar photo.'); return }
    setSaving(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('profiles')
      .upsert({
        id:         session.user.id,
        username:   trimmedName,
        avatar_url: selected,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })
      .select()
      .single()

    setSaving(false)
    if (err) { setError('Could not save — please try again.'); return }
    setProfile(data)
    navigate('/map')
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 12,
        borderBottom: '0.5px solid var(--border)', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', padding: 4, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          aria-label="Back"
        >←</button>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#fff' }}>
          Pick your avatar
        </span>
        <button
          onClick={handleSave}
          disabled={saving || !selected}
          style={{
            height: 32, borderRadius: 16, padding: '0 16px',
            background: saving || !selected ? 'rgba(127,119,221,0.35)' : 'var(--accent)',
            color: '#fff', fontSize: 13, fontWeight: 500,
            cursor: saving || !selected ? 'default' : 'pointer',
          }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* Name + selected preview */}
      <div style={{
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '0.5px solid var(--border)', flexShrink: 0,
      }}>
        <AvatarPhoto url={selected} size={52} style={{ border: selected ? '2.5px solid var(--accent)' : '2.5px solid rgba(255,255,255,0.12)' }} />
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Your name (shown to nearby people)"
          maxLength={24}
          style={{
            flex: 1, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            padding: '0 16px', fontSize: 14, color: '#fff',
          }}
        />
      </div>

      {error && (
        <div style={{ padding: '8px 16px', background: 'rgba(220,50,50,0.15)', color: '#ff7b7b', fontSize: 12, flexShrink: 0 }}>
          {error}
        </div>
      )}

      {/* Filters */}
      <div style={{ padding: '10px 16px 8px', flexShrink: 0 }}>
        {/* Gender */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {GENDER_OPTS.map((g, i) => (
            <button key={g.value} onClick={() => setGenderIdx(i)} style={{
              height: 28, borderRadius: 14, padding: '0 12px', fontSize: 12,
              background: genderIdx === i ? 'var(--accent-soft)' : 'rgba(255,255,255,0.05)',
              border: `0.5px solid ${genderIdx === i ? 'var(--accent-border)' : 'rgba(255,255,255,0.1)'}`,
              color: genderIdx === i ? 'var(--on-dark)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}>{g.label}</button>
          ))}
        </div>
        {/* Look */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {LOOK_OPTS.map((l, i) => (
            <button key={l.label} onClick={() => setLookIdx(i)} style={{
              height: 28, borderRadius: 14, padding: '0 12px', fontSize: 12,
              background: lookIdx === i ? 'var(--accent-soft)' : 'rgba(255,255,255,0.05)',
              border: `0.5px solid ${lookIdx === i ? 'var(--accent-border)' : 'rgba(255,255,255,0.1)'}`,
              color: lookIdx === i ? 'var(--on-dark)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}>{l.label}</button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="scroll-area" style={{ flex: 1, padding: '8px 12px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}>
          {photos.map((url, i) => (
            <button
              key={url + i}
              onClick={() => setSelected(url)}
              style={{
                padding: 0, border: 'none', background: 'none',
                cursor: 'pointer', borderRadius: '50%', position: 'relative',
              }}
            >
              <img
                src={url} alt="portrait"
                loading="lazy"
                style={{
                  width: '100%', aspectRatio: '1', borderRadius: '50%',
                  objectFit: 'cover', display: 'block',
                  border: selected === url
                    ? '3px solid var(--accent)'
                    : '3px solid transparent',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
              />
              {selected === url && (
                <div style={{
                  position: 'absolute', bottom: 2, right: 2,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: '#fff',
                }}>✓</div>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
            Loading…
          </div>
        )}

        {!loading && hasMore && photos.length > 0 && (
          <button
            onClick={loadMore}
            style={{
              display: 'block', width: '100%', marginTop: 16,
              height: 40, borderRadius: 20,
              background: 'rgba(255,255,255,0.07)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)', fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  )
}
