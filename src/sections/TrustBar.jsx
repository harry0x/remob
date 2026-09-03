import { useRef } from 'react'
import { useGSAP } from '../lib/gsap'
import { revealIn } from '../lib/reveal'
import { AppleGlyph } from '../components/Icons'

export default function TrustBar() {
  const root = useRef(null)

  useGSAP(
    () => {
      revealIn('[data-trust-label]', { trigger: root.current, y: 12, duration: 0.7 })
      revealIn('[data-trust-logo]', {
        trigger: root.current,
        y: 16,
        stagger: 0.1,
        delay: 0.12,
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="border-y border-white/6 bg-band py-9"
      aria-label="Brands that partner with Remob"
    >
      <div className="container-x">
        <p
          data-trust-label
          className="will-reveal text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-faint"
        >
          Trusted by the best
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-16 sm:gap-y-5">
          <li
            data-trust-logo
            className="will-reveal flex items-center gap-2 text-[14.5px] font-medium text-faint transition-colors duration-300 hover:text-white/75"
          >
            <AppleGlyph className="h-[17px] w-[17px]" />
            <span>× Remob</span>
          </li>
          <li
            data-trust-logo
            className="will-reveal text-[14.5px] font-medium tracking-[0.02em] text-faint transition-colors duration-300 hover:text-white/75"
          >
            Nothing × Remob
          </li>
          <li
            data-trust-logo
            className="will-reveal text-[14.5px] font-medium text-faint transition-colors duration-300 hover:text-white/75"
          >
            Flipkart
          </li>
        </ul>
      </div>
    </section>
  )
}
