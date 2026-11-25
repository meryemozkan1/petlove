import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Icon from '../../Icon/Icon';
import { removePet } from '../../../redux/auth/authOperations';
import styles from './PetsItem.module.css';

const FALLBACK_PET_IMG =
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const PetsItem = ({ pet }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await dispatch(removePet(pet._id)).unwrap();
      toast.success('Pet removed successfully!');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to remove pet');
      setIsDeleting(false);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <img
          src={pet.imgURL || pet.imgUrl || FALLBACK_PET_IMG}
          alt={pet.title || pet.name || 'Pet'}
          className={styles.image}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_PET_IMG;
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h4 className={styles.title} title={pet.title || pet.name}>
            {pet.title || pet.name}
          </h4>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Remove pet ${pet.name}`}
          >
            <Icon id="trash" width={18} height={18} />
          </button>
        </div>

        <ul className={styles.detailsList}>
          <li className={styles.detailItem}>
            <span className={styles.detailLabel}>Name</span>
            <span className={styles.detailValue}>{pet.name || '-'}</span>
          </li>
          <li className={styles.detailItem}>
            <span className={styles.detailLabel}>Birthday</span>
            <span className={styles.detailValue}>{formatDate(pet.birthday)}</span>
          </li>
          <li className={styles.detailItem}>
            <span className={styles.detailLabel}>Sex</span>
            <span className={styles.detailValue}>{pet.sex || '-'}</span>
          </li>
          <li className={styles.detailItem}>
            <span className={styles.detailLabel}>Species</span>
            <span className={styles.detailValue}>{pet.species || '-'}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default PetsItem;

