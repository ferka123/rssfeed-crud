import { Container, Typography, Button, Stack } from '@mui/material';

const Forbidden = () => {
  return (
    <Container maxWidth="md">
      <Stack flexDirection={'column'} alignItems="center" gap={3}>
        <Typography variant="h4" color="primary" textAlign={'center'}>
          Access is forbidden
        </Typography>
        <Button href="/" size="large" variant="contained" color="primary">
          Go to home
        </Button>
      </Stack>
    </Container>
  );
};

export default Forbidden;
