function Tag({ children, variant = 'brand' }) {
  const base =
    'inline-flex items-center whitespace-nowrap rounded-full px-1.5 py-1 text-[14px] font-medium leading-none'

  const styles =
    variant === 'muted'
      ? `${base} bg-ink-100 text-ink-600`
      : variant === 'white'
      ? `${base} bg-white/90 text-ink-700`
      : `${base} bg-brand-50 text-brand-700`

  return <span className={styles}>{children}</span>
}

export default Tag