import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import Footer from '../sections/Footer'
import {
  ArrowLeft,
  ArrowRight,
  CertifiedIcon,
  CheckCircleIcon,
  ClockIcon,
  MailIcon,
  QrIcon,
  TruckIcon,
  UploadIcon,
  XCircleIcon,
} from '../components/Icons'

const STEPS = ['Order Info', 'Issue Type', 'Evidence', 'Description', 'Review']

const ISSUES = [
  { id: 'battery', label: 'Battery drain', note: 'Health below 80% or rapid discharge' },
  { id: 'display', label: 'Display fault', note: 'Dead pixels, flicker or touch failure' },
  { id: 'camera', label: 'Camera hardware', note: 'Blur, focus failure or black frames' },
  { id: 'software', label: 'Software glitch', note: 'Boot loops, freezes or crashes' },
]

const COVERED = [
  'Manufacturing Defects',
  'Battery (above 80% health)',
  'Software Glitches',
  'Camera Hardware',
]

const NOT_COVERED = ['Physical/Liquid Damage', 'Unauthorized Modifications', 'Normal Cosmetic Wear']

function Field({ id, label, placeholder, Icon, type = 'text', hint, value, onChange }) {
  return (
    <div className="mt-6 first:mt-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] font-medium text-white">
          {label}
        </label>
        {hint && (
          <button type="button" className="text-[13px] text-brand-bright hover:underline">
            {hint}
          </button>
        )}
      </div>
      <div className="relative mt-2.5">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-faint" />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-[14px] border border-white/10 bg-[#090d18] py-3.5 text-[14.5px] text-white placeholder:text-faint focus:border-brand-bright/60 focus:outline-none ${
            Icon ? 'pl-11 pr-4' : 'px-4'
          }`}
        />
      </div>
    </div>
  )
}

export default function WarrantyClaim() {
  const root = useRef(null)
  const heading = useRef(null)
  const stepBody = useRef(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ order: '', imei: '', email: '', issue: '', notes: '' })

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { stagger: 0.05, delay: 0.15 })
      revealIn('[data-claim-sub]', { y: 18, delay: 0.35 })
      revealIn('[data-claim-card]', { y: 30, delay: 0.3, duration: 1 })
      revealIn('[data-coverage]', { y: 30, x: 20, delay: 0.42, duration: 1 })
    },
    { scope: root }
  )

  // Each step slides in, so moving through the wizard reads as progress.
  useGSAP(
    () => {
      if (!stepBody.current || reducedMotion()) return
      gsap.fromTo(
        stepBody.current,
        { autoAlpha: 0, x: 26 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: EASE.out }
      )
    },
    { dependencies: [step] }
  )

  return (
    <div ref={root} className="min-h-screen bg-ink">
      <header className="relative isolate overflow-hidden px-6 pb-16 pt-[140px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(90% 80% at 30% -10%, #1c50f7 0%, #1237d6 18%, #0a2088 42%, #050f3f 66%, #05070f 88%)',
          }}
        />
        <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-[86px] w-[86px] shrink-0 place-items-center rounded-[22px] border border-white/15 bg-white/8 backdrop-blur-sm">
            <img src="/setting.png" alt="" className="h-14 w-14 rounded-[14px] object-cover" />
          </span>
          <div>
            <h1
              ref={heading}
              className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold text-white"
            >
              File a Warranty Claim
            </h1>
            <p data-claim-sub className="will-reveal mt-2.5 text-[15px] text-blue-100/80">
              Redefining trust with our 1-year comprehensive warranty support.
            </p>
          </div>
        </div>
      </header>

      <main className="container-x pb-24">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section
            data-claim-card
            className="will-reveal rounded-[20px] border border-white/8 bg-[#0a0e1a] p-6 md:p-9"
          >
            {/* Progress */}
            <ol className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
              {STEPS.map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => index <= step && setStep(index)}
                    disabled={index > step}
                    className={`block w-full text-left text-[13px] font-semibold transition-colors duration-300 ${
                      index === step
                        ? 'text-brand-bright'
                        : index < step
                          ? 'text-white hover:text-brand-bright'
                          : 'cursor-default text-faint'
                    }`}
                  >
                    {index === 0 ? label.toUpperCase() : label}
                  </button>
                  <span
                    aria-hidden="true"
                    className={`mt-2.5 block h-[5px] rounded-full transition-colors duration-500 ${
                      index <= step ? 'bg-brand' : 'bg-white/10'
                    }`}
                  />
                </li>
              ))}
            </ol>

            <p className="mt-4 text-right text-[13px] text-faint">
              Step {step + 1} of {STEPS.length}
            </p>

            <div ref={stepBody} className="mt-6 min-h-[320px]">
              {step === 0 && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-white">
                    Let&rsquo;s find your order
                  </h2>
                  <div className="mt-7">
                    <Field
                      id="order"
                      label="Order ID"
                      placeholder="e.g. REM-12345678"
                      value={form.order}
                      onChange={set('order')}
                    />
                    <Field
                      id="imei"
                      label="IMEI Number (15 digits)"
                      placeholder="351234567890123"
                      Icon={QrIcon}
                      hint="Where to find this?"
                      value={form.imei}
                      onChange={(v) => set('imei')(v.replace(/\D/g, '').slice(0, 15))}
                    />
                    <Field
                      id="email"
                      label="Email Address used for purchase"
                      placeholder="john.doe@example.com"
                      type="email"
                      Icon={MailIcon}
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-white">
                    What went wrong?
                  </h2>
                  <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                    {ISSUES.map(({ id, label, note }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => set('issue')(id)}
                        aria-pressed={form.issue === id}
                        className={`rounded-[14px] border p-5 text-left transition-all duration-300 ${
                          form.issue === id
                            ? 'border-brand-bright bg-brand/12'
                            : 'border-white/10 bg-[#090d18] hover:border-white/25'
                        }`}
                      >
                        <span className="block text-[15px] font-semibold text-white">{label}</span>
                        <span className="mt-1 block text-[13px] text-faint">{note}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-white">Add evidence</h2>
                  <p className="mt-3 text-[14px] text-muted">
                    Photos or a short video of the fault help our technicians triage faster.
                  </p>
                  <div className="mt-6 grid place-items-center rounded-[16px] border border-dashed border-white/15 bg-[#090d18] px-6 py-14 text-center">
                    <UploadIcon className="h-8 w-8 text-brand-bright" />
                    <p className="mt-4 text-[14.5px] font-semibold text-white">
                      Drop files here or browse
                    </p>
                    <p className="mt-1.5 text-[13px] text-faint">
                      JPG, PNG or MP4 · up to 25 MB per file
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-white">
                    Describe the issue
                  </h2>
                  <label htmlFor="notes" className="mt-6 block text-[14px] font-medium text-white">
                    When did it start, and how often does it happen?
                  </label>
                  <textarea
                    id="notes"
                    rows={7}
                    value={form.notes}
                    onChange={(event) => set('notes')(event.target.value)}
                    placeholder="The battery started draining from 100% to 20% within three hours, beginning about a week after delivery…"
                    className="mt-2.5 w-full resize-none rounded-[14px] border border-white/10 bg-[#090d18] p-4 text-[14.5px] leading-[1.7] text-white placeholder:text-faint focus:border-brand-bright/60 focus:outline-none"
                  />
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-white">
                    Review your claim
                  </h2>
                  <dl className="mt-7 divide-y divide-white/8 overflow-hidden rounded-[14px] border border-white/10">
                    {[
                      ['Order ID', form.order || '—'],
                      ['IMEI', form.imei || '—'],
                      ['Email', form.email || '—'],
                      ['Issue', ISSUES.find((i) => i.id === form.issue)?.label ?? '—'],
                      ['Description', form.notes ? `${form.notes.slice(0, 60)}…` : '—'],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex flex-wrap items-center justify-between gap-3 bg-[#090d18] px-5 py-4"
                      >
                        <dt className="text-[13.5px] text-faint">{label}</dt>
                        <dd className="max-w-full truncate text-[14.5px] font-medium text-white">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    type="button"
                    className="mt-7 w-full rounded-full bg-brand py-4 text-[15px] font-semibold text-white shadow-[0_16px_40px_-16px_rgba(27,84,245,0.95)] transition-colors duration-300 hover:bg-brand-bright"
                  >
                    Submit Claim
                  </button>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-7">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/12 px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === STEPS.length - 1}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-3 text-[14px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(27,84,245,0.95)] transition-colors duration-300 hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-35"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </section>

          {/* Coverage sidebar */}
          <aside
            data-coverage
            className="will-reveal rounded-[20px] border border-white/8 bg-[#0a0e1a] p-6 md:p-7 lg:sticky lg:top-[110px]"
          >
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-bright ring-1 ring-brand-bright/30">
                <CertifiedIcon className="h-[20px] w-[20px]" />
              </span>
              <h2 className="font-display text-[19px] font-bold text-white">Warranty Coverage</h2>
            </div>

            <h3 className="mt-7 border-b border-white/8 pb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              What&rsquo;s covered
            </h3>
            <ul className="mt-4 space-y-3">
              {COVERED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-muted">
                  <CheckCircleIcon className="h-[17px] w-[17px] shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-7 border-b border-white/8 pb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
              What&rsquo;s not covered
            </h3>
            <ul className="mt-4 space-y-3">
              {NOT_COVERED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-muted">
                  <XCircleIcon className="h-[17px] w-[17px] shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-3 rounded-[14px] border border-white/8 bg-[#090d18] p-5">
              <p className="flex items-center gap-3 text-[14px] font-semibold text-brand-bright">
                <TruckIcon className="h-[18px] w-[18px] shrink-0" />
                Free 2-way pickup &amp; drop-off
              </p>
              <p className="flex items-center gap-3 text-[13.5px] text-muted">
                <ClockIcon className="h-[17px] w-[17px] shrink-0 text-faint" />
                Average turnaround: 3-5 business days
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
