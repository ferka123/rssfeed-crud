import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import PostFeed from './pages/PostFeed/PostFeed';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import CheckAuth from './middleware/CheckAuth';
import { UserRole } from './redux/api/endpoints/user/types';
import Forbidden from './pages/Forbidden/Forbidden';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostFeed />} />
        <Route path="login" element={<Login />} />
        <Route element={<CheckAuth allowedRoles={[UserRole.admin]} />}>
          <Route path="admin" element={<PostFeed withEditing />} />
        </Route>
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
