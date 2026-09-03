import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import Brands from '../sections/Brands'
import Standard from '../sections/Standard'
import Social from '../sections/Social'
import CtaPanel from '../sections/CtaPanel'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TrustBar />
        <Brands />
        <Standard />
        <Social />
        <CtaPanel />
      </main>
      <Footer />
    </>
  )
}
