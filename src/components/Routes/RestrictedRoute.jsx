import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';

export const RestrictedRoute = ({ component: Component, redirectTo = '/profile' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Component />;
};

export default RestrictedRoute;

