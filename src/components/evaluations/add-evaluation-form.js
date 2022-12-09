import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, FormControl,
  Grid, InputLabel, MenuItem, Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

export default function AddEvaluationForm({allCourses, onCourseChange, selectedCourse, onSubmitClick}){

  return (
    <>
      <Card>
        <CardHeader
          subheader="Προσθέστε έναν Κωδικό Αξιολόγησης"
          title="Αξιολόγηση"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl fullWidth required={true}>
                <InputLabel id="course-select-label">Μάθημα</InputLabel>
                <Select
                  labelId="course-select-label"
                  id="course-select"
                  value={selectedCourse}
                  label="Μάθημα"
                  onChange={onCourseChange}
                  fullWidth={true}
                >
                  {allCourses.map((course) => (
                    <MenuItem
                      value={course.id}
                      key={course.id}
                    >
                      {course.name}
                    </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmitClick}
          >
            Δημιουργία
          </Button>
        </Box>
      </Card>
    </>
  )
}
