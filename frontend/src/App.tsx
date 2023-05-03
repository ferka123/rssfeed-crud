import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import PostFeed from './pages/PostFeed/PostFeed';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PostFeed withEditing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
