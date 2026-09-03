/**
 * Stroke icons drawn on a 24px grid so they share one optical weight.
 * Everything inherits `currentColor`.
 */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const CertifiedIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 4.8 6v5.4c0 4.3 3 8.3 7.2 9.6 4.2-1.3 7.2-5.3 7.2-9.6V6L12 3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
)

export const ImeiIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 4.8 6v5.4c0 4.3 3 8.3 7.2 9.6 4.2-1.3 7.2-5.3 7.2-9.6V6L12 3Z" />
    <circle cx="12" cy="11" r="2.1" />
    <path d="M12 13.1V16" />
  </svg>
)

export const EmiIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.6" />
    <path d="M3 9.8h18" />
    <path d="M6.6 14.4h3.2" />
  </svg>
)

export const WarrantyIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="7" y="2.6" width="10" height="18.8" rx="2.6" />
    <path d="M10.6 5.4h2.8" />
    <path d="M12 17.6h.01" />
  </svg>
)

export const ReturnsIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3.6 9.4h11.6a4.8 4.8 0 0 1 0 9.6H8.4" />
    <path d="m7.2 5.2-3.6 4.2 3.6 4" />
  </svg>
)

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M4.5 12h14" />
    <path d="m13 6.5 5.5 5.5-5.5 5.5" />
  </svg>
)

export const ArrowUpRight = (props) => (
  <svg {...base} {...props}>
    <path d="M7.5 16.5 16.5 7.5" />
    <path d="M8.6 7.5h7.9v7.9" />
  </svg>
)

export const CartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M2.8 3.4h2.1l2 10.4h9.7l1.9-7.6H6" />
    <circle cx="9" cy="18.6" r="1.5" />
    <circle cx="16.4" cy="18.6" r="1.5" />
  </svg>
)

export const UserIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8.2" r="3.6" />
    <path d="M4.8 20.2a7.6 7.6 0 0 1 14.4 0" />
  </svg>
)

export const ArrowLeft = (props) => (
  <svg {...base} {...props}>
    <path d="M19.5 12h-14" />
    <path d="m11 6.5-5.5 5.5 5.5 5.5" />
  </svg>
)

export const BanIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m6.2 6.2 11.6 11.6" />
  </svg>
)

export const InfoIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 11.2v5" />
    <path d="M12 7.9h.01" />
  </svg>
)

export const XCircleIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6" />
  </svg>
)

export const TruckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M2.8 6.6h10.4v9.2H2.8z" />
    <path d="M13.2 10h3.6l2.6 2.8v3h-6.2z" />
    <circle cx="7" cy="17.8" r="1.7" />
    <circle cx="16.4" cy="17.8" r="1.7" />
  </svg>
)

export const ListChecksIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m3.4 6.4 1.6 1.6 2.6-2.8" />
    <path d="m3.4 15.4 1.6 1.6 2.6-2.8" />
    <path d="M11 6.6h9.6M11 16.6h9.6" />
  </svg>
)

export const MailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="m3.8 7 8.2 5.6L20.2 7" />
  </svg>
)

export const QrIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.6" y="3.6" width="6" height="6" rx="1.4" />
    <rect x="14.4" y="3.6" width="6" height="6" rx="1.4" />
    <rect x="3.6" y="14.4" width="6" height="6" rx="1.4" />
    <path d="M14.4 14.4h2.4v2.4h-2.4zM18 18h2.4v2.4H18z" />
  </svg>
)

export const WalletIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="6" width="18" height="12.4" rx="2.6" />
    <path d="M3 10.2h18" />
    <circle cx="16.8" cy="14" r="1.2" />
  </svg>
)

export const SupportIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4.4 14.4v-2.6a7.6 7.6 0 0 1 15.2 0v2.6" />
    <rect x="2.8" y="13.4" width="3.6" height="5.2" rx="1.6" />
    <rect x="17.6" y="13.4" width="3.6" height="5.2" rx="1.6" />
    <path d="M19.4 18.6a3 3 0 0 1-3 2.4h-1.8" />
  </svg>
)

export const UploadIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4.4 15.6v2.6a1.8 1.8 0 0 0 1.8 1.8h11.6a1.8 1.8 0 0 0 1.8-1.8v-2.6" />
    <path d="m8.2 8.6 3.8-3.8 3.8 3.8" />
    <path d="M12 4.8v10.4" />
  </svg>
)

export const BoxIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m12 3.4 8 4.2v8.8l-8 4.2-8-4.2V7.6Z" />
    <path d="m4 7.6 8 4.2 8-4.2" />
    <path d="M12 11.8v8.8" />
  </svg>
)

export const PlusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5.4v13.2M5.4 12h13.2" />
  </svg>
)

export const MinusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.4 12h13.2" />
  </svg>
)

export const TrashIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4.4 6.6h15.2" />
    <path d="M9.2 6.6V4.8a1.4 1.4 0 0 1 1.4-1.4h2.8a1.4 1.4 0 0 1 1.4 1.4v1.8" />
    <path d="M6.4 6.6 7.3 19a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.9-12.4" />
    <path d="M10.4 10.4v6M13.6 10.4v6" />
  </svg>
)

export const PencilIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M16.2 3.9a2.1 2.1 0 0 1 3 3L8.5 17.6l-3.9 1 1-3.9Z" />
  </svg>
)

export const BellIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M18.2 16.4H5.8l1.3-2.2V10a4.9 4.9 0 0 1 9.8 0v4.2Z" />
    <path d="M10.2 19.4a2 2 0 0 0 3.6 0" />
  </svg>
)

export const LogOutIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14.4 4.6H6.8a1.8 1.8 0 0 0-1.8 1.8v11.2a1.8 1.8 0 0 0 1.8 1.8h7.6" />
    <path d="M15.6 15.6 19.2 12l-3.6-3.6" />
    <path d="M19.2 12H9.6" />
  </svg>
)

export const MapPinIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M19 10.4c0 5-7 10.2-7 10.2s-7-5.2-7-10.2a7 7 0 0 1 14 0Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </svg>
)

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="10.8" cy="10.8" r="6.6" />
    <path d="m15.6 15.6 4.2 4.2" />
  </svg>
)

export const ChevronDown = (props) => (
  <svg {...base} {...props}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </svg>
)

export const RefreshIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 12a8 8 0 1 1-2.7-6" />
    <path d="M20.4 4.2v5.2h-5.2" />
  </svg>
)

export const TagIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.4" y="8.6" width="17.2" height="10.4" rx="2.4" />
    <path d="M7.4 8.6V6.4a2 2 0 0 1 2-2h5.2a2 2 0 0 1 2 2v2.2" />
  </svg>
)

export const RupeeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7.6 4.6h8.8" />
    <path d="M7.6 8.6h8.8" />
    <path d="M14.4 4.6a4 4 0 0 1 0 8H7.6l8 6.8" />
  </svg>
)

export const StorageIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.4" y="5" width="17.2" height="5" rx="1.8" />
    <rect x="3.4" y="14" width="17.2" height="5" rx="1.8" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
)

export const ChipIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="7" y="7" width="10" height="10" rx="2.2" />
    <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
  </svg>
)

export const FingerprintIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.2 11.4a6.8 6.8 0 0 1 13.6 0" />
    <path d="M8.4 11.6a3.6 3.6 0 0 1 7.2 0v1.6a9 9 0 0 1-1 4.2" />
    <path d="M11.9 11.8v2.2a12 12 0 0 1-1.6 6" />
    <path d="M15.4 19.4a15 15 0 0 0 .9-3.4" />
    <path d="M6.6 17.6A9.4 9.4 0 0 0 8 13.2v-1.4" />
  </svg>
)

export const CheckCircleIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m8.4 12.2 2.4 2.4 4.8-5" />
  </svg>
)

export const KeypadIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {[6, 12, 18].map((y) => [6, 12, 18].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />))}
  </svg>
)

export const HeartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 19.6 4.9 12.7a4.3 4.3 0 0 1 6.1-6.1l1 1 1-1a4.3 4.3 0 0 1 6.1 6.1Z" />
  </svg>
)

export const EyeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="2.9" />
  </svg>
)

export const SparkleIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m12 3.6 2 5.2 5.2 2-5.2 2-2 5.2-2-5.2-5.2-2 5.2-2Z" />
    <path d="M18.4 16.4 19.2 18l1.6.8-1.6.8-.8 1.6-.8-1.6L16 18.8l1.6-.8Z" />
  </svg>
)

export const UsersIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="9.4" cy="8.6" r="3.4" />
    <path d="M3.6 19a5.8 5.8 0 0 1 11.6 0" />
    <path d="M16.2 5.6a3.4 3.4 0 0 1 0 6" />
    <path d="M17.4 13.8a5.8 5.8 0 0 1 3 5.2" />
  </svg>
)

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 1.9" />
  </svg>
)

export const MenuIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3.8 7.5h16.4" />
    <path d="M3.8 12h16.4" />
    <path d="M3.8 16.5h16.4" />
  </svg>
)

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6.2 6.2 17.8 17.8" />
    <path d="M17.8 6.2 6.2 17.8" />
  </svg>
)

export const SendIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20.4 12 4.2 4.8l2.6 7.2-2.6 7.2L20.4 12Z" />
  </svg>
)

export const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6Z" />
  </svg>
)

export const AppleGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85s-1.8-.83-3-.8c-1.5.02-2.9.9-3.7 2.25-1.6 2.75-.4 6.8 1.1 9 .75 1.1 1.65 2.3 2.8 2.25 1.1-.05 1.55-.72 2.9-.72s1.75.72 2.95.7c1.2-.02 2-1.1 2.75-2.2.85-1.25 1.2-2.5 1.25-2.55-.03-.02-2.15-.83-2.15-3.48ZM14.2 5.9c.6-.75 1-1.78.9-2.8-.87.03-1.93.58-2.56 1.32-.56.65-1.05 1.7-.92 2.7.97.08 1.96-.5 2.58-1.22Z" />
  </svg>
)
