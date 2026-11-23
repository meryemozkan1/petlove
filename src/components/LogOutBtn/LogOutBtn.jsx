import styles from './LogOutBtn.module.css';
import Icon from '../Icon/Icon';

const LogOutBtn = ({ onLogout, variant = 'default', className = '' }) => {
  return (
    <button
      type="button"
      className={`${styles.logoutBtn} ${styles[variant]} ${className}`}
      onClick={onLogout}
      aria-label="Çıkış yap"
    >
      <span className={styles.text}>LOG OUT</span>
      <Icon id="logout" width={18} height={18} className={styles.icon} />
    </button>
  );
};

export default LogOutBtn;

