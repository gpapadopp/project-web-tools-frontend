import {
  Box, Button,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';

export default function CoursesListToolbar ({ props }){
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
            Μαθήματα
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/admin/course/add").then()}
          >
            Προσθήκη Μαθήματος
          </Button>
        </Box>
      </Box>
    </>
  )
}
