import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealWords } from '../lib/reveal'
import { useTilt } from '../lib/useTilt'
import { PhoneBackArt, PhoneScreenArt } from '../components/DeviceArt'
import DeviceMedia from '../components/DeviceMedia'
import { ArrowUpRight } from '../components/Icons'
import { MEDIA } from '../data/media'

function BrandCard({ name, blurb, children, className = '' }) {
  const card = useTilt({ max: 5, layerShift: 18 })

  return (
    <article
      ref={card}
      data-brand-card
      className={`will-reveal group relative h-[300px] overflow-hidden rounded-[20px] border border-white/8 md:h-[372px] ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        background:
          'radial-gradient(120% 100% at 50% 0%, #171d2f 0%, #0e1322 46%, #080b14 100%)',
      }}
    >
      <div data-tilt-layer className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 100%, rgba(27,84,245,0.28) 0%, rgba(27,84,245,0) 70%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
        <div>
          <h3 className="font-display text-[24.5px] font-bold text-white md:text-[29px]">{name}</h3>
          <p className="mt-1.5 text-[13.5px] text-muted">{blurb}</p>
        </div>

        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/8 text-white backdrop-blur-sm transition-all duration-400 group-hover:border-brand-bright group-hover:bg-brand group-hover:shadow-[0_10px_30px_-8px_rgba(27,84,245,0.9)]">
          <ArrowUpRight className="h-[17px] w-[17px] transition-transform duration-400 group-hover:rotate-45" />
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/6"
      />
    </article>
  )
}

export default function Brands() {
  const root = useRef(null)
  const heading = useRef(null)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { trigger: root.current, stagger: 0.06 })

      const cards = gsap.utils.toArray('[data-brand-card]')
      if (reducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 60, clipPath: 'inset(12% 0% 0% 0% round 20px)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          duration: 1.2,
          ease: EASE.expo,
          stagger: 0.14,
          scrollTrigger: { trigger: root.current, start: 'top 72%' },
        }
      )
    },
    { scope: root }
  )

  return (
    <section id="brands" ref={root} className="bg-ink py-24 md:py-28">
      <div className="container-x" style={{ perspective: '1200px' }}>
        <h2
          ref={heading}
          className="text-center font-display text-[clamp(2.09rem,4.4vw,3.41rem)] font-bold text-white"
        >
          Shop by Brand
        </h2>

        <div className="mt-11 grid gap-6 md:grid-cols-3 md:gap-7">
          <BrandCard
            name="Apple"
            blurb="Up to 40% off on refurbished iPhones."
            className="md:col-span-2"
          >
            <DeviceMedia
              media={MEDIA.apple}
              art={PhoneBackArt}
              artClassName="h-[118%] w-auto max-w-none translate-y-[8%] md:h-[168%] md:translate-y-[10%]"
            />
          </BrandCard>

          <BrandCard name="Samsung" blurb="Flagship power.">
            <DeviceMedia
              media={MEDIA.samsung}
              art={PhoneScreenArt}
              artClassName="h-[108%] w-auto max-w-none translate-y-[8%] md:h-[130%] md:translate-y-[10%]"
            />
          </BrandCard>
        </div>
      </div>
    </section>
  )
}
