import { useState } from 'react';
import styles from './LogOutBtn.module.css';
import Icon from '../Icon/Icon';
import ModalApproveAction from '../Modals/ModalApproveAction/ModalApproveAction';

const LogOutBtn = ({ variant = 'default', className = '', onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onClick) onClick();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.logoutBtn} ${styles[variant]} ${className}`}
        onClick={handleOpenModal}
        aria-label="Log out"
      >
        <span className={styles.text}>LOG OUT</span>
        <Icon id="logout" width={18} height={18} className={styles.icon} />
      </button>

      <ModalApproveAction isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default LogOutBtn;
