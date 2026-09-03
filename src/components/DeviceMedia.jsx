/**
 * Renders a device as a photograph when one is configured in `data/media.js`,
 * and as the drawn SVG artwork otherwise. Both branches fill the same box, so
 * a swap never disturbs layout or the animations wrapped around it.
 *
 * @param {object}   media        entry from MEDIA — { src, alt }
 * @param {Function} art          SVG component used while `media.src` is null
 * @param {string}   artClassName sizing for the artwork (it is drawn to bleed)
 * @param {string}   imgClassName sizing for a photo (cover-cropped by default)
 * @param {'lazy'|'eager'} loading  use 'eager' above the fold
 */
export default function DeviceMedia({
  media,
  art: Art,
  artClassName = 'h-full w-full',
  imgClassName = 'h-full w-full object-cover',
  loading = 'lazy',
}) {
  if (media?.src) {
    return (
      <img
        src={media.src}
        alt={media.alt ?? ''}
        loading={loading}
        decoding="async"
        className={imgClassName}
      />
    )
  }

  return <Art className={artClassName} />
}
