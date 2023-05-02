import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import PutPostModal from '../PutPostModal/PutPostModal';

const AddPostButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: 50, bottom: 50 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      {open && <PutPostModal open={open} handleClose={handleClose} />}
    </>
  );
};

export default AddPostButton;
