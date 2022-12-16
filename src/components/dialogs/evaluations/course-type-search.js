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

export default function CourseTypeSearch({onClose, onSearch}){
  const [selectedCourseType, setSelectedCourseType] = useState("")
  const [displayLoading, setDisplayLoading] = useState(true)
  const [allCourseTypes, setAllCourseTypes] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  const [cookies, setCookie, removeCookie] = useCookies(['user_token'])

  function getAllCourseTypes(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/course-types/',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllCourseTypes(allResponse['all_courses_types'])
        setDisplayLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (firstLoad){
      getAllCourseTypes()
      setFirstLoad(false)
    }
  })

  const handleChange = (event) => {
    setSelectedCourseType(event.target.value);
  };

  function searchButtonTap(){
    onSearch.call(this, selectedCourseType)
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
        <DialogTitle>{"Επιλέξτε το τύπο μαθήματος που θέλετε να αναζητήσετε"}</DialogTitle>
        <DialogContent>
          Επιλέξτε από το παρακάτω μενού των διαθέσιμων τύπων μαθημάτων, για ποιο τύπο επιθυμείτε να δείτε αξιολογήσεις
          <br/>
          <br/>
          {displayLoading &&
            <LinearProgress />
          }
          {!displayLoading &&
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Τύποι Μαθημάτων</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCourseType}
                  label="Τύποι Μαθημάτων"
                  onChange={handleChange}
                >
                  {allCourseTypes.map((courseObj) => (
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
