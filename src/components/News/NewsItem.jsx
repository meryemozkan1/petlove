import styles from './NewsItem.module.css';

const FALLBACK_NEWS_IMG =
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const NewsItem = ({ news }) => {
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageWrapper}>
        <img
          src={news.imgUrl || news.image || news.url || FALLBACK_NEWS_IMG}
          alt={news.title || 'News cover'}
          className={styles.image}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_NEWS_IMG;
          }}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={news.title}>
          {news.title}
        </h3>

        <p className={styles.text} title={news.text}>
          {news.text}
        </p>

        <div className={styles.footer}>
          <time dateTime={news.date} className={styles.date}>
            {formatDate(news.date)}
          </time>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readMore}
            aria-label={`Read more about ${news.title}`}
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;

