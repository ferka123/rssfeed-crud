import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import FiltersForm from './FiltersForm';

const Filters = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Filters
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <FiltersForm />
      </Drawer>
    </>
  );
};

export default Filters;
