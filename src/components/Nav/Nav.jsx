import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const navItems = [
  { path: '/news', label: 'News' },
  { path: '/notices', label: 'Find pet' },
  { path: '/friends', label: 'Our friends' },
];

const Nav = ({ onItemClick, className = '', isHome = false }) => {
  return (
    <nav
      className={`${styles.nav} ${isHome ? styles.homeTheme : ''} ${className}`}
      aria-label="Main Navigation"
    >
      <ul className={styles.navList}>
        {navItems.map(({ path, label }) => (
          <li key={path} className={styles.navItem}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={onItemClick}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
