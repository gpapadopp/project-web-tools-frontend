import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { forwardRef, useState } from 'react';
import { Button, Grid, Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DateChooser({onClose, onSearch}){
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  function searchButtonTap(){
    onSearch.call(this, startDate, endDate)
  }

  return (
    <>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle>{"Εισάγετε Ημερομηνίες Προς Αναζήτηση"}</DialogTitle>
        <DialogContent>
          Παρακάτω εισάγετε τις ημερομηνίες έναρξης και λήξης για την αναζήτηση των αξιολογήσεων
          <br/>
          <br/>
          <Grid
            container={true}
            spacing={3}
          >
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ημερομηνία Έναρξης"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ημερομηνία Λήξης"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Άκυρο</Button>
          <Button onClick={searchButtonTap}>Αναζήτηση</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
