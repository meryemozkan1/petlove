import styles from './UserNav.module.css';
import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

const UserNav = ({ user, onLogout, className = '', isHome = false, showLogout = true }) => {
  return (
    <div className={`${styles.userNav} ${className}`}>
      {showLogout && (
        <LogOutBtn
          variant={isHome ? 'homeTheme' : 'default'}
          className={styles.logout}
          onClick={onLogout}
        />
      )}
      <UserBar user={user} isHome={isHome} />
    </div>
  );
};

export default UserNav;
