import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <section className={styles.authSection}>
      <div className={`container ${styles.authContainer}`}>
        <div className={styles.formCard}>
          <Title level={1} className={styles.title}>Registration</Title>
          <p className={styles.subtitle}>Thank you for your interest in our platform.</p>
          <form className={styles.form}>
            {/* Form alanları: Name, Email, Password, Confirm Password */}
          </form>
          <p className={styles.switchAuth}>
            Already have an account? <Link to="/login" className={styles.link}>Login</Link>
          </p>
        </div>
        <div className={styles.imageBlock}>
          {/* Auth görsel alanı */}
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

