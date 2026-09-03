import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import { Avatar } from '../components/DeviceArt'
import { StarIcon } from '../components/Icons'
import { MEDIA } from '../data/media'

const STATS = [
  { id: 'customers', to: 5, suffix: 'K+', lines: ['Happy repeat', 'customers.'] },
  { id: 'reviews', to: 400, suffix: '+', lines: ['5-Star reviews', 'on Trustpilot.'] },
]

export default function Social() {
  const root = useRef(null)
  const heading = useRef(null)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { trigger: root.current, stagger: 0.05 })
      revealIn('[data-stat]', { trigger: root.current, y: 24, stagger: 0.12, delay: 0.1 })

      // Testimonial card slides in from the outside edge.
      revealIn('[data-quote-card]', {
        trigger: root.current,
        y: 40,
        x: 30,
        duration: 1.1,
        start: 'top 78%',
      })

      if (reducedMotion()) {
        gsap.set(['[data-avatar]', '[data-star]', '[data-quote-text]'], { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        '[data-divider]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: EASE.expo,
          transformOrigin: 'left center',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        }
      )

      // Numbers count up as the block arrives.
      STATS.forEach(({ id, to, suffix }) => {
        const el = root.current.querySelector(`[data-count="${id}"]`)
        if (!el) return
        const counter = { value: 0 }
        gsap.to(counter, {
          value: to,
          duration: 1.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`
          },
        })
      })

      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: '[data-quote-card]', start: 'top 76%' },
        defaults: { ease: EASE.back },
      })
      cardTl
        .fromTo(
          '[data-avatar]',
          { autoAlpha: 0, scale: 0.4, y: 10 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.07 },
          0.25
        )
        .fromTo(
          '[data-quote-text]',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.out },
          '-=0.25'
        )
        .fromTo(
          '[data-star]',
          { autoAlpha: 0, scale: 0.2, rotate: -45 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.06 },
          '-=0.35'
        )
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-24 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full opacity-50 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(27,84,245,0.28) 0%, rgba(27,84,245,0) 70%)',
        }}
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-20">
        <div>
          <h2
            ref={heading}
            className="max-w-[15ch] font-display text-[clamp(2.09rem,4.4vw,3.41rem)] font-bold leading-[1.05] text-white"
          >
            Join the smart upgrade revolution.
          </h2>

          <dl className="mt-10">
            {STATS.map(({ id, suffix, lines }, index) => (
              <div key={id}>
                {index > 0 && (
                  <span
                    data-divider
                    aria-hidden="true"
                    className="my-6 block h-px w-full max-w-[22rem] bg-white/10"
                  />
                )}
                <div data-stat className="will-reveal flex items-baseline gap-5">
                  <dd
                    data-count={id}
                    className="font-display text-[clamp(2.31rem,4vw,3.52rem)] font-extrabold leading-none text-brand-bright"
                  >
                    0{suffix}
                  </dd>
                  <dt className="text-[14px] leading-[1.5] text-muted">
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <figure
          data-quote-card
          className="will-reveal relative overflow-hidden rounded-[20px] border border-white/8 bg-card px-8 py-10 text-center md:px-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-70"
            style={{
              background:
                'radial-gradient(50% 100% at 50% 100%, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0) 70%)',
            }}
          />

          <div className="relative flex items-center justify-center">
            {MEDIA.avatars.map((src, tone) => (
              <span
                key={tone}
                data-avatar
                className="will-reveal -ml-2.5 h-9 w-9 overflow-hidden rounded-full ring-2 ring-card first:ml-0"
              >
                {src ? (
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <Avatar tone={tone} className="h-full w-full" />
                )}
              </span>
            ))}
            <span
              data-avatar
              className="will-reveal -ml-2.5 h-9 w-9 overflow-hidden rounded-full ring-2 ring-card"
            >
              {MEDIA.avatarBadge.src ? (
                <img
                  src={MEDIA.avatarBadge.src}
                  alt={MEDIA.avatarBadge.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="grid h-full w-full place-items-center bg-brand text-[10.5px] font-bold text-white">
                  +400
                </span>
              )}
            </span>
          </div>

          <blockquote
            data-quote-text
            className="will-reveal relative mt-7 text-balance text-[15px] leading-[1.7] text-white"
          >
            "The phone looked brand new. Battery health 100%. Unbeatable value."
          </blockquote>

          <figcaption className="sr-only">Verified Remob customer review</figcaption>

          <div className="relative mt-5 flex items-center justify-center gap-1.5 text-gold">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} data-star className="will-reveal h-[13px] w-[13px]" />
            ))}
          </div>
        </figure>
      </div>
    </section>
  )
}
