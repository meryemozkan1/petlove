import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import NoticesItem from '../../Notices/NoticesItem/NoticesItem';
import ModalNotice from '../../Modals/ModalNotice/ModalNotice';
import { removeFavorite } from '../../../redux/notices/noticesOperations';
import { selectUser } from '../../../redux/auth/authSelectors';
import styles from './MyNotices.module.css';

const MyNotices = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' | 'viewed'
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [selectedNoticeData, setSelectedNoticeData] = useState(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const favoriteNotices = user?.noticesFavorites || [];
  const viewedNotices = user?.noticesViewed || [];

  const currentList = activeTab === 'favorites' ? favoriteNotices : viewedNotices;

  const handleLearnMore = (id, notice) => {
    setSelectedNoticeId(id);
    setSelectedNoticeData(notice);
    setIsNoticeModalOpen(true);
  };

  const handleTrashFavorite = async (id) => {
    try {
      await dispatch(removeFavorite(id)).unwrap();
      toast.success('Removed from favorites!');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to remove from favorites');
    }
  };

  return (
    <div className={styles.myNoticesContainer}>
      {/* Sekmeler (Tabs) */}
      <div className={styles.tabsRow}>
        <button
          type="button"
          className={`${styles.tabBtn} ${
            activeTab === 'favorites' ? styles.tabBtnActive : ''
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          My favorite pets
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${
            activeTab === 'viewed' ? styles.tabBtnActive : ''
          }`}
          onClick={() => setActiveTab('viewed')}
        >
          Viewed
        </button>
      </div>

      {/* İlan Listesi veya Boş Durum */}
      {currentList.length === 0 ? (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>
            Oops,{' '}
            <span className={styles.highlightText}>
              looks like there aren&apos;t any furries
            </span>{' '}
            on our adorable page yet. Do not worry! View your pets on the
            &ldquo;find your favorite pet&rdquo; page and add them to your
            favorites.
          </p>
        </div>
      ) : (
        <ul className={styles.noticesGrid}>
          {currentList.map((notice) => {
            const noticeObj = typeof notice === 'object' && notice !== null ? notice : { _id: notice };
            return (
              <NoticesItem
                key={noticeObj._id}
                notice={noticeObj}
                onLearnMore={handleLearnMore}
                onAttention={() => {}}
                showTrash={activeTab === 'favorites'}
                onTrash={handleTrashFavorite}
              />
            );
          })}
        </ul>
      )}

      {/* İlan Detay Modalı */}
      <ModalNotice
        isOpen={isNoticeModalOpen}
        onClose={() => {
          setIsNoticeModalOpen(false);
          setSelectedNoticeId(null);
          setSelectedNoticeData(null);
        }}
        noticeId={selectedNoticeId}
        initialNotice={selectedNoticeData}
      />
    </div>
  );
};

export default MyNotices;

