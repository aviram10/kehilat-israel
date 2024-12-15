import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Add from '@mui/icons-material/Add';
import { useState } from 'react';
import Alert from './Alert';
export default function FormModal({title,message, setMessage, children, disabled, style, withIcon, size}) {

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
      // style={{display:'inline-block', justifyContent:'center', alignContent:'center'}}
      sx={{maxWidth:size != 'lg' ? "300px" : '600px'}}
        variant={style?.variant ||"outlined"}
        color={style?.color || "neutral"}
        startDecorator={withIcon && <Add />}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
       {title}
      </Button>
      <Modal  open={open} onClose={() =>{ setOpen(false); setMessage(null)}}>
        <ModalDialog>
          <DialogTitle>{title}</DialogTitle>
            {children}
          {  message && <Alert message={message}  ></Alert>}
            <Button color='danger' variant='solid' onClick={() => {setOpen(false); setMessage(null)}}>סגור</Button>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
