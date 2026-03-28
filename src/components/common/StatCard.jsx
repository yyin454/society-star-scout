function StatCard({ label, value, hint }) {
  return (
    <div className="card-base p-5">
      <div className="text-sm font-medium text-ink-500">{label}</div>
      <div className="mt-3 text-3xl font-bold text-ink-900">{value}</div>
      {hint ? <div className="mt-2 text-sm text-ink-500">{hint}</div> : null}
    </div>
  )
}

export default StatCard