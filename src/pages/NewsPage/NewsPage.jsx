import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/News/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { fetchNews } from '../../redux/news/newsOperations';
import {
  setNewsPage,
  setNewsKeyword,
} from '../../redux/news/newsSlice';
import {
  selectNews,
  selectNewsPage,
  selectNewsTotalPages,
  selectNewsKeyword,
  selectNewsLoading,
} from '../../redux/news/newsSelectors';
import styles from './NewsPage.module.css';

const NewsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectNews);
  const page = useSelector(selectNewsPage);
  const totalPages = useSelector(selectNewsTotalPages);
  const keyword = useSelector(selectNewsKeyword);
  const isLoading = useSelector(selectNewsLoading);

  useEffect(() => {
    dispatch(fetchNews({ page, limit: 6, keyword }));
  }, [dispatch, page, keyword]);

  const handleSearch = (newKeyword) => {
    dispatch(setNewsKeyword(newKeyword));
  };

  const handlePageChange = (newPage) => {
    dispatch(setNewsPage(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.newsSection} aria-label="News Page">
      <div className={`container ${styles.newsContainer}`}>
        <div className={styles.headerRow}>
          <Title level={1} className={styles.pageTitle}>
            News
          </Title>
          <div className={styles.searchWrapper}>
            <SearchField
              placeholder="Search"
              initialValue={keyword}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {isLoading && items.length === 0 ? (
          <div className={styles.loaderWrapper}>
            <Loader text="Loading news..." />
          </div>
        ) : (
          <>
            <NewsList
              items={items}
              emptyMessage={
                keyword
                  ? `No news found for "${keyword}". Try another keyword.`
                  : 'No news available at the moment.'
              }
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default NewsPage;
