import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EvaluationAddCourseNotSelected({onClose}) {

  return (
    <div>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Προσθήκη Αξιολόγησης
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Δεν έχει επιλεχθεί μάθημα.
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
