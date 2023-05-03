import { Pagination, Stack } from '@mui/material';
import { setPage } from '../../redux/features/feedSlice';
import { FeedOptions } from '../../redux/features/feedSlice/types';
import { useAppDispatch } from '../../redux/store';

const Paginatior = ({ total, options }: { total: number; options: FeedOptions }) => {
  const dispatch = useAppDispatch();
  const maxPage = Math.floor(total / options.limit);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value - 1));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        size="large"
        count={maxPage}
        page={options.page + 1}
        showFirstButton
        showLastButton
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
    </Stack>
  );
};

export default Paginatior;
