import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render(){

    return(
      <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor:'#3A8B8C' }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight:'bold' }}>
            SqillUP
          </Typography>
          <nav>
            
          </nav>
          <Button href="#" variant="text" sx={{ my: 1, mx: 1.5, color:'white', ":hover":{color:'white'}}} startIcon={<AccountCircleIcon />}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    );
  }
}

export default NavBar;