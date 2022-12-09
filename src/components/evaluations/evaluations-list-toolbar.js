import {
  Box, Button,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';

export default function EvaluationsListToolbar ({ props }){
  const router = useRouter()
  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            Αξιολογήσεις
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin/evaluation/add").then()}
          >
            Δημιουργία Κωδικού Αξιολόγησης
          </Button>
        </Box>
      </Box>
    </>
  )
}
