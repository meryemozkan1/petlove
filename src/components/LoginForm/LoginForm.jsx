import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Icon from '../Icon/Icon';
import { login as loginUser } from '../../redux/auth/authOperations';
import styles from './LoginForm.module.css';

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success('Login successful! Welcome back.');
      navigate('/profile');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Login failed');
    }
  };

  const isFieldValid = (fieldName) =>
    Boolean(dirtyFields[fieldName] && touchedFields[fieldName] && !errors[fieldName]);

  const isFieldInvalid = (fieldName) => Boolean(errors[fieldName]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email Alanı */}
      <div className={styles.fieldGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${
              isFieldInvalid('email')
                ? styles.inputError
                : isFieldValid('email')
                ? styles.inputSuccess
                : ''
            }`}
            {...register('email')}
            aria-invalid={isFieldInvalid('email')}
          />
          {isFieldValid('email') && (
            <span className={styles.successIcon} aria-label="Valid email">
              <Icon id="check" width={18} height={18} />
            </span>
          )}
          {isFieldInvalid('email') && (
            <span className={styles.errorIcon} aria-label="Invalid email">
              <Icon id="cross" width={18} height={18} />
            </span>
          )}
        </div>
        {errors.email && (
          <p className={styles.errorMessage} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Alanı */}
      <div className={styles.fieldGroup}>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`${styles.input} ${
              isFieldInvalid('password')
                ? styles.inputError
                : isFieldValid('password')
                ? styles.inputSuccess
                : ''
            }`}
            {...register('password')}
            aria-invalid={isFieldInvalid('password')}
          />
          <div className={styles.iconsCluster}>
            {isFieldValid('password') && (
              <span className={styles.successIcon} aria-label="Valid password">
                <Icon id="check" width={18} height={18} />
              </span>
            )}
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              <Icon id={showPassword ? 'eye' : 'eye-off'} width={18} height={18} />
            </button>
          </div>
        </div>
        {errors.password && (
          <p className={styles.errorMessage} role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Butonu */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;

