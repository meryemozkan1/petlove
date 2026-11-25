import NoticesItem from '../NoticesItem/NoticesItem';
import styles from './NoticesList.module.css';

const NoticesList = ({ notices, onLearnMore, onAttention, onFirstFavorite }) => {
  if (!notices || notices.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>
          Oops! No notices found matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {notices.map((notice) => (
        <NoticesItem
          key={notice._id}
          notice={notice}
          onLearnMore={onLearnMore}
          onAttention={onAttention}
          onFirstFavorite={onFirstFavorite}
        />
      ))}
    </ul>
  );
};

export default NoticesList;

