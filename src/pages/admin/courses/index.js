import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CoursesListToolbar from '../../../components/courses/courses-list-toolbar';
import { CoursesListResults } from '../../../components/courses/courses-list-results';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

function Courses() {
  const [allCourses, setAllCourses] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

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
      getAllCourses()
      checkJWTRole()
      setFirstLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>
          Μαθήματα | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
          <CoursesListToolbar/>
          <Box sx={{ mt: 3 }}>
            <CoursesListResults allCourses={allCourses}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Courses.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Courses;
