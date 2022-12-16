import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Slide
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { forwardRef, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourseSearch({onClose, onSearch}){
  const [selectedCourse, setSelectedCourse] = useState("")
  const [displayLoading, setDisplayLoading] = useState(true)
  const [allCourses, setAllCourses] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  const [cookies, setCookie, removeCookie] = useCookies(['user_token'])

  function getAllCourses(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/courses/',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllCourses(allResponse['all_courses'])
        setDisplayLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (firstLoad){
      getAllCourses()
      setFirstLoad(false)
    }
  })

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  function searchButtonTap(){
    onSearch.call(this, selectedCourse)
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
        <DialogTitle>{"Επιλέξτε το Μάθημα που θέλετε να αναζητήσετε"}</DialogTitle>
        <DialogContent>
          Επιλέξτε από το παρακάτω μενού των διαθέσιμων μαθημάτων, για ποιό μάθημα επιθυμείτε να δείτε αξιολογήσεις
          <br/>
          <br/>
          {displayLoading &&
            <LinearProgress />
          }
          {!displayLoading &&
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Μαθήματα</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCourse}
                  label="Μαθήματα"
                  onChange={handleChange}
                >
                  {allCourses.map((courseObj) => (
                    // eslint-disable-next-line react/jsx-key
                    <MenuItem value={courseObj.id}>{courseObj.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Άκυρο</Button>
          <Button onClick={searchButtonTap}>Αναζήτηση</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
