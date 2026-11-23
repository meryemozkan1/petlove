import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/authSelectors';
import Loader from '../Loader/Loader';

export const RestrictedRoute = ({ component: Component, redirectTo = '/profile' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader text="Oturum doğrulanıyor..." />;
  }

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Component />;
};

export default RestrictedRoute;
