'use client'

/*
  Watercolor-style floral SVG components.
  Uses layered radial gradients, subtle blur filters and soft flower silhouettes
  to evoke premium wedding-invitation watercolor illustrations.
*/

const Filters = ({ id }) => (
  <defs>
    <filter id={`wc-blur-${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" />
    </filter>
    <filter id={`wc-soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.4" />
    </filter>
    <filter id={`wc-wash-${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="9" />
    </filter>

    <radialGradient id={`peony-${id}`} cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#FBE6E8" stopOpacity="1" />
      <stop offset="45%" stopColor="#F0C7CD" stopOpacity="0.95" />
      <stop offset="80%" stopColor="#D89AA4" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#B76E79" stopOpacity="0.7" />
    </radialGradient>
    <radialGradient id={`peony-light-${id}`} cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#FFF6F5" stopOpacity="1" />
      <stop offset="55%" stopColor="#FADCDE" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#EAC7CE" stopOpacity="0.6" />
    </radialGradient>
    <radialGradient id={`champagne-${id}`} cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#FBF0DA" stopOpacity="1" />
      <stop offset="55%" stopColor="#EDD7A6" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#D8B26E" stopOpacity="0.7" />
    </radialGradient>
    <radialGradient id={`eucalyptus-${id}`} cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#DDE6D5" stopOpacity="1" />
      <stop offset="60%" stopColor="#AFC1A2" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#7C9878" stopOpacity="0.75" />
    </radialGradient>
    <radialGradient id={`sage-${id}`} cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#EEF2E8" stopOpacity="1" />
      <stop offset="60%" stopColor="#C4D0B4" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#8FA98A" stopOpacity="0.75" />
    </radialGradient>
    <radialGradient id={`center-${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#F5D97A" stopOpacity="1" />
      <stop offset="80%" stopColor="#C69B4D" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#8B6934" stopOpacity="0.7" />
    </radialGradient>

    {/* watercolor "wash" background blobs */}
    <radialGradient id={`wash-blush-${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#F5D5DB" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#F5D5DB" stopOpacity="0" />
    </radialGradient>
    <radialGradient id={`wash-gold-${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#EBD3A2" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#EBD3A2" stopOpacity="0" />
    </radialGradient>
    <radialGradient id={`wash-sage-${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#C4D0B4" stopOpacity="0.45" />
      <stop offset="100%" stopColor="#C4D0B4" stopOpacity="0" />
    </radialGradient>
  </defs>
)

/* A soft, layered peony/rose */
function Peony({ cx, cy, r = 24, gradient = 'peony', id = 'a', rotate = 0 }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      {/* Outer petal ring — big, soft */}
      {[...Array(9)].map((_, i) => {
        const a = (i * 40 * Math.PI) / 180
        return (
          <ellipse
            key={`o-${i}`}
            cx={Math.cos(a) * r * 0.55}
            cy={Math.sin(a) * r * 0.55}
            rx={r * 0.7}
            ry={r * 0.95}
            transform={`rotate(${i * 40} ${Math.cos(a) * r * 0.55} ${Math.sin(a) * r * 0.55})`}
            fill={`url(#${gradient}-${id})`}
            filter={`url(#wc-blur-${id})`}
            opacity="0.75"
          />
        )
      })}
      {/* Mid petal ring */}
      {[...Array(7)].map((_, i) => {
        const a = (i * 51.4 * Math.PI) / 180 + 0.3
        return (
          <ellipse
            key={`m-${i}`}
            cx={Math.cos(a) * r * 0.3}
            cy={Math.sin(a) * r * 0.3}
            rx={r * 0.48}
            ry={r * 0.7}
            transform={`rotate(${i * 51.4 + 20} ${Math.cos(a) * r * 0.3} ${Math.sin(a) * r * 0.3})`}
            fill={`url(#${gradient}-light-${id})`}
            opacity="0.95"
          />
        )
      })}
      {/* inner tight petals */}
      {[...Array(5)].map((_, i) => {
        const a = (i * 72 * Math.PI) / 180
        return (
          <ellipse
            key={`i-${i}`}
            cx={Math.cos(a) * r * 0.15}
            cy={Math.sin(a) * r * 0.15}
            rx={r * 0.28}
            ry={r * 0.42}
            transform={`rotate(${i * 72 + 40} ${Math.cos(a) * r * 0.15} ${Math.sin(a) * r * 0.15})`}
            fill={`url(#${gradient}-light-${id})`}
            opacity="1"
          />
        )
      })}
      {/* center */}
      <circle cx="0" cy="0" r={r * 0.16} fill={`url(#center-${id})`} />
      <circle cx="0" cy="0" r={r * 0.06} fill="#5C3A1E" opacity="0.6" />
    </g>
  )
}

/* A trumpet lily silhouette */
function Lily({ cx, cy, r = 20, id = 'a', rotate = 0 }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} filter={`url(#wc-blur-${id})`}>
      {[...Array(6)].map((_, i) => {
        const a = (i * 60 * Math.PI) / 180
        return (
          <path
            key={i}
            d={`M0 0 Q ${Math.cos(a) * r * 0.4} ${Math.sin(a) * r * 0.4 - 3}, ${Math.cos(a) * r} ${Math.sin(a) * r} Q ${Math.cos(a) * r * 0.4 + 3} ${Math.sin(a) * r * 0.4}, 0 0 Z`}
            fill={`url(#peony-light-${id})`}
            opacity="0.9"
          />
        )
      })}
      {/* stamens */}
      {[...Array(5)].map((_, i) => {
        const a = (i * 72 * Math.PI) / 180
        return (
          <g key={`s-${i}`}>
            <line x1="0" y1="0" x2={Math.cos(a) * r * 0.4} y2={Math.sin(a) * r * 0.4} stroke="#D8B26E" strokeWidth="0.7" opacity="0.8" />
            <circle cx={Math.cos(a) * r * 0.45} cy={Math.sin(a) * r * 0.45} r="1.2" fill="#D8B26E" />
          </g>
        )
      })}
      <circle cx="0" cy="0" r={r * 0.1} fill="#D8B26E" />
    </g>
  )
}

/* Eucalyptus leaf sprig */
function EucSprig({ cx, cy, length = 60, rotate = 0, id = 'a', gradient = 'eucalyptus' }) {
  const leaves = 7
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <path d={`M0 0 Q ${length * 0.3} ${length * 0.1}, ${length} ${length * 0.05}`} stroke="#7C9878" strokeWidth="0.9" fill="none" opacity="0.7" />
      {[...Array(leaves)].map((_, i) => {
        const t = (i + 1) / (leaves + 1)
        const px = t * length
        const py = t * length * 0.06
        const side = i % 2 === 0 ? 1 : -1
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py + side * 5}
            rx={4 + i * 0.4}
            ry={7 + i * 0.5}
            transform={`rotate(${side * (25 + i * 3)} ${px} ${py + side * 5})`}
            fill={`url(#${gradient}-${id})`}
            filter={`url(#wc-blur-${id})`}
            opacity="0.85"
          />
        )
      })}
    </g>
  )
}

/* Small filler baby's breath cluster */
function BabysBreath({ cx, cy, r = 14, id = 'a' }) {
  const dots = []
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2
    const rr = Math.random() * r
    dots.push([Math.cos(a) * rr, Math.sin(a) * rr, 0.8 + Math.random() * 1.4])
  }
  return (
    <g transform={`translate(${cx} ${cy})`} opacity="0.85">
      {dots.map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r={s} fill="#FCF7EF" stroke="#EAD9C7" strokeWidth="0.3" />
      ))}
    </g>
  )
}

/*
  Composed corner illustration.
  position: 'tl' | 'tr' | 'bl' | 'br'
*/
export function FloralCorner({ position = 'tl', className = '', size = 'lg' }) {
  const id = position
  const transforms = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 scale-x-[-1]',
    bl: 'bottom-0 left-0 scale-y-[-1]',
    br: 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  }
  const sizes = {
    sm: 'w-36 h-36 md:w-48 md:h-48',
    md: 'w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72',
    lg: 'w-56 h-56 md:w-72 md:h-72 lg:w-[22rem] lg:h-[22rem]',
  }
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute ${sizes[size]} ${transforms[position]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(circle at 20% 20%, black 15%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at 20% 20%, black 15%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
      }}
    >
      <Filters id={id} />

      {/* Watercolor wash background blobs — soft, faded */}
      <g filter={`url(#wc-wash-${id})`} opacity="0.7">
        <ellipse cx="70" cy="70" rx="100" ry="80" fill={`url(#wash-blush-${id})`} />
        <ellipse cx="150" cy="50" rx="80" ry="60" fill={`url(#wash-gold-${id})`} />
        <ellipse cx="50" cy="160" rx="80" ry="110" fill={`url(#wash-sage-${id})`} />
        <ellipse cx="180" cy="180" rx="70" ry="70" fill={`url(#wash-blush-${id})`} />
      </g>

      {/* Trailing eucalyptus vines */}
      <EucSprig cx={-10} cy={70} length={150} rotate={20} id={id} />
      <EucSprig cx={30} cy={20} length={170} rotate={40} id={id} gradient="sage" />
      <EucSprig cx={20} cy={150} length={140} rotate={60} id={id} />
      <EucSprig cx={-5} cy={220} length={130} rotate={35} id={id} gradient="sage" />
      <EucSprig cx={150} cy={-10} length={140} rotate={65} id={id} />
      <EucSprig cx={200} cy={40} length={120} rotate={80} id={id} gradient="sage" />
      <EucSprig cx={90} cy={200} length={110} rotate={20} id={id} />

      {/* Baby's breath fillers */}
      <BabysBreath cx={40} cy={35} r={18} id={id} />
      <BabysBreath cx={155} cy={30} r={16} id={id} />
      <BabysBreath cx={30} cy={150} r={18} id={id} />
      <BabysBreath cx={190} cy={110} r={14} id={id} />
      <BabysBreath cx={130} cy={180} r={14} id={id} />

      {/* Champagne accent peony */}
      <Peony cx={155} cy={40} r={20} gradient="champagne" id={id} rotate={15} />

      {/* Cream lily */}
      <Lily cx={210} cy={75} r={18} id={id} rotate={-20} />

      {/* Rose gold peonies — the hero blooms (smaller, more delicate) */}
      <Peony cx={70} cy={70} r={32} gradient="peony" id={id} rotate={0} />
      <Peony cx={50} cy={175} r={26} gradient="peony" id={id} rotate={30} />
      <Peony cx={135} cy={130} r={22} gradient="peony" id={id} rotate={-15} />

      {/* Tiny champagne buds */}
      <Peony cx={115} cy={80} r={11} gradient="champagne" id={id} rotate={20} />
      <Peony cx={185} cy={190} r={13} gradient="champagne" id={id} rotate={45} />
      <Peony cx={30} cy={110} r={10} gradient="peony" id={id} rotate={0} />
    </svg>
  )
}

export default FloralCorner
