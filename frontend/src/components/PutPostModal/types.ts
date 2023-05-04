import { PostForm } from './schemas';

interface DefaultValues extends Omit<PostForm, 'image'> {
  _id: string;
  image: string;
}

export type PutPostModalProps = {
  open: boolean;
  handleClose: () => void;
  values?: DefaultValues;
};
