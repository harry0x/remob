import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import Footer from '../sections/Footer'
import {
  ArrowRight,
  CertifiedIcon,
  CheckCircleIcon,
  ChipIcon,
  ClockIcon,
  FingerprintIcon,
  ImeiIcon,
  KeypadIcon,
  WarrantyIcon,
} from '../components/Icons'

const DEMO_IMEI = '354892105839201'

const RESULT = [
  { Icon: WarrantyIcon, label: 'Brand', value: 'Apple', tone: 'text-white' },
  { Icon: ChipIcon, label: 'Model', value: 'iPhone 14 Pro', tone: 'text-white' },
  { Icon: CertifiedIcon, label: 'Status', value: 'Clean', tone: 'text-emerald-400' },
  { Icon: ClockIcon, label: 'Warranty', value: 'Active', tone: 'text-white' },
]

const ASSURANCES = [
  {
    Icon: CertifiedIcon,
    tone: 'bg-emerald-400/12 text-emerald-300 ring-emerald-400/20',
    title: 'Authenticity Check',
    copy: 'We cross-reference global databases to ensure the hardware is 100% authentic original manufacturer equipment.',
  },
  {
    Icon: ImeiIcon,
    tone: 'bg-blue-400/12 text-blue-300 ring-blue-400/20',
    title: 'Blacklist Status',
    copy: 'Verifies the device has not been reported lost, stolen, or blocked by major network carriers globally.',
  },
  {
    Icon: ClockIcon,
    tone: 'bg-amber-400/12 text-amber-300 ring-amber-400/20',
    title: 'Warranty Lookup',
    copy: 'Check remaining manufacturer warranty coverage, purchase dates, and support eligibility instantly.',
  },
]

export default function Verify() {
  const root = useRef(null)
  const heading = useRef(null)
  const result = useRef(null)
  const field = useRef(null)
  const [imei, setImei] = useState(DEMO_IMEI)
  const [checked, setChecked] = useState(true)
  const [runs, setRuns] = useState(0)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { trigger: root.current, stagger: 0.05, delay: 0.1 })
      revealIn('[data-verify-copy]', { trigger: root.current, y: 18, delay: 0.25 })
      revealIn('[data-verify-card]', { trigger: root.current, y: 30, delay: 0.3, duration: 1 })
      revealIn('[data-assurance]', { trigger: '[data-assurance-row]', y: 26, stagger: 0.12 })

      if (reducedMotion()) {
        gsap.set('[data-badge]', { autoAlpha: 1 })
        return
      }

      gsap
        .timeline({ delay: 0.15 })
        .fromTo(
          '[data-badge]',
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: EASE.back }
        )
        .to('[data-badge-ring]', {
          scale: 1.35,
          opacity: 0,
          duration: 2.2,
          ease: 'power2.out',
          repeat: -1,
        })
    },
    { scope: root }
  )

  // Replays whenever a check succeeds, so the result reads as freshly fetched.
  useGSAP(
    () => {
      if (!checked || !result.current) return
      if (reducedMotion()) {
        gsap.set([result.current, '[data-result-stat]'], { autoAlpha: 1 })
        return
      }

      gsap
        .timeline()
        .fromTo(
          result.current,
          { autoAlpha: 0, y: 34, clipPath: 'inset(0% 0% 100% 0% round 20px)' },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 0.95,
            ease: EASE.expo,
          }
        )
        .fromTo(
          '[data-result-stat]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: EASE.out },
          '-=0.5'
        )
    },
    { scope: root, dependencies: [checked, runs] }
  )

  const onSubmit = (event) => {
    event.preventDefault()

    if (imei.length !== 15) {
      // Not a valid IMEI — nudge the field rather than showing a result.
      setChecked(false)
      if (!reducedMotion()) {
        gsap.fromTo(
          field.current,
          { x: -9 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' }
        )
      }
      return
    }

    setChecked(true)
    setRuns((n) => n + 1)
  }

  return (
    <div ref={root} className="min-h-screen bg-ink">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(27,84,245,0.5) 0%, rgba(27,84,245,0.12) 42%, rgba(5,7,15,0) 76%)',
        }}
      />

      <main className="relative px-6 pb-24 pt-[150px]">
        <div className="mx-auto max-w-[640px] text-center">
          <span
            data-badge
            className="relative mx-auto grid h-[88px] w-[88px] place-items-center rounded-full bg-brand/15 text-brand-bright ring-1 ring-brand-bright/30"
          >
            <span
              data-badge-ring
              aria-hidden="true"
              className="absolute inset-0 rounded-full ring-1 ring-brand-bright/40"
            />
            <FingerprintIcon className="h-[38px] w-[38px]" />
          </span>

          <h1
            ref={heading}
            className="mt-9 font-display text-[clamp(2.2rem,4.4vw,3.41rem)] font-bold text-white"
          >
            Verify Your IMEI
          </h1>

          <p
            data-verify-copy
            className="will-reveal mx-auto mt-4 max-w-[34rem] text-balance text-[15px] leading-[1.75] text-muted"
          >
            Ensure the authenticity and status of your device before finalizing your purchase.
            Trust, verified.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          data-verify-card
          className="will-reveal mx-auto mt-12 max-w-[600px] rounded-[20px] border border-white/8 bg-card p-7 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] md:p-9"
        >
          <label
            htmlFor="imei"
            className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-faint"
          >
            Enter IMEI Number
          </label>

          <div ref={field} className="relative mt-4">
            <input
              id="imei"
              inputMode="numeric"
              autoComplete="off"
              value={imei}
              onChange={(event) => {
                setImei(event.target.value.replace(/\D/g, '').slice(0, 15))
                setChecked(false)
              }}
              className="w-full rounded-full border border-white/10 bg-[#090d18] py-4 pl-4 pr-14 text-center font-mono text-[15px] tracking-[0.04em] text-white transition-colors duration-300 focus:border-brand-bright/60 focus:outline-none sm:pl-6 sm:pr-16 sm:text-[21.5px] sm:tracking-[0.14em]"
            />
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[12.5px] text-faint">
              {imei.length}/15
            </span>
          </div>

          <p className="mt-3.5 flex items-center justify-center gap-2 text-[13px] text-faint">
            <KeypadIcon className="h-[13px] w-[13px]" />
            Dial
            <code className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[12.5px] text-blue-200">
              *#06#
            </code>
            to find your IMEI
          </p>

          <button
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-brand py-4 text-[15.5px] font-semibold text-white shadow-[0_16px_40px_-16px_rgba(27,84,245,0.95)] transition-colors duration-300 hover:bg-brand-bright"
          >
            Check IMEI
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {checked && (
          <section
            ref={result}
            aria-live="polite"
            className="mx-auto mt-8 max-w-[720px] overflow-hidden rounded-[20px] border border-emerald-400/20 p-7 md:p-8"
            style={{
              background:
                'linear-gradient(150deg, rgba(16,68,52,0.5) 0%, rgba(11,22,28,0.9) 55%, rgba(10,14,22,1) 100%)',
              boxShadow: '0 30px 80px -50px rgba(16,185,129,0.55)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-400 ring-1 ring-emerald-400/30">
                <CheckCircleIcon className="h-[21px] w-[21px]" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-[23.5px] font-bold text-white">Device Verified</h2>
                <p className="mt-0.5 truncate font-mono text-[13px] text-emerald-400">
                  IMEI: {imei}
                </p>
              </div>
            </div>

            <hr className="my-6 border-white/8" />

            <dl className="grid grid-cols-2 gap-y-7 sm:grid-cols-4">
              {RESULT.map(({ Icon, label, value, tone }) => (
                <div key={label} data-result-stat className="will-reveal text-center">
                  <Icon className="mx-auto h-[18px] w-[18px] text-muted" />
                  <dt className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                    {label}
                  </dt>
                  <dd className={`mt-1.5 text-[16px] font-semibold ${tone}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div
          data-assurance-row
          className="container-x mt-24 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {ASSURANCES.map(({ Icon, tone, title, copy }) => (
            <div key={title} data-assurance className="will-reveal">
              <span className={`grid h-11 w-11 place-items-center rounded-full ring-1 ${tone}`}>
                <Icon className="h-[19px] w-[19px]" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-white">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.75] text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
