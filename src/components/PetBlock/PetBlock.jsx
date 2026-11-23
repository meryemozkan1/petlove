import styles from './PetBlock.module.css';
import Icon from '../Icon/Icon';

const PetBlock = ({ pet, onDelete, showDelete = false }) => {
  if (!pet) return null;

  return (
    <article className={styles.petCard}>
      <div className={styles.imageWrapper}>
        <img
          src={pet.imgURL || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'}
          alt={pet.title || pet.name || 'Pet'}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{pet.title || pet.name}</h3>
          {showDelete && onDelete && (
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => onDelete(pet._id || pet.id)}
              aria-label="Evcil hayvanı sil"
            >
              <Icon id="trash" width={18} height={18} />
            </button>
          )}
        </div>

        <ul className={styles.detailsList}>
          {pet.name && (
            <li className={styles.detailItem}>
              <span className={styles.label}>İsim:</span>
              <span className={styles.value}>{pet.name}</span>
            </li>
          )}
          {pet.birthday && (
            <li className={styles.detailItem}>
              <span className={styles.label}>Doğum Tarihi:</span>
              <span className={styles.value}>{pet.birthday}</span>
            </li>
          )}
          {pet.species && (
            <li className={styles.detailItem}>
              <span className={styles.label}>Tür:</span>
              <span className={styles.value}>{pet.species}</span>
            </li>
          )}
          {pet.sex && (
            <li className={styles.detailItem}>
              <span className={styles.label}>Cinsiyet:</span>
              <span className={styles.value}>{pet.sex}</span>
            </li>
          )}
        </ul>

        {pet.comments && <p className={styles.comments}>{pet.comments}</p>}
      </div>
    </article>
  );
};

export default PetBlock;

