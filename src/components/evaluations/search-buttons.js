import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import DateChooser from '../dialogs/evaluations/date-chooser';
import CourseSearch from '../dialogs/evaluations/course-search';
import CourseTypeSearch from '../dialogs/evaluations/course-type-search';

export default function SearchButtons({dateSearchCallBack, courseSearchCallBack, courseTypeSearchCallBack}){
  const [dateSearch, setDateSearch] = useState(false)
  const [courseSearch, setCourseSearch] = useState(false)
  const [courseTypeSearch, setCourseTypeSearch] = useState(false)

  function dateSearchFunction(startDate, endDate){
    setDateSearch(false)
    dateSearchCallBack.call(this, startDate, endDate)
  }

  function courseSearchFunction(courseID){
    setCourseSearch(false)
    courseSearchCallBack.call(this, courseID)
  }

  function courseTypeSearchFunction(courseTypeID){
    setCourseTypeSearch(false)
    courseTypeSearchCallBack.call(this, courseTypeID)
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
            onClick={() => setCourseSearch(true)}
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
            onClick={() => setCourseTypeSearch(true)}
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
      {courseSearch &&
        <CourseSearch
          onClose={() => setCourseSearch(false)}
          onSearch={courseSearchFunction}
        />
      }
      {courseTypeSearch &&
        <CourseTypeSearch
          onClose={() => setCourseTypeSearch(false)}
          onSearch={courseTypeSearchFunction}
        />
      }
    </>
  )
}
