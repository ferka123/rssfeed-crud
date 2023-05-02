import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddPostMutation, useUpdatePostMutation } from '../../redux/api/endpoints/post';
import TextInput from './TextInput';
import ImageInput from './ImageInput';
import { addPostSchema, updatePostSchema, PostForm } from './schemas';
import { PutPostModalProps } from './types';

const PutPostModal: React.FC<PutPostModalProps> = ({ open, handleClose, values }) => {
  const { image: defaultImage, _id: id, ...defaultValues } = values ?? {};
  const methods = useForm<PostForm>({
    resolver: zodResolver(values ? updatePostSchema : addPostSchema),
    defaultValues
  });

  const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();
  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();
  const isLoading = isAddingPost || isUpdatingPost;

  const onSubmit = (data: PostForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([name, value]) => {
      if (value.length) {
        formData.append(name, value instanceof FileList ? value[0] : value);
      }
    });
    const mutation = id ? updatePost({ id, body: formData }) : addPost(formData);
    mutation.unwrap().then(() => onClose());
  };

  const onClose = () => {
    methods.reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{values ? 'Update Post' : 'Add Post'}</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent>
            <ImageInput name="image" defaultImage={defaultImage} />
            <TextInput name="title" label="Title" />
            <TextInput name="creator" label="Creator" />
            <TextInput name="content" label="Content" />
            <TextInput name="url" label="Link" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {values ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default PutPostModal;
