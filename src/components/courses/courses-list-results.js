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

export const CoursesListResults = ({ allCourses, ...rest }) => {

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Όνομα
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCourses.map((course) => (
                <TableRow
                  hover
                  key={course.id}
                >
                  <TableCell>
                    {course.id}
                  </TableCell>
                  <TableCell>
                    {course.name}
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

CoursesListResults.propTypes = {
  allCourses: PropTypes.array.isRequired
};
