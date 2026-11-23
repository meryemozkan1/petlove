import styles from './FriendsItem.module.css';

const FALLBACK_FRIEND_LOGO =
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80';

const getWorkingHours = (workDays) => {
  if (!workDays || !Array.isArray(workDays) || workDays.length === 0) {
    return 'Day and night';
  }

  // Bugünün çalışma saatini veya açık olan ilk saat aralığını bul
  const todayIndex = (new Date().getDay() + 6) % 7; // Pazartesi = 0
  const today = workDays[todayIndex];

  if (today && today.isOpen && today.from && today.to) {
    return `${today.from} - ${today.to}`;
  }

  const anyOpenDay = workDays.find(
    (day) => day && day.isOpen && day.from && day.to
  );

  if (anyOpenDay) {
    return `${anyOpenDay.from} - ${anyOpenDay.to}`;
  }

  return 'Day and night';
};

const FriendsItem = ({ friend }) => {
  const workingHours = getWorkingHours(friend.workDays);

  const mapsUrl =
    friend.addressUrl ||
    (friend.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          friend.address
        )}`
      : null);

  return (
    <article className={styles.friendCard}>
      {/* Çalışma Saatleri Rozeti (Sağ üst) */}
      <div className={styles.timeBadge} title={`Working hours: ${workingHours}`}>
        {workingHours}
      </div>

      <div className={styles.cardHeader}>
        {/* Ortak Logosu */}
        <div className={styles.logoWrapper}>
          <img
            src={friend.imageUrl || friend.logo || FALLBACK_FRIEND_LOGO}
            alt={friend.title || 'Partner logo'}
            className={styles.logo}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_FRIEND_LOGO;
            }}
          />
        </div>

        {/* Başlık ve İletişim Bilgileri */}
        <div className={styles.meta}>
          <h3 className={styles.title} title={friend.title}>
            {friend.title}
          </h3>

          <ul className={styles.contactList}>
            {/* E-posta */}
            <li className={styles.contactItem}>
              <span className={styles.label}>Email:</span>
              {friend.email ? (
                <a
                  href={`mailto:${friend.email}`}
                  className={styles.link}
                  title={friend.email}
                >
                  {friend.email}
                </a>
              ) : (
                <span className={styles.notAvailable}>website only</span>
              )}
            </li>

            {/* Adres */}
            <li className={styles.contactItem}>
              <span className={styles.label}>Address:</span>
              {friend.address ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  title={friend.address}
                >
                  {friend.address}
                </a>
              ) : (
                <span className={styles.notAvailable}>website only</span>
              )}
            </li>

            {/* Telefon */}
            <li className={styles.contactItem}>
              <span className={styles.label}>Phone:</span>
              {friend.phone ? (
                <a
                  href={`tel:${friend.phone.replace(/\s+/g, '')}`}
                  className={styles.link}
                  title={friend.phone}
                >
                  {friend.phone}
                </a>
              ) : (
                <span className={styles.notAvailable}>email only</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default FriendsItem;

