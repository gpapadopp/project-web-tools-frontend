import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { RolesListToolbar } from '../../../components/roles/roles-list-toolbar';
import { RolesListResults } from '../../../components/roles/roles-list-results';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

function Roles() {
  const [allRoles, setAllRoles] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

  function getAllRoles(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/roles/',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllRoles(allResponse['all_roles'])
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
      getAllRoles()
      checkJWTRole()
      setFirstLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>
          Ρόλοι | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
          <RolesListToolbar/>
          <Box sx={{ mt: 3 }}>
            <RolesListResults allRoles={allRoles}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Roles.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Roles;
