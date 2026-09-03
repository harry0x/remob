import { gsap, EASE, reducedMotion } from './gsap'

/**
 * One reveal vocabulary for the whole page: elements carry `.will-reveal`
 * (opacity: 0 in CSS) and are faded/lifted in when their section scrolls up.
 *
 * Using autoAlpha rather than opacity means GSAP also flips `visibility`, so
 * nothing hidden is ever click- or tab-reachable before it appears.
 */
export function revealIn(targets, options = {}) {
  const {
    trigger,
    y = 26,
    x = 0,
    scale = 1,
    duration = 0.9,
    stagger = 0.08,
    delay = 0,
    ease = EASE.out,
    start = 'top 80%',
  } = options

  const list = gsap.utils.toArray(targets)
  if (!list.length) return null

  // Reduced motion: show everything at once, no timeline at all.
  if (reducedMotion()) {
    gsap.set(list, { autoAlpha: 1, y: 0, x: 0, scale: 1 })
    return null
  }

  return gsap.fromTo(
    list,
    { autoAlpha: 0, y, x, scale },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: trigger ? { trigger, start } : undefined,
    }
  )
}

/**
 * Word-by-word headline reveal. `splitWords` has already wrapped each word in
 * an overflow-hidden mask, so sliding the inner span up from 110% reads as the
 * line rising out of the baseline.
 */
export function revealWords(units, options = {}) {
  const { trigger, stagger = 0.05, delay = 0, duration = 1, start = 'top 82%' } = options
  if (!units?.length) return null

  if (reducedMotion()) {
    gsap.set(units, { yPercent: 0, autoAlpha: 1 })
    return null
  }

  return gsap.fromTo(
    units,
    { yPercent: 115, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration,
      ease: EASE.expo,
      stagger,
      delay,
      scrollTrigger: trigger ? { trigger, start } : undefined,
    }
  )
}
