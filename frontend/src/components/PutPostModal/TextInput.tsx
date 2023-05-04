import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { PostForm } from './schemas';

const TextInput = ({ name, label }: { name: keyof PostForm; label: string }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<PostForm>();
  return (
    <TextField
      label={label}
      fullWidth
      margin="dense"
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

export default TextInput;
