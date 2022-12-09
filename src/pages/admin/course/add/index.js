import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import AddCourseForm from '../../../../components/courses/add-course-form';
import CourseNoName from '../../../../components/dialogs/course-no-name';
import CourseAdded from '../../../../components/dialogs/course-added';
import CourseError from '../../../../components/dialogs/course-error';
import CourseNoDescription from '../../../../components/dialogs/course-no-description';
import CourseNoCourseType from '../../../../components/dialogs/course-no-course-type';
import jwtDecode from 'jwt-decode';

function CourseAdd() {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

  const [allCourseTypes, setAllCourseTypes] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCourseType, setSelectedCourseType] = useState("")

  const [emptyName, setEmptyName] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)
  const [emptyCourseType, setEmptyCourseType] = useState(false)
  const [displaySuccess, setDisplaySuccess] = useState(false)
  const [displayError, setDisplayError] = useState(false)

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

  function addCourse(){
    if (!name){
      setEmptyName(true)
      return;
    }
    if (!description){
      setEmptyDescription(true)
      return;
    }
    if (!selectedCourseType){
      setEmptyCourseType(true)
      return;
    }
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'name': name,
      'description': description,
      'course_type_id': selectedCourseType
    });
    let config = {
      method: 'post',
      url: '/api/courses/add',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setDisplaySuccess(true)
      })
      .catch(function (error) {
        console.log(error);
        setDisplayError(true)
      });


  }

  return (
    <>
      <Head>
        <title>
          Προσθήκη Μαθήματος | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
          <Box sx={{ mt: 3 }}>
            <AddCourseForm
              courseName={name}
              onNameChange={(e) => setName(e.target.value)}
              courseDesc={description}
              onDescChange={(e) => setDescription(e.target.value)}
              selectedCourseType={selectedCourseType}
              onCourseTypeChange={(e) => setSelectedCourseType(e.target.value)}
              allCourseTypes={allCourseTypes}
              onSubmitClick={addCourse}
            />
          </Box>
          {emptyName &&
            <CourseNoName
              onClose={() => setEmptyName(false)}
            />
          }
          {emptyDescription &&
            <CourseNoDescription
              onClose={() => setEmptyDescription(false)}
            />
          }
          {emptyCourseType &&
            <CourseNoCourseType
              onClose={() => setEmptyCourseType(false)}
            />
          }
          {displaySuccess &&
            <CourseAdded
              onClose={() => router.push("/admin/courses").then()}
            />
          }
          {displayError &&
            <CourseError
              onClose={() => setDisplayError(false)}
            />
          }
        </Container>
      </Box>
    </>
  )
}

CourseAdd.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CourseAdd;
