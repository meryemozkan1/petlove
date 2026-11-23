import styles from './UserNav.module.css';
import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

const UserNav = ({ user, onLogout, className = '' }) => {
  return (
    <div className={`${styles.userNav} ${className}`}>
      <LogOutBtn onLogout={onLogout} className={styles.logout} />
      <UserBar user={user} />
    </div>
  );
};

export default UserNav;

