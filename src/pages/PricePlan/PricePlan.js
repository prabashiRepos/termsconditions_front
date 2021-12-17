import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SqillUP.UK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 Student Account',
      'Videos 1 per chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '20',
    description: [
      '1 Student Account',
      'Videos 1 per chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro Plus',
    price: '25',
    description: [
      '2+ Student Account',
      'Videos all chapter',
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'WHAT WE OFFER',
    description: ['For Schools', 'For Home', 'Science', 'Maths', 'Free Resources'],
  },
  {
    title: 'ABOUT',
    description: [
      'Company',
      'Mission',
      'Curriculum',
      'Careers',
      'Blog',
      'Testimonials',
    ],
  },
  {
    title: 'HELP',
    description: ['FAQ', 'Contact Us', 'Technical Support', 'Legals'],
  },
  {
    title: 'GET THE APP ON',
    description: ['Google Play', 'App Store'],
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('One', 159, 6.0, 24),
  createData('More Than One', 237, 9.0, 37),
];

class PricePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planDuration: 'monthly',
      moreView: false,
      pricePlanDetails: [],
      restStudentAccountDetails: [],
    };
  }

  componentDidMount() {
    this.getPricePlanDetails();
  }

  getPricePlanDetails() {
    let that = this;
    axios.post('http://127.0.0.1:8000/api/auth/viewPlans')
      .then(function (response) {
        console.log(response.data);
        that.setState({ pricePlanDetails: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  changeMoreView(flag) {
    this.setState({ moreView: !flag });
  }

  render() {

    const handlePriceDuration = (event, newAlignment) => {
      this.setState({ planDuration: newAlignment });
    };
    return (
      <React.Fragment>
        {/* Hero unit */}
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            The right plan for your children
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" component="p">
            Choose plan that works best for you children future
          </Typography>

          <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:2}}>
            <ToggleButtonGroup
              value={this.state.planDuration}
              exclusive
              onChange={handlePriceDuration}
              aria-label="text alignment"
            >
              <ToggleButton value="monthly" aria-label="left aligned">
                Monthly
              </ToggleButton>
              <ToggleButton value="annually" aria-label="right aligned">
                Annually
              </ToggleButton>
            </ToggleButtonGroup>
          </Typography>

        </Container>

        {/* End hero unit */}
        <Container maxWidth="md" component="main">

          <Grid container spacing={5} alignItems="flex-end">
            {this.state.pricePlanDetails.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.id}
                xs={12}
                sm={6}
                md={4}
              >
                {this.state.planDuration === "monthly" ?
                  // ****************** Monthly Plan ************************
                  <>
                    <Card>
                      <CardHeader
                        title={tier.name}
                        subheader={tier.name === "Pro" ? "Most Popular" : null}
                        titleTypographyProps={{ align: 'center' }}
                        action={tier.name === 'Pro' ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: 'center',
                          color: 'white'
                        }}
                        sx={{
                          backgroundColor: '#3AB9C1',
                          color: 'white'
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                            ${tier.monthly_price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /mo
                          </Typography>
                        </Box>
                        <ul>
                          {/* {tier.description.map((line) => ( */}
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.max_students + " Student Account"}
                          </Typography>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.restrictions.video_per_chapter === null ? "Videos All Chapter" : "Videos " + tier.restrictions.video_per_chapter + " Per Chapter"}
                          </Typography>
                          {/* ))} */}
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.name === "Pro" ? "contained" : "outlined"}>
                          Subscribe Now
                        </Button>
                      </CardActions>
                    </Card>
                  </> :
                  // ****************** Annualy Plan ************************
                  <>
                    <Card>
                      <CardHeader
                        title={tier.name}
                        subheader={tier.name === "Pro" ? "Most Popular" : null}
                        titleTypographyProps={{ align: 'center' }}
                        action={tier.name === 'Pro' ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: 'center',
                          color: 'white'
                        }}
                        sx={{
                          backgroundColor: '#3AB9C1',
                          color: 'white'
                        }}
                      />
                        
                      <CardContent>
                        {tier.yearly_discount != 0 ?
                      <Typography sx={{ fontWeight: 'bold' }} align='right'>
                      <Chip sx={{alignSelf:'center'}} variant="outlined" color="success" icon={<LocalOfferIcon />} label={tier.yearly_discount + " % Save" } />
                      </Typography> :
                      null
                      }
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          
                          <Typography component="h2" variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                            ${tier.yearly_price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /Year
                          </Typography>
                        </Box>
                        <ul>
                          {/* {tier.description.map((line) => ( */}
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.max_students + " Student Account"}
                          </Typography>
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={tier.id}
                          >
                            <CheckCircleIcon color="success" /> {tier.restrictions.video_per_chapter === null ? "Videos All Chapter" : "Videos " + tier.restrictions.video_per_chapter + " Per Chapter"}
                          </Typography>
                          {/* ))} */}
                        </ul>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.name === "Pro" ? "contained" : "outlined"}>
                          Subscribe Now
                        </Button>
                      </CardActions>
                    </Card>
                  </>
                }
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mt: 2,
            }}
          >
            See all features &nbsp;
            {!this.state.moreView ?
              <Fab color="primary" aria-label="add" onClick={() => this.changeMoreView(this.state.moreView)}>
                <ArrowCircleDownIcon />
              </Fab> :
              <Fab color="primary" aria-label="add" onClick={() => this.changeMoreView(this.state.moreView)}>
                <ArrowCircleUpIcon />
              </Fab>
            }
          </Box>
        </Container>

        {/* Restriction Details Start */}
        <Container maxWidth="md" sx={{ mt: 5 }}>
          {this.state.moreView ?
            <>
            {/* Student Account Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p">
                Student Account
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.max_students >= 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        More Than One
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.max_students > 1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Student Account End */}

              {/* Class Videos Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Class Videos
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter >= 1 || row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.video_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Class Videos End */}

              {/* Self Test Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Self Test
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter >= 1 || row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.self_test_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Self Test End */}

              {/* Worksheet Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Worksheet
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter >= 1 || row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.work_sheet_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Worksheet End */}

              {/* Past Paper Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Past Paper
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        PDF Download
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.past_paper_year_pdf >= 1 || row.restrictions.past_paper_year_pdf === null || row.restrictions.past_paper_marking_scheme_pdf >= 1 || row.restrictions.past_paper_marking_scheme_pdf === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
              {/*  Past Paper End */}

              {/* Queries Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Queries
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        General Queries
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Queries
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Queries End */}

              {/* Revision Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Revision
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.q_a >= 1 || row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.q_a === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Revision End */}

              {/* Challenges Start */}
              <Typography variant="h6" align="center" color="text.secondary" component="p" sx={{mt:3}}>
               Challenges
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Free</TableCell>
                      <TableCell align="right">Pro</TableCell>
                      <TableCell align="right">Pro Plus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        One Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter >= 1 || row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        All Chapter
                      </TableCell>
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Free' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>: null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                      {this.state.pricePlanDetails.map((row) => (
                        row.name === 'Pro Plus' ?
                        <TableCell align="right">{row.restrictions.chalanges_per_chapter === null ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</TableCell>:null
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Challenges End */}
            </> :
            null
          }
        </Container>
        {/* Restriction Details End */}

        {/* Footer */}
        <Container
          maxWidth="100%"
          component="footer"
          sx={{
            backgroundColor: '#3A8B8C',
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 6],
          }}
        >
          <Typography variant="h4" color="white" gutterBottom sx={{ fontWeight: 'bold' }}>
            SqillUP
          </Typography>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="white" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Typography variant="p" variant="subtitle1" color="white">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 5, color: 'white', height: 5 }} />
          <Copyright sx={{ mt: 2, color: 'white' }} />
        </Container>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

export default PricePlan;