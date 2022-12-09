import { Box, Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

export default function Index(){
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const [firstLoad, setFirstLoad] = useState(true)

  const [tokenValue, setTokenValue] = useState("")
  const [displayAdminButton, setDisplayAdminButton] = useState(false)

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

  useEffect(() => {
    if (firstLoad){
      checkJWTRole()
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
                      onClick={() => router.push("/login").then()}>Σύνδεση</Button>,
              <Button variant="contained"
                      onClick={() => router.push("/register").then()}>Εγγραφή</Button>
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
        </Grid>
      </Grid>
    </>
  )
}
