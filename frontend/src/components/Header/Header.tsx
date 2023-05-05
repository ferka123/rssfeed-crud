import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setOptions } from '../../redux/features/feedSlice';
import { FormEvent, useState } from 'react';
import { Stack } from '@mui/material';
import { useLoginCheckQuery, useLogoutMutation } from '../../redux/api/endpoints/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}));

const Header = () => {
  const defSearchValue = useAppSelector((store) => store.feedState.search);
  const [searchValue, setSearchValue] = useState(defSearchValue);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const { data: isLoggedIn } = useLoginCheckQuery();

  const location = useLocation();
  const showSearch = ['/', '/admin'].includes(location.pathname);
  const showAuthBtn = location.pathname !== '/login';

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(
        () => {
          enqueueSnackbar('You have logged out', { variant: 'default' });
          navigate('/');
        },
        () => enqueueSnackbar('Logout failed', { variant: 'error' })
      );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setOptions({ search: searchValue, page: 0 }));
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              marginRight: '20px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            RSS
          </Typography>
          {showSearch && (
            <form onSubmit={handleSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </form>
          )}

          <Stack sx={{ flexGrow: 1 }}>
            {showAuthBtn &&
              (isLoggedIn ? (
                <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button href="/login" color="inherit" sx={{ marginLeft: 'auto' }}>
                  Login
                </Button>
              ))}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
