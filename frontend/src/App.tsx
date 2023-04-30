import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import PostFeed from './pages/PostFeed/PostFeed';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Admin from './pages/Admin/Admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
