import React, { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import TabPanel from '../TabPanel';
import MySnackbarContentWrapper from '../MySnackbarContentWrapper';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
// Components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
// Icons
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

function a11yProps(index) {
  return {
    id: `form-tab-${index}`,
    'aria-controls': `form-tab-${index}`
  }
}

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ccffff",
      main: "#99ccee",
      dark: "#689bbb",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffc04d",
      main: "#fc8f13",
      dark: "#c36000",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.8)",
      secondary: "rgba(0, 0, 0, 0.4)"
    }
  }
});

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  success: {
    color: green[700]
  },
  input: {
    fontSize: 14
  },
  label: {
    fontSize: 14,
    backgroundColor: "white"
  },
  formControl: {
    margin: 8
  },
  subtitle: {
    marginTop: 15
  },
  paper: {
    padding: 6
  },
  button: {
    margin: theme.spacing(1),
  }
});

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    id: '', district: '', deliveryOffice: '', nominator: '',
    tmrName: '', tmrTitle: '', tmrPosition: '', tmrEmail: '', tmrPhone: '', tmrMobile: '', tmrFax: '',
    lgaName: '', lgaTitle: '', lgaPosition: '', lgaEmail: '', lgaPhone: '', lgaMobile: '', lgaFax: '', lgaCouncil: '',
    rpeqName: '', rpeqTitle: '', rpeqPosition: '', rpeqEmail: '', rpeqPhone: '', rpeqMobile: '', rpeqFax: '',
    nomName: '', nomTitle: '', nomAddress: '', nomType: '', nomState: '', nomPostcode: '',
    nomPosition: '',nomOrganisation: '', nomPhone: '', nomMobile: '', nomFax: '', nomEmail: ''
  });

  const inputLabel = React.useRef(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFormChange = name => event => {
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const handleSubmit = () => {
    setActiveTab(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const submitForm = () => {
    setSubmitted(true);
  };

  const handleSave = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {submitted ? (
        <Typography variant="h6" align='center' style={{marginTop: 75}}>
          Thank you for submitting your Nomination Form!
        </Typography>
      ) : (
        <React.Fragment>
          <AppBar position="sticky">
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" aria-label="form tabs">
              <Tab label="Required Input Log" {...a11yProps(0)} />
              <Tab label="Nomination Details" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          <TabPanel value={activeTab} index={0}>
            <Grid container>
              <Grid item xs={11}>
                Has TMR or LGA been selected?
              </Grid>
              <Grid item xs={1}>
                {formValues.nominator ? (
                  <DoneIcon className={classes.success} />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Grid>
              <Grid item xs={11}>
                Has RPEQ's name been entered?
              </Grid>
              <Grid item xs={1}>
                {formValues.rpeqName ? (
                  <DoneIcon className={classes.success} />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Grid>
              <Grid item xs={11}>
                Has RPEQ's position been entered?
              </Grid>
              <Grid item xs={1}>
                {formValues.rpeqPosition ? (
                  <DoneIcon className={classes.success} />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Grid>
              <Grid item xs={11}>
                Has RPEQ's email address been entered?
              </Grid>
              <Grid item xs={1}>
                {formValues.rpeqEmail ? (
                  <DoneIcon className={classes.success} />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Grid>
              <Grid item xs={11}>
                Has RPEQ's phone number been entered?
              </Grid>
              <Grid item xs={1}>
                {formValues.rpeqPhone ? (
                  <DoneIcon className={classes.success} />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <TextField
              id="input-id"
              label="Unique Identifier No."
              value={formValues.id}
              onChange={handleFormChange('id')}
              fullWidth
              InputProps={{ classes: { input: classes.input } }}
              InputLabelProps={{ classes: { root: classes.label } }}
              margin="dense"
              variant="outlined"
              type="text"
            />
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel ref={inputLabel} htmlFor="input-district" className={classes.input}>
                TMR District
              </InputLabel>
              <Select
                value={formValues.district}
                onChange={handleFormChange('district')}
                labelWidth={80}
                inputProps={{
                  name: 'district',
                  id: 'input-district'
                }}
                className={classes.input}
              >
                <MenuItem className={classes.input} value={'Central West'}>Central West</MenuItem>
                <MenuItem className={classes.input} value={'Darling Downs'}>Darling Downs</MenuItem>
                <MenuItem className={classes.input} value={'Far North'}>Far North</MenuItem>
                <MenuItem className={classes.input} value={'Fitzroy'}>Fitzroy</MenuItem>
                <MenuItem className={classes.input} value={'Mackay/Whitsunday'}>Mackay/Whitsunday</MenuItem>
                <MenuItem className={classes.input} value={'Metropolitan'}>Metropolitan</MenuItem>
                <MenuItem className={classes.input} value={'North Coast'}>North Coast</MenuItem>
                <MenuItem className={classes.input} value={'Northern'}>Northern</MenuItem>
                <MenuItem className={classes.input} value={'North West'}>North West</MenuItem>
                <MenuItem className={classes.input} value={'South Coast'}>South Coast</MenuItem>
                <MenuItem className={classes.input} value={'South West'}>South West</MenuItem>
                <MenuItem className={classes.input} value={'Wide Bay/Burnett'}>Wide Bay/Burnett</MenuItem>
                <MenuItem className={classes.input} value={'Statewide'}>Statewide</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel ref={inputLabel} htmlFor="input-delivery-office" className={classes.input}>
                TMR Delivery Office
              </InputLabel>
              <Select
                value={formValues.deliveryOffice}
                onChange={handleFormChange('deliveryOffice')}
                labelWidth={130}
                inputProps={{
                  name: 'deliveryOffice',
                  id: 'input-delivery-office'
                }}
                className={classes.input}
              >
                <MenuItem className={classes.input} value={'Barcaldine'}>Barcaldine</MenuItem>
                <MenuItem className={classes.input} value={'Brisbane'}>Brisbane</MenuItem>
                <MenuItem className={classes.input} value={'Bundaberg'}>Bundaberg</MenuItem>
                <MenuItem className={classes.input} value={'Cairns'}>Cairns</MenuItem>
                <MenuItem className={classes.input} value={'Cloncurry'}>Cloncurry</MenuItem>
                <MenuItem className={classes.input} value={'Emerald'}>Emerald</MenuItem>
                <MenuItem className={classes.input} value={'Gold Coast'}>Gold Coast</MenuItem>
                <MenuItem className={classes.input} value={'Gympie'}>Gympie</MenuItem>
                <MenuItem className={classes.input} value={'Ipswich'}>Ipswich</MenuItem>
                <MenuItem className={classes.input} value={'Mackay'}>Mackay</MenuItem>
                <MenuItem className={classes.input} value={'Moreton'}>Moreton</MenuItem>
                <MenuItem className={classes.input} value={'Rockhampton'}>Rockhampton</MenuItem>
                <MenuItem className={classes.input} value={'Roma'}>Roma</MenuItem>
                <MenuItem className={classes.input} value={'Sunshine Coast'}>Sunshine Coast</MenuItem>
                <MenuItem className={classes.input} value={'Toowoomba'}>Toowoomba</MenuItem>
                <MenuItem className={classes.input} value={'Townsville'}>Townsville</MenuItem>
                <MenuItem className={classes.input} value={'Warwick'}>Warwick</MenuItem>
                <MenuItem className={classes.input} value={'Statewide'}>Statewide</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel ref={inputLabel} htmlFor="input-nominator" className={classes.input}>
                TMR or Local Government Authority (LGA) Nomination?
              </InputLabel>
              <Select
                value={formValues.nominator}
                onChange={handleFormChange('nominator')}
                labelWidth={352}
                inputProps={{
                  name: 'nominator',
                  id: 'input-nominator'
                }}
                className={classes.input}
              >
                <MenuItem className={classes.input} value={'TMR'}>TMR</MenuItem>
                <MenuItem className={classes.input} value={'LGA'}>LGA</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" className={classes.subtitle}>
              TMR Contact for Project Proposal
            </Typography>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-name"
                    label="Name"
                    value={formValues.tmrName}
                    onChange={handleFormChange('tmrName')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-phone"
                    label="Phone"
                    value={formValues.tmrPhone}
                    onChange={handleFormChange('tmrPhone')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-title"
                    label="Title"
                    value={formValues.tmrTitle}
                    onChange={handleFormChange('tmrTitle')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-mobile"
                    label="Mobile"
                    value={formValues.tmrMobile}
                    onChange={handleFormChange('tmrMobile')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-position"
                    label="Position"
                    value={formValues.tmrPosition}
                    onChange={handleFormChange('tmrPosition')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-fax"
                    label="Fax"
                    value={formValues.tmrFax}
                    onChange={handleFormChange('tmrFax')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-tmr-email"
                    label="Email"
                    value={formValues.tmrEmail}
                    onChange={handleFormChange('tmrEmail')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="body2" className={classes.subtitle}>
              Local Government Contact for Project Proposal
            </Typography>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-name"
                    label="Name"
                    value={formValues.lgaName}
                    onChange={handleFormChange('lgaName')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-phone"
                    label="Phone"
                    value={formValues.lgaPhone}
                    onChange={handleFormChange('lgaPhone')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-title"
                    label="Title"
                    value={formValues.lgaTitle}
                    onChange={handleFormChange('lgaTitle')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-mobile"
                    label="Mobile"
                    value={formValues.lgaMobile}
                    onChange={handleFormChange('lgaMobile')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-position"
                    label="Position"
                    value={formValues.lgaPosition}
                    onChange={handleFormChange('lgaPosition')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-fax"
                    label="Fax"
                    value={formValues.lgaFax}
                    onChange={handleFormChange('lgaFax')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-email"
                    label="Email"
                    value={formValues.lgaEmail}
                    onChange={handleFormChange('lgaEmail')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-lga-council"
                    label="Local Government"
                    value={formValues.lgaCouncil}
                    onChange={handleFormChange('lgaCouncil')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="body2" className={classes.subtitle}>
              RPEQ Endorsement for Project Proposal
            </Typography>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-name"
                    label="Name"
                    value={formValues.rpeqName}
                    onChange={handleFormChange('rpeqName')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-phone"
                    label="Phone"
                    value={formValues.rpeqPhone}
                    onChange={handleFormChange('rpeqPhone')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-title"
                    label="Title"
                    value={formValues.rpeqTitle}
                    onChange={handleFormChange('rpeqTitle')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-mobile"
                    label="Mobile"
                    value={formValues.rpeqMobile}
                    onChange={handleFormChange('rpeqMobile')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-position"
                    label="Position"
                    value={formValues.rpeqPosition}
                    onChange={handleFormChange('rpeqPosition')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-fax"
                    label="Fax"
                    value={formValues.rpeqFax}
                    onChange={handleFormChange('rpeqFax')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-rpeq-email"
                    label="Email"
                    value={formValues.rpeqEmail}
                    onChange={handleFormChange('rpeqEmail')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="body2" className={classes.subtitle}>
              Nominee Details for Project Proposal
            </Typography>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-name"
                    label="Name"
                    value={formValues.nomName}
                    onChange={handleFormChange('nomName')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-position"
                    label="Position"
                    value={formValues.nomPosition}
                    onChange={handleFormChange('nomPosition')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-title"
                    label="Title"
                    value={formValues.nomTitle}
                    onChange={handleFormChange('nomTitle')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-organisation"
                    label="Organisation"
                    value={formValues.nomOrganisation}
                    onChange={handleFormChange('rpeqMobile')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-address"
                    label="Postal Address"
                    value={formValues.nomAddress}
                    onChange={handleFormChange('nomAddress')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-phone"
                    label="Phone"
                    value={formValues.nomPhone}
                    onChange={handleFormChange('nomPhone')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-type"
                    label="Suburb/Town/Locality"
                    value={formValues.nomType}
                    onChange={handleFormChange('nomType')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-mobile"
                    label="Mobile"
                    value={formValues.nomMobile}
                    onChange={handleFormChange('nomMobile')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-state"
                    label="State"
                    value={formValues.nomState}
                    onChange={handleFormChange('nomState')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-fax"
                    label="Fax"
                    value={formValues.nomFax}
                    onChange={handleFormChange('nomFax')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-postcode"
                    label="Postcode"
                    value={formValues.nomPostcode}
                    onChange={handleFormChange('nomPostcode')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} className={classes.container}>
                  <TextField
                    id="input-nom-email"
                    label="Email"
                    value={formValues.nomEmail}
                    onChange={handleFormChange('nomEmail')}
                    className={classes.formControl}
                    fullWidth
                    InputProps={{ classes: { input: classes.input } }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    margin="dense"
                    variant="outlined"
                    type="Email"
                  />
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>

          <Button variant="outlined" color="secondary" className={classes.button} onClick={handleSave}>
            Save as Draft
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleSubmit}>
            Submit
          </Button>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Submit Form
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to submit?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={submitForm} color="secondary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
          <MySnackbarContentWrapper
            onClose={handleCloseSnackbar}
            variant="success"
            message="Form successfully saved!"
          />
          </Snackbar>
        </React.Fragment>
      )}
    </ThemeProvider>
  );
}

export default App;
