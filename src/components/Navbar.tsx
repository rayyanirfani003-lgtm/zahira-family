import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/keluarga', label: 'Keluarga' },
  { path: '/silsilah', label: 'Silsilah' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/cerita', label: 'Cerita' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/acara', label: 'Acara' },
  { path: '/ulang-tahun', label: 'Ulang Tahun' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  // Close menu
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <div className="navbar-logo-icon">
                <Heart fill="white" />
              </div>
              <span>Zahira Family</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="navbar-links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right side: Search + Login (desktop) + Hamburger (mobile) */}
            <div className="navbar-right">
              <button
                className="navbar-search"
                aria-label="Search"
                type="button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <Link to="/login" className="btn btn-secondary navbar-login-desktop">
                Login
              </Link>
              <button
                className="navbar-hamburger"
                onClick={toggleMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                type="button"
              >
                <Menu size={20} color="#292722" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="navbar-mobile-overlay" onClick={closeMenu} />
      )}

      {/* Mobile Menu Panel */}
      <div className={`navbar-mobile ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-header">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="navbar-logo-icon">
              <Heart fill="white" />
            </div>
            <span>Zahira Family</span>
          </Link>
          <button
            className="navbar-mobile-close"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
            <X size={20} color="#292722" />
          </button>
        </div>

        <div className="navbar-mobile-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`navbar-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-mobile-footer">
          <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
