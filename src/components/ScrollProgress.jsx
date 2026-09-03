import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../lib/gsap'

/** Hairline reading-progress bar pinned above the nav. */
export default function ScrollProgress() {
  const bar = useRef(null)

  useGSAP(() => {
    if (reducedMotion()) return
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        transformOrigin: 'left center',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      }
    )
  })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left bg-gradient-to-r from-brand to-brand-bright"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
