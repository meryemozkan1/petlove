import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loader text="Sayfa yükleniyor..." />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;

