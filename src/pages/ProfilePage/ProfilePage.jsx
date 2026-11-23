import Title from '../../components/Title/Title';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <section className={styles.profileSection}>
      <div className={`container ${styles.profileContainer}`}>
        <div className={styles.userCard}>
          <Title level={2}>User Information</Title>
          {/* UserCard / Avatar düzenleme, profil formu */}
        </div>
        <div className={styles.petsCard}>
          <div className={styles.petsHeader}>
            <Title level={2}>My pets</Title>
            {/* Add pet butonu */}
          </div>
          {/* Pets listesi */}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

