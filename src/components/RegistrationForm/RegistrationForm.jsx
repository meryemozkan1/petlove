import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Icon from '../Icon/Icon';
import { register as registerUser } from '../../redux/auth/authOperations';
import styles from './RegistrationForm.module.css';

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const registrationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .trim()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success('Registration successful! Welcome to Petlove.');
      navigate('/profile');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Registration failed');
    }
  };

  const isFieldValid = (fieldName) =>
    Boolean(dirtyFields[fieldName] && touchedFields[fieldName] && !errors[fieldName]);

  const isFieldInvalid = (fieldName) => Boolean(errors[fieldName]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name Alanı */}
      <div className={styles.fieldGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Name"
            className={`${styles.input} ${
              isFieldInvalid('name')
                ? styles.inputError
                : isFieldValid('name')
                ? styles.inputSuccess
                : ''
            }`}
            {...register('name')}
            aria-invalid={isFieldInvalid('name')}
          />
          {isFieldValid('name') && (
            <span className={styles.successIcon} aria-label="Valid name">
              <Icon id="check" width={18} height={18} />
            </span>
          )}
          {isFieldInvalid('name') && (
            <span className={styles.errorIcon} aria-label="Invalid name">
              <Icon id="cross" width={18} height={18} />
            </span>
          )}
        </div>
        {errors.name && (
          <p className={styles.errorMessage} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

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

      {/* Confirm Password Alanı */}
      <div className={styles.fieldGroup}>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            className={`${styles.input} ${
              isFieldInvalid('confirmPassword')
                ? styles.inputError
                : isFieldValid('confirmPassword')
                ? styles.inputSuccess
                : ''
            }`}
            {...register('confirmPassword')}
            aria-invalid={isFieldInvalid('confirmPassword')}
          />
          <div className={styles.iconsCluster}>
            {isFieldValid('confirmPassword') && (
              <span className={styles.successIcon} aria-label="Passwords match">
                <Icon id="check" width={18} height={18} />
              </span>
            )}
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              <Icon id={showConfirmPassword ? 'eye' : 'eye-off'} width={18} height={18} />
            </button>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className={styles.errorMessage} role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Butonu */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Registration'}
      </button>
    </form>
  );
};

export default RegistrationForm;

