import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { useMagnetic } from '../lib/useMagnetic'
import { CameraModuleArt } from '../components/DeviceArt'
import DeviceMedia from '../components/DeviceMedia'
import { ArrowRight } from '../components/Icons'
import { MEDIA } from '../data/media'

export default function Hero() {
  const root = useRef(null)
  const heading = useRef(null)
  const visual = useRef(null)
  const glow = useRef(null)
  const shopRef = useMagnetic(10)

  useGSAP(
    () => {
      const words = gsap.utils
        .toArray(heading.current.querySelectorAll('[data-line]'))
        .flatMap((line) => splitWords(line))

      if (reducedMotion()) {
        gsap.set(
          ['[data-hero-badge]', '[data-hero-copy]', '[data-hero-cta]', words, visual.current],
          { autoAlpha: 1, y: 0 }
        )
        return
      }

      // Opening sequence — the headline rises out of its own baseline while the
      // product card unmasks from the bottom up beside it.
      const tl = gsap.timeline({ delay: 0.35, defaults: { ease: EASE.expo } })

      tl.fromTo(
        '[data-hero-badge]',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.15, stagger: 0.045 },
          '-=0.45'
        )
        .fromTo(
          '[data-hero-copy]',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE.out },
          '-=0.75'
        )
        .fromTo(
          '[data-hero-cta]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: EASE.out },
          '-=0.65'
        )
        .fromTo(
          visual.current,
          { autoAlpha: 0, scale: 1.14, clipPath: 'inset(0% 0% 100% 0%)' },
          { autoAlpha: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 },
          0.5
        )

      // Light band travelling across the lens glass, forever. Only the drawn
      // artwork carries this band — a photograph brings its own highlights.
      if (root.current.querySelector('[data-sheen]')) {
        gsap.fromTo(
          '[data-sheen]',
          { x: -260 },
          { x: 900, duration: 2.6, ease: 'power2.inOut', repeat: -1, repeatDelay: 2.6, delay: 1.8 }
        )
      }

      // Idle float so the card never sits perfectly still.
      gsap.to(visual.current, {
        y: -14,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })

      // Depth on scroll: copy and card leave at different rates.
      gsap.to('[data-hero-text]', {
        y: 70,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
      // Parallax rides an outer wrapper, never the card itself. A target shared
      // by an immediateRender fromTo and a ScrollTrigger gets reverted to its
      // start values whenever ScrollTrigger refreshes (which a slow-loading
      // hero photo delays until after the intro has finished) — and then there
      // is nothing left to render it forward again.
      gsap.to('[data-hero-visual]', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })

      // A soft light that trails the pointer across the hero.
      const moveX = gsap.quickTo(glow.current, 'x', { duration: 1.1, ease: 'power3.out' })
      const moveY = gsap.quickTo(glow.current, 'y', { duration: 1.1, ease: 'power3.out' })
      const onMove = (event) => {
        const box = root.current.getBoundingClientRect()
        moveX(event.clientX - box.left - box.width / 2)
        moveY(event.clientY - box.top - box.height / 2)
      }
      root.current.addEventListener('pointermove', onMove)
      return () => root.current?.removeEventListener('pointermove', onMove)
    },
    { scope: root }
  )

  return (
    <section
      id="top"
      ref={root}
      className="noise relative isolate overflow-hidden pt-[128px] pb-[86px] lg:pt-[150px] lg:pb-[110px]"
    >
      {/* Studio-blue wash behind the whole hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(80% 64% at 50% 17%, #1c50f7 0%, #1237d6 19%, #0a2088 42%, #050f3f 64%, #05070f 86%)',
        }}
      />
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[40px]"
        style={{
          background:
            'radial-gradient(circle, rgba(120,165,255,0.28) 0%, rgba(120,165,255,0) 68%)',
        }}
      />
      {/* Darkens the strip under the nav and fades the section into the page */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(5,7,15,0.9), rgba(5,7,15,0))' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{ background: 'linear-gradient(to bottom, rgba(5,7,15,0), #05070f)' }}
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:gap-16">
        <div data-hero-text>
          <span
            data-hero-badge
            className="will-reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_10px_2px_rgba(59,130,246,0.9)]" />
            100% IMEI Verified
          </span>

          {/* Each line is fixed rather than left to wrap, so the shape of the
              headline stays identical at every breakpoint. */}
          <h1
            ref={heading}
            className="mt-7 whitespace-nowrap font-display text-[clamp(2.37rem,5.3vw,4.68rem)] font-extrabold leading-[0.98]"
          >
            <span data-line className="block text-white">
              Premium Tech.
            </span>
            <span data-line className="block text-brand-bright">
              From
            </span>
            <span className="block">
              <span data-line className="text-brand-bright">
                ₹599
              </span>
              <span data-line className="text-white">
                /Month.
              </span>
            </span>
          </h1>

          <p
            data-hero-copy
            className="will-reveal mt-7 max-w-[27rem] text-[15px] leading-[1.75] text-blue-100/70"
          >
            Upgrade your lifestyle without breaking the bank. Discover certified refurbished
            smartphones with warranty, easy EMI, and zero compromise on quality.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#brands"
              ref={shopRef}
              data-hero-cta
              className="will-reveal group inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_10px_34px_-10px_rgba(27,84,245,0.95)] transition-colors duration-300 hover:bg-brand-bright"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#standard"
              data-hero-cta
              className="will-reveal inline-flex items-center rounded-full border border-white/15 bg-white/6 px-6 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/12"
            >
              View Deals
            </a>
          </div>
        </div>

        <div data-hero-visual className="relative">
          <div
            ref={visual}
            className="will-reveal relative aspect-square w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0d14] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <DeviceMedia
              media={MEDIA.hero}
              art={CameraModuleArt}
              artClassName="h-full w-full scale-[1.09]"
              loading="eager"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
