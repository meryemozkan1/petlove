import { useState } from 'react';
import registerMob from '../../assets/images/register-mob.jpg';
import registerMob2x from '../../assets/images/register-mob@2x.jpg';
import registerTab from '../../assets/images/register-tab.jpg';
import registerTab2x from '../../assets/images/register-tab@2x.jpg';
import registerDesk from '../../assets/images/register-desk.jpg';
import registerDesk2x from '../../assets/images/register-desk@2x.jpg';

import loginMob from '../../assets/images/login-mob.jpg';
import loginMob2x from '../../assets/images/login-mob@2x.jpg';
import loginTab from '../../assets/images/login-tab.jpg';
import loginTab2x from '../../assets/images/login-tab@2x.jpg';
import loginDesk from '../../assets/images/login-desk.jpg';
import loginDesk2x from '../../assets/images/login-desk@2x.jpg';

import addPetMob from '../../assets/images/add-pet-mob.jpg';
import addPetMob2x from '../../assets/images/add-pet-mob@2x.jpg';
import addPetTab from '../../assets/images/add-pet-tab.jpg';
import addPetTab2x from '../../assets/images/add-pet-tab@2x.jpg';
import addPetDesk from '../../assets/images/add-pet-desk.jpg';
import addPetDesk2x from '../../assets/images/add-pet-desk@2x.jpg';

import Icon from '../Icon/Icon';
import styles from './PetBlock.module.css';

const FALLBACK_URLS = {
  register:
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
  login:
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  addPet:
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
};

const VARIANT_CONFIGS = {
  register: {
    images: {
      mob: registerMob,
      mob2x: registerMob2x,
      tab: registerTab,
      tab2x: registerTab2x,
      desk: registerDesk,
      desk2x: registerDesk2x,
    },
    defaultInfo: {
      name: 'Jack',
      birthday: '18.10.2021',
      description:
        'Jack is a lovely young dog, very active and friendly with everyone. He loves long walks in the park and learning new tricks!',
      iconId: 'paw',
    },
  },
  login: {
    images: {
      mob: loginMob,
      mob2x: loginMob2x,
      tab: loginTab,
      tab2x: loginTab2x,
      desk: loginDesk,
      desk2x: loginDesk2x,
    },
    defaultInfo: {
      name: 'Rich',
      birthday: '21.09.2020',
      description:
        'Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!',
      iconId: 'cat-modal',
    },
  },
  addPet: {
    images: {
      mob: addPetMob,
      mob2x: addPetMob2x,
      tab: addPetTab,
      tab2x: addPetTab2x,
      desk: addPetDesk,
      desk2x: addPetDesk2x,
    },
    defaultInfo: null,
  },
};

const PetBlock = ({
  type = 'register',
  petInfo,
  showInfo = true,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const config = VARIANT_CONFIGS[type] || VARIANT_CONFIGS.register;
  const { images } = config;
  const info = petInfo !== undefined ? petInfo : config.defaultInfo;
  const fallbackUrl = FALLBACK_URLS[type] || FALLBACK_URLS.register;

  return (
    <div className={`${styles.petBlock} ${styles[type]} ${className}`}>
      {/* Yerel dosya yoksa veya yüklenemezse çalışan onError yedek görseli */}
      {imgError ? (
        <img
          src={fallbackUrl}
          alt={info?.name ? `${info.name} the pet` : 'Lovely pet'}
          className={styles.image}
          loading="eager"
          width="592"
          height="654"
        />
      ) : (
        <picture className={styles.picture}>
          <source
            media="(min-width: 1280px)"
            srcSet={`${images.desk} 1x, ${images.desk2x} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${images.tab} 1x, ${images.tab2x} 2x`}
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${images.mob} 1x, ${images.mob2x} 2x`}
          />
          <img
            src={images.desk}
            alt={info?.name ? `${info.name} the pet` : 'Lovely pet'}
            className={styles.image}
            loading="eager"
            width="592"
            height="654"
            onError={() => setImgError(true)}
          />
        </picture>
      )}

      {/* Figma'ya Uygun Evcil Hayvan Bilgi Rozeti/Kartı */}
      {showInfo && info && (
        <div className={styles.infoBadge}>
          <div className={styles.badgeHeader}>
            <div className={styles.avatarCircle}>
              <Icon id={info.iconId || 'paw'} width={32} height={32} />
            </div>
            <div className={styles.meta}>
              <div className={styles.nameRow}>
                <h3 className={styles.name}>{info.name}</h3>
                {info.birthday && (
                  <span className={styles.birthday}>
                    <span className={styles.birthdayLabel}>Birthday:</span>{' '}
                    {info.birthday}
                  </span>
                )}
              </div>
            </div>
          </div>
          {info.description && (
            <p className={styles.description}>{info.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PetBlock;
