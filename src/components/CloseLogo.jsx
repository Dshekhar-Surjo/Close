const Pin = ({ flip = false, size = 22 }) => (
  <svg
    width={size * 0.73}
    height={size}
    viewBox="0 0 16 22"
    fill="none"
    style={flip ? { transform: 'scaleX(-1)' } : {}}
    aria-hidden="true"
  >
    <path
      d="M8 0C3.582 0 0 3.582 0 8c0 5.5 8 14 8 14S16 13.5 16 8c0-4.418-3.582-8-8-8z"
      fill="#7F77DD"
    />
    <circle cx="8" cy="8" r="3" fill="rgba(14,17,32,0.7)" />
  </svg>
)

export default function CloseLogo({ size = 'md', color = '#fff' }) {
  const sizes = {
    sm: { pin: 16, text: 16 },
    md: { pin: 22, text: 26 },
    lg: { pin: 30, text: 36 },
  }
  const s = sizes[size] || sizes.md

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Pin size={s.pin} />
      <span
        style={{
          fontSize: s.text,
          fontWeight: 500,
          color,
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}
      >
        close
      </span>
      <Pin size={s.pin} flip />
    </div>
  )
}
