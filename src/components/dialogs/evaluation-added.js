import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EvaluationAdded({onClose, courseName, evaluationToken}) {

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
            Έχει δημιουργηθεί αξιολόγηση για το μάθημα {courseName}. Ο μοναδικός κωδικός αξιολόγησης είναι ο {evaluationToken}. Μπορείτε να μοιράσετε το μοναδικό κωδικό αξιολόγησης, στο χρήστη που θέλετε να κάνει την αξιολόγηση.
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
