/**
 * One navigation set, shared by every page so the bar never changes shape
 * between screens. `active` is derived from the current path rather than
 * passed per page.
 */
export const NAV_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'iPhone', href: '/iphone' },
  { label: 'Android', href: '/android' },
  { label: 'Sell Phone', href: '/sell' },
  { label: 'Deals', href: '/deals' },
  { label: 'Trust', href: '/about' },
]

/** Index of the nav item that owns a given path, or -1 when none does. */
export function activeNavIndex(path) {
  return NAV_LINKS.findIndex((link) => link.href === path)
}
