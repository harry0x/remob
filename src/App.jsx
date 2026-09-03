import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { useRoute, ROUTES } from './lib/useRoute'
import { CartProvider } from './lib/cart'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Verify from './pages/Verify'
import About from './pages/About'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Delivery from './pages/Delivery'
import WarrantyClaim from './pages/WarrantyClaim'
import ReturnPolicy from './pages/ReturnPolicy'

/**
 * The catalogue routes all render <Shop/>, which reads the path to decide
 * which slice of the catalogue to show and what to call it.
 */
const PAGES = {
  [ROUTES.home]: Home,
  [ROUTES.shop]: Shop,
  [ROUTES.iphone]: Shop,
  [ROUTES.android]: Shop,
  [ROUTES.deals]: Shop,
  [ROUTES.verify]: Verify,
  [ROUTES.sell]: Verify,
  [ROUTES.about]: About,
  [ROUTES.cart]: Cart,
  [ROUTES.profile]: Profile,
  [ROUTES.delivery]: Delivery,
  [ROUTES.warrantyClaim]: WarrantyClaim,
  [ROUTES.returns]: ReturnPolicy,
}

export default function App() {
  const route = useRoute()
  useSmoothScroll()

  useEffect(() => {
    // Web fonts land after first paint and shift every heading; recomputing
    // trigger positions afterwards keeps the scroll animations honest.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  const Page = PAGES[route] ?? Home
  // The catalogue screens carry a search field in the bar.
  const showsSearch = Page === Shop

  return (
    <CartProvider>
      <ScrollProgress />
      {/* Nav sits above the router so it never remounts — see Navbar. */}
      <Navbar path={route} search={showsSearch} />
      {/* Keying on the route tears down each page's GSAP context on navigation
          so triggers from the previous screen never linger. */}
      <Page key={route} route={route} />
    </CartProvider>
  )
}
