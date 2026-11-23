import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
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
        <PetBlock type="addPet" showInfo={false} className={styles.petBlock} />
      </div>
    </section>
  );
};

export default AddPetPage;

