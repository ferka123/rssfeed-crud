import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SortBy } from '../../../redux/features/feedSlice/types';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setSortBy } from '../../../redux/features/feedSlice';

const SortInput = () => {
  const feedOptions = useAppSelector((store) => store.feedState);
  const dispatch = useAppDispatch();

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setSortBy(e.target.value as SortBy));
  };

  const getName = (item: string) => {
    const [sortField, order] = item.split('-');
    return `${sortField} ${order === 'asc' ? '(A-Z)' : '(Z-A)'}`;
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 100 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={feedOptions.sortby}
        onChange={handleChange}
        size="small"
        sx={{ textTransform: 'capitalize' }}
      >
        {Object.values(SortBy).map((item) => (
          <MenuItem key={item} value={item} sx={{ textTransform: 'capitalize' }}>
            {getName(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortInput;
