import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Container, CssBaseline } from '@mui/material';

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container component={'main'} sx={{ flexGrow: 1, display: 'flex' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
