import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Add from '@mui/icons-material/Add';
import { useState } from 'react';
import Alert from '@mui/joy/Alert';

export default function FormModal({title,message, setInput, children, disabled}) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
       {title}
      </Button>
      <Modal  open={open} onClose={() =>{ setOpen(false); setInput?.({})}}>
        <ModalDialog>
          <DialogTitle>{title}</DialogTitle>
            {children}
           {message && <Alert color='primary' variant='soft'>{message}</Alert>}
            <Button color='danger' variant='solid' onClick={() => setOpen(false)}>סגור</Button>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
