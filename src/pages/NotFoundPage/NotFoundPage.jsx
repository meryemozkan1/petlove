import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const CAT_404_IMG =
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80';
const CAT_404_FALLBACK =
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80';

const NotFoundPage = () => {
  return (
    <section className={styles.notFoundSection}>
      <div className={`container ${styles.notFoundContainer}`}>
        <div className={styles.card}>
          <div className={styles.codeRow} aria-label="404">
            <span className={styles.digit}>4</span>
            <div className={styles.catCircle}>
              <img
                src={CAT_404_IMG}
                alt="Cute cat"
                className={styles.catImg}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = CAT_404_FALLBACK;
                }}
              />
            </div>
            <span className={styles.digit}>4</span>
          </div>

          <h1 className={styles.title}>Ooops! This page not found :(</h1>

          <Link to="/home" className={styles.homeBtn}>
            To home page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
