import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Reports from './Reports';
import Favorite from './Favorite';
import DeletePost from './DeletePost';
import { useUserAuth } from '../../../context/UserAuthContext';
import EditPost from './EditPost';


export default function OptionsPopper({payload}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user} = useUserAuth();
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  if (user.email === payload.author) {
    return (
      <div>
        <IconButton className='iconButtonOptions' aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon className='iconPNGOptions' sx={{color: 'primary.light'}}/>
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: '.2vw', p: '.1vw', bgcolor: 'background.paper' }}>
            <DeletePost payload={payload}/>
            <EditPost payload={payload}/>
          </Box>
        </Popper>
      </div>
    );
  }
  else {
    return (
      <div>
        <IconButton className='iconButtonOptions' aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon className='iconPNGOptions' sx={{color: 'primary.light'}}/>
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: '.2vw', p: '.1vw', bgcolor: 'background.paper' }}>
            <Reports payload={payload}/>
            <Favorite payload = {payload}/>
          </Box>
        </Popper>
      </div>
    );
  }
}