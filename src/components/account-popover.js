import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { MenuItem, MenuList, Popover } from '@mui/material';
import { useCookies } from 'react-cookie';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

  function logout(){
    removeCookie(['user_token'])
    router.push('/').catch(console.error);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={logout}>
          Αποσύνδεση
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
