import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import DateChooser from '../dialogs/evaluations/date-chooser';

export default function SearchButtons({dateSearchCallBack}){
  const [dateSearch, setDateSearch] = useState(false)

  function dateSearchFunction(startDate, endDate){
    setDateSearch(false)
    dateSearchCallBack.call(this, startDate, endDate)
  }

  return (
    <>
      <Typography
        sx={{ m: 1, textAlign: "center" }}
        variant="h4"
      >
        Αναζήτηση Αξιολογήσεων με Βάση
      </Typography>
      <Grid
        container={true}
        spacing={3}
      >
        <Grid
          item={true}
          md={4}
          xs={12}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth={true}
            onClick={() => setDateSearch(true)}
          >
            Ημερομηνία
          </Button>
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={12}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth={true}
          >
            Μάθημα
          </Button>
        </Grid>
        <Grid
          item={true}
          md={4}
          xs={12}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth={true}
          >
            Τύπος Μαθήματος
          </Button>
        </Grid>
      </Grid>
      {dateSearch &&
        <DateChooser
          onClose={() => setDateSearch(false)}
          onSearch={dateSearchFunction}
        />
      }
    </>
  )
}
