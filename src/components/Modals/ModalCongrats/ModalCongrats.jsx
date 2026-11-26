import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import styles from './ModalCongrats.module.css';

const ModalCongrats = ({ isOpen, onClose, redirectToProfile = true }) => {
  const navigate = useNavigate();

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

  const handleGoToProfile = () => {
    onClose();
    if (redirectToProfile) {
      navigate('/profile');
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="congrats-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close congratulations modal"
        >
          <Icon id="cross" width={24} height={24} />
        </button>

        <div className={styles.iconCircle}>
          <Icon id="cat-modal" width={80} height={80} />
        </div>

        <h3 id="congrats-modal-title" className={styles.title}>
          Congrats
        </h3>

        <p className={styles.description}>
          The first fluff in the collection! May your acquaintance be pleasant
          and give you only positive emotions!
        </p>

        <button
          type="button"
          className={styles.profileBtn}
          onClick={handleGoToProfile}
        >
          Go to profile
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalCongrats;

