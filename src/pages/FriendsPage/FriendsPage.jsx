import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title/Title';
import FriendsList from '../../components/Friends/FriendsList';
import Loader from '../../components/Loader/Loader';
import { fetchFriends } from '../../redux/friends/friendsOperations';
import {
  selectFriends,
  selectFriendsLoading,
} from '../../redux/friends/friendsSelectors';
import styles from './FriendsPage.module.css';

const FriendsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const isLoading = useSelector(selectFriendsLoading);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <section className={styles.friendsSection} aria-label="Our Friends Page">
      <div className={`container ${styles.friendsContainer}`}>
        <Title level={1} className={styles.pageTitle}>
          Our friends
        </Title>

        {isLoading && friends.length === 0 ? (
          <div className={styles.loaderWrapper}>
            <Loader text="Loading our friends..." />
          </div>
        ) : (
          <FriendsList items={friends} emptyMessage="No partner shelters found." />
        )}
      </div>
    </section>
  );
};

export default FriendsPage;
