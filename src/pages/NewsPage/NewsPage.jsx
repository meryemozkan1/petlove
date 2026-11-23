import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import styles from './NewsPage.module.css';

const NewsPage = () => {
  return (
    <section className={styles.newsSection}>
      <div className={`container ${styles.newsContainer}`}>
        <div className={styles.headerRow}>
          <Title level={1}>News</Title>
          <SearchField placeholder="Search news" />
        </div>
        <div className={styles.newsList}>
          {/* Haber kartları listesi */}
        </div>
      </div>
    </section>
  );
};

export default NewsPage;

