import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import PetsList from '../PetsList/PetsList';
import ModalEditUser from '../../Modals/ModalEditUser/ModalEditUser';
import ModalApproveAction from '../../Modals/ModalApproveAction/ModalApproveAction';
import { selectUser } from '../../../redux/auth/authSelectors';
import styles from './UserCard.module.css';

const UserCard = () => {
  const user = useSelector(selectUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className={styles.userCard}>
      {/* Üst Satır: User Rozeti ve Edit Butonu */}
      <div className={styles.topRow}>
        <div className={styles.userBadge}>
          <span className={styles.userBadgeText}>User</span>
          <span className={styles.userBadgeIcon}>
            <Icon id="user-fill" width={16} height={16} />
          </span>
        </div>

        <button
          type="button"
          className={styles.editBtn}
          onClick={() => setIsEditModalOpen(true)}
          aria-label="Edit user information"
        >
          <Icon id="edit" width={18} height={18} />
        </button>
      </div>

      {/* Avatar Alanı */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'User avatar'}
              className={styles.avatarImg}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <Icon id="user-fill" width={48} height={48} />
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.uploadPhotoBtn}
          onClick={() => setIsEditModalOpen(true)}
        >
          Upload photo
        </button>
      </div>

      {/* My information */}
      <div className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>My information</h3>

        <div className={styles.infoFields}>
          <div className={styles.infoItem}>
            <span className={styles.infoText}>{user?.name || '-'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoText}>{user?.email || '-'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoText}>{user?.phone || '+380'}</span>
          </div>
        </div>
      </div>

      {/* My pets */}
      <div className={styles.petsSection}>
        <div className={styles.petsHeader}>
          <h3 className={styles.sectionTitle}>My pets</h3>
          <Link to="/add-pet" className={styles.addPetBtn}>
            <span>Add pet</span>
            <Icon id="plus" width={16} height={16} />
          </Link>
        </div>

        <PetsList pets={user?.pets || []} />
      </div>

      {/* Log Out Butonu */}
      <div className={styles.logoutWrapper}>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          LOG OUT
        </button>
      </div>

      {/* Modallar */}
      <ModalEditUser
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <ModalApproveAction
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default UserCard;

