import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Δώστε ένα έγκυρο E-mail')
        .max(255)
        .required('Το E-mail είναι υποχρεωτικό'),
      password: Yup
        .string()
        .max(255)
        .required('Ο κωδικός πρόσβασης είναι υποχρεωτικό')
    }),
    onSubmit: () => {
      const axios = require('axios');
      const qs = require('qs');
      let data = qs.stringify({
        'email': formik.values.email,
        'password': formik.values.password
      });
      let config = {
        method: 'post',
        url: '/api/users/login',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
        .then(function (response) {
          const allResponse = response.data
          localStorage.setItem("user_token", allResponse['authorisation']['token'])
          setCookie("user_token", allResponse['authorisation']['token'])
          router.push("/").then()
        })
        .catch(function (error) {
          formik.resetForm();
        });

    }
  });

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Σύνδεση | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης</title>
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
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}

            >
              Πίσω
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Σύνδεση
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Σύνδεση στη πλατφόρμα αξιολόγησης τριτοβάθμιας εκπαίδευσης
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Διεύθυνση E-mail"
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
              label="Κωδικός Πρόσβασης"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Σύνδεση
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Δεν έχετε λογαριασμό;
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Εγγραφείτε τώρα
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
