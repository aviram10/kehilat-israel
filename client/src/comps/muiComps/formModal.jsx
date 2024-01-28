import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Add from '@mui/icons-material/Add';
import { useState } from 'react';
import Alert from './Alert';
export default function FormModal({title,message, setMessage, children, disabled}) {

  console.log(setMessage);
  const [open, setOpen] = useState(false);
  if(message[0] === "success")setTimeout(() => setOpen(false), 3000);

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
      <Modal  open={open} onClose={() =>{ setOpen(false); setMessage([])}}>
        <ModalDialog>
          <DialogTitle>{title}</DialogTitle>
            {children}
          {  message[0] && <Alert message={message}  ></Alert>}
            <Button color='danger' variant='solid' onClick={() => {setOpen(false); setMessage([])}}>סגור</Button>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
