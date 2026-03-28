function QuizOptionGroup({
  title,
  subtitle,
  options,
  value,
  onChange,
  multiple = false
}) {
  const isSelected = (option) =>
    multiple ? value.includes(option) : value === option

  const handleClick = (option) => {
    if (multiple) {
      const next = isSelected(option)
        ? value.filter((item) => item !== option)
        : [...value, option]
      onChange(next)
    } else {
      onChange(option)
    }
  }

  return (
    <div className="input-card">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-ink-900">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-ink-500">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            className={`chip-option ${isSelected(option) ? 'chip-option-active' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizOptionGroup