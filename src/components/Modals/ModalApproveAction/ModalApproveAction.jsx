import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './ModalApproveAction.module.css';
import Icon from '../../Icon/Icon';
import { logout } from '../../../redux/auth/authOperations';
import { resetAuth } from '../../../redux/auth/authSlice';
import { clearAuthHeader } from '../../../services/api';

const ModalApproveAction = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const handleConfirmLogout = async () => {
    try {
      setIsSubmitting(true);
      await dispatch(logout()).unwrap();
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Logout request failed on server');
    } finally {
      // Backend cevabından bağımsız olarak oturumu sıfırla
      dispatch(resetAuth());
      clearAuthHeader();
      try {
        localStorage.removeItem('persist:petlove_auth');
      } catch {
        // localStorage hatasını sessizce karşıla
      }
      setIsSubmitting(false);
      onClose();
      navigate('/home');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Modalı kapat"
        >
          <Icon id="cross" width={24} height={24} />
        </button>

        <div className={styles.avatarWrapper}>
          <Icon id="cat-modal" width={80} height={80} />
        </div>

        <h3 id="approve-modal-title" className={styles.title}>
          Already leaving?
        </h3>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.yesBtn}
            onClick={handleConfirmLogout}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Leaving...' : 'Yes'}
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalApproveAction;
