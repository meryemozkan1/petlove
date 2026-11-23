import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { selectIsGlobalLoading } from '../../redux/globalSelectors';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loader text="Sayfa yükleniyor..." />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Redux'taki genel isLoading aktifken gösterilen yükleme göstergesi */}
      {isGlobalLoading && <Loader isOverlay text="İşlem yapılıyor..." />}
    </div>
  );
};

export default MainLayout;
