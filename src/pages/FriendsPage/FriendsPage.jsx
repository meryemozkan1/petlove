import Title from '../../components/Title/Title';
import styles from './FriendsPage.module.css';

const FriendsPage = () => {
  return (
    <section className={styles.friendsSection}>
      <div className={`container ${styles.friendsContainer}`}>
        <Title level={1}>Our friends</Title>
        <div className={styles.friendsList}>
          {/* Ortak ve dost barınak / kurum kartları */}
        </div>
      </div>
    </section>
  );
};

export default FriendsPage;

