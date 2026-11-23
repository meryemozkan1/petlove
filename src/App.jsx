import { lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import MainLayout from './components/MainLayout/MainLayout';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import Loader from './components/Loader/Loader';
import { refreshUser } from './redux/auth/authOperations';
import { selectIsRefreshing } from './redux/auth/authSelectors';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader text="Uygulama başlatılıyor..." size="large" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default route redirects to /home */}
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="friends" element={<FriendsPage />} />

          {/* Restricted routes (only for guests) */}
          <Route
            path="register"
            element={
              <RestrictedRoute component={RegisterPage} redirectTo="/profile" />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute component={LoginPage} redirectTo="/profile" />
            }
          />

          {/* Private routes (only for authenticated users) */}
          <Route
            path="profile"
            element={
              <PrivateRoute component={ProfilePage} redirectTo="/login" />
            }
          />
          <Route
            path="add-pet"
            element={
              <PrivateRoute component={AddPetPage} redirectTo="/login" />
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'var(--font-family-base)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--dark)',
            color: 'var(--white)',
          },
        }}
      />
    </>
  );
}

export default App;
