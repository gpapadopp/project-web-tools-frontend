import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const UserEvaluationsListResults = ({ allEvaluations, ...rest }) => {

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Μάθημα
                </TableCell>
                <TableCell>
                  Μ.Ο. Αξιολόγησης
                </TableCell>
                <TableCell>
                  Μοναδικός Κωδικός
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allEvaluations.map((evaluation) => (
                <TableRow
                  hover
                  key={evaluation.id}
                >
                  <TableCell>
                    {evaluation.course.name}
                  </TableCell>
                  <TableCell>
                    {evaluation.average}
                  </TableCell>
                  <TableCell>
                    {evaluation.token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

UserEvaluationsListResults.propTypes = {
  allEvaluations: PropTypes.array.isRequired
};
