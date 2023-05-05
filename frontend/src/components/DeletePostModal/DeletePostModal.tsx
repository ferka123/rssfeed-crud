import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useDeletePostMutation } from '../../redux/api/endpoints/post';

export type Props = {
  open: boolean;
  handleClose: () => void;
  id: string;
};

const DeletePostModal: React.FC<Props> = ({ open, handleClose, id }) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = () => {
    deletePost(id)
      .unwrap()
      .then(
        () => enqueueSnackbar('Post Deleted', { variant: 'success' }),
        () => enqueueSnackbar('Failed to delete', { variant: 'error' })
      )
      .finally(() => handleClose());
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>Are you shure you want to delete this post?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Close
        </Button>
        <Button onClick={handleDelete} disabled={isLoading} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostModal;
