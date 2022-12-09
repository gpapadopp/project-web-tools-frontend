import {
  Box,
  Typography
} from '@mui/material';

export const RolesListToolbar = (props) => (
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
        Ρόλοι
      </Typography>
    </Box>
  </Box>
);
