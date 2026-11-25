import PetBlock from '../../components/PetBlock/PetBlock';
import AddPetForm from '../../components/AddPet/AddPetForm/AddPetForm';
import styles from './AddPetPage.module.css';

const AddPetPage = () => {
  return (
    <section className={styles.addPetSection}>
      <div className={`container ${styles.addPetContainer}`}>
        {/* Sol Panel: Gözlüklü Köpek Görsel Bloğu */}
        <div className={styles.petBlockWrapper}>
          <PetBlock type="addPet" showInfo={false} className={styles.petBlock} />
        </div>

        {/* Sağ Panel: Form Kartı */}
        <div className={styles.formCard}>
          <div className={styles.headerBlock}>
            <h1 className={styles.title}>Add pet</h1>
            <p className={styles.subtitle}>Personal details</p>
          </div>

          <AddPetForm />
        </div>
      </div>
    </section>
  );
};

export default AddPetPage;
