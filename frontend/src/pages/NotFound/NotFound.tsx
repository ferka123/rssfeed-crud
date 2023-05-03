import { Container, Typography, Button, Stack } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Stack flexDirection={'column'} alignItems="center" gap={3}>
        <Typography variant="h4" color="primary" textAlign={'center'}>
          Page is not found
        </Typography>
        <Button href="/" size="large" variant="contained" color="primary">
          Go to home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
