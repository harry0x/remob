import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import { useMagnetic } from '../lib/useMagnetic'

export default function CtaPanel() {
  const root = useRef(null)
  const panel = useRef(null)
  const heading = useRef(null)
  const button = useMagnetic(12)

  useGSAP(
    () => {
      if (!reducedMotion()) {
        gsap.fromTo(
          panel.current,
          { autoAlpha: 0, y: 60, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: EASE.expo,
            scrollTrigger: { trigger: root.current, start: 'top 78%' },
          }
        )

        // The light band inside the panel drifts as the section passes.
        gsap.to('[data-wave]', {
          xPercent: 14,
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      } else {
        gsap.set(panel.current, { autoAlpha: 1 })
      }

      revealWords(splitWords(heading.current), {
        trigger: root.current,
        stagger: 0.055,
        start: 'top 72%',
      })
      revealIn('[data-cta-copy]', { trigger: root.current, y: 18, delay: 0.2, start: 'top 72%' })
      revealIn('[data-cta-button]', {
        trigger: root.current,
        y: 18,
        scale: 0.94,
        delay: 0.32,
        start: 'top 72%',
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="bg-ink px-6 pb-24 pt-8 md:pb-28">
      <div
        ref={panel}
        className="will-reveal relative mx-auto max-w-[1150px] overflow-hidden rounded-[32px] px-6 py-[68px] text-center md:py-[84px]"
        style={{
          background:
            'linear-gradient(158deg, #2158ff 0%, #1745f2 34%, #0d2ecb 68%, #0a24a8 100%)',
          boxShadow: '0 45px 100px -60px rgba(27,84,245,0.7)',
        }}
      >
        {/* Soft crest sweeping through the panel */}
        <svg
          data-wave
          aria-hidden="true"
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M-120 348C120 300 300 372 560 322 820 272 1000 168 1320 214V460H-120Z"
            fill="#ffffff"
            opacity="0.07"
          />
          <path
            d="M-120 392C160 348 340 410 620 356 900 302 1060 232 1320 268"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 85% at 50% 0%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 62%)',
          }}
        />

        <div className="relative">
          <h2
            ref={heading}
            className="font-display text-[clamp(1.82rem,4.6vw,3.69rem)] font-bold text-white"
          >
            Ready for an upgrade?
          </h2>
          <p
            data-cta-copy
            className="will-reveal mx-auto mt-4 max-w-[30rem] text-balance text-[14px] leading-[1.75] text-blue-100/85"
          >
            Explore our collection of meticulously restored premium devices. Limited stock
            available.
          </p>

          <div className="mt-9 flex justify-center">
            <a
              href="#brands"
              ref={button}
              data-cta-button
              className="will-reveal inline-flex items-center rounded-full bg-white px-9 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_18px_40px_-16px_rgba(0,0,0,0.65)] transition-colors duration-300 hover:bg-blue-50"
            >
              Shop All Devices
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
