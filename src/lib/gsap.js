import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Shared easing vocabulary so every section moves with the same character. */
export const EASE = {
  out: 'power3.out',
  soft: 'power2.out',
  expo: 'expo.out',
  back: 'back.out(1.6)',
}

/** True when the visitor has asked the OS to reduce animation. */
export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, useGSAP }
