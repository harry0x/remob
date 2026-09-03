import { useMemo, useRef, useState } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import { useCart } from '../lib/cart'
import { formatINR } from '../lib/format'
import Footer from '../sections/Footer'
import DeviceMedia from '../components/DeviceMedia'
import { PhoneBackArt, PhoneScreenArt } from '../components/DeviceArt'
import { PRODUCTS, CONDITION_TONES } from '../data/products'
import {
  CartIcon,
  CertifiedIcon,
  CheckCircleIcon,
  ChevronDown,
  ChipIcon,
  ImeiIcon,
  RefreshIcon,
  RupeeIcon,
  StarIcon,
  StorageIcon,
  TagIcon,
} from '../components/Icons'

/**
 * Each catalogue route shows a different slice of the same product list.
 */
const VIEWS = {
  '/shop': { title: 'All Smartphones', filter: () => true },
  '/iphone': { title: 'iPhone', filter: (p) => p.brand === 'Apple' },
  '/android': { title: 'Android', filter: (p) => p.brand !== 'Apple' },
  '/deals': {
    title: 'Deals',
    filter: () => true,
    // Biggest absolute saving first.
    sort: (a, b) => b.mrpValue - b.priceValue - (a.mrpValue - a.priceValue),
  },
}

const FILTERS = [
  { label: 'Brand', Icon: TagIcon },
  { label: 'Price', Icon: RupeeIcon },
  { label: 'Condition', Icon: CertifiedIcon },
  { label: 'Storage', Icon: StorageIcon },
  { label: 'RAM', Icon: ChipIcon },
]

const ART = { back: PhoneBackArt, screen: PhoneScreenArt }

function ProductCard({ product }) {
  const { brand, name, spec, priceValue, mrpValue, emi, rating, condition, art, image } = product
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const onAdd = (event) => {
    add(product.id)
    setAdded(true)
    window.clearTimeout(onAdd.timer)
    onAdd.timer = window.setTimeout(() => setAdded(false), 1400)

    if (!reducedMotion()) {
      gsap.fromTo(
        event.currentTarget,
        { scale: 0.95 },
        { scale: 1, duration: 0.45, ease: 'back.out(3)' }
      )
    }
  }

  return (
    <article
      data-product
      className="will-reveal group relative overflow-hidden rounded-[16px] border border-white/8 bg-[#0c1320] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-bright/35 hover:shadow-[0_28px_60px_-30px_rgba(27,84,245,0.75)]"
    >
      <div className="relative h-[232px] overflow-hidden bg-[#0a0f1a]">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.06]">
          <DeviceMedia
            media={{ src: image, alt: `Refurbished ${name}` }}
            art={ART[art]}
            artClassName="h-[125%] w-auto max-w-none translate-y-[6%]"
          />
        </div>

        <span
          className={`absolute left-3.5 top-3.5 rounded-md px-2.5 py-1 text-[12px] font-semibold ring-1 ${
            CONDITION_TONES[condition.tone]
          }`}
        >
          {condition.label}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#0d1422]/85 text-brand-bright backdrop-blur-sm"
        >
          <ImeiIcon className="h-[15px] w-[15px]" />
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">
            {brand}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-400/12 px-2 py-1 text-[12px] font-semibold text-amber-300 ring-1 ring-amber-400/25">
            <StarIcon className="h-[10px] w-[10px]" />
            {rating}
          </span>
        </div>

        <h3 className="mt-2 font-display text-[22.5px] font-bold text-white">{name}</h3>
        <p className="mt-1.5 text-[14px] text-muted">{spec}</p>

        <div className="mt-4 flex items-baseline gap-2.5">
          <span className="font-display text-[26px] font-bold text-white">
            {formatINR(priceValue)}
          </span>
          <span className="text-[14px] text-faint line-through">{formatINR(mrpValue)}</span>
        </div>

        <span className="mt-3 inline-block rounded-md bg-brand/15 px-2.5 py-1 text-[12.5px] font-medium text-blue-300 ring-1 ring-brand/30">
          {emi}
        </span>

        <button
          type="button"
          onClick={onAdd}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] border py-3 text-[14.5px] font-semibold transition-all duration-300 ${
            added
              ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
              : 'border-white/8 bg-[#121a2b] text-white hover:border-brand-bright/50 hover:bg-brand'
          }`}
        >
          {added ? (
            <>
              <CheckCircleIcon className="h-[15px] w-[15px]" />
              Added to Cart
            </>
          ) : (
            <>
              <CartIcon className="h-[15px] w-[15px]" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default function Shop({ route = '/shop' }) {
  const root = useRef(null)
  const heading = useRef(null)
  const [activeFilter, setActiveFilter] = useState(0)
  const [visible, setVisible] = useState(3)

  const view = VIEWS[route] ?? VIEWS['/shop']
  const catalogue = useMemo(() => {
    const rows = PRODUCTS.filter(view.filter)
    return view.sort ? [...rows].sort(view.sort) : rows
  }, [view])

  useGSAP(
    () => {
      revealWords(splitWords(heading.current), { trigger: root.current, stagger: 0.05 })
      revealIn('[data-shop-meta]', { trigger: root.current, y: 16, delay: 0.15 })
      revealIn('[data-filter-item]', { trigger: root.current, x: -22, y: 0, stagger: 0.07 })
      revealIn('[data-load-more]', { trigger: '[data-load-more]', y: 18 })
    },
    { scope: root }
  )

  // Cards animate on first paint and again for each batch revealed by the
  // Load More button — `visible` drives both.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('[data-product]')
      const fresh = cards.slice(visible - 3, visible)
      if (!fresh.length) return

      if (reducedMotion()) {
        gsap.set(fresh, { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        fresh,
        { autoAlpha: 0, y: 40, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: visible === 3 ? { trigger: '[data-grid]', start: 'top 85%' } : undefined,
        }
      )
    },
    { scope: root, dependencies: [visible] }
  )

  return (
    <div ref={root} className="min-h-screen bg-[#060a14]">

      {/* Blue wash across the very top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[240px]"
        style={{
          background:
            'radial-gradient(75% 100% at 50% 0%, rgba(27,84,245,0.42) 0%, rgba(27,84,245,0.10) 45%, rgba(6,10,20,0) 78%)',
        }}
      />

      <div className="relative flex pt-[96px]">
        <aside className="hidden w-[300px] shrink-0 flex-col border-r border-white/7 px-8 py-10 lg:flex">
          <h2 className="font-display text-[23.5px] font-bold text-white">Filters</h2>
          <p className="mt-1.5 text-[14px] text-muted">Refine your search</p>

          <ul className="mt-8 space-y-2">
            {FILTERS.map(({ label, Icon }, index) => (
              <li key={label} data-filter-item className="will-reveal">
                <button
                  type="button"
                  onClick={() => setActiveFilter(index)}
                  aria-pressed={index === activeFilter}
                  className={`flex w-full items-center gap-3 rounded-full px-5 py-3.5 text-left text-[15px] font-semibold transition-all duration-300 ${
                    index === activeFilter
                      ? 'bg-brand text-white shadow-[0_12px_30px_-12px_rgba(27,84,245,0.95)]'
                      : 'text-muted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-[17px] w-[17px] shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-auto w-full rounded-full bg-brand py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand-bright"
          >
            Apply Filters
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-6 py-10 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1
                ref={heading}
                className="font-display text-[clamp(2.09rem,3.6vw,2.86rem)] font-bold text-white"
              >
                {view.title}
              </h1>
              <p data-shop-meta className="will-reveal mt-2 text-[14.5px] text-muted">
                Showing 1-{Math.min(visible, catalogue.length)} of {catalogue.length} results
              </p>
            </div>

            <div data-shop-meta className="will-reveal relative">
              <label htmlFor="sort" className="sr-only">
                Sort devices
              </label>
              <select
                id="sort"
                className="appearance-none rounded-[10px] border border-white/10 bg-[#0c1320] py-3 pl-5 pr-11 text-[14.5px] font-medium text-white focus:border-brand-bright/60 focus:outline-none"
              >
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          {/* Filters collapse to a scrollable chip row on small screens */}
          <ul className="mt-7 flex gap-2.5 overflow-x-auto pb-2 lg:hidden">
            {FILTERS.map(({ label, Icon }, index) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setActiveFilter(index)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                    index === activeFilter
                      ? 'bg-brand text-white'
                      : 'border border-white/8 text-muted'
                  }`}
                >
                  <Icon className="h-[14px] w-[14px]" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div
            data-grid
            className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {catalogue.slice(0, visible).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visible < catalogue.length && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                data-load-more
                onClick={() => setVisible((n) => Math.min(n + 3, catalogue.length))}
                className="will-reveal group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0c1320] px-8 py-3.5 text-[14.5px] font-semibold text-white transition-all duration-300 hover:border-brand-bright/50 hover:bg-brand"
              >
                <RefreshIcon className="h-[15px] w-[15px] transition-transform duration-500 group-hover:rotate-180" />
                Load More Devices
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
