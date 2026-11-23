import { useState } from 'react';
import styles from './SearchField.module.css';
import Icon from '../Icon/Icon';

const SearchField = ({
  placeholder = 'Arama yap...',
  initialValue = '',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={placeholder}
      />
      <div className={styles.buttonsGroup}>
        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Aramayı temizle"
          >
            <Icon id="cross" width={18} height={18} />
          </button>
        )}
        <button type="submit" className={styles.searchBtn} aria-label="Ara">
          <Icon id="search" width={18} height={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchField;

