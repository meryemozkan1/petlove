import PetsItem from '../PetsItem/PetsItem';
import styles from './PetsList.module.css';

const PetsList = ({ pets = [] }) => {
  if (!pets || pets.length === 0) {
    return null;
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

