import Head from 'next/head';
import { Box, Button, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import EvaluationsListToolbar from '../../../components/evaluations/evaluations-list-toolbar';
import { EvaluationsListResults } from '../../../components/evaluations/evaluations-list-results';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import SearchButtons from '../../../components/evaluations/search-buttons';
import qs from 'qs';
import axios from 'axios';

function Evaluations() {
  const [allEvaluations, setAllEvaluations] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const [displaySearch, setDisplaySearch] = useState(false)

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

  function generateDateString(date){
    const currentDate = new Date(Date.parse(date))
    let returnDate = ""
    returnDate += currentDate.getFullYear().toString()
    if ((currentDate.getMonth() + 1) < 10){
      returnDate += "-0" + (currentDate.getMonth() + 1).toString()
    } else {
      returnDate += "-" + (currentDate.getMonth() + 1).toString()
    }

    if (currentDate.getDate() < 10){
      returnDate += "-0" + currentDate.getDate().toString()
    } else {
      returnDate += "-" + currentDate.getDate().toString()
    }
    return returnDate;
  }

  function searchEvaluationsByDate(startDate, endDate){
    setDisplaySearch(true)
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'start_date': generateDateString(startDate) + " 00:00:00" ,
      'end_date': generateDateString(endDate) + " 00:00:00"
    });
    let config = {
      method: 'post',
      url: '/api/evaluations/getByDate',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    console.log(config);
    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllEvaluations(allResponse['evaluations'])
        setDisplaySearch(false)
      })
      .catch(function (error) {
        setDisplaySearch(false)
      });
  }

  function searchEvaluationsByCourse(courseID){
    setDisplaySearch(true)
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'course_id': courseID ,
    });
    let config = {
      method: 'post',
      url: '/api/evaluations/getByCourse',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    console.log(config);
    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllEvaluations(allResponse['evaluations'])
        setDisplaySearch(false)
      })
      .catch(function (error) {
        setDisplaySearch(false)
      });
  }

  function searchEvaluationsByCourseType(courseTypeID){
    setDisplaySearch(true)
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'course_type_id': courseTypeID ,
    });
    let config = {
      method: 'post',
      url: '/api/evaluations/getByCourseType',
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    console.log(config);
    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setAllEvaluations(allResponse['evaluations'])
        setDisplaySearch(false)
      })
      .catch(function (error) {
        setDisplaySearch(false)
      });
  }

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
          <SearchButtons
            dateSearchCallBack={searchEvaluationsByDate}
            courseSearchCallBack={searchEvaluationsByCourse}
            courseTypeSearchCallBack={searchEvaluationsByCourseType}
          />
          <br/>
          <Divider/>
          <br/>
          {displaySearch &&
            <LinearProgress />
          }
          <EvaluationsListToolbar/>
          <Box sx={{ mt: 3 }}>
            {allEvaluations.length !== 0 &&
              <EvaluationsListResults allEvaluations={allEvaluations}/>
            }
            {allEvaluations.length === 0 &&
              <Typography
                sx={{ m: 1, textAlign: "center" }}
                variant="h6"
              >
                Δεν υπάρχουν αξιολογήσεις
              </Typography>
            }
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
