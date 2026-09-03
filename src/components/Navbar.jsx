import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, reducedMotion } from '../lib/gsap'
import { useCart } from '../lib/cart'
import { NAV_LINKS, activeNavIndex } from '../data/nav'
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './Icons'

/**
 * Persistent chrome: rendered once by <App/>, outside the route-keyed page, so
 * it survives navigation. That matters for more than tidiness — when the bar
 * remounted per route it replayed its drop-in entrance on every click, leaving
 * the links invisible for most of a second while the underline hung there on
 * its own. Living above the router, it animates in once and the underline
 * simply slides between sections.
 *
 * A three-column grid keeps the links optically centred in the viewport
 * regardless of how wide the logo or the action cluster happen to be.
 */
export default function Navbar({ path = '/', search = false }) {
  const root = useRef(null)
  const bar = useRef(null)
  const indicator = useRef(null)
  const items = useRef([])
  const list = useRef(null)
  const panel = useRef(null)
  const badge = useRef(null)
  const settled = useRef(false)
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  const active = activeNavIndex(path)

  // Entrance — once, on first mount only.
  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap
        .timeline({ delay: 0.15 })
        .from(root.current, { y: -80, duration: 1, ease: 'expo.out' })
        .from(
          root.current.querySelectorAll('[data-nav-item]'),
          { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
          '-=0.6'
        )
    },
    { scope: root }
  )

  useGSAP(
    () => {
      if (!badge.current || reducedMotion()) return
      gsap.fromTo(badge.current, { scale: 0.4 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })
    },
    { dependencies: [count] }
  )

  // Underline placement. Re-runs whenever the route changes, animating the
  // bar from wherever it was to the new section.
  useGSAP(
    () => {
      const place = (index, animate = true) => {
        const el = items.current[index]
        const line = indicator.current
        const nav = list.current
        if (!line || !nav) return

        // Measured with rects, not offsetLeft: the entrance tween leaves an
        // inline transform on each <li>, which promotes it to offsetParent and
        // makes every link report offsetLeft 0 — parking the underline under
        // the first item no matter which route is active.
        const to = el
          ? {
              x: el.getBoundingClientRect().left - nav.getBoundingClientRect().left,
              width: el.getBoundingClientRect().width,
            }
          : // No nav item owns this route (home, cart, profile) — retract the bar.
            { width: 0 }
        if (animate && !reducedMotion()) {
          gsap.to(line, { ...to, duration: 0.45, ease: 'power3.out' })
        } else {
          gsap.set(line, to)
        }
      }

      // Snap into place on the very first render, glide on every route after.
      place(active, settled.current)
      settled.current = true

      const cleanups = items.current.map((el, index) => {
        if (!el) return () => {}
        const enter = () => place(index)
        el.addEventListener('mouseenter', enter)
        return () => el.removeEventListener('mouseenter', enter)
      })

      const reset = () => place(active)
      bar.current?.addEventListener('mouseleave', reset)
      const onResize = () => place(active, false)
      window.addEventListener('resize', onResize)

      return () => {
        cleanups.forEach((fn) => fn())
        bar.current?.removeEventListener('mouseleave', reset)
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: root, dependencies: [active] }
  )

  // Condense the bar into a solid, blurred strip once the page scrolls.
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 24
      gsap.to(root.current, {
        backgroundColor: scrolled ? 'rgba(6,9,18,0.85)' : 'rgba(6,9,18,0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(bar.current, {
        paddingTop: scrolled ? 16 : 26,
        paddingBottom: scrolled ? 16 : 26,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      if (!open || !panel.current) return
      if (reducedMotion()) {
        gsap.set(panel.current, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(panel.current.querySelectorAll('[data-mobile-link]'), { autoAlpha: 1, y: 0 })
        return
      }

      gsap
        .timeline()
        .fromTo(
          panel.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'expo.out' }
        )
        .fromTo(
          panel.current.querySelectorAll('[data-mobile-link]'),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.055, ease: 'power3.out' },
          '-=0.35'
        )
    },
    { scope: root, dependencies: [open] }
  )

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      style={{ backgroundColor: 'rgba(6,9,18,0)' }}
    >
      <div
        ref={bar}
        className="container-x grid grid-cols-[auto_1fr_auto] items-center gap-6 py-[26px]"
      >
        <a
          href="/"
          data-nav-item
          className="relative z-10 shrink-0 font-display text-[30px] font-extrabold leading-none tracking-[-0.03em] text-white"
        >
          REMOB
        </a>

        <nav ref={list} className="relative hidden justify-self-center lg:block" aria-label="Primary">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map(({ label, href }, index) => (
              <li key={label} data-nav-item>
                <a
                  href={href}
                  ref={(el) => {
                    items.current[index] = el
                  }}
                  aria-current={index === active ? 'page' : undefined}
                  className={`relative block whitespace-nowrap py-1 text-[16px] font-medium transition-colors duration-300 ${
                    index === active ? 'text-brand-bright' : 'text-muted hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <span
            ref={indicator}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-brand-bright"
            style={{ width: 0 }}
          />
        </nav>

        <div className="relative z-10 flex items-center justify-end gap-5" data-nav-item>
          {search && (
            <form
              onSubmit={(event) => event.preventDefault()}
              className="hidden w-[260px] items-center gap-2.5 rounded-full border border-white/8 bg-white/5 px-4 py-2.5 transition-colors duration-300 focus-within:border-brand-bright/60 xl:flex"
            >
              <SearchIcon className="h-[17px] w-[17px] shrink-0 text-faint" />
              <label htmlFor="device-search" className="sr-only">
                Search devices
              </label>
              <input
                id="device-search"
                type="search"
                placeholder="Search devices..."
                className="min-w-0 flex-1 bg-transparent text-[15.5px] text-white placeholder:text-faint focus:outline-none"
              />
            </form>
          )}

          <a
            href="/cart"
            aria-label={count > 0 ? `Cart, ${count} items` : 'Cart'}
            className="relative text-muted transition-colors duration-300 hover:text-white"
          >
            <CartIcon className="h-[21px] w-[21px]" />
            {count > 0 && (
              <span
                ref={badge}
                className="absolute -right-2 -top-1.5 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white"
              >
                {count}
              </span>
            )}
          </a>
          <a
            href="/profile"
            aria-label="Account"
            className="text-muted transition-colors duration-300 hover:text-white"
          >
            <UserIcon className="h-[21px] w-[21px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="text-white transition-colors duration-300 lg:hidden"
          >
            {open ? (
              <CloseIcon className="h-[23px] w-[23px]" />
            ) : (
              <MenuIcon className="h-[23px] w-[23px]" />
            )}
          </button>
        </div>
      </div>

      </header>

      {/* The sheet is a sibling of the bar, not a child of it. GSAP puts a
          backdrop-filter on the header, and any backdrop-filter makes an
          element the containing block for its fixed descendants — nested
          inside, `inset-0` sized the sheet to the bar (152px tall) instead of
          the viewport, so it never covered the page. At z-40 it sits under the
          bar's own z-50, keeping the logo and close button reachable. */}
      {open && (
        <nav
          ref={panel}
          aria-label="Mobile"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#05070f]/98 px-6 pb-12 pt-[104px] backdrop-blur-xl lg:hidden"
        >
          <ul className="container-x my-auto w-full space-y-1">
            {NAV_LINKS.map(({ label, href }, index) => (
              <li key={label}>
                <a
                  href={href}
                  data-mobile-link
                  onClick={() => setOpen(false)}
                  className={`block py-3 font-display text-[36px] font-bold tracking-[-0.03em] transition-colors duration-300 ${
                    index === active ? 'text-brand-bright' : 'text-white hover:text-brand-bright'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
