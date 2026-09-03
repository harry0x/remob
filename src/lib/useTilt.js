import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from './gsap'

/**
 * Subtle 3D tilt for the brand cards. The card itself rotates a couple of
 * degrees while any element marked `[data-tilt-layer]` inside it drifts a
 * little further, which is what sells the depth.
 */
export function useTilt({ max = 6, layerShift = 16 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    const layers = el.querySelectorAll('[data-tilt-layer]')
    const setRotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const setRotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })

    const onMove = (event) => {
      const box = el.getBoundingClientRect()
      const px = (event.clientX - box.left) / box.width - 0.5
      const py = (event.clientY - box.top) / box.height - 0.5

      setRotY(px * max * 2)
      setRotX(-py * max * 2)

      gsap.to(layers, {
        x: px * layerShift * 2,
        y: py * layerShift,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const onEnter = () => gsap.to(el, { scale: 1.012, duration: 0.5, ease: 'power3.out' })

    const onLeave = () => {
      setRotX(0)
      setRotY(0)
      gsap.to(el, { scale: 1, duration: 0.6, ease: 'power3.out' })
      gsap.to(layers, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max, layerShift])

  return ref
}
