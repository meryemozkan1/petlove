import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import Icon from '../Icon/Icon';

const Modal = ({ isOpen, onClose, children, title = '' }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Kapat"
        >
          <Icon id="cross" width={22} height={22} />
        </button>

        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

