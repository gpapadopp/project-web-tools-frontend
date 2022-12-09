import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CourseError({onClose}) {

  return (
    <div>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Προσθήκη Μαθήματος
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Υπήρξε ένα πρόβλημα με την προσθήκη του μαθήματος. Παρακαλώ προσπαθήστε ξανά.
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
