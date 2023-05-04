import { useState } from 'react';
import {
  TextField,
  Box,
  Container,
  Avatar,
  Button,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginCheckQuery, useLoginMutation } from '../../redux/api/endpoints/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { enqueueSnackbar } from 'notistack';

const LoginSchema = z.object({
  login: z.string().min(5),
  password: z.string().min(8)
});

type LoginData = z.TypeOf<typeof LoginSchema>;

const Login = () => {
  const { data: isLoggedIn } = useLoginCheckQuery();
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({ resolver: zodResolver(LoginSchema) });

  const location = useLocation();
  const redirectTo = location.state?.origin ?? '/';

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: LoginData) => {
    login(data)
      .unwrap()
      .then(
        () => enqueueSnackbar('Login succesfful', { variant: 'success' }),
        () => enqueueSnackbar('Login failed', { variant: 'error' })
      );
  };

  if (isLoggedIn === undefined) return <div></div>;
  if (isLoggedIn || isSuccess) return <Navigate to={redirectTo} replace />;
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper elevation={8} sx={{ padding: 5, marginBottom: 5, width: '100%' }}>
        <Box
          display="flex"
          flexDirection={'column'}
          sx={{
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Login"
                  {...register('login')}
                  error={!!errors['login']}
                  helperText={errors['login']?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel error={!!errors['password']}>Password</InputLabel>
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="password"
                    {...register('password')}
                    error={!!errors['password']}
                  />
                  <FormHelperText error={!!errors['password']}>
                    {errors['password']?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
