import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Add from '@mui/icons-material/Add';

export default function FormModal({title, children, buttonName, disabled}) {
  console.log(disabled);
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
       {buttonName}
      </Button>
      <Modal  open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{title}</DialogTitle>
            {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
