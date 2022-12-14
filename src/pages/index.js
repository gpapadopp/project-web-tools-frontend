import { Box, Button, Divider, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { UserEvaluationsListResults } from '../components/users/user-evaluations-list-results';

export default function Index(){
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const [firstLoad, setFirstLoad] = useState(true)

  const [tokenValue, setTokenValue] = useState("")
  const [displayAdminButton, setDisplayAdminButton] = useState(false)
  const [userEvaluations, setUserEvaluations] = useState([])

  function logoutUser(){
    removeCookie(['user_token'])
  }

  function checkJWTRole(){
    if (typeof cookies.user_token !== 'undefined') {
      const userDetails = jwtDecode(cookies.user_token)
      if (userDetails['user_details']['role_id'] === 1) {
        setDisplayAdminButton(true)
      }
    }
  }

  function getUserEvaluations(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/users/getEvaluations',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setUserEvaluations(allResponse['all_evaluations'])
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    if (firstLoad){
      checkJWTRole()
      if (cookies.user_token !== "" && typeof cookies.user_token !== 'undefined'){
        getUserEvaluations()
      }
      setFirstLoad(false)
    }
  })

  if (typeof cookies.user_token === 'undefined') {
    return (
      <>
        <br/>
        <br/>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <h3 style={{ textAlign: 'center' }}>Καλώς Ήρθατε στο Σύστημα Αξιολόγησης Τριτοβάθμιας
              Εκπαίδευσης</h3>
          </Grid>
        </Grid>
        <br/>
        <br/>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <h5 style={{ textAlign: 'center' }}>Για να ξεκινήσετε την αξιολόγηση, παρακαλώ
              συνδεθείτε</h5>
            <br/>
            <Box textAlign='center'>
              <Button variant="contained"
                      onClick={() => router.push("/login").then()} style={{marginRight: "1%"}}>Σύνδεση</Button>
              <Button variant="contained"
                      onClick={() => router.push("/register").then()} style={{marginLeft: "1%"}}>Εγγραφή</Button>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  }
  return (
    <>
      <br/>
      <br/>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Box textAlign='right'>
            {displayAdminButton &&
              <Button variant="contained" style={{marginRight: "2%"}}
                      onClick={() => router.push('/admin').then()}>Διαχειριστικό</Button>
            }
            <Button variant="contained"
                    onClick={logoutUser}>Αποσύνδεση</Button>
          </Box>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <h3 style={{ textAlign: 'center' }}>Καλώς Ήρθατε στο Σύστημα Αξιολόγησης Τριτοβάθμιας
            Εκπαίδευσης</h3>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <h5 style={{ textAlign: 'center' }}>Για να ξεκινήσετε την αξιολόγηση, παρακαλώ
            δώστε το μοναδικό κωδικό που σας δώθηκε</h5>
          <br/>
          <Box textAlign='center'>
            <TextField id="outlined-basic"
                       label="Κωδικός Αξιολόγησης"
                       variant="outlined"
                       value={tokenValue}
                       onChange={(e) => setTokenValue(e.target.value)}
            />
          </Box>
          <br/>
          <Box textAlign='center'>
            <Button variant="contained"
                    onClick={() => router.push("/evaluation/" + tokenValue).then()}>Ξεκινήστε την Αξιολόγηση</Button>
          </Box>
          <br/>
          <Divider/>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
        >
          <Box sx={{ mt: 3 }}>
            <h3 style={{textAlign:"center"}}>Οι Αξιολογήσεις που έχετε κάνει ως τώρα:</h3>
            <br/>
            {userEvaluations.length !== 0 &&
              <UserEvaluationsListResults allEvaluations={userEvaluations}/>
            }
            {userEvaluations.length === 0 &&
              <h4 style={{textAlign:"center"}}>Δεν υπάρχουν αξιολογήσεις ακόμα.</h4>
            }
          </Box>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
        </Grid>
      </Grid>
    </>
  )
}
