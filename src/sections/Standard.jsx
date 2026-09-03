import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import {
  CertifiedIcon,
  EmiIcon,
  ImeiIcon,
  ReturnsIcon,
  WarrantyIcon,
} from '../components/Icons'

const PILLARS = [
  { Icon: CertifiedIcon, title: 'Certified', note: '86-point check' },
  { Icon: ImeiIcon, title: 'IMEI Verified', note: '100% Authentic' },
  { Icon: EmiIcon, title: 'Easy EMI', note: 'From ₹599/mo' },
  { Icon: WarrantyIcon, title: 'Warranty', note: 'Up to 12 Months' },
  { Icon: ReturnsIcon, title: 'Returns', note: '7-Day Easy Return' },
]

export default function Standard() {
  const root = useRef(null)
  const heading = useRef(null)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { trigger: root.current, stagger: 0.055 })
      revealIn('[data-standard-copy]', { trigger: root.current, y: 18, delay: 0.15 })

      if (reducedMotion()) {
        gsap.set('[data-pillar]', { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        '[data-pillar]',
        { autoAlpha: 0, y: 26, scale: 0.86 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: EASE.back,
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-pillar-row]', start: 'top 82%' },
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      id="standard"
      ref={root}
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          'linear-gradient(180deg, #05070f 0%, #090d1a 22%, #0a0e1c 72%, #05070f 100%)',
      }}
    >
      <div className="container-x">
        <h2
          ref={heading}
          className="text-center font-display text-[clamp(2.09rem,4.4vw,3.41rem)] font-bold text-white"
        >
          The Remob Standard
        </h2>
        <p
          data-standard-copy
          className="will-reveal mx-auto mt-4 max-w-[33rem] text-balance text-center text-[14px] leading-[1.75] text-muted"
        >
          We don't just sell phones; we restore trust. Every device undergoes rigorous checks to
          ensure a premium experience.
        </p>

        <div data-pillar-row className="relative mt-16">
          <ul className="relative grid grid-cols-2 gap-y-11 sm:grid-cols-3 lg:grid-cols-5">
            {PILLARS.map(({ Icon, title, note }) => (
              <li
                key={title}
                data-pillar
                className="will-reveal group flex flex-col items-center text-center"
              >
                <span className="grid h-[52px] w-[52px] place-items-center rounded-[15px] border border-white/8 bg-card text-brand-bright shadow-[0_18px_34px_-22px_rgba(0,0,0,1)] transition-all duration-400 group-hover:-translate-y-1.5 group-hover:border-brand-bright/45 group-hover:bg-brand/12 group-hover:shadow-[0_18px_34px_-16px_rgba(27,84,245,0.7)]">
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <h3 className="mt-4 text-[14px] font-semibold text-white">{title}</h3>
                <p className="mt-1 text-[12px] text-faint">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
