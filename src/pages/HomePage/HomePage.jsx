import { useState } from 'react';
import homeMob from '../../assets/images/home-mob.jpg';
import homeMob2x from '../../assets/images/home-mob@2x.jpg';
import homeTab from '../../assets/images/home-tab.jpg';
import homeTab2x from '../../assets/images/home-tab@2x.jpg';
import homeDesk from '../../assets/images/home-desk.jpg';
import homeDesk2x from '../../assets/images/home-desk@2x.jpg';

import styles from './HomePage.module.css';

// Yerel görsel bulunamadığında veya yüklenemediğinde çalışan yüksek çözünürlüklü yedek görsel
const FALLBACK_HOME_DOG_URL =
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1280&q=80';

const HomePage = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className={styles.homeSection} aria-label="Welcome to Petlove">
      <div className={`container ${styles.homeContainer}`}>
        {/* Üst Kısım: Header ile birleşik turuncu Hero Kartı */}
        <div className={styles.heroCard}>
          <h1 className={styles.title}>
            Take good <span className={styles.careHighlight}>care</span> of small pets
          </h1>
          <p className={styles.description}>
            Choosing a pet for your home is a choice embracing love, joy and companionship.
          </p>
        </div>

        {/* Alt Kısım: Tam Genişlikte Retina Uyumlu Responsive Görsel */}
        <div className={styles.imageWrapper}>
          {imgError ? (
            <img
              src={FALLBACK_HOME_DOG_URL}
              alt="Woman embracing happy dog - Petlove"
              className={styles.heroImg}
              loading="eager"
              fetchPriority="high"
              width="1216"
              height="384"
            />
          ) : (
            <picture className={styles.picture}>
              {/* Desktop Kırılımı (1280px+) */}
              <source
                media="(min-width: 1280px)"
                srcSet={`${homeDesk} 1x, ${homeDesk2x} 2x`}
              />
              {/* Tablet Kırılımı (768px - 1279px) */}
              <source
                media="(min-width: 768px)"
                srcSet={`${homeTab} 1x, ${homeTab2x} 2x`}
              />
              {/* Mobil Kırılımı (< 768px) */}
              <source
                media="(max-width: 767px)"
                srcSet={`${homeMob} 1x, ${homeMob2x} 2x`}
              />
              {/* Fallback & Optimizasyon Parametreleri */}
              <img
                src={homeDesk}
                alt="Woman embracing happy dog - Petlove"
                className={styles.heroImg}
                loading="eager"
                fetchPriority="high"
                width="1216"
                height="384"
                onError={() => setImgError(true)}
              />
            </picture>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
