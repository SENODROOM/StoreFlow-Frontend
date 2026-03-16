import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          StoreFlow
        </Link>

        {user && (
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {user ? (
          <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="user-info">
              <span className="shop-name">{user.shopName || user.name || 'User'}</span>
              <span className="owner-name">{user.ownerName ? `Owner: ${user.ownerName}` : 'Welcome'}</span>
            </div>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/new-order"
                  className={`nav-link ${isActive('/new-order') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/purchased-products"
                  className={`nav-link ${isActive('/purchased-products') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/settings"
                  className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                  </svg>
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={() => { logout(); closeMobileMenu(); }} className="logout-btn">
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/role-selection" className="nav-link">Login</Link>
            </li>
          </ul>
        )}
      </div>
      {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
    </nav>
  );
}