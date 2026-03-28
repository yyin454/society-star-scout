function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`mb-10 flex flex-col ${alignment}`}>
      {eyebrow ? (
        <span className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle max-w-3xl">{subtitle}</p> : null}
    </div>
  )
}

export default SectionHeader