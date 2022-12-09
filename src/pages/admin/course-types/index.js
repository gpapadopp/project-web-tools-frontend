import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CourseTypesListToolbar from '../../../components/course-types/course-types-list-toolbar';
import { CourseTypesListResults } from '../../../components/course-types/course-types-list-results';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

function CourseTypes() {
  const [allCourseTypes, setAllCourseTypes] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

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
      getAllCourseTypes()
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
          <CourseTypesListToolbar/>
          <Box sx={{ mt: 3 }}>
            <CourseTypesListResults allCourseTypes={allCourseTypes}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

CourseTypes.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CourseTypes;
