import { Link } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = ({ onItemClick, className = '', isHome = false }) => {
  return (
    <div
      className={`${styles.authNav} ${isHome ? styles.homeTheme : ''} ${className}`}
    >
      <Link to="/login" className={styles.loginBtn} onClick={onItemClick}>
        Log in
      </Link>
      <Link to="/register" className={styles.registerBtn} onClick={onItemClick}>
        Registration
      </Link>
    </div>
  );
};

export default AuthNav;
