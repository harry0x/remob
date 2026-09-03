/**
 * The single swap point for photography.
 *
 * Anything left as null falls back to the hand-drawn SVG art, so a missing
 * file degrades to artwork rather than a broken image. To change a picture,
 * drop the file into `public/` and edit one line here — the GSAP reveals,
 * cropping and tilt parallax all keep working untouched.
 */
export const MEDIA = {
  hero: {
    src: '/mobile.png',
    alt: 'Pro camera system on a certified refurbished flagship phone',
  },
  apple: {
    src: '/apple_mobile.png',
    alt: 'Refurbished iPhone shown from the back',
  },
  samsung: {
    src: '/samsung_image.png',
    alt: 'Refurbished Samsung phone held with the Remob store on screen',
  },
  founder: {
    src: '/madhav_verma.png',
    alt: 'Madhav Verma, founder of Remob',
  },
  /** Testimonial stack — each entry is a path, or null for the drawn avatar. */
  avatars: ['/person_1.png', '/person_2.png', '/person_3.png'],
  /** The "+400" chip that closes the avatar stack. */
  avatarBadge: {
    src: '/400.png',
    alt: '400 more reviewers',
  },
}
