import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Icon from '../../Icon/Icon';
import { addPet } from '../../../redux/auth/authOperations';
import { fetchSpeciesList } from '../../../redux/notices/noticesOperations';
import { selectSpeciesList } from '../../../redux/notices/noticesSelectors';
import styles from './AddPetForm.module.css';

const IMG_URL_REGEX = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const schema = Yup.object().shape({
  sex: Yup.string()
    .oneOf(['female', 'male', 'multiple'], 'Please select a gender')
    .required('Gender is required'),
  imgURL: Yup.string()
    .trim()
    .matches(
      IMG_URL_REGEX,
      'Image URL must be in format https://... (png, jpg, jpeg, gif, bmp, webp)'
    )
    .required('Image URL is required'),
  title: Yup.string().trim().required('Title is required'),
  name: Yup.string().trim().required('Name is required'),
  birthday: Yup.string()
    .trim()
    .matches(DATE_REGEX, 'Birthday must be in format YYYY-MM-DD')
    .required('Birthday is required'),
  species: Yup.string().trim().required('Species is required'),
});

const SEX_OPTIONS = [
  { id: 'female', label: 'Female', symbol: '♀', color: '#F43F5E' },
  { id: 'male', label: 'Male', symbol: '♂', color: '#3B82F6' },
  { id: 'multiple', label: 'Multiple', symbol: '⚥', color: '#F6B83D' },
];

const AddPetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const speciesList = useSelector(selectSpeciesList);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'female',
      imgURL: '',
      title: '',
      name: '',
      birthday: '',
      species: '',
    },
    mode: 'onTouched',
  });

  const selectedSex = useWatch({ control, name: 'sex' });
  const imgURLWatch = useWatch({ control, name: 'imgURL' });

  useEffect(() => {
    if (speciesList.length === 0) {
      dispatch(fetchSpeciesList());
    }
  }, [dispatch, speciesList.length]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        title: data.title.trim(),
        name: data.name.trim(),
        imgURL: data.imgURL.trim(),
        species: data.species.toLowerCase().trim(),
        birthday: data.birthday.trim(),
        sex: data.sex,
      };

      await dispatch(addPet(payload)).unwrap();
      toast.success('Pet added successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to add pet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {/* 1. Cinsiyet Seçimi (3 Yuvarlak İkonlu Radyo Butonu) */}
      <div className={styles.sexSection}>
        <div className={styles.sexOptionsGroup} role="radiogroup" aria-label="Pet gender">
          {SEX_OPTIONS.map((opt) => {
            const isSelected = selectedSex === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`${styles.sexBtn} ${isSelected ? styles.sexBtnActive : ''}`}
                onClick={() => setValue('sex', opt.id, { shouldValidate: true })}
                role="radio"
                aria-checked={isSelected}
              >
                <div
                  className={styles.sexCircle}
                  style={{ color: opt.color }}
                >
                  <span className={styles.sexSymbol}>{opt.symbol}</span>
                </div>
                <span className={styles.sexLabel}>{opt.label}</span>
              </button>
            );
          })}
        </div>
        {errors.sex && (
          <span className={styles.errorText}>{errors.sex.message}</span>
        )}
      </div>

      {/* 2. Fotoğraf Önizleme + URL Alanı */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper}>
          {imgURLWatch && IMG_URL_REGEX.test(imgURLWatch) ? (
            <img
              src={imgURLWatch}
              alt="Pet preview"
              className={styles.avatarImg}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <Icon id="paw" width={40} height={40} />
            </div>
          )}
        </div>

        <div className={styles.imgInputWrapper}>
          <input
            type="url"
            placeholder="Enter image URL"
            className={`${styles.input} ${errors.imgURL ? styles.inputError : ''}`}
            {...register('imgURL')}
          />
          {errors.imgURL && (
            <span className={styles.errorText}>{errors.imgURL.message}</span>
          )}
        </div>
      </div>

      {/* 3. Form Alanları (Title, Name, Birthday, Species) */}
      <div className={styles.fieldsGrid}>
        {/* Title */}
        <div className={styles.fieldGroup}>
          <input
            type="text"
            placeholder="Title of add"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            {...register('title')}
          />
          {errors.title && (
            <span className={styles.errorText}>{errors.title.message}</span>
          )}
        </div>

        {/* Pet's Name */}
        <div className={styles.fieldGroup}>
          <input
            type="text"
            placeholder="Pet's name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            {...register('name')}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name.message}</span>
          )}
        </div>

        {/* Birthday */}
        <div className={styles.fieldGroup}>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            className={`${styles.input} ${errors.birthday ? styles.inputError : ''}`}
            {...register('birthday')}
          />
          {errors.birthday && (
            <span className={styles.errorText}>{errors.birthday.message}</span>
          )}
        </div>

        {/* Species */}
        <div className={styles.fieldGroup}>
          <div className={styles.selectWrapper}>
            <select
              className={`${styles.select} ${errors.species ? styles.inputError : ''}`}
              {...register('species')}
              aria-label="Select pet type"
            >
              <option value="">Type of pet</option>
              {speciesList.map((sp) => (
                <option key={sp} value={sp}>
                  {sp.charAt(0).toUpperCase() + sp.slice(1)}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>
              <Icon id="chevron-right" width={16} height={16} />
            </span>
          </div>
          {errors.species && (
            <span className={styles.errorText}>{errors.species.message}</span>
          )}
        </div>
      </div>

      {/* 4. Butonlar: Back & Submit */}
      <div className={styles.buttonsRow}>
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className={styles.backBtn}
        >
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
