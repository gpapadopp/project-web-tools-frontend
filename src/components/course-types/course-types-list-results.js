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

export const CourseTypesListResults = ({ allCourseTypes, ...rest }) => {

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
              {allCourseTypes.map((courseTypes) => (
                <TableRow
                  hover
                  key={courseTypes.id}
                >
                  <TableCell>
                    {courseTypes.id}
                  </TableCell>
                  <TableCell>
                    {courseTypes.name}
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

CourseTypesListResults.propTypes = {
  allCourseTypes: PropTypes.array.isRequired
};
