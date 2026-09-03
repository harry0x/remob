import { useRef } from 'react'
import { gsap, useGSAP, EASE, reducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/splitText'
import { revealIn, revealWords } from '../lib/reveal'
import Footer from '../sections/Footer'
import { Avatar } from '../components/DeviceArt'
import { MEDIA } from '../data/media'
import {
  EyeIcon,
  HeartIcon,
  ImeiIcon,
  SparkleIcon,
  StarIcon,
  UsersIcon,
  WarrantyIcon,
} from '../components/Icons'

const STATS = [
  { Icon: ImeiIcon, value: '100%', label: 'IMEI Verified' },
  { Icon: WarrantyIcon, value: '1-Year', label: 'Warranty' },
  { Icon: UsersIcon, value: '5,000+', label: 'Happy Customers' },
  { Icon: StarIcon, value: '400+', label: '5-Star Reviews' },
]

const STORY = [
  'Every great venture is born not just from an idea, but from the ashes of previous attempts. My journey didn’t start with Remob. It started with a relentless drive to build something meaningful, a drive that led me through several distinct ventures: Gift Wala, Hathras Mart, and LKM Industry.',
  'Each of these attempts was a stepping stone. They didn’t achieve the massive scale I envisioned, but they taught me invaluable lessons about operations, customer trust, and the brutal realities of scaling a business. Failure wasn’t a dead end; it was a harsh, necessary curriculum.',
  'I saw a glaring gap in the refurbished electronics market—a profound lack of trust. People wanted affordable premium tech, but they feared being scammed with subpar, unverified devices. That’s when the vision for Remob crystallized: to build a marketplace founded entirely on radical transparency and uncompromising quality.',
]

const VALUES = [
  {
    Icon: HeartIcon,
    title: 'Quality First',
    copy: 'Every device undergoes a rigorous 40-point inspection process. If it doesn’t meet our exacting standards, it doesn’t make it to our store. We sell premium tech that feels brand new.',
  },
  {
    Icon: EyeIcon,
    title: 'Radical Transparency',
    copy: 'No hidden flaws. We provide clear, honest condition grading and ensure every device is 100% IMEI verified against blacklists. You know exactly what you’re paying for.',
  },
  {
    Icon: SparkleIcon,
    title: 'Accessible Premium',
    copy: 'We believe high-end technology shouldn’t be exclusive. Through competitive pricing and easy EMI options starting at just ₹599/month, we make flagship experiences affordable.',
  },
]

const PARTNERS = ['Flipkart', 'Nothing', 'Amazon', 'Cashify', 'Apple', 'Samsung']

export default function About() {
  const root = useRef(null)
  const wordmark = useRef(null)
  const subtitle = useRef(null)
  const storyHeading = useRef(null)
  const valuesHeading = useRef(null)

  useGSAP(
    () => {
      // The wordmark builds letter by letter, then everything under it follows.
      const letters = splitWords(wordmark.current, { chars: true })
      if (reducedMotion()) {
        gsap.set(letters, { autoAlpha: 1, yPercent: 0 })
      } else {
        gsap.fromTo(
          letters,
          { yPercent: 118, autoAlpha: 0, rotate: 4 },
          {
            yPercent: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 1.15,
            ease: EASE.expo,
            stagger: 0.07,
            delay: 0.3,
          }
        )
      }

      revealWords(splitWords(subtitle.current), { stagger: 0.05, delay: 0.75 })
      revealIn('[data-about-copy]', { y: 20, delay: 0.95 })
      revealIn('[data-stat-cell]', { trigger: '[data-stats]', y: 22, stagger: 0.09 })

      revealWords(splitWords(storyHeading.current), { trigger: '[data-story]', stagger: 0.05 })
      revealIn('[data-story-media]', { trigger: '[data-story]', y: 30, scale: 0.94 })
      revealIn('[data-story-copy]', { trigger: '[data-story]', y: 22, stagger: 0.1, delay: 0.15 })

      revealWords(splitWords(valuesHeading.current), { trigger: '[data-values]', stagger: 0.05 })
      revealIn('[data-values-copy]', { trigger: '[data-values]', y: 16, delay: 0.15 })
      revealIn('[data-value-card]', { trigger: '[data-values]', y: 34, stagger: 0.12, delay: 0.2 })
      revealIn('[data-partner]', { trigger: '[data-partners]', y: 18, stagger: 0.06 })

      if (reducedMotion()) return

      // The rule beside the pull-quote draws itself in.
      gsap.fromTo(
        '[data-quote-rule]',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: EASE.expo,
          transformOrigin: 'top center',
          scrollTrigger: { trigger: '[data-quote]', start: 'top 85%' },
        }
      )
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen bg-ink">

      {/* Hero */}
      {/* `isolate` gives the header its own stacking context, otherwise the
          -z-10 wash paints behind the page background and disappears. */}
      <header className="relative isolate overflow-hidden px-6 pb-20 pt-[140px] text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(85% 70% at 50% -6%, #1c50f7 0%, #1237d6 16%, #0a2088 38%, #050f3f 62%, #05070f 86%)',
          }}
        />

        <h1
          ref={wordmark}
          className="font-display text-[clamp(3.74rem,10vw,7.7rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white"
        >
          REMOB
        </h1>
        <p
          ref={subtitle}
          className="mt-3 font-display text-[clamp(1.65rem,3.4vw,2.53rem)] font-bold text-white"
        >
          Our Story
        </p>
        <p
          data-about-copy
          className="will-reveal mx-auto mt-6 max-w-[34rem] text-balance text-[14.5px] leading-[1.8] text-blue-100/75"
        >
          Redefining trust in the refurbished smartphone market through radical transparency,
          rigorous quality control, and a relentless commitment to our customers.
        </p>
      </header>

      <main className="px-6 pb-24">
        {/* Stats */}
        <div
          data-stats
          className="mx-auto grid max-w-[1150px] grid-cols-2 gap-y-8 rounded-[18px] border border-white/8 bg-[#0a0e1a] py-9 md:grid-cols-4 md:gap-y-0"
        >
          {STATS.map(({ Icon, value, label }, index) => (
            <div
              key={label}
              data-stat-cell
              className={`will-reveal px-6 text-center ${
                index > 0 ? 'md:border-l md:border-white/8' : ''
              }`}
            >
              <Icon className="mx-auto h-[18px] w-[18px] text-brand-bright" />
              <p className="mt-3 font-display text-[24.5px] font-bold text-white">{value}</p>
              <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-faint">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Founder story */}
        <section
          data-story
          className="mx-auto mt-8 max-w-[1150px] rounded-[18px] border border-white/8 bg-[#0a0e1a] p-8 md:p-12"
        >
          <div className="grid items-start gap-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-14">
            <figure data-story-media className="will-reveal text-center">
              <span
                className="mx-auto block h-[210px] w-[210px] overflow-hidden rounded-full p-[3px]"
                style={{ background: 'linear-gradient(150deg,#f97316,#dc2626 55%,#f59e0b)' }}
              >
                <span className="block h-full w-full overflow-hidden rounded-full bg-[#0d1320]">
                  {MEDIA.founder.src ? (
                    <img
                      src={MEDIA.founder.src}
                      alt={MEDIA.founder.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Avatar tone={0} className="h-full w-full" />
                  )}
                </span>
              </span>
              <figcaption className="mt-5">
                <p className="font-display text-[21.5px] font-bold text-white">Madhav Verma</p>
                <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-bright">
                  Founder, Remob
                </p>
              </figcaption>
            </figure>

            <div>
              <h2
                ref={storyHeading}
                className="font-display text-[clamp(1.76rem,3.2vw,2.42rem)] font-bold text-white"
              >
                From Setbacks to Solutions
              </h2>

              {STORY.map((paragraph, index) => (
                <p
                  key={index}
                  data-story-copy
                  className="will-reveal mt-5 text-[14px] leading-[1.85] text-muted"
                >
                  {paragraph}
                </p>
              ))}

              <blockquote
                data-quote
                data-story-copy
                className="will-reveal relative mt-8 pl-6"
              >
                <span
                  data-quote-rule
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-brand-bright"
                />
                <p className="font-display text-[clamp(1.16rem,2vw,1.49rem)] font-bold italic leading-[1.5] text-white">
                  &ldquo;I didn&rsquo;t build Remob because I never failed. I built it because I
                  never stopped trying.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section data-values className="mx-auto mt-24 max-w-[1150px]">
          <h2
            ref={valuesHeading}
            className="text-center font-display text-[clamp(1.98rem,4vw,2.86rem)] font-bold text-white"
          >
            Our Core Values
          </h2>
          <p
            data-values-copy
            className="will-reveal mx-auto mt-3.5 max-w-[36rem] text-balance text-center text-[14px] text-muted"
          >
            The principles that drive every decision we make and every device we ship.
          </p>

          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, title, copy }) => (
              <article
                key={title}
                data-value-card
                className="will-reveal group rounded-[16px] border border-white/8 bg-[#0c1120] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-bright/35 hover:shadow-[0_28px_60px_-32px_rgba(27,84,245,0.8)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-white/8 bg-card text-brand-bright transition-colors duration-400 group-hover:bg-brand/15">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-5 text-[17.5px] font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.8] text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section data-partners className="mt-24 border-t border-white/7 pt-14">
          <p className="text-center text-[10.5px] font-semibold uppercase tracking-[0.24em] text-faint">
            Trusted &amp; Verified by Partners
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {PARTNERS.map((name) => (
              <li key={name} data-partner className="will-reveal">
                <span className="inline-block rounded-[9px] border border-white/10 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:border-white/25 hover:text-white">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}
