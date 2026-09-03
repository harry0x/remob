import { useEffect, useState } from 'react'
import { ScrollTrigger } from './gsap'

/**
 * History-API routing with clean paths (`/shop`, not `#/shop`).
 *
 * Rather than exporting a <Link> component, this delegates a single click
 * listener on the document: any same-origin `<a href="/…">` anywhere in the
 * tree is intercepted and pushed onto history, so plain anchors keep working
 * (and still open in a new tab on ctrl/cmd-click or middle-click).
 *
 * Note for deployment: the dev and preview servers already fall back to
 * index.html for unknown paths. A static host needs the same rewrite rule.
 */
export const ROUTES = {
  home: '/',
  shop: '/shop',
  iphone: '/iphone',
  android: '/android',
  deals: '/deals',
  sell: '/sell',
  verify: '/verify',
  about: '/about',
  cart: '/cart',
  profile: '/profile',
  delivery: '/delivery',
  warrantyClaim: '/warranty-claim',
  returns: '/returns',
}

export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const settle = () => {
      setPath(window.location.pathname)
      window.scrollTo(0, 0)
      // Let the new page paint before triggers re-measure.
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a')
      const href = anchor?.getAttribute('href')
      if (!anchor || !href) return
      // Leave in-page anchors, external links and new-tab links alone.
      if (!href.startsWith('/') || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return
      }

      event.preventDefault()
      if (href === window.location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.history.pushState({}, '', href)
      settle()
    }

    window.addEventListener('popstate', settle)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', settle)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return path
}
