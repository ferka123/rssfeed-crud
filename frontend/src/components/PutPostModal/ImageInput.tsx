import { Button } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PostForm } from './schemas';

const ImageInput = ({
  name,
  defaultImage
}: {
  name: keyof PostForm;
  defaultImage: string | undefined;
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<PostForm>();
  const { onChange, ...rest } = register(name);

  const [image, setImage] = useState<string | undefined>(defaultImage);

  const onFileChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.length) setImage(URL.createObjectURL(target.files[0]));
  };

  return (
    <Button color="primary" aria-label="upload picture" component="label" fullWidth>
      <input
        hidden
        accept="image/*"
        type="file"
        {...rest}
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
          onChange(e);
          onFileChange(e);
        }}
      />
      {image ? (
        <img src={image} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
      ) : (
        <PanoramaIcon sx={{ fontSize: 100 }} color={!!errors[name] ? 'error' : 'disabled'} />
      )}
    </Button>
  );
};

export default ImageInput;
