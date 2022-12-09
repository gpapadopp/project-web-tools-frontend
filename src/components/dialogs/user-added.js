import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UserAdded({onClose}) {

  return (
    <div>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Εγγραφή Χρήστη
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Η εγγραφή του χρήστη έγινε με επιτυχία
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Εντάξει
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
