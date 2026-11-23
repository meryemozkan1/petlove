import styles from './Pagination.module.css';
import Icon from '../Icon/Icon';

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const handleFirst = () => {
    if (currentPage > 1) onPageChange(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleLast = () => {
    if (currentPage < totalPages) onPageChange(totalPages);
  };

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Pagination">
      {/* İlk Sayfa << */}
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handleFirst}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <span className={styles.doubleArrow}>«</span>
      </button>

      {/* Önceki Sayfa < */}
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Icon id="chevron-left" width={16} height={16} />
      </button>

      {/* Sayfa Numaraları ve ... */}
      <div className={styles.pagesList}>
        {items.map((item, index) => {
          if (item === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
                ...
              </span>
            );
          }

          const pageNum = Number(item);
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              type="button"
              className={`${styles.pageBtn} ${isActive ? styles.active : ''}`}
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Sonraki Sayfa > */}
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <Icon id="chevron-right" width={16} height={16} />
      </button>

      {/* Son Sayfa >> */}
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={handleLast}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <span className={styles.doubleArrow}>»</span>
      </button>
    </nav>
  );
};

export default Pagination;
