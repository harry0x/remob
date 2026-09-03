import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import Footer from '../sections/Footer'
import {
  BoxIcon,
  CertifiedIcon,
  CheckCircleIcon,
  ClockIcon,
  EmiIcon,
  InfoIcon,
  MapPinIcon,
  RefreshIcon,
  RupeeIcon,
  TruckIcon,
} from '../components/Icons'

const FACTS = [
  {
    Icon: ClockIcon,
    title: 'Delivery Timelines',
    points: ['Metro Cities: 2-4 Business Days', 'Tier 2/3 Cities: 4-6 Business Days'],
  },
  {
    Icon: EmiIcon,
    title: 'Shipping Charges',
    points: ['FREE on orders over ₹9,999', '₹99 Standard Shipping below ₹9,999'],
  },
  {
    Icon: BoxIcon,
    title: 'Packaging & Safety',
    points: ['Tamper-proof sealed packaging', 'High-density foam-cushioned protection'],
  },
  {
    Icon: MapPinIcon,
    title: 'How to Track',
    points: ['Real-time SMS updates on dispatch', 'Detailed email tracking links'],
  },
]

const RETURN_STEPS = [
  {
    n: '01',
    title: 'Initiate Request',
    copy: "Go to your orders and click 'Return Item'. Select the reason for return.",
  },
  {
    n: '02',
    title: 'Secure Packaging',
    copy: 'Pack the device with all original accessories in the original Remob box.',
  },
  {
    n: '03',
    title: 'Doorstep Pickup',
    copy: 'Hand over the package to our logistics partner at your scheduled time.',
  },
  {
    n: '04',
    title: 'Check & Refund',
    copy: 'Device is inspected at our facility. Refund is processed to original source.',
  },
]

export default function Delivery() {
  const root = useRef(null)
  const heading = useRef(null)
  const stepsHeading = useRef(null)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { stagger: 0.05, delay: 0.15 })
      revealIn('[data-delivery-sub]', { y: 18, delay: 0.35 })
      revealIn('[data-fact]', { y: 30, stagger: 0.1, trigger: '[data-facts]' })
      revealIn('[data-return-panel]', { y: 36, trigger: '[data-return-panel]', duration: 1.05 })
      revealWords(splitWords(stepsHeading.current), { trigger: '[data-steps]', stagger: 0.05 })
      revealIn('[data-step]', { y: 28, stagger: 0.1, trigger: '[data-steps]', delay: 0.15 })
      revealIn('[data-note]', { y: 22, trigger: '[data-note]' })

      if (reducedMotion()) return

      // The oversized glyph in the return panel drifts as the section passes.
      gsap.to('[data-return-mark]', {
        yPercent: -12,
        rotate: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-return-panel]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen bg-ink">
      <header className="relative isolate overflow-hidden px-6 pb-16 pt-[150px] text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(80% 70% at 50% -6%, #133ad8 0%, #0d2a9e 22%, #07184f 48%, #05070f 82%)',
          }}
        />

        <span className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-[20px] border border-white/12 bg-white/8 backdrop-blur-sm">
          <img src="/cube.png" alt="" className="h-9 w-9 object-contain" />
        </span>

        <h1
          ref={heading}
          className="mt-7 font-display text-[clamp(2.1rem,5vw,3.5rem)] font-bold text-white"
        >
          Delivery &amp; Returns
        </h1>
        <p
          data-delivery-sub
          className="will-reveal mx-auto mt-4 max-w-[34rem] text-balance text-[14.5px] leading-[1.75] text-blue-100/75"
        >
          Fast, secure delivery and hassle-free returns. Your peace of mind is our priority at
          Remob.
        </p>
      </header>

      <main className="container-x pb-24">
        {/* Fact cards */}
        <div data-facts className="grid gap-5 md:grid-cols-2">
          {FACTS.map(({ Icon, title, points }) => (
            <article
              key={title}
              data-fact
              className="will-reveal rounded-[16px] border border-white/8 bg-[#0c1120] p-6 transition-colors duration-400 hover:border-brand-bright/30"
            >
              <h2 className="flex items-center gap-3.5 font-display text-[19px] font-bold text-white">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-brand/15 text-brand-bright ring-1 ring-brand-bright/25">
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                {title}
              </h2>
              <ul className="mt-5 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                    <CheckCircleIcon className="mt-[2px] h-[15px] w-[15px] shrink-0 text-emerald-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Return promise */}
        <section
          data-return-panel
          className="will-reveal relative mt-8 overflow-hidden rounded-[20px] border border-brand-bright/25 p-8 md:p-11"
          style={{
            background:
              'linear-gradient(120deg, #16309c 0%, #12279a 40%, #0d1c72 70%, #0a1550 100%)',
          }}
        >
          <RefreshIcon
            data-return-mark
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-1/2 h-[220px] w-[220px] -translate-y-1/2 text-white/12"
          />

          <div className="relative max-w-[34rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold text-blue-100">
              <CertifiedIcon className="h-[14px] w-[14px]" />
              100% Guaranteed
            </span>

            <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold text-white">
              7-Day Easy Return Policy
            </h2>
            <p className="mt-3.5 text-[14.5px] leading-[1.75] text-blue-100/85">
              Not entirely satisfied? No problem. Return any device within 7 days of delivery for a
              full refund or exchange. No complicated questions asked.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white">
                <TruckIcon className="h-[16px] w-[16px]" />
                Free Return Pickup
              </span>
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white">
                <RupeeIcon className="h-[16px] w-[16px]" />
                Refund in 5-7 Days
              </span>
            </div>
          </div>
        </section>

        {/* How to return */}
        <section data-steps className="mt-20">
          <h2
            ref={stepsHeading}
            className="text-center font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold text-white"
          >
            How to Return
          </h2>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RETURN_STEPS.map(({ n, title, copy }) => (
              <article
                key={n}
                data-step
                className="will-reveal group relative overflow-hidden rounded-[16px] border border-white/8 bg-[#0c1120] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-bright/35"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-2 font-display text-[40px] font-extrabold text-white/6"
                >
                  {n}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand/20 text-[12.5px] font-bold text-brand-bright ring-1 ring-brand-bright/30">
                  {Number(n)}
                </span>
                <h3 className="relative mt-4 text-[15.5px] font-semibold text-white">{title}</h3>
                <p className="relative mt-2 text-[13px] leading-[1.75] text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Important note */}
        <aside
          data-note
          className="will-reveal mx-auto mt-16 max-w-[54rem] rounded-[16px] border border-amber-400/25 bg-amber-400/6 p-6 md:p-7"
        >
          <h2 className="flex items-center gap-3 text-[15px] font-semibold text-amber-300">
            <InfoIcon className="h-[18px] w-[18px] shrink-0" />
            Important Note on Returns
          </h2>
          <p className="mt-3.5 text-[13.5px] leading-[1.8] text-muted">
            To be eligible for a full refund, devices must be returned in the exact condition they
            were received, completely reset (iCloud/Google accounts removed), and accompanied by all
            original accessories and packaging. Devices showing new physical damage or missing
            components may be subject to a restocking fee or rejection of the return request.
          </p>
        </aside>
      </main>

      <Footer />
    </div>
  )
}
