import { useState } from 'react'

/**
 * AvatarPhoto — drop-in replacement for AvatarSVG.
 * Renders an <img> circle from avatar_url; falls back to a ghost icon.
 *
 * Props:
 *   url   {string}  – the avatar_url stored on the profile
 *   size  {number}  – diameter in px (default 44)
 *   style {object}  – extra inline styles
 */
export default function AvatarPhoto({ url, size = 44, style = {} }) {
  const [err, setErr] = useState(false)

  if (!url || err) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.42),
        color: 'rgba(255,255,255,0.3)',
        flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}>
        👤
      </div>
    )
  }

  return (
    <img
      src={url}
      alt="avatar"
      loading="lazy"
      onError={() => setErr(true)}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
        ...style,
      }}
    />
  )
}
