import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section className={styles.authSection}>
      <div className={`container ${styles.authContainer}`}>
        <div className={styles.formCard}>
          <Title level={1} className={styles.title}>Log in</Title>
          <p className={styles.subtitle}>Welcome! Please enter your credentials to login.</p>
          <form className={styles.form}>
            {/* Form alanları: Email, Password */}
          </form>
          <p className={styles.switchAuth}>
            Don't have an account? <Link to="/register" className={styles.link}>Register</Link>
          </p>
        </div>
        <PetBlock type="login" className={styles.petBlock} />
      </div>
    </section>
  );
};

export default LoginPage;

