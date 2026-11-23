import styles from './Loader.module.css';
import Icon from '../Icon/Icon';

const Loader = ({
  size = 'medium',
  text = 'Yükleniyor...',
  isOverlay = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.loaderContainer} ${isOverlay ? styles.overlay : ''} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={`${styles.spinner} ${styles[size]}`}>
        <Icon id="paw" width={32} height={32} className={styles.pawIcon} />
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;
