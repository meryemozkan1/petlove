import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MobileMenu.module.css';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import Icon from '../Icon/Icon';

const MobileMenu = ({ isOpen, onClose, isLoggedIn }) => {
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
      aria-label="Mobile Navigation Menu"
    >
      <div className={styles.drawer}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Menüyü kapat"
        >
          <Icon id="cross" width={28} height={28} />
        </button>

        <div className={styles.navSection}>
          <Nav onItemClick={onClose} className={styles.mobileNav} isHome={false} />
        </div>

        <div className={styles.bottomSection}>
          {isLoggedIn ? (
            <LogOutBtn
              className={styles.mobileLogoutBtn}
              onClick={onClose}
              variant="default"
            />
          ) : (
            <AuthNav
              onItemClick={onClose}
              className={styles.mobileAuthNav}
              isHome={false}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;

