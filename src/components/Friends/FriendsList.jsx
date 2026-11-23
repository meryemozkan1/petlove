import FriendsItem from './FriendsItem';
import styles from './FriendsList.module.css';

const FriendsList = ({ items = [], emptyMessage = 'No friends found.' }) => {
  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer} role="status">
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((friend) => (
        <li key={friend._id || friend.id || friend.title} className={styles.item}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;

