import { useEffect, useState, useCallback, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Icon from '../../Icon/Icon';
import SearchField from '../../SearchField/SearchField';
import api from '../../../services/api';
import {
  fetchCategories,
  fetchSexList,
  fetchSpeciesList,
} from '../../../redux/notices/noticesOperations';
import {
  selectCategories,
  selectSexList,
  selectSpeciesList,
  selectNoticesFilters,
} from '../../../redux/notices/noticesSelectors';
import {
  setNoticesFilters,
  resetNoticesFilters,
} from '../../../redux/notices/noticesSlice';
import styles from './NoticesFilters.module.css';

const SORT_OPTIONS = [
  { id: 'popular', label: 'Popular', byPopularity: false, byPrice: null },
  { id: 'unpopular', label: 'Unpopular', byPopularity: true, byPrice: null },
  { id: 'cheap', label: 'Cheap', byPopularity: null, byPrice: true },
  { id: 'expensive', label: 'Expensive', byPopularity: null, byPrice: false },
];

const NoticesFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const sexList = useSelector(selectSexList);
  const speciesList = useSelector(selectSpeciesList);
  const currentFilters = useSelector(selectNoticesFilters);

  const [cityOptions, setCityOptions] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [selectedCityOption, setSelectedCityOption] = useState(null);

  const locationSelectId = useId();

  // İlk yüklemede kategoriler, cinsiyet ve tür listesini çek
  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    if (sexList.length === 0) dispatch(fetchSexList());
    if (speciesList.length === 0) dispatch(fetchSpeciesList());
  }, [dispatch, categories.length, sexList.length, speciesList.length]);

  // Şehir arama (kullanıcı yazdıkça)
  const searchCities = useCallback(async (keyword) => {
    if (!keyword || keyword.trim().length < 2) {
      setCityOptions([]);
      return;
    }
    try {
      setIsCityLoading(true);
      const { data } = await api.get('/cities/locations', {
        params: { keyword: keyword.trim() },
      });
      if (Array.isArray(data)) {
        const formatted = data.map((city) => ({
          value: city._id,
          label: `${city.cityEn}, ${city.stateEn}`,
        }));
        setCityOptions(formatted);
      }
    } catch {
      setCityOptions([]);
    } finally {
      setIsCityLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (citySearch) {
        searchCities(citySearch);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [citySearch, searchCities]);

  // Arama metni değiştiğinde
  const handleKeywordSearch = (keyword) => {
    dispatch(setNoticesFilters({ keyword }));
  };

  // Açılır liste filtreleri
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNoticesFilters({ [name]: value }));
  };

  // Konum seçimi
  const handleCityChange = (option) => {
    setSelectedCityOption(option);
    dispatch(setNoticesFilters({ locationId: option ? option.value : '' }));
  };

  // Sıralama belirleme
  const currentSortId = (() => {
    if (currentFilters.byPopularity === false) return 'popular';
    if (currentFilters.byPopularity === true) return 'unpopular';
    if (currentFilters.byPrice === true) return 'cheap';
    if (currentFilters.byPrice === false) return 'expensive';
    return null;
  })();

  const handleSortClick = (sortId) => {
    if (currentSortId === sortId) {
      // Zaten seçiliyse kaldır
      dispatch(setNoticesFilters({ byPopularity: null, byPrice: null }));
    } else {
      const option = SORT_OPTIONS.find((s) => s.id === sortId);
      if (option) {
        dispatch(
          setNoticesFilters({
            byPopularity: option.byPopularity,
            byPrice: option.byPrice,
          })
        );
      }
    }
  };

  const handleReset = () => {
    setSelectedCityOption(null);
    setCitySearch('');
    setCityOptions([]);
    dispatch(resetNoticesFilters());
  };

  // react-select için özel stil
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#FFFFFF',
      border: state.isFocused ? '1px solid #F6B83D' : '1px solid transparent',
      borderRadius: '30px',
      padding: '2px 8px',
      boxShadow: 'none',
      minHeight: '48px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'border-color 0.2s ease',
      '&:hover': {
        borderColor: '#F6B83D',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#262626',
      opacity: 0.8,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '15px',
      overflow: 'hidden',
      zIndex: 20,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#F6B83D'
        : state.isFocused
        ? '#FFF4DF'
        : '#FFFFFF',
      color: state.isSelected ? '#FFFFFF' : '#262626',
      cursor: 'pointer',
      fontSize: '14px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#262626',
      '&:hover': {
        color: '#F6B83D',
      },
    }),
  };

  return (
    <div className={styles.filtersContainer}>
      {/* 1. Satır: Arama Kutusu & Select Filtreleri */}
      <div className={styles.topRow}>
        <div className={styles.searchWrapper}>
          <SearchField
            placeholder="Search pets"
            initialValue={currentFilters.keyword || ''}
            onSearch={handleKeywordSearch}
          />
        </div>

        <div className={styles.dropdownsGrid}>
          {/* Kategori */}
          <div className={styles.selectWrapper}>
            <select
              name="category"
              value={currentFilters.category || ''}
              onChange={handleSelectChange}
              className={styles.nativeSelect}
              aria-label="Filter by category"
            >
              <option value="">Category</option>
              <option value="">Show all</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>
              <Icon id="chevron-right" width={16} height={16} />
            </span>
          </div>

          {/* Cinsiyet */}
          <div className={styles.selectWrapper}>
            <select
              name="sex"
              value={currentFilters.sex || ''}
              onChange={handleSelectChange}
              className={styles.nativeSelect}
              aria-label="Filter by gender"
            >
              <option value="">By gender</option>
              <option value="">Show all</option>
              {sexList.map((sex) => (
                <option key={sex} value={sex}>
                  {sex.charAt(0).toUpperCase() + sex.slice(1)}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>
              <Icon id="chevron-right" width={16} height={16} />
            </span>
          </div>

          {/* Tür (Species) */}
          <div className={styles.selectWrapper}>
            <select
              name="species"
              value={currentFilters.species || ''}
              onChange={handleSelectChange}
              className={styles.nativeSelect}
              aria-label="Filter by pet type"
            >
              <option value="">By type</option>
              <option value="">Show all</option>
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

          {/* Şehir Konumu (react-select) */}
          <div className={styles.citySelectWrapper}>
            <Select
              instanceId={locationSelectId}
              isClearable
              isLoading={isCityLoading}
              options={cityOptions}
              value={selectedCityOption}
              onChange={handleCityChange}
              onInputChange={(val, action) => {
                if (action.action === 'input-change') {
                  setCitySearch(val);
                }
              }}
              placeholder="Location"
              styles={customSelectStyles}
              noOptionsMessage={() =>
                citySearch.length < 2
                  ? 'Type at least 2 letters...'
                  : 'No cities found'
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* 2. Satır: Sıralama Radyo Butonları & Reset Butonu */}
      <div className={styles.bottomRow}>
        <div className={styles.sortOptionsGroup} role="radiogroup" aria-label="Sort options">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = currentSortId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`${styles.sortBadge} ${
                  isSelected ? styles.sortBadgeActive : ''
                }`}
                onClick={() => handleSortClick(opt.id)}
                aria-checked={isSelected}
                role="radio"
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span
                    className={styles.clearSortIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortClick(opt.id);
                    }}
                    aria-label={`Remove ${opt.label} sort`}
                  >
                    <Icon id="cross" width={14} height={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className={styles.resetBtn}
          aria-label="Reset all filters"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default NoticesFilters;

