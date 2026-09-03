import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import { useCart } from '../lib/cart'
import { formatINR } from '../lib/format'
import Footer from '../sections/Footer'
import DeviceMedia from '../components/DeviceMedia'
import { PhoneBackArt, PhoneScreenArt } from '../components/DeviceArt'
import { CONDITION_TONES } from '../data/products'
import {
  ArrowRight,
  CartIcon,
  CertifiedIcon,
  ImeiIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from '../components/Icons'

const ART = { back: PhoneBackArt, screen: PhoneScreenArt }

const ASSURANCES = [
  { Icon: CertifiedIcon, label: '86-point certified' },
  { Icon: ImeiIcon, label: '100% IMEI verified' },
  { Icon: RefreshIcon, label: '7-day easy return' },
]

function Stepper({ qty, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0f1a] p-1">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/8 hover:text-white"
      >
        <MinusIcon className="h-[13px] w-[13px]" />
      </button>
      <span className="min-w-[22px] text-center text-[14.5px] font-semibold text-white">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/8 hover:text-white"
      >
        <PlusIcon className="h-[13px] w-[13px]" />
      </button>
    </div>
  )
}

export default function Cart() {
  const root = useRef(null)
  const heading = useRef(null)
  const { items, count, subtotal, savings, setQty, remove, clear } = useCart()

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { stagger: 0.05, delay: 0.1 })
      revealIn('[data-cart-meta]', { y: 16, delay: 0.25 })
      revealIn('[data-cart-line]', { y: 28, stagger: 0.09, delay: 0.3 })
      revealIn('[data-summary]', { y: 30, delay: 0.4, duration: 1 })
      revealIn('[data-empty]', { y: 24, delay: 0.2 })
    },
    { scope: root, dependencies: [count === 0] }
  )

  // Collapse the row out before it leaves, so removal doesn't just snap.
  const onRemove = (id, event) => {
    const row = event.currentTarget.closest('[data-cart-line]')
    if (!row || reducedMotion()) {
      remove(id)
      return
    }

    gsap.to(row, {
      autoAlpha: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.45,
      ease: EASE.out,
      onComplete: () => remove(id),
    })
  }

  return (
    <div ref={root} className="min-h-screen bg-ink">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px]"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(27,84,245,0.4) 0%, rgba(27,84,245,0.08) 45%, rgba(5,7,15,0) 78%)',
        }}
      />

      <main className="container-x relative pb-24 pt-[132px]">
        <h1
          ref={heading}
          className="font-display text-[clamp(2.09rem,4vw,3.08rem)] font-bold text-white"
        >
          Your Cart
        </h1>
        <p data-cart-meta className="will-reveal mt-2 text-[14.5px] text-muted">
          {count === 0
            ? 'No devices yet.'
            : `${count} ${count === 1 ? 'device' : 'devices'} ready to check out.`}
        </p>

        {count === 0 ? (
          <div
            data-empty
            className="will-reveal mx-auto mt-16 max-w-[420px] rounded-[20px] border border-white/8 bg-card px-8 py-14 text-center"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/15 text-brand-bright ring-1 ring-brand-bright/25">
              <CartIcon className="h-[22px] w-[22px]" />
            </span>
            <h2 className="mt-6 font-display text-[21.5px] font-bold text-white">
              Your cart is empty
            </h2>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-muted">
              Every device is certified, IMEI verified and covered by warranty. Find the one that
              fits.
            </p>
            <a
              href="/shop"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-brand-bright"
            >
              Browse Devices
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section aria-label="Cart items" className="space-y-4">
              {items.map(({ product, qty }) => (
                <article
                  key={product.id}
                  data-cart-line
                  className="will-reveal flex flex-col gap-5 overflow-hidden rounded-[16px] border border-white/8 bg-[#0c1320] p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-[12px] bg-[#0a0f1a] sm:w-[150px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DeviceMedia
                        media={{ src: product.image, alt: product.name }}
                        art={ART[product.art]}
                        artClassName="h-[125%] w-auto max-w-none"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-[19px] font-bold text-white">
                        {product.name}
                      </h2>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                          CONDITION_TONES[product.condition.tone]
                        }`}
                      >
                        {product.condition.label}
                      </span>
                    </div>
                    <p className="mt-1 text-[13.5px] text-muted">{product.spec}</p>
                    <p className="mt-0.5 text-[12.5px] text-faint">{product.emi}</p>

                    <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <Stepper qty={qty} onChange={(next) => setQty(product.id, next)} />
                      <button
                        type="button"
                        onClick={(event) => onRemove(product.id, event)}
                        className="inline-flex items-center gap-1.5 text-[13px] text-faint transition-colors duration-300 hover:text-red-400"
                      >
                        <TrashIcon className="h-[13px] w-[13px]" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-display text-[21.5px] font-bold text-white">
                      {formatINR(product.priceValue * qty)}
                    </p>
                    <p className="mt-0.5 text-[13px] text-faint line-through">
                      {formatINR(product.mrpValue * qty)}
                    </p>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clear}
                className="text-[13px] text-faint transition-colors duration-300 hover:text-white"
              >
                Clear cart
              </button>
            </section>

            <aside
              data-summary
              className="will-reveal rounded-[18px] border border-white/8 bg-card p-6 lg:sticky lg:top-[96px]"
            >
              <h2 className="font-display text-[19px] font-bold text-white">Order Summary</h2>

              <dl className="mt-5 space-y-3.5 text-[14px]">
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-medium text-white">{formatINR(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">You save</dt>
                  <dd className="font-medium text-emerald-400">−{formatINR(savings)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Delivery</dt>
                  <dd className="font-medium text-emerald-400">Free</dd>
                </div>
              </dl>

              <hr className="my-5 border-white/8" />

              <div className="flex items-baseline justify-between">
                <span className="text-[14.5px] font-semibold text-white">Total</span>
                <span className="font-display text-[27px] font-bold text-white">
                  {formatINR(subtotal)}
                </span>
              </div>

              <button
                type="button"
                className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-brand py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_-16px_rgba(27,84,245,0.95)] transition-colors duration-300 hover:bg-brand-bright"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="/shop"
                className="mt-3 block text-center text-[13px] text-faint transition-colors duration-300 hover:text-white"
              >
                Continue shopping
              </a>

              <ul className="mt-6 space-y-2.5 border-t border-white/8 pt-5">
                {ASSURANCES.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5 text-[13px] text-muted">
                    <Icon className="h-[14px] w-[14px] shrink-0 text-brand-bright" />
                    {label}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
