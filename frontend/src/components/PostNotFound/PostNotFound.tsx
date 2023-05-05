import { Typography, Stack } from '@mui/material';

const PostNotFound = () => {
  return (
    <Stack
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'center'}
      gap={3}
      flexGrow={1}
    >
      <Typography variant="h4" color="primary" textAlign={'center'}>
        Posts are not found
      </Typography>
      <Typography variant="subtitle2" textAlign={'center'}>
        Try to search for something else or adjust the filters
      </Typography>
    </Stack>
  );
};

export default PostNotFound;
