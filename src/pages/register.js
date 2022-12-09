import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import UserAdded from '../components/dialogs/user-added';
import UserError from '../components/dialogs/user-error';

export default function Register() {
  const [displaySuccess, setDisplaySuccess] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: "",
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Το e-mail πρέπει να είναι έγκυρο')
        .max(255)
        .required(
          'Το e-mail είναι υποχρεωτικό'),
      firstName: Yup
        .string()
        .max(255)
        .required('Το όνομα είναι υποχρεωτικό'),
      lastName: Yup
        .string()
        .max(255)
        .required('Το επώνυμο είναι υποχρεωτικό'),
      phone: Yup
        .string()
        .max(255)
        .required("Ο αριθμός κινητού τηλεφώνου είναι υποχρεωτικό"),
      username: Yup
        .string()
        .max(255)
        .required("Το όνομα χρήστη είναι υποχρεωτικό"),
      password: Yup
        .string()
        .max(255)
        .required("Ο κωδικός πρόσβασης είναι υποχρεωτικός")
    }),
    onSubmit: addNewUser
  });

  function addNewUser(){
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'first_name': formik.values.firstName,
      'last_name': formik.values.lastName,
      'phone': formik.values.phone,
      'username': formik.values.username,
      'email': formik.values.email,
      'password': formik.values.password,
      'disabled': '0',
      'role_id': '2'
    });
    let config = {
      method: 'post',
      url: '/api/users/public/add',
      headers: {
        'Accept': 'application/json',
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
        setDisplayError(true)
      });
  }

  return (
    <>
      <Head>
        <title>
          Εγγραφή Χρήστη | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Δημιουργία Χρήστη
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Όνομα"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Επώνυμο"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Όνομα Χρήστη"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Τηλέφωνο"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phone}
              variant="outlined"
            />
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Εγγραφή
              </Button>
            </Box>
          </form>
          {displaySuccess &&
            <UserAdded
              onClose={() => router.push("/").then()}
            />
          }
          {displayError &&
            <UserError
              onClose={() => setDisplayError(false)}
            />
          }
        </Container>
      </Box>
    </>
  );
};
