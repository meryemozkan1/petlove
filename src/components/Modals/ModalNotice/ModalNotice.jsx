import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Icon from '../../Icon/Icon';
import Loader from '../../Loader/Loader';
import {
  fetchNoticeById,
  addFavorite,
  removeFavorite,
} from '../../../redux/notices/noticesOperations';
import {
  selectSelectedNotice,
  selectNoticesFavorites,
  selectNoticesLoading,
} from '../../../redux/notices/noticesSelectors';
import { selectUser } from '../../../redux/auth/authSelectors';
import styles from './ModalNotice.module.css';

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

const ModalNotice = ({
  isOpen,
  onClose,
  noticeId,
  initialNotice = null,
  onFirstFavorite = null,
}) => {
  const dispatch = useDispatch();
  const selectedNotice = useSelector(selectSelectedNotice);
  const favorites = useSelector(selectNoticesFavorites);
  const authUser = useSelector(selectUser);
  const isLoading = useSelector(selectNoticesLoading);

  const [isFavLoading, setIsFavLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (noticeId && (!selectedNotice || selectedNotice._id !== noticeId)) {
      dispatch(fetchNoticeById(noticeId));
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, noticeId, selectedNotice, dispatch, onClose]);

  if (!isOpen) return null;

  const currentNotice =
    selectedNotice && selectedNotice._id === noticeId
      ? selectedNotice
      : initialNotice || selectedNotice;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const id = currentNotice?._id || noticeId;

  // Favori kontrolü: notices.favorites ve authUser.noticesFavorites'ı kontrol et
  const userFavorites = authUser?.noticesFavorites || [];
  const isFavorite =
    favorites.includes(id) ||
    userFavorites.some((fav) => (typeof fav === 'object' && fav !== null ? fav._id === id : fav === id));

  const handleToggleFavorite = async () => {
    if (!id || isFavLoading) return;
    try {
      setIsFavLoading(true);
      if (isFavorite) {
        await dispatch(removeFavorite(id)).unwrap();
        toast.success('Removed from favorites!');
      } else {
        const isFirstFavorite = userFavorites.length === 0 && favorites.length === 0;
        await dispatch(addFavorite(id)).unwrap();
        toast.success('Added to favorites!');
        if (isFirstFavorite && onFirstFavorite) {
          onClose();
          onFirstFavorite();
        }
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Action failed');
    } finally {
      setIsFavLoading(false);
    }
  };

  // İletişim bilgisi: telefon varsa tel:, yoksa e-posta mailto:
  const contactPhone = currentNotice?.user?.phone;
  const contactEmail = currentNotice?.user?.email;
  const contactHref = contactPhone
    ? `tel:${contactPhone.replace(/\s+/g, '')}`
    : contactEmail
    ? `mailto:${contactEmail}`
    : null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close notice details modal"
        >
          <Icon id="cross" width={24} height={24} />
        </button>

        {!currentNotice && isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : currentNotice ? (
          <>
            {/* Üst Kısım: Görsel + Kategori Etiketi */}
            <div className={styles.imageBlock}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    currentNotice.imgURL ||
                    currentNotice.imgUrl ||
                    currentNotice.image ||
                    FALLBACK_PET_IMG
                  }
                  alt={currentNotice.title || 'Pet image'}
                  className={styles.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_PET_IMG;
                  }}
                />
                <span className={styles.categoryBadge}>
                  {currentNotice.category || 'pet'}
                </span>
              </div>
            </div>

            {/* Başlık ve Popülerlik */}
            <div className={styles.headerInfo}>
              <h3 id="notice-modal-title" className={styles.title}>
                {currentNotice.title}
              </h3>

              <div className={styles.ratingWrapper} title={`Popularity: ${currentNotice.popularity || 0}`}>
                <span className={styles.starIcon}>
                  <Icon id="star" width={16} height={16} />
                </span>
                <span className={styles.popularityScore}>
                  {currentNotice.popularity || 0}
                </span>
              </div>
            </div>

            {/* Bilgi Tablosu / Özellikler */}
            <ul className={styles.detailsList}>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{currentNotice.name || '-'}</span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Birthday</span>
                <span className={styles.detailValue}>{formatDate(currentNotice.birthday)}</span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Sex</span>
                <span className={styles.detailValue}>{currentNotice.sex || '-'}</span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Species</span>
                <span className={styles.detailValue}>{currentNotice.species || '-'}</span>
              </li>
              {currentNotice.category && (
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Category</span>
                  <span className={styles.detailValue}>{currentNotice.category}</span>
                </li>
              )}
            </ul>

            {/* Yorum / Açıklama Metni */}
            <p className={styles.comment}>
              {currentNotice.comment || 'No additional comments provided.'}
            </p>

            {/* Fiyat Bilgisi */}
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.priceValue}>
                {currentNotice.price ? `$${currentNotice.price}` : 'Free'}
              </span>
            </div>

            {/* Buton Grubu: Add to / Remove from ♥ + Contact */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.favBtn}
                onClick={handleToggleFavorite}
                disabled={isFavLoading}
              >
                <span>{isFavorite ? 'Remove from' : 'Add to'}</span>
                <Icon
                  id={isFavorite ? 'heart-filled' : 'heart'}
                  width={18}
                  height={18}
                />
              </button>

              {contactHref ? (
                <a
                  href={contactHref}
                  className={styles.contactBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              ) : (
                <button type="button" className={styles.contactBtn} disabled>
                  Contact
                </button>
              )}
            </div>
          </>
        ) : (
          <p className={styles.errorText}>Could not load pet information.</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalNotice;

