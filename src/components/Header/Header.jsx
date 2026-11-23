import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import MobileMenu from '../MobileMenu/MobileMenu';
import Icon from '../Icon/Icon';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '/home';

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isHome ? styles.headerHome : styles.headerDefault}`}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Logo - Her zaman /home'a yönlendirir */}
        <Link
          to="/home"
          className={styles.logoLink}
          onClick={closeMobileMenu}
          aria-label="Petlove Home"
        >
          <Icon
            id={isHome ? 'logo-white' : 'logo'}
            width={106}
            height={28}
            className={styles.logoIcon}
          />
        </Link>

        {/* Desktop Navigation (1280px+) */}
        <div className={styles.desktopNav}>
          <Nav isHome={isHome} />
        </div>

        {/* Right Section: Tablet & Desktop Auth/User Controls + Burger Button */}
        <div className={styles.rightSection}>
          {/* Tablet (768px+) & Desktop Auth / User Controls */}
          <div className={styles.headerControls}>
            {isLoggedIn ? (
              <UserNav user={user} isHome={isHome} />
            ) : (
              <AuthNav isHome={isHome} />
            )}
          </div>

          {/* Burger Menü Butonu (Mobil & Tablette görünür, Desktop'ta gizlenir) */}
          <button
            type="button"
            className={`${styles.burgerBtn} ${isHome ? styles.burgerBtnHome : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menüyü aç"
            aria-expanded={mobileMenuOpen}
          >
            <Icon id="menu" width={32} height={32} />
          </button>
        </div>
      </div>

      {/* Açılır / Kapanır Mobil & Tablet Gezinme Menüsü */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        isLoggedIn={isLoggedIn}
        user={user}
        isHome={isHome}
      />
    </header>
  );
};

export default Header;
