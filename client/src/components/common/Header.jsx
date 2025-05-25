import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" aria-label="Book Reviews Home">
          BookReviews
        </Link>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Primary navigation">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/books" className="nav__link" onClick={() => setMenuOpen(false)}>
                Books
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/profile" className="nav__link" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className={`nav-toggle ${menuOpen ? 'nav-toggle--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
