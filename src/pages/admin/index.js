import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page () {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const [firstLoad, setFirstLoad] = useState(true)
  const router = useRouter()
  function checkJWTRole(){
    if (typeof cookies.user_token !== 'undefined') {
      const userDetails = jwtDecode(cookies.user_token)
      if (userDetails['user_details']['role_id'] !== 1) {
        router.push("/").then()
      }
    } else {
      router.push("/").then()
    }
  }

  useEffect(() => {
    if (firstLoad){
      checkJWTRole()
      setFirstLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>
          Πίνακας Ελέγχου | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <h2 style={{textAlign: 'center'}}>Πίνακας Ελέγχου - Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης</h2>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
