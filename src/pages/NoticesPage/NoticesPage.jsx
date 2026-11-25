import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/Notices/NoticesList/NoticesList';
import ModalAttention from '../../components/Modals/ModalAttention/ModalAttention';
import ModalNotice from '../../components/Modals/ModalNotice/ModalNotice';
import ModalCongrats from '../../components/Modals/ModalCongrats/ModalCongrats';
import { fetchNotices, fetchNoticeById } from '../../redux/notices/noticesOperations';
import {
  selectNotices,
  selectNoticesPage,
  selectNoticesTotalPages,
  selectNoticesFilters,
  selectNoticesLoading,
} from '../../redux/notices/noticesSelectors';
import { setNoticesPage } from '../../redux/notices/noticesSlice';
import styles from './NoticesPage.module.css';

const NoticesPage = () => {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const page = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);
  const filters = useSelector(selectNoticesFilters);
  const isLoading = useSelector(selectNoticesLoading);

  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [activeNoticeId, setActiveNoticeId] = useState(null);
  const [activeNoticeData, setActiveNoticeData] = useState(null);

  // Filtreler veya sayfa değiştiğinde notices çek
  useEffect(() => {
    const params = {
      page,
      limit: 6,
    };

    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category) params.category = filters.category;
    if (filters.species) params.species = filters.species;
    if (filters.sex) params.sex = filters.sex;
    if (filters.locationId) params.locationId = filters.locationId;
    if (filters.byPopularity !== null && filters.byPopularity !== undefined) {
      params.byPopularity = filters.byPopularity;
    }
    if (filters.byPrice !== null && filters.byPrice !== undefined) {
      params.byPrice = filters.byPrice;
    }

    dispatch(fetchNotices(params));
  }, [dispatch, page, filters]);

  const handlePageChange = (newPage) => {
    dispatch(setNoticesPage(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLearnMore = (id, notice) => {
    setActiveNoticeId(id);
    setActiveNoticeData(notice);
    dispatch(fetchNoticeById(id));
    setIsNoticeOpen(true);
  };

  const handleAttention = () => {
    setIsAttentionOpen(true);
  };

  return (
    <section className={styles.noticesSection}>
      <div className={`container ${styles.noticesContainer}`}>
        <Title level={1}>Find your favorite pet</Title>

        {/* Filtreleme Bloğu */}
        <NoticesFilters />

        {/* İlan Listesi veya Yükleme Göstergesi */}
        {isLoading && notices.length === 0 ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <NoticesList
            notices={notices}
            onLearnMore={handleLearnMore}
            onAttention={handleAttention}
            onFirstFavorite={() => setIsCongratsOpen(true)}
          />
        )}

        {/* Sayfalama */}
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Yetkisiz Kullanıcı Uyarısı Modalı */}
        <ModalAttention
          isOpen={isAttentionOpen}
          onClose={() => setIsAttentionOpen(false)}
        />

        {/* İlan Detay Modalı */}
        <ModalNotice
          isOpen={isNoticeOpen}
          onClose={() => {
            setIsNoticeOpen(false);
            setActiveNoticeId(null);
            setActiveNoticeData(null);
          }}
          noticeId={activeNoticeId}
          initialNotice={activeNoticeData}
          onFirstFavorite={() => setIsCongratsOpen(true)}
        />

        {/* Tebrikler Modalı (İlk favoride) */}
        <ModalCongrats
          isOpen={isCongratsOpen}
          onClose={() => setIsCongratsOpen(false)}
        />
      </div>
    </section>
  );
};

export default NoticesPage;
