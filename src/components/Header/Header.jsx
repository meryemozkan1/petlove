import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Header.module.css';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import Icon from '../Icon/Icon';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import { logout } from '../../redux/auth/authOperations';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '/home';

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${isHome ? styles.headerHome : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu} aria-label="Petlove Anasayfa">
          <Icon id="logo" width={92} height={24} className={styles.logoIcon} />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Nav />
        </div>

        {/* Desktop Auth/User Bar */}
        <div className={styles.desktopAuth}>
          {isLoggedIn ? (
            <div className={styles.userControls}>
              <LogOutBtn onLogout={handleLogout} />
              <UserBar user={user} />
            </div>
          ) : (
            <AuthNav />
          )}
        </div>

        {/* Mobile / Tablet Actions */}
        <div className={styles.mobileActions}>
          {isLoggedIn && <UserBar user={user} className={styles.mobileUserBar} />}

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileMenuOpen}
          >
            <Icon id={mobileMenuOpen ? 'cross' : 'menu'} width={28} height={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
          <div className={styles.mobileDrawerContent}>
            <Nav onItemClick={closeMenu} className={styles.mobileNav} />
            <div className={styles.mobileDrawerBottom}>
              {isLoggedIn ? (
                <LogOutBtn onLogout={handleLogout} />
              ) : (
                <AuthNav onItemClick={closeMenu} className={styles.mobileAuthNav} />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

