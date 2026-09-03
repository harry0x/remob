import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from './gsap'

/**
 * Pulls an element gently toward the cursor while it is hovered. `quickTo`
 * keeps this on GSAP's ticker instead of firing a fresh tween per mousemove,
 * which is what keeps it feeling weighted rather than twitchy.
 *
 * @param {number} strength how far (px) the element may drift from center
 */
export function useMagnetic(strength = 14) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (event) => {
      const box = el.getBoundingClientRect()
      const relX = event.clientX - (box.left + box.width / 2)
      const relY = event.clientY - (box.top + box.height / 2)
      moveX((relX / box.width) * strength * 2)
      moveY((relY / box.height) * strength * 2)
    }

    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
