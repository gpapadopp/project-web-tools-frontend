import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Tooltip
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const EvaluationsListResults = ({ allEvaluations, ...rest }) => {

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
                  Κατάσταση
                </TableCell>
                <TableCell>
                  Μάθημα
                </TableCell>
                <TableCell>
                  Τύπος Μαθήματος
                </TableCell>
                <TableCell>
                  Μ.Ο. Αξιολόγησης
                </TableCell>
                <TableCell>
                  Μοναδικός Κωδικός
                </TableCell>
                <TableCell>
                  Ημερομηνία Υποβολής
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allEvaluations.map((evaluation) => {
                const createdDate = new Date(Date.parse(evaluation.created_at))
                const createdDateString = createdDate.getDate().toString() + "/" + (createdDate.getMonth() + 1).toString() + "/" + createdDate.getFullYear().toString()
                return (
                  <>
                    <TableRow
                      hover
                      key={evaluation.id}
                    >
                      <TableCell>
                        {evaluation.id}
                      </TableCell>
                      <TableCell>
                        {evaluation.is_done &&
                          <Tooltip title={"Ολοκληρωμένη"} placement={"top"}>
                            <CheckIcon/>
                          </Tooltip>
                        }
                        {!evaluation.is_done &&
                          <Tooltip title={"Μη-Ολοκληρωμένη"} placement={"top"}>
                            <CloseIcon/>
                          </Tooltip>
                        }
                      </TableCell>
                      <TableCell>
                        {evaluation.course.name}
                      </TableCell>
                      <TableCell>
                        {evaluation.course.course_type.name}
                      </TableCell>
                      <TableCell>
                        {evaluation.average === null &&
                          <>
                            -
                          </>
                        }
                        {evaluation.average !== null &&
                          <>
                            {evaluation.average}
                          </>
                        }
                      </TableCell>
                      <TableCell>
                        {evaluation.token}
                      </TableCell>
                      <TableCell>
                        {createdDateString}
                      </TableCell>
                    </TableRow>
                  </>
                )
              }
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

EvaluationsListResults.propTypes = {
  allEvaluations: PropTypes.array.isRequired
};
