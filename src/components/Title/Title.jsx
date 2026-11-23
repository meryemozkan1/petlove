import styles from './Title.module.css';

const Title = ({ children, level = 1, className = '' }) => {
  const Tag = `h${level}`;
  return <Tag className={`${styles.title} ${styles[`h${level}`]} ${className}`}>{children}</Tag>;
};

export default Title;

