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

export default function AddCourseForm({courseName, onNameChange, courseDesc, onDescChange, selectedCourseType, onCourseTypeChange, allCourseTypes, onSubmitClick}){

  return (
    <>
      <Card>
        <CardHeader
          subheader="Προσθέστε ένα Μάθημα"
          title="Μάθημα"
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
                <TextField
                  id="course-name"
                  label="Όνομα Μαθήματος"
                  variant="outlined"
                  required={true}
                  value={courseName}
                  onChange={onNameChange}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl fullWidth required={true}>
                <TextField
                  id="course-description"
                  label="Περιγραφή Μαθήματος"
                  variant="outlined"
                  required={true}
                  value={courseDesc}
                  onChange={onDescChange}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormControl fullWidth required={true}>
                <InputLabel id="course-select-label">Τύπος Μαθήματος</InputLabel>
                <Select
                  labelId="course-select-label"
                  id="course-select"
                  value={selectedCourseType}
                  label="Τύπος Μαθήματος"
                  onChange={onCourseTypeChange}
                  fullWidth={true}
                >
                  {allCourseTypes.map((course) => (
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
