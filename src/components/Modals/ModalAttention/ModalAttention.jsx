import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import styles from './ModalAttention.module.css';

const ModalAttention = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="attention-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon id="cross" width={24} height={24} />
        </button>

        <div className={styles.iconCircle}>
          <Icon id="cat-modal" width={80} height={80} />
        </div>

        <h3 id="attention-modal-title" className={styles.title}>
          Attention
        </h3>

        <p className={styles.description}>
          We would like to remind you that certain functionality is available only
          to authorized users. If you have an account, please log in with your
          credentials. If you do not already have an account, you must first
          register to access these features.
        </p>

        <div className={styles.buttonGroup}>
          <Link to="/login" onClick={onClose} className={styles.loginBtn}>
            Log In
          </Link>
          <Link to="/register" onClick={onClose} className={styles.registerBtn}>
            Registration
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalAttention;
