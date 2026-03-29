import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: '首页', to: '/' },
  { label: '社团广场', to: '/clubs' },
  { label: '智能匹配', to: '/quiz' },
  { label: '推荐结果', to: '/results' },
  { label: '我的社团', to: '/my-clubs' },
  { label: '社团端', to: '/recruiter' }
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="container-main flex h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-lg font-bold text-white shadow-md">
            社
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-ink-900">社团星探</div>
            <div className="text-xs text-ink-500">Campus Club Match Platform</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
          >
            登录
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            注册
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar