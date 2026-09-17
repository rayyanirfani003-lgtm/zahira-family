import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Image,
  BookOpen,
  Calendar,
  Settings,
  Menu,
  X,
  Heart,
  LogOut,
  Bell,
  ExternalLink,
  ChevronDown,
  Plus,
  Search,
  HelpCircle,
} from 'lucide-react';

const adminLinks = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { path: '/admin/members', icon: Users, label: 'Anggota', badge: null },
  { path: '/admin/albums', icon: Image, label: 'Album', badge: null },
  { path: '/admin/stories', icon: BookOpen, label: 'Cerita', badge: null },
  { path: '/admin/events', icon: Calendar, label: 'Acara', badge: null },
  { path: '/admin/settings', icon: Settings, label: 'Pengaturan', badge: null },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const activeLink =
    adminLinks.find((link) =>
      link.path === '/admin'
        ? location.pathname === '/admin'
        : location.pathname.startsWith(link.path)
    )?.label || 'Dashboard';

  const sidebarContent = (
    <>
      <div className="wp-admin-brand">
        <div className="wp-admin-brand-logo">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="wp-admin-brand-text">
          <strong>Zahira Family</strong>
          <span>Admin Panel</span>
        </div>
        <button
          className="wp-admin-brand-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      <nav className="wp-admin-nav">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `wp-admin-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="wp-admin-nav-icon">
                <Icon size={18} />
              </span>
              {sidebarOpen && <span className="wp-admin-nav-label">{link.label}</span>}
              {link.badge && sidebarOpen && (
                <span className="wp-admin-nav-badge">{link.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="wp-admin-nav-spacer" />

      <div className="wp-admin-sidebar-footer">
        <Link to="/" className="wp-admin-view-site">
          <ExternalLink size={15} />
          {sidebarOpen && <span>Lihat Website</span>}
        </Link>
        <div className="wp-admin-user-info">
          <div className="wp-admin-avatar">A</div>
          {sidebarOpen && (
            <div className="wp-admin-user-meta">
              <strong>Administrator</strong>
              <span>familyadmin@zahirafamily.com</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className={`wp-admin-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <aside className="wp-admin-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="wp-admin-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <aside className="wp-admin-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="wp-admin-main">
        {/* Top Bar */}
        <header className="wp-admin-topbar">
          <div className="wp-admin-topbar-left">
            <button
              className="wp-admin-mobile-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu"
            >
              <Menu size={20} />
            </button>
            <span className="wp-admin-breadcrumb">
              Zahira Family / {activeLink}
            </span>
          </div>

          <div className="wp-admin-topbar-right">
            <button className="wp-admin-topbar-btn" aria-label="Cari">
              <Search size={18} />
            </button>
            <button className="wp-admin-topbar-btn" aria-label="Bantuan">
              <HelpCircle size={18} />
            </button>
            <button className="wp-admin-topbar-btn wp-admin-notif" aria-label="Notifikasi">
              <Bell size={18} />
              <span className="wp-admin-notif-badge">2</span>
            </button>

            <div className="wp-admin-profile-wrapper">
              <button
                className="wp-admin-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profil"
              >
                <div className="wp-admin-profile-avatar">A</div>
                <span>Admin</span>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="wp-admin-profile-dropdown">
                  <div className="wp-admin-profile-header">
                    <div className="wp-admin-profile-avatar large">A</div>
                    <div>
                      <strong>Administrator</strong>
                      <span>familyadmin@zahirafamily.com</span>
                    </div>
                  </div>
                  <Link to="/login" className="wp-admin-profile-menu-item">
                    <LogOut size={16} />
                    Keluar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="wp-admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
