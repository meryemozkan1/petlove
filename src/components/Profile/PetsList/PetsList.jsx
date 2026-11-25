import PetsItem from '../PetsItem/PetsItem';
import styles from './PetsList.module.css';

const PetsList = ({ pets = [] }) => {
  if (!pets || pets.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>You haven&apos;t added any pets yet.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
  );
};

export default PetsList;
