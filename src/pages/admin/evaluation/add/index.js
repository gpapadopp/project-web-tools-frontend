import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import AddEvaluationForm from '../../../../components/evaluations/add-evaluation-form';
import EvaluationAddCourseNotSelected
  from '../../../../components/dialogs/evaluation-add-course-not-selected';
import EvaluationAdded from '../../../../components/dialogs/evaluation-added';
import EvaluationAddError from '../../../../components/dialogs/evaluation-add-error';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

function EvaluationAdd() {
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

  const [allCourses, setAllCourse] = useState([])

  const [selectedCourse, setSelectedCourse] = useState("")

  const [courseNotSelected, setCourseNotSelected] = useState(false)
  const [token, setToken] = useState("")
  const [chosenCourse, setChosenCourse] = useState("")
  const [displaySuccess, setDisplaySuccess] = useState(false)
  const [displayError, setDisplayError] = useState(false)
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
        setAllCourse(allResponse['all_courses'])
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

  function addEvaluation(){
    if (!selectedCourse){
      setCourseNotSelected(true)
      return;
    }
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'course_id': selectedCourse
    });
    let config = {
      method: 'post',
      url: '/api/evaluations/add',
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
        setToken(allResponse['created_evaluations']['token'])
        for (let i = 0; i<allCourses.length; i++){
          if (selectedCourse === allCourses[i].id){
            setChosenCourse(allCourses[i].name)
          }
        }
        setDisplaySuccess(true)
      })
      .catch(function (error) {
        setDisplayError(true)
      });

  }

  return (
    <>
      <Head>
        <title>
          Προσθήκη Κωδικού Αξιολόγησης | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
            <AddEvaluationForm
              allCourses={allCourses}
              selectedCourse={selectedCourse}
              onCourseChange={(e) => setSelectedCourse(e.target.value)}
              onSubmitClick={addEvaluation}
            />
          </Box>
          {courseNotSelected &&
            <EvaluationAddCourseNotSelected
              onClose={() => setCourseNotSelected(false)}
            />
          }
          {displaySuccess &&
            <EvaluationAdded
              onClose={() => router.push("/admin/evaluations").then()}
              courseName={chosenCourse}
              evaluationToken={token}
            />
          }
          {displayError &&
            <EvaluationAddError
              onClose={() => setDisplayError(false)}
            />
          }
        </Container>
      </Box>
    </>
  )
}

EvaluationAdd.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default EvaluationAdd;
