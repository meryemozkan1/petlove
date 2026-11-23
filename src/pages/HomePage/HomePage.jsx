import Title from '../../components/Title/Title';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={styles.homeSection}>
      <div className={`container ${styles.homeContainer}`}>
        <div className={styles.heroCard}>
          <Title level={1} className={styles.mainTitle}>
            Take good <span className={styles.highlight}>care</span> of small pets
          </Title>
          <p className={styles.subtitle}>
            Choosing a pet for your home is a choice embracing love, joy and companionship.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          {/* Hero görsel alanı */}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

