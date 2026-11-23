import { Link } from 'react-router-dom';
import styles from './UserBar.module.css';
import Icon from '../Icon/Icon';

const UserBar = ({ user, className = '', onClick }) => {
  const userName = user?.name || 'User';
  const avatarUrl = user?.avatar;

  return (
    <Link to="/profile" className={`${styles.userBar} ${className}`} onClick={onClick}>
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <Icon id="user" width={20} height={20} className={styles.userIcon} />
          </div>
        )}
      </div>
      <span className={styles.name}>{userName}</span>
    </Link>
  );
};

export default UserBar;

