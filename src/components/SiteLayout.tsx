import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function SiteLayout({ children }: PropsWithChildren) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="layout-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Mini Library - Trang chủ">
            <span className="brand-mark" aria-hidden="true">
              ◧
            </span>
            <span className="brand-copy">
              <span className="brand-name">BookNest</span>
              <span className="brand-caption">Tri thức trong tầm tay</span>
            </span>
          </NavLink>
          <nav className="header-actions" aria-label="Điều hướng chính">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              end
              to="/"
            >
              <span aria-hidden="true">▣</span> Thư viện
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              to="/stats"
            >
              <span aria-hidden="true">▥</span> Thống kê
            </NavLink>
            <button
              aria-label={
                theme === 'light' ? 'Bật giao diện tối' : 'Bật giao diện sáng'
              }
              className={`theme-toggle${theme === 'dark' ? ' is-dark' : ''}`}
              type="button"
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
              <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
              <span className="theme-switch" aria-hidden="true" />
            </button>
            <span className="profile-avatar" aria-label="Tài khoản">
              ●
            </span>
          </nav>
        </div>
      </header>
      <div className="page-container">
        {children}
      </div>
    </div>
  )
}
