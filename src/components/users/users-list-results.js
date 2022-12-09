import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const UsersListResults = ({ allUsers, ...rest }) => {

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
                <TableCell>
                  Επώνυμο
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Όνομα Χρήστη
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    {user.first_name}
                  </TableCell>
                  <TableCell>
                    {user.last_name}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.username}
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

UsersListResults.propTypes = {
  allUsers: PropTypes.array.isRequired
};
