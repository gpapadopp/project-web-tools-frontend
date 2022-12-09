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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const RolesListResults = ({ allRoles, ...rest }) => {

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
                  Admin?
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRoles.map((role) => (
                <TableRow
                  hover
                  key={role.id}
                >
                  <TableCell>
                    {role.id}
                  </TableCell>
                  <TableCell>
                    {role.name}
                  </TableCell>
                  <TableCell>
                    {role.super_admin &&
                      <CheckIcon/>
                    }
                    {!role.super_admin &&
                      <CloseIcon/>
                    }
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

RolesListResults.propTypes = {
  allRoles: PropTypes.array.isRequired
};
