import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import styles from './NoticesPage.module.css';

const NoticesPage = () => {
  return (
    <section className={styles.noticesSection}>
      <div className={`container ${styles.noticesContainer}`}>
        <Title level={1}>Find your favorite pet</Title>
        <div className={styles.filtersBlock}>
          <SearchField placeholder="Search pets" />
          {/* Kategori, tür, cinsiyet filtreleri */}
        </div>
        <div className={styles.noticesList}>
          {/* Notice kartları listesi */}
        </div>
      </div>
    </section>
  );
};

export default NoticesPage;

