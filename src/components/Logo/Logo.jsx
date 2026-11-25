import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Logo.module.css';

const Logo = ({ isHome = false, onClick }) => {
  return (
    <Link
      to="/home"
      className={`${styles.logoLink} ${isHome ? styles.logoHome : styles.logoDefault}`}
      onClick={onClick}
      aria-label="Petlove Home"
    >
      <span>petl</span>
      <span className={styles.heartWrapper}>
        <Icon id="heart-filled" width={20} height={20} className={styles.heartIcon} />
      </span>
      <span>ve</span>
    </Link>
  );
};

export default Logo;
