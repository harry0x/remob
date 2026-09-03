import { useRef, useState } from 'react'
import { useGSAP } from '../lib/gsap'
import { revealIn } from '../lib/reveal'
import { SendIcon } from '../components/Icons'

const COLUMNS = [
  {
    title: 'Legal',
    links: [
      { label: 'Warranty Policy', href: '/about' },
      { label: 'Privacy', href: '/about' },
      { label: 'Terms', href: '/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'EMI Options', href: '/shop' },
      { label: 'Returns', href: '/profile' },
      { label: 'Contact Support', href: '/profile' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Verify IMEI', href: '/verify' },
      { label: 'Our Story', href: '/about' },
    ],
  },
]

/** The single footer for every page. */
export default function Footer() {
  const root = useRef(null)
  const [email, setEmail] = useState('')

  useGSAP(
    () => {
      revealIn('[data-footer-col]', { trigger: root.current, y: 22, stagger: 0.09 })
    },
    { scope: root }
  )

  return (
    <footer ref={root} className="border-t border-white/7 bg-ink py-16">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.35fr]">
        <div data-footer-col className="will-reveal">
          <a
            href="/"
            className="font-display text-[28px] font-extrabold leading-none tracking-[-0.02em] text-white"
          >
            Remob
          </a>
          <p className="mt-3.5 max-w-[16rem] text-[14px] leading-[1.75] text-faint">
            © 2024 Remob Refurbished. 100% IMEI Verified.
          </p>
        </div>

        {COLUMNS.map(({ title, links }) => (
          <div key={title} data-footer-col className="will-reveal">
            <h3 className="text-[15.5px] font-semibold text-white">{title}</h3>
            <ul className="mt-4.5 space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-block text-[14.5px] text-faint transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div data-footer-col className="will-reveal">
          <h3 className="text-[15.5px] font-semibold text-white">Stay Updated</h3>
          <form
            className="mt-4.5 flex items-center gap-2 rounded-[11px] border border-white/8 bg-card p-1.5 transition-colors duration-300 focus-within:border-brand-bright/60"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email"
              className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-[14.5px] text-white placeholder:text-faint focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-9 w-10 shrink-0 place-items-center rounded-[8px] bg-brand text-white transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_8px_20px_-6px_rgba(27,84,245,0.9)]"
            >
              <SendIcon className="h-[16px] w-[16px]" />
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
