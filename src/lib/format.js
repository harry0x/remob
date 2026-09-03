const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** ₹85,999 — Indian digit grouping, no decimals. */
export const formatINR = (value) => `₹${inr.format(value)}`
