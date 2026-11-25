import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../components/Profile/UserCard/UserCard';
import MyNotices from '../../components/Profile/MyNotices/MyNotices';
import Loader from '../../components/Loader/Loader';
import { getFullUserProfile } from '../../redux/auth/authOperations';
import { selectAuthLoading, selectUser } from '../../redux/auth/authSelectors';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(getFullUserProfile());
  }, [dispatch]);

  return (
    <section className={styles.profileSection}>
      <div className={`container ${styles.profileContainer}`}>
        {isLoading && !user?._id ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <div className={styles.contentLayout}>
            {/* Sol Panel: UserCard */}
            <UserCard />

            {/* Sağ Panel: MyNotices */}
            <MyNotices />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
