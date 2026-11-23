import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.notFoundSection}>
      <div className={`container ${styles.notFoundContainer}`}>
        <div className={styles.card}>
          <span className={styles.status}>404</span>
          <Title level={1} className={styles.title}>Ooops! This page not found :&#40;</Title>
          <p className={styles.description}>
            The link you followed probably may be broken, or the page has been removed.
          </p>
          <Link to="/" className={styles.homeBtn}>
            To home page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

