import { useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import Footer from '../sections/Footer'
import {
  BanIcon,
  ListChecksIcon,
  RefreshIcon,
  SupportIcon,
  UploadIcon,
  WalletIcon,
} from '../components/Icons'

const SECTIONS = [
  {
    id: 'eligibility',
    nav: 'Eligibility',
    title: 'Eligibility for Returns',
    Icon: ListChecksIcon,
    intro:
      'Remob offers a comprehensive 7-day return policy on all refurbished smartphones, ensuring your complete satisfaction. To be eligible for a return, the following conditions must be met:',
    points: [
      'The device must be returned within 7 calendar days of the delivery date.',
      'The item must be in the exact same condition as when it was received, with no new physical damage (scratches, dents, or water damage).',
      'All original accessories, chargers, packaging, and warranty cards provided by Remob must be included in the return package.',
      "The device's IMEI must match our records exactly. The 100% IMEI Verification seal must not be tampered with.",
    ],
  },
  {
    id: 'non-returnable',
    nav: 'Non-Returnable Items',
    title: 'Non-Returnable Items',
    Icon: BanIcon,
    intro:
      'Certain situations and items are exempt from being returned. Returns will not be accepted under the following circumstances:',
    points: [
      'Devices that have been rooted, jailbroken, or possess modified software/firmware.',
      'Items displaying accidental damage post-delivery, including liquid damage or screen cracks.',
      'Devices locked with personal accounts (e.g., iCloud, Google Account) that have not been removed prior to return.',
    ],
  },
  {
    id: 'refund-process',
    nav: 'Refund Process',
    title: 'Refund Process',
    Icon: RefreshIcon,
    intro:
      'Once your return reaches our facility, our technicians begin a formal inspection against the condition grade the device shipped with.',
    points: [
      'Inspection is completed within 48 hours of the package arriving at our facility.',
      'You receive an email and SMS confirming the outcome of the inspection.',
      'Approved refunds are initiated the same day the inspection passes.',
      'Devices failing inspection are returned to you free of charge, with a written report.',
    ],
  },
  {
    id: 'refund-modes',
    nav: 'Refund Modes',
    title: 'Refund Modes',
    Icon: WalletIcon,
    intro:
      'Refunds are always issued to the original payment source. Processing times depend on your bank or provider.',
    points: [
      'UPI and wallet payments: 1-3 business days.',
      'Debit and credit cards: 5-7 business days after initiation.',
      'EMI purchases: the financing agreement is cancelled and any interest already levied is reversed by the lender.',
      'Cash on delivery: refunded by bank transfer to an account you nominate.',
    ],
  },
  {
    id: 'how-to-request',
    nav: 'How to Request',
    title: 'How to Request a Return',
    Icon: UploadIcon,
    intro:
      'Returns are raised from your account — no phone call required. The whole request takes about two minutes.',
    points: [
      'Open Orders from your profile and select the device you want to return.',
      "Choose Return Item and pick a reason. Add photographs if the device arrived damaged.",
      'Pick a pickup slot. Our logistics partner collects from your doorstep at no cost.',
      'Keep the original box sealed and ready — the courier will not accept loose devices.',
    ],
  },
  {
    id: 'disputes',
    nav: 'Contact for Disputes',
    title: 'Contact for Disputes',
    Icon: SupportIcon,
    intro:
      'If you disagree with an inspection outcome, our escalation desk will review the case independently.',
    points: [
      'Email disputes@remob.example with your order ID and inspection report reference.',
      'An escalation manager responds within one business day.',
      'Unresolved cases can be referred to our grievance officer, who replies within 15 days as required by law.',
    ],
  },
]

export default function ReturnPolicy() {
  const root = useRef(null)
  const heading = useRef(null)
  const [current, setCurrent] = useState(SECTIONS[0].id)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { stagger: 0.05, delay: 0.15 })
      revealIn('[data-policy-meta]', { y: 16, delay: 0.35 })
      revealIn('[data-contents]', { y: 24, delay: 0.3 })
      revealIn('[data-section]', { y: 30, stagger: 0.12, delay: 0.35 })

      if (reducedMotion()) return

      // Highlight the contents entry for whichever section is in view.
      SECTIONS.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => self.isActive && setCurrent(id),
        })
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen bg-ink">
      <header className="relative isolate overflow-hidden px-6 pb-20 pt-[150px] text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(80% 70% at 50% -4%, #1c50f7 0%, #1237d6 18%, #0a2088 40%, #050f3f 64%, #05070f 88%)',
          }}
        />

        <span className="mx-auto grid h-[76px] w-[76px] place-items-center rounded-[22px] border border-white/15 bg-white/10 backdrop-blur-sm">
          <img src="/policy.png" alt="" className="h-11 w-11 object-contain" />
        </span>

        <h1
          ref={heading}
          className="mt-8 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold text-white"
        >
          Return &amp; Refund Policy
        </h1>
        <p
          data-policy-meta
          className="will-reveal mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-100/70"
        >
          Last updated: September 2026
        </p>
      </header>

      <main className="container-x pb-24">
        <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav
            data-contents
            aria-label="Contents"
            className="will-reveal rounded-[18px] border border-white/8 bg-card p-6 lg:sticky lg:top-[110px]"
          >
            <h2 className="font-display text-[18px] font-bold text-white">Contents</h2>
            <ul className="mt-5 space-y-3.5">
              {SECTIONS.map(({ id, nav }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current === id ? 'true' : undefined}
                    className={`flex items-center gap-2.5 text-[14px] transition-colors duration-300 ${
                      current === id ? 'text-brand-bright' : 'text-muted hover:text-white'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                        current === id ? 'bg-brand-bright' : 'bg-white/25'
                      }`}
                    />
                    {nav}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-[18px] border border-white/8 bg-[#0a0e1a] px-6 py-4 md:px-10">
            {SECTIONS.map(({ id, title, Icon, intro, points }, index) => (
              <section
                key={id}
                id={id}
                data-section
                className="will-reveal scroll-mt-[110px] border-b border-white/8 py-10 last:border-b-0"
              >
                <h2 className="flex items-center gap-3.5 font-display text-[clamp(1.2rem,2.4vw,1.6rem)] font-bold text-white">
                  <Icon className="h-[22px] w-[22px] shrink-0 text-brand-bright" />
                  {index + 1}. {title}
                </h2>

                <p className="mt-5 text-[14.5px] leading-[1.8] text-muted">{intro}</p>

                <ul className="mt-5 space-y-3.5">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-[9px] w-[9px] shrink-0 rounded-full border-[1.5px] border-brand-bright"
                      />
                      <span className="text-[14.5px] leading-[1.8] text-muted">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
