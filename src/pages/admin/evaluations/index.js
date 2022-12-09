import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import EvaluationsListToolbar from '../../../components/evaluations/evaluations-list-toolbar';
import { EvaluationsListResults } from '../../../components/evaluations/evaluations-list-results';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

function Evaluations() {
  const [allEvaluations, setAllEvaluations] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

  function getAllEvaluations(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/evaluations/',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllEvaluations(allResponse['all_evaluations'])
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function checkJWTRole(){
    if (typeof cookies.user_token !== 'undefined') {
      const userDetails = jwtDecode(cookies.user_token)
      if (userDetails['user_details']['role_id'] !== 1) {

      }
    } else {
      router.push("/").then()
    }
  }

  useEffect(() => {
    if (firstLoad){
      getAllEvaluations()
      checkJWTRole()
      setFirstLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>
          Αξιολογήσεις | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
          <EvaluationsListToolbar/>
          <Box sx={{ mt: 3 }}>
            <EvaluationsListResults allEvaluations={allEvaluations}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Evaluations.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Evaluations;
