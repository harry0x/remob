/**
 * Product artwork drawn as SVG rather than loaded as photography, so the page
 * ships self-contained and every device renders crisply at any size.
 *
 * The hero module carries a `[data-sheen]` band that the Hero timeline sweeps
 * across the glass, and the brand cards expose `[data-tilt-layer]` groups that
 * the tilt hook drifts for parallax.
 */

/** One camera lens: metal ring, glass, aperture and a specular highlight. */
function Lens({ x, y, r = 92 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="url(#ringGrad)" />
      <circle r={r} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      <circle r={r * 0.87} fill="#080b11" />
      <circle r={r * 0.78} fill="url(#glassGrad)" />
      <circle r={r * 0.78} fill="url(#glassSheen)" />
      <circle r={r * 0.37} fill="#03050a" />
      <circle r={r * 0.37} fill="none" stroke="rgba(122,162,255,0.4)" strokeWidth="1.2" />
      <circle r={r * 0.14} fill="#0a1330" />
      <ellipse
        cx={-r * 0.3}
        cy={-r * 0.34}
        rx={r * 0.3}
        ry={r * 0.17}
        fill="#dbe6ff"
        opacity="0.16"
        transform="rotate(-38)"
      />
      <path
        d={`M ${-r * 0.72} ${r * 0.3} A ${r * 0.78} ${r * 0.78} 0 0 0 ${r * 0.28} ${r * 0.73}`}
        fill="none"
        stroke="rgba(140,180,255,0.28)"
        strokeWidth="2"
      />
    </g>
  )
}

/** Hero visual: an angled pro camera module lit with cold blue studio light. */
export function CameraModuleArt({ className = '' }) {
  return (
    <svg viewBox="0 0 640 640" className={className} role="img" aria-label="Pro camera module of a refurbished flagship phone">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a3242" />
          <stop offset="45%" stopColor="#141a26" />
          <stop offset="100%" stopColor="#05070d" />
        </linearGradient>
        <linearGradient id="plateGrad" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#39404f" />
          <stop offset="40%" stopColor="#1a202c" />
          <stop offset="100%" stopColor="#0a0d15" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="0" y1="-1" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#828d9f" />
          <stop offset="35%" stopColor="#3c4453" />
          <stop offset="100%" stopColor="#12161f" />
        </linearGradient>
        <radialGradient id="glassGrad" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#41506b" />
          <stop offset="55%" stopColor="#111826" />
          <stop offset="100%" stopColor="#03050a" />
        </radialGradient>
        <radialGradient id="glassSheen" cx="0.72" cy="0.8" r="0.6">
          <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="keyLight" cx="0.25" cy="0.12" r="0.75">
          <stop offset="0%" stopColor="#cfe0ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#cfe0ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rimLight" cx="0.9" cy="0.85" r="0.7">
          <stop offset="0%" stopColor="#1b54f5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1b54f5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="plateClip">
          <rect x="72" y="72" width="496" height="496" rx="132" />
        </clipPath>
      </defs>

      {/* Phone back filling the frame, shot close and slightly rotated. */}
      <rect width="640" height="640" fill="url(#bodyGrad)" />
      <rect width="640" height="640" fill="url(#keyLight)" />
      <rect width="640" height="640" fill="url(#rimLight)" />

      <g transform="rotate(-8 320 320)">
        {/* Raised camera plate */}
        <rect x="72" y="72" width="496" height="496" rx="132" fill="url(#plateGrad)" />
        <rect
          x="72"
          y="72"
          width="496"
          height="496"
          rx="132"
          fill="none"
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="2"
        />
        <rect
          x="86"
          y="86"
          width="468"
          height="468"
          rx="122"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
        />

        <Lens x={232} y={230} />
        <Lens x={410} y={230} />
        <Lens x={232} y={408} />

        {/* Flash + LiDAR cluster */}
        <g transform="translate(410 408)">
          <circle r="46" fill="#151b26" stroke="rgba(255,255,255,0.09)" />
          <circle r="26" fill="url(#ringGrad)" />
          <circle r="17" fill="#f2ead6" opacity="0.82" />
          <circle r="17" fill="none" stroke="rgba(255,255,255,0.35)" />
        </g>
        <circle cx="470" cy="486" r="9" fill="#0b0f18" stroke="rgba(255,255,255,0.08)" />

        {/* Moving light band — animated by the hero timeline */}
        <g clipPath="url(#plateClip)">
          <rect
            data-sheen
            x="-360"
            y="-180"
            width="240"
            height="1000"
            fill="url(#sheenGrad)"
            transform="rotate(18 320 320)"
          />
        </g>
      </g>
    </svg>
  )
}

/** Apple card: a titanium phone back lying at an angle. */
export function PhoneBackArt({ className = '' }) {
  return (
    <svg viewBox="0 0 560 400" className={className} role="img" aria-label="Refurbished iPhone shown from the back">
      <defs>
        <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4b5566" />
          <stop offset="38%" stopColor="#1d2431" />
          <stop offset="100%" stopColor="#080b12" />
        </linearGradient>
        <linearGradient id="edgeLight" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="28%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id="floorGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="smallPlate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#39414f" />
          <stop offset="100%" stopColor="#0d1119" />
        </linearGradient>
        <radialGradient id="smallGlass" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#46536c" />
          <stop offset="100%" stopColor="#04060b" />
        </radialGradient>
        <linearGradient id="ringGrad2" x1="0" y1="-1" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#8b94a5" />
          <stop offset="40%" stopColor="#3a4250" />
          <stop offset="100%" stopColor="#11151d" />
        </linearGradient>
      </defs>

      <ellipse cx="290" cy="250" rx="250" ry="130" fill="url(#floorGlow)" />

      <g transform="rotate(-21 280 200)">
        <rect x="118" y="16" width="324" height="392" rx="52" fill="#04060b" opacity="0.55" />
        <rect x="110" y="8" width="324" height="392" rx="52" fill="url(#titanium)" />
        <rect
          x="110"
          y="8"
          width="324"
          height="392"
          rx="52"
          fill="none"
          stroke="url(#edgeLight)"
          strokeWidth="2.5"
        />
        <rect
          x="121"
          y="19"
          width="302"
          height="370"
          rx="43"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
        />

        {/* Camera plate */}
        <g transform="translate(146 44)">
          <rect width="150" height="150" rx="44" fill="url(#smallPlate)" />
          <rect width="150" height="150" rx="44" fill="none" stroke="rgba(255,255,255,0.13)" />
          {[
            [45, 45],
            [105, 45],
            [45, 105],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
              <circle r="27" fill="url(#ringGrad2)" />
              <circle r="21" fill="url(#smallGlass)" />
              <circle r="9" fill="#03050a" />
              <ellipse cx="-8" cy="-9" rx="8" ry="4.5" fill="#dbe6ff" opacity="0.2" transform="rotate(-35)" />
            </g>
          ))}
          <circle cx="105" cy="105" r="14" fill="#1a212d" stroke="rgba(255,255,255,0.1)" />
          <circle cx="105" cy="105" r="7" fill="#f2ead6" opacity="0.75" />
        </g>

        <circle cx="272" cy="330" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      </g>
    </svg>
  )
}

/** Samsung card: a phone held upright with its screen lit. */
export function PhoneScreenArt({ className = '' }) {
  return (
    <svg viewBox="0 0 340 400" className={className} role="img" aria-label="Refurbished Samsung phone held with the screen on">
      <defs>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#59637a" />
          <stop offset="35%" stopColor="#222937" />
          <stop offset="100%" stopColor="#080b12" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#0d1b3f" />
          <stop offset="55%" stopColor="#070d1d" />
          <stop offset="100%" stopColor="#04060d" />
        </linearGradient>
        <radialGradient id="screenGlow" cx="0.5" cy="0.28" r="0.72">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.42" />
          <stop offset="42%" stopColor="#2f6bff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="handGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2131" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="170" cy="160" rx="215" ry="235" fill="url(#screenGlow)" />

      <g transform="rotate(9 170 210)">
        <rect x="72" y="34" width="196" height="368" rx="34" fill="#04060b" opacity="0.6" />
        <rect x="66" y="28" width="196" height="368" rx="34" fill="url(#frameGrad)" />
        <rect x="74" y="36" width="180" height="352" rx="28" fill="url(#screenGrad)" />
        <rect
          x="66"
          y="28"
          width="196"
          height="368"
          rx="34"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.6"
        />

        {/* On-screen UI */}
        <circle cx="164" cy="54" r="4.5" fill="#0a0f1c" stroke="rgba(255,255,255,0.12)" />
        <rect x="92" y="78" width="76" height="9" rx="4.5" fill="#3b82f6" opacity="0.85" />
        <rect x="92" y="95" width="118" height="7" rx="3.5" fill="#ffffff" opacity="0.18" />
        <rect x="92" y="120" width="144" height="62" rx="12" fill="#ffffff" opacity="0.06" />
        <rect x="104" y="134" width="52" height="7" rx="3.5" fill="#ffffff" opacity="0.3" />
        <rect x="104" y="150" width="96" height="6" rx="3" fill="#ffffff" opacity="0.14" />
        <rect x="104" y="163" width="70" height="6" rx="3" fill="#3b82f6" opacity="0.6" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={92 + (i % 2) * 76}
            y={196 + Math.floor(i / 2) * 62}
            width="68"
            height="52"
            rx="12"
            fill="#ffffff"
            opacity={0.05 + i * 0.012}
          />
        ))}
        <rect x="112" y="330" width="104" height="8" rx="4" fill="#ffffff" opacity="0.22" />
      </g>

      {/* Suggestion of a hand holding the device */}
      <path
        d="M84 400c-6-52 14-92 46-104 22-8 44 2 58 20 12 15 16 36 14 84Z"
        fill="url(#handGrad)"
      />
    </svg>
  )
}

/** Small stacked avatar used by the testimonial card. */
export function Avatar({ tone = 0, className = '' }) {
  const tones = [
    ['#3f5470', '#16202f'],
    ['#6a4a53', '#241a20'],
    ['#3d5a4e', '#152019'],
    ['#4b4a72', '#1a1a2a'],
  ]
  const [top, bottom] = tones[tone % tones.length]

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`av${tone}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <clipPath id={`avc${tone}`}>
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <g clipPath={`url(#avc${tone})`}>
        <rect width="48" height="48" fill={`url(#av${tone})`} />
        <circle cx="24" cy="19" r="8.4" fill="#ffffff" opacity="0.5" />
        <circle cx="24" cy="43" r="15" fill="#ffffff" opacity="0.42" />
      </g>
    </svg>
  )
}
