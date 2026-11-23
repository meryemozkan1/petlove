import styles from './Pagination.module.css';
import Icon from '../Icon/Icon';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const maxVisible = 4;
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, idx) => startPage + idx
  );

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Sayfalama">
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="İlk sayfa"
      >
        <span className={styles.doubleArrow}>«</span>
      </button>

      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Önceki sayfa"
      >
        <Icon id="chevron-left" width={16} height={16} />
      </button>

      <div className={styles.pagesList}>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ''}`}
            onClick={() => onPageChange(pageNum)}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Sonraki sayfa"
      >
        <Icon id="chevron-right" width={16} height={16} />
      </button>

      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Son sayfa"
      >
        <span className={styles.doubleArrow}>»</span>
      </button>
    </nav>
  );
};

export default Pagination;
