import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section className={styles.authSection} aria-label="Login Page">
      <div className={`container ${styles.authContainer}`}>
        {/* Sol Tarafta: PetBlock (Retina 1x/2x, Rich kedi görseli & bilgi kartı) */}
        <div className={styles.petBlockWrapper}>
          <PetBlock type="login" className={styles.petBlock} />
        </div>

        {/* Sağ Tarafta: Title, Login Form ve Sayfalar Arası Geçiş Linki */}
        <div className={styles.formCard}>
          <div className={styles.headingGroup}>
            <Title level={1} className={styles.title}>
              Log in
            </Title>
            <p className={styles.subtitle}>
              Welcome! Please enter your credentials to login to the platform:
            </p>
          </div>

          <LoginForm />

          <p className={styles.switchAuth}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
