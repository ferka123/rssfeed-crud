import { CircularProgress } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { useGetMeQuery } from '../redux/api/endpoints/user';
import { UserRole } from '../redux/api/endpoints/user/types';

const CheckAuth = ({ allowedRoles }: { allowedRoles: UserRole[] }) => {
  const isLoggedIn = getCookie('loggedin') === 'true';

  const { data: user } = useGetMeQuery(undefined, { skip: !isLoggedIn });

  const location = useLocation();

  if (isLoggedIn) {
    if (!user) return <CircularProgress sx={{ margin: 'auto', display: 'block' }} size={70} />;
    if (allowedRoles.includes(user.role)) return <Outlet />;
    return <Navigate to="/forbidden" state={{ origin: location.pathname }} replace />;
  } else return <Navigate to="/login" state={{ origin: location.pathname }} replace />;
};

export default CheckAuth;
