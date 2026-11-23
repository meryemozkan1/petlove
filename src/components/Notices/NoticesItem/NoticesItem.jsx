import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Icon from '../../Icon/Icon';
import { addFavorite, removeFavorite } from '../../../redux/notices/noticesOperations';
import { selectNoticesFavorites } from '../../../redux/notices/noticesSelectors';
import { selectIsLoggedIn, selectUser } from '../../../redux/auth/authSelectors';
import styles from './NoticesItem.module.css';

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

const NoticesItem = ({ notice, onLearnMore, onAttention }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectNoticesFavorites);
  const authUser = useSelector(selectUser);

  const [isFavLoading, setIsFavLoading] = useState(false);

  const id = notice._id;

  // Favori kontrolü: notices.favorites ve authUser.noticesFavorites
  const userFavorites = authUser?.noticesFavorites || [];
  const isFavorite =
    favorites.includes(id) ||
    userFavorites.some((fav) => (typeof fav === 'object' && fav !== null ? fav._id === id : fav === id));

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      onAttention();
      return;
    }

    if (isFavLoading) return;

    try {
      setIsFavLoading(true);
      if (isFavorite) {
        await dispatch(removeFavorite(id)).unwrap();
        toast.success('Removed from favorites!');
      } else {
        await dispatch(addFavorite(id)).unwrap();
        toast.success('Added to favorites!');
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Action failed');
    } finally {
      setIsFavLoading(false);
    }
  };

  const handleLearnMoreClick = () => {
    if (!isLoggedIn) {
      onAttention();
      return;
    }
    onLearnMore(id, notice);
  };

  return (
    <li className={styles.cardItem}>
      <article className={styles.card}>
        {/* Görsel Alanı */}
        <div className={styles.imageWrapper}>
          <img
            src={
              notice.imgURL ||
              notice.imgUrl ||
              notice.image ||
              FALLBACK_PET_IMG
            }
            alt={notice.title || 'Pet'}
            className={styles.image}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_PET_IMG;
            }}
          />

          {/* Sağ üstte yıldız + popülerlik puanı rozeti */}
          <div className={styles.ratingBadge}>
            <span className={styles.starIcon}>
              <Icon id="star" width={16} height={16} />
            </span>
            <span className={styles.ratingText}>{notice.popularity || 0}</span>
          </div>
        </div>

        {/* Kart İçeriği */}
        <div className={styles.content}>
          <h3 className={styles.title} title={notice.title}>
            {notice.title}
          </h3>

          {/* Özellikler Grid */}
          <ul className={styles.statsGrid}>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Name</span>
              <span className={styles.statValue}>{notice.name || '-'}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Birthday</span>
              <span className={styles.statValue}>{formatDate(notice.birthday)}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Sex</span>
              <span className={styles.statValue}>{notice.sex || '-'}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Species</span>
              <span className={styles.statValue}>{notice.species || '-'}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Category</span>
              <span className={styles.statValue}>{notice.category || '-'}</span>
            </li>
          </ul>

          {/* Yorum / Açıklama */}
          <p className={styles.comment} title={notice.comment}>
            {notice.comment || 'No additional comment.'}
          </p>

          {/* Alt Kısım: Fiyat & Butonlar */}
          <div className={styles.footer}>
            <div className={styles.priceTag}>
              {notice.price ? `$${notice.price}` : 'Free'}
            </div>

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.learnMoreBtn}
                onClick={handleLearnMoreClick}
              >
                Learn more
              </button>

              <button
                type="button"
                className={`${styles.heartBtn} ${
                  isFavorite ? styles.heartBtnActive : ''
                }`}
                onClick={handleHeartClick}
                disabled={isFavLoading}
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <Icon
                  id={isFavorite ? 'heart-filled' : 'heart'}
                  width={18}
                  height={18}
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default NoticesItem;
