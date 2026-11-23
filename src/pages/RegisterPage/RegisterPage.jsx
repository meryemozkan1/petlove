import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <section className={styles.authSection} aria-label="Registration Page">
      <div className={`container ${styles.authContainer}`}>
        {/* Sol Tarafta: PetBlock (Retina 1x/2x, Jack köpek görseli & bilgi kartı) */}
        <div className={styles.petBlockWrapper}>
          <PetBlock type="register" className={styles.petBlock} />
        </div>

        {/* Sağ Tarafta: Title, Registration Form ve Sayfalar Arası Geçiş Linki */}
        <div className={styles.formCard}>
          <div className={styles.headingGroup}>
            <Title level={1} className={styles.title}>
              Registration
            </Title>
            <p className={styles.subtitle}>
              Thank you for your interest in our platform.
            </p>
          </div>

          <RegistrationForm />

          <p className={styles.switchAuth}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
