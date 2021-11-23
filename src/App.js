
import * as React from 'react';
import './App.css';
import { styled, alpha } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { red } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

import axios from 'axios';

// const theme = useTheme();
const drawerWidth = 240;

const styles = theme => ({
  myCustomClass: {
    color: theme.palette.common.white
  }
})

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const menuId = 'primary-search-account-menu';

const headerBackgroundColor = {
  backgroundColor: '#1976d296',
  borderRadius: 5
};

const bodyBackgroundColor = {
  backgroundColor: '#1976d236',
  borderRadius: 5
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      createUserType:"",
      createSectionType:"",
      createDescription:"",
      open: false,
      openAddTC: false,
      openEditTC: false,
      openDeleteTC:false,
      allTandC:[],
      allUserType:[],
      allSectionType:[],
      loadingTandC:false,

      editUserType:"",
      editSectionType:"",
      editDescription:"",
      editTermId:"",

      deleteTermId:"",

      errCreateDescription:false,
      errEditDescription:false,

      alertErrorCreate:false,
      alertErrorCreateMessage:"",

      alertErrorEdit:false,
      alertErrorEditMessage:"",
    };
  }
  
  handleChange = (event) => {
    this.setState({
      age: event.target.value
    });
  };

  // Change User Types when create
  handleChangeCreateUserType = (event) => {
    this.setState({
      createUserType: event.target.value
    });
    console.log(event.target.value);
  };

  // Change Section Types when create
  handleChangeCreateSectionType = (event) => {
    this.setState({
      createSectionType: event.target.value
    });
    console.log(event.target.value);
  };

  // Change description Types when create
  handleChangeCreateDescription = (event) => {
    if (event.target.value.length != 0) {
      this.setState({
        errCreateDescription: true
      });
    }else{
      this.setState({
        errCreateDescription: false
      });
    }

    this.setState({
      createDescription: event.target.value
    });
    console.log(event.target.value);
  };

  // Change User Types when Edit
  handleEditUserType = (event) => {
    this.setState({
      editUserType: event.target.value
    });
  };

  // Change Section Types when edit
  handleEditSectionType = (event) => {
    this.setState({
      editSectionType: event.target.value
    });
  };

  // Change description Types when edit
  handleEditDescription = (event) => {
    if (event.target.value.length != 0) {
      this.setState({
        errEditDescription: true
      });
    }else{
      this.setState({
        errEditDescription: false
      });
    }
    this.setState({
      editDescription: event.target.value
    });
  };

  handleClickOpenAddDialog = () => {
    this.setState({
      openAddTC: true
    });
  };

  handleCloseAddDialog = () => {
    this.setState({
      openAddTC: false
    });
  };

  handleClickOpenEditDialog = () => {
    this.setState({
      openEditTC: true
    });
  };

  handleClickOpenDeleteDialog = () => {
    this.setState({
      openDeleteTC: true
    });
  };

  handleCloseEditDialog = () => {
    this.setState({
      openEditTC: false
    });
  };

  handleCloseDeleteDialog = () => {
    this.setState({
      openDeleteTC: false
    });
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };

  // Get all term and condition
  getAllTandC(){
    this.setState({loadingTandC: true});
    axios.get('http://127.0.0.1:8000/api/terms')
      .then((res) => {
        this.setState({
          allTandC: res.data.data
        });
        this.setState({loadingTandC: false});
      }).catch((error) => {
        console.log(error)
        this.setState({loadingTandC: false});
      });
  };

  // Get all user types
  getUserTypes(){
    axios.get('http://127.0.0.1:8000/api/user-type')
      .then((res) => {
        this.setState({
          allUserType: res.data.data
        });
      }).catch((error) => {
        console.log(error)
      });
  };

  // Get all section types
  getSectionTypes(){
    axios.get('http://127.0.0.1:8000/api/sec-type')
      .then((res) => {
        this.setState({
          allSectionType: res.data.data
        });
      }).catch((error) => {
        console.log(error)
      });
  };

  openEditDialog(termID, userType, sectionType, description){
    this.setState({editTermId: termID});
    this.setState({editUserType:userType });
    this.setState({editSectionType:sectionType });
    this.setState({editDescription:description });

    if (description.length != 0) {
      this.setState({errEditDescription: true});
    }else{
      this.setState({errEditDescription: false});
    }
    this.handleClickOpenEditDialog();
  }

  openDeleteDialog(termID){
    this.setState({deleteTermId: termID});
    this.handleClickOpenDeleteDialog();
  }

  // Save Term and Condition
  saveTandC(){
    if (this.state.errCreateDescription == true) {
    // this.setState({loadingTandC: true});
    axios.post('http://127.0.0.1:8000/api/terms', {
      user_type_id: this.state.createUserType,
      sec_type_id: this.state.createSectionType,
      description: this.state.createDescription,
    })
      .then((res) => {
        if(res.data.http_status == "success") {
          this.setState({
            openAddTC: false
          });
          this.setState({
            alertErrorCreate: false
          });
          this.setState({
            alertErrorCreateMessage: ""
          });

          this.setState({
            createUserType: ""
          });
          this.setState({
            createSectionType: ""
          });
          this.setState({
            createDescription: ""
          });
          this.getAllTandC();
        }else{
          this.setState({
            alertErrorCreateMessage: res.data.message
          });
          this.setState({
            alertErrorCreate: true
          });
        }
        
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  // Edit Term and Condition
  editTandC(){
    if (this.state.errEditDescription == true) {
    this.setState({loadingTandC: true});
    axios.post('http://127.0.0.1:8000/api/terms/edit', {
      term_id: this.state.editTermId,
      user_type_id: this.state.editUserType,
      sec_type_id: this.state.editSectionType,
      description: this.state.editDescription,
    })
      .then((res) => {

        if(res.data.http_status == "success") {

          this.setState({
            alertErrorEdit: false
          });
          this.setState({
            alertErrorEditMessage: ""
          });

          this.setState({
            openEditTC: false
          });
          this.getAllTandC();
        }else{
          this.setState({
            alertErrorEditMessage: res.data.message
          });
          this.setState({
            alertErrorEdit: true
          });
        }

        
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  // Delete Term and Condition
  deleteTandC() {
    this.setState({loadingTandC: true});
    axios.post('http://127.0.0.1:8000/api/terms/delete', {
      term_id: this.state.deleteTermId,
    })
      .then((res) => {
        this.setState({
          openDeleteTC: false
        });
        this.getAllTandC();
      }).catch((error) => {
        console.log(error)
      });
  }

// Initial Point of the Project
  componentDidMount() {
    this.getAllTandC();
    this.getUserTypes();
    this.getSectionTypes();
    
  };
  render() {
    const { classes, theme } = this.props
    const {allTandC, allUserType, allSectionType, loadingTandC, editUserType, editSectionType, editDescription} = this.state
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar position="fixed" open={this.state.open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(this.state.open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                SqillUP
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={this.state.open}
          >
            <DrawerHeader>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {['T&C'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <LiveHelpIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Main open={this.state.open}>
            <DrawerHeader />
            {loadingTandC ? 
            <LinearProgress/>
            : null
            }
            <Typography variant="h5" gutterBottom component="div" align="left">
              Terms and Conditions
            </Typography>
            
            <Box>
            
              <Grid container spacing={2} style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Grid item xs={8} md={8}>
                  <TextField size="small" id="outlined-basic" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={4} md={4} textAlign="right" >
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={this.handleClickOpenAddDialog}>Create T&C</Button>
                </Grid>
                
                <Grid container spacing={2} style={headerBackgroundColor} marginTop={2} marginLeft={2} padding={1}>

                  <Grid item xs={2} md={2}>
                    <Typography gutterBottom variant="h6" component="div">User Type</Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography gutterBottom variant="h6" component="div">Section Type</Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <Typography gutterBottom variant="h6" component="div">Terms & Conditions</Typography>
                  </Grid>
                </Grid>

                { allTandC.map((TandC) =>

                <Grid container spacing={2} style={bodyBackgroundColor} marginTop={2} marginLeft={2} padding={1} key={TandC.id}>

                  <Grid item xs={2} md={2}>
                    <Typography gutterBottom variant="body2" component="div">{TandC.user_type.user_type_name}</Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography gutterBottom variant="body2" component="div">{TandC.section_type.sec_type_name}</Typography>
                  </Grid>
                  <Grid item xs={7} md={7}>
                    <Typography gutterBottom variant="body2" component="div">{TandC.description}</Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <IconButton
                      size="large"
                      onClick={() => this.openEditDialog(TandC.id, TandC.user_type.id, TandC.section_type.id, TandC.description)}
                    >
                      <EditIcon color="success" />
                    </IconButton>
                    <IconButton
                      size="large"
                      onClick = {() => this.openDeleteDialog(TandC.id)}
                    >
                      <DeleteOutlineIcon sx={{ color: red[500] }} />
                    </IconButton>
                  </Grid>
                </Grid>

                )}

              </Grid>
            </Box>
          </Main>
        </Box>

        {/* Dialog Create New T&C */}
        <Dialog open={this.state.openAddTC} onClose={this.handleCloseAddDialog} fullWidth>
          { this.state.alertErrorCreate ?
        <Alert severity="error">{this.state.alertErrorCreateMessage}</Alert>
        : null
          }
          <DialogTitle>Create Terms & Conditions</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.createUserType}
                label="User Type"
                onChange={this.handleChangeCreateUserType}
              >
                { allUserType.map((userType) =>
                <MenuItem value={userType.id}>{userType.user_type_name}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">Section Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.createSectionType}
                label="Section Type"
                onChange={this.handleChangeCreateSectionType}
              >
                { allSectionType.map((sectionType) =>
                <MenuItem value={sectionType.id}>{sectionType.sec_type_name}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                error={this.state.errCreateDescription ? false : true}
                helperText={this.state.errCreateDescription ? null : "Description Required"}
                onChange={this.handleChangeCreateDescription}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleCloseAddDialog} >Close</Button>
            <Button variant="contained" onClick={() => this.saveTandC()} >Save</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Edit T&C */}
        <Dialog open={this.state.openEditTC} onClose={this.handleCloseEditDialog} fullWidth>
        { this.state.alertErrorEdit ?
        <Alert severity="error">{this.state.alertErrorEditMessage}</Alert>
        : null
          }
          <DialogTitle>Update Terms & Conditions</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editUserType}
                label="User Type"
                onChange={this.handleEditUserType}
              >
                { allUserType.map((userType) =>
                <MenuItem value={userType.id}>{userType.user_type_name}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <InputLabel id="demo-simple-select-label">Section Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editSectionType}
                label="Section Type"
                onChange={this.handleEditSectionType}
              >
                { allSectionType.map((sectionType) =>
                <MenuItem value={sectionType.id}>{sectionType.sec_type_name}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                error={this.state.errEditDescription ? false : true}
                helperText={this.state.errEditDescription ? null : "Description Required"}
                value={editDescription}
                onChange={this.handleEditDescription}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleCloseEditDialog} >Close</Button>
            <Button variant="contained" onClick={() => this.editTandC()} >Save</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Delete T&C */}
        <Dialog open={this.state.openDeleteTC} onClose={this.handleCloseDeleteDialog} fullWidth>
          <DialogTitle>Delete Terms & Conditions</DialogTitle>
          <DialogContent>
          <Typography gutterBottom variant="body2" component="div">Do you want to delete this term & condition?</Typography>     
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteDialog} variant="outlined" color="success">No Keep</Button>
            <Button onClick={() => this.deleteTandC()} variant="outlined" color="error">Yes Delete</Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
