import { useRef, useState } from 'react'
import { useGSAP } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import { formatINR } from '../lib/format'
import Footer from '../sections/Footer'
import { MEDIA } from '../data/media'
import { PRODUCTS } from '../data/products'
import {
  BellIcon,
  CertifiedIcon,
  CheckCircleIcon,
  ChevronDown,
  LogOutIcon,
  MapPinIcon,
  PencilIcon,
} from '../components/Icons'

const STATS = [
  { value: '12', label: 'Orders' },
  { value: '4', label: 'Saved' },
  { value: '7', label: 'Reviews' },
  { value: '2022', label: 'Member since' },
]

/** The blue line-art assets, used as quick-action glyphs. */
const ACTIONS = [
  { src: '/cube.png', label: 'My Orders', note: '2 in transit' },
  { src: '/location.png', label: 'Track Order', note: 'Live location' },
  { src: '/round_arrow.png', label: 'Order History', note: 'Past 12 orders' },
]

/**
 * The full-bleed neon tiles. `policy.png` is a small square with its own tile
 * background, so it is centred rather than cropped to fill like the two large
 * 1024px renders.
 */
const SUPPORT = [
  {
    src: '/delivery.png',
    href: '/delivery',
    title: 'Shipping',
    copy: 'Free insured delivery on every certified device.',
    fit: 'cover',
  },
  {
    src: '/setting.png',
    href: '/warranty-claim',
    title: 'Service & Repair',
    copy: 'Book a technician for any covered fault.',
    fit: 'cover',
  },
  {
    src: '/policy.png',
    href: '/returns',
    title: 'Warranty Policy',
    copy: 'Up to 12 months, transferable on resale.',
    fit: 'contain',
  },
]

const ORDERS = [
  { id: 'RMB-48213', product: PRODUCTS[0], date: '18 Aug 2024', status: 'Delivered', tone: 'green' },
  { id: 'RMB-47980', product: PRODUCTS[1], date: '02 Aug 2024', status: 'In transit', tone: 'blue' },
  { id: 'RMB-47512', product: PRODUCTS[2], date: '21 Jul 2024', status: 'Delivered', tone: 'green' },
]

const STATUS_TONES = {
  green: 'bg-emerald-400/12 text-emerald-300 ring-emerald-400/25',
  blue: 'bg-blue-400/12 text-blue-300 ring-blue-400/25',
}

const SETTINGS = [
  { Icon: BellIcon, label: 'Notifications', note: 'Order updates and price drops' },
  { Icon: MapPinIcon, label: 'Addresses', note: '2 saved delivery addresses' },
  { Icon: CertifiedIcon, label: 'Security', note: 'Password and sign-in devices' },
]

export default function Profile() {
  const root = useRef(null)
  const heading = useRef(null)
  const [notify, setNotify] = useState(true)

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { stagger: 0.05, delay: 0.15 })
      revealIn('[data-identity]', { y: 24, delay: 0.2 })
      revealIn('[data-stat-cell]', { y: 20, stagger: 0.08, delay: 0.3 })
      revealIn('[data-action]', { y: 26, stagger: 0.1, trigger: '[data-actions]' })
      revealIn('[data-order]', { y: 24, stagger: 0.1, trigger: '[data-orders]' })
      revealIn('[data-support]', { y: 26, stagger: 0.1, trigger: '[data-support-row]' })
      revealIn('[data-setting]', { y: 18, stagger: 0.08, trigger: '[data-settings]' })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen bg-ink">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px]"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(27,84,245,0.42) 0%, rgba(27,84,245,0.08) 45%, rgba(5,7,15,0) 78%)',
        }}
      />

      <main className="container-x relative pb-24 pt-[132px]">
        <h1 ref={heading} className="sr-only">
          Your Remob account
        </h1>

        {/* Identity */}
        <section
          data-identity
          className="will-reveal rounded-[20px] border border-white/8 bg-card p-6 md:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full ring-2 ring-brand-bright/40">
              <img
                src={MEDIA.avatars[0]}
                alt=""
                loading="eager"
                className="h-full w-full object-cover"
              />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-display text-[26px] font-bold text-white">Arjun Mehta</h2>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/12 px-2 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/25">
                  <CheckCircleIcon className="h-[11px] w-[11px]" />
                  Verified
                </span>
              </div>
              <p className="mt-1.5 text-[14px] text-muted">arjun.mehta@example.com</p>
              <p className="mt-0.5 text-[13px] text-faint">Remob Plus member · Bengaluru, India</p>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              <PencilIcon className="h-[14px] w-[14px]" />
              Edit Profile
            </button>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-white/8 pt-6 md:grid-cols-4">
            {STATS.map(({ value, label }, index) => (
              <div
                key={label}
                data-stat-cell
                className={`will-reveal px-2 text-center ${
                  index > 0 ? 'md:border-l md:border-white/8' : ''
                }`}
              >
                <dd className="font-display text-[24.5px] font-bold text-white">{value}</dd>
                <dt className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-faint">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Quick actions */}
        <div data-actions className="mt-6 grid gap-5 sm:grid-cols-3">
          {ACTIONS.map(({ src, label, note }) => (
            <button
              key={label}
              type="button"
              data-action
              className="will-reveal group flex items-center gap-4 rounded-[16px] border border-white/8 bg-[#0c1120] p-5 text-left transition-all duration-400 hover:-translate-y-1 hover:border-brand-bright/35 hover:shadow-[0_24px_50px_-30px_rgba(27,84,245,0.8)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-white/8 bg-[#0a0f1a] transition-colors duration-400 group-hover:bg-brand/12">
                <img src={src} alt="" loading="lazy" className="h-6 w-6 object-contain" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15.5px] font-semibold text-white">{label}</span>
                <span className="mt-0.5 block text-[13px] text-faint">{note}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Orders */}
        <section data-orders className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[22.5px] font-bold text-white">Recent Orders</h2>
            <a
              href="/shop"
              className="text-[13px] text-faint transition-colors duration-300 hover:text-white"
            >
              View all
            </a>
          </div>

          <ul className="mt-5 space-y-3.5">
            {ORDERS.map(({ id, product, date, status, tone }) => (
              <li
                key={id}
                data-order
                className="will-reveal flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[14px] border border-white/8 bg-[#0c1320] p-4"
              >
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-[#0a0f1a]">
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[15.5px] font-semibold text-white">{product.name}</p>
                  <p className="mt-0.5 text-[13px] text-faint">
                    {id} · {date}
                  </p>
                </div>

                {/* Full width on phones so it wraps to its own line — otherwise
                    it squeezes the title down to one word per line. */}
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                  <span
                    className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ring-1 ${STATUS_TONES[tone]}`}
                  >
                    {status}
                  </span>

                  <p className="font-display text-[18px] font-bold text-white">
                    {formatINR(product.priceValue)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Support tiles */}
        <section data-support-row className="mt-12">
          <h2 className="font-display text-[22.5px] font-bold text-white">Support</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {SUPPORT.map(({ src, href, title, copy, fit }) => (
              <a
                key={title}
                href={href}
                data-support
                className="will-reveal group overflow-hidden rounded-[16px] border border-white/8 bg-[#0c1120] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-bright/35"
              >
                <div className="h-[132px] overflow-hidden bg-[#0a0f1a]">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                      fit === 'contain' ? 'object-contain py-3' : 'object-cover'
                    }`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-muted">{copy}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section data-settings className="mt-12">
          <h2 className="font-display text-[22.5px] font-bold text-white">Account Settings</h2>

          <ul className="mt-5 divide-y divide-white/8 overflow-hidden rounded-[16px] border border-white/8 bg-[#0c1320]">
            {SETTINGS.map(({ Icon, label, note }) => (
              <li
                key={label}
                data-setting
                className="will-reveal flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-white/3"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-white/8 bg-[#0a0f1a] text-brand-bright">
                  <Icon className="h-[17px] w-[17px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-[13px] text-faint">{note}</p>
                </div>

                {label === 'Notifications' ? (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notify}
                    aria-label="Toggle notifications"
                    onClick={() => setNotify((value) => !value)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                      notify ? 'bg-brand' : 'bg-white/12'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                        notify ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-faint" />
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[14px] font-semibold text-muted transition-colors duration-300 hover:border-red-400/40 hover:text-red-400"
          >
            <LogOutIcon className="h-[15px] w-[15px]" />
            Sign out
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
