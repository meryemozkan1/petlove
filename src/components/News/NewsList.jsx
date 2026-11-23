import NewsItem from './NewsItem';
import styles from './NewsList.module.css';

const NewsList = ({ items = [], emptyMessage = 'No news found matching your search.' }) => {
  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer} role="status">
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((news) => (
        <li key={news._id || news.id} className={styles.item}>
          <NewsItem news={news} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

