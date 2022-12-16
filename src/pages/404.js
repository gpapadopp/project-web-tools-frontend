import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Page = () => (
  <>
    <Head>
      <title>
        404 | Σύστημα Αξιολόγησης Τριτοβάθμιας Εκπαίδευσης
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
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: Η σελίδα που προσπαθείς να φορτώσεις φαίνεται να μην είναι εδώ...
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Ή δοκιμάσατε κάποια μη κατανοητή διαδρομή ή ήρθατε εδώ κατά λάθος.
            Όποιο και αν είναι, δοκιμάστε να χρησιμοποιήσετε την πλοήγηση
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Πηγαίνετε πίσω στην αρχική σελίδα
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
