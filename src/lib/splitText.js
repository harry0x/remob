/**
 * Minimal text splitter — wraps each word (and optionally each character) in
 * spans so GSAP can stagger them. Written by hand rather than pulling in a
 * plugin, and it preserves spaces so text still selects and reads normally.
 *
 * Each word gets an overflow-hidden mask wrapper, which is what gives the
 * headings their "rising out of the line" reveal.
 */
export function splitWords(el, { chars = false } = {}) {
  if (!el || el.dataset.split === 'true') {
    return Array.from(el?.querySelectorAll('[data-split-unit]') ?? [])
  }

  const source = el.textContent ?? ''
  const words = source.split(/(\s+)/)
  el.textContent = ''

  const units = []

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      el.appendChild(document.createTextNode(' '))
      continue
    }

    const mask = document.createElement('span')
    mask.style.display = 'inline-block'
    mask.style.overflow = 'hidden'
    mask.style.verticalAlign = 'top'
    // A little breathing room so descenders (g, y, p) are not clipped.
    mask.style.paddingBottom = '0.12em'
    mask.style.marginBottom = '-0.12em'

    if (chars) {
      for (const char of Array.from(word)) {
        const span = document.createElement('span')
        span.textContent = char
        span.style.display = 'inline-block'
        span.setAttribute('data-split-unit', '')
        mask.appendChild(span)
        units.push(span)
      }
    } else {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      span.setAttribute('data-split-unit', '')
      mask.appendChild(span)
      units.push(span)
    }

    el.appendChild(mask)
  }

  el.dataset.split = 'true'
  return units
}
