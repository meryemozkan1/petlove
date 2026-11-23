import Title from '../../components/Title/Title';
import styles from './AddPetPage.module.css';

const AddPetPage = () => {
  return (
    <section className={styles.addPetSection}>
      <div className={`container ${styles.addPetContainer}`}>
        <div className={styles.formCard}>
          <Title level={1} className={styles.title}>Add pet</Title>
          <form className={styles.form}>
            {/* Evcil hayvan ekleme formu: Title, Name, Species, Birthday, Avatar vb. */}
          </form>
        </div>
        <div className={styles.imageBlock}>
          {/* Görsel alanı */}
        </div>
      </div>
    </section>
  );
};

export default AddPetPage;

