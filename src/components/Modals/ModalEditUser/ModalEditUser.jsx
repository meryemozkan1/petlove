import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Icon from '../../Icon/Icon';
import { selectUser } from '../../../redux/auth/authSelectors';
import { updateUserProfile } from '../../../redux/auth/authOperations';
import styles from './ModalEditUser.module.css';

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const AVATAR_REGEX = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
const PHONE_REGEX = /^\+38\d{10}$/;

const schema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, 'Enter a valid email address')
    .required('Email is required'),
  avatar: Yup.string()
    .trim()
    .test('is-valid-avatar', 'Avatar must be a valid image URL (jpg, png, webp, etc.)', (val) => {
      if (!val) return true; // Boş bırakılabilir
      return AVATAR_REGEX.test(val);
    }),
  phone: Yup.string()
    .trim()
    .test('is-valid-phone', 'Phone must be in format +380XXXXXXXXX', (val) => {
      if (!val) return true; // Boş bırakılabilir
      return PHONE_REGEX.test(val);
    }),
});

const ModalEditUser = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      avatar: '',
      phone: '',
    },
    mode: 'onTouched',
  });

  const avatarWatch = useWatch({ control, name: 'avatar' });

  // Modal açıldığında mevcut kullanıcı verilerini doldur
  useEffect(() => {
    if (isOpen && user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        phone: user.phone || '',
      });
    }
  }, [isOpen, user, reset]);

  // Escape tuşu ve scroll kilidi
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
      };
      if (data.avatar && data.avatar.trim()) {
        payload.avatar = data.avatar.trim();
      }
      if (data.phone && data.phone.trim()) {
        payload.phone = data.phone.trim();
      }

      await dispatch(updateUserProfile(payload)).unwrap();
      toast.success('Profile updated successfully!');
      onClose();
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentAvatar = avatarWatch || user?.avatar;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close edit profile modal"
        >
          <Icon id="cross" width={24} height={24} />
        </button>

        <h3 id="edit-user-title" className={styles.title}>
          Edit information
        </h3>

        {/* Avatar Önizleme */}
        <div className={styles.avatarPreviewWrapper}>
          {currentAvatar ? (
            <img
              src={currentAvatar}
              alt="User avatar preview"
              className={styles.avatarImg}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <Icon id="user-fill" width={40} height={40} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          {/* Avatar URL Input */}
          <div className={styles.fieldGroup}>
            <input
              type="text"
              placeholder="Avatar URL"
              className={`${styles.input} ${errors.avatar ? styles.inputError : ''}`}
              {...register('avatar')}
            />
            {errors.avatar && (
              <span className={styles.errorText}>{errors.avatar.message}</span>
            )}
          </div>

          {/* Name Input */}
          <div className={styles.fieldGroup}>
            <input
              type="text"
              placeholder="Name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          {/* Email Input */}
          <div className={styles.fieldGroup}>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          {/* Phone Input */}
          <div className={styles.fieldGroup}>
            <input
              type="tel"
              placeholder="+380XXXXXXXXX"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              {...register('phone')}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditUser;
