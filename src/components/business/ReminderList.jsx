function ReminderList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-ink-100 bg-white px-4 py-4 shadow-sm"
        >
          <div className="mb-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {item.type}
          </div>
          <div className="text-sm leading-6 text-ink-700">{item.title}</div>
        </div>
      ))}
    </div>
  )
}

export default ReminderList