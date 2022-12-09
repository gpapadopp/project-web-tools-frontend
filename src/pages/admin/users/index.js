import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { UsersListToolbar } from '../../../components/users/users-list-toolbar';
import { UsersListResults } from '../../../components/users/users-list-results';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

function Users() {
  const [allUsers, setAllUsers] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

  function getAllUsers(){
    const axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/users/',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllUsers(allResponse['all_users'])
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
      getAllUsers()
      checkJWTRole()
      setFirstLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>
          Χρήστες | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
          <UsersListToolbar/>
          <Box sx={{ mt: 3 }}>
            <UsersListResults allUsers={allUsers}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
