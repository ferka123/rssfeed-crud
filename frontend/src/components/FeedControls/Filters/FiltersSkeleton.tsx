import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

const FilterCreatorSkeleton = () => {
  return (
    <Box>
      {[...Array(6)].map((_, key) => (
        <Skeleton key={key} variant="text" animation="wave" height={18} sx={{ my: '20px' }} />
      ))}
    </Box>
  );
};

export default FilterCreatorSkeleton;
