import {
  Box,
  Typography
} from '@mui/material';

export default function CourseTypesListToolbar ({ props }){
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
            Τύποι Μαθημάτων
          </Typography>
        </Box>
      </Box>
    </>
  )
}
