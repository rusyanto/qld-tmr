import React from 'react';
import './App.css';
import TabPanel from '../TabPanel';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
// Components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
// Icons
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';


function a11yProps(index) {
  return {
    id: `form-tab-${index}`,
    'aria-controls': `form-tab-${index}`
  }
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

const useStyles = makeStyles(theme => ({
  success: {
    color: green[700]
  }
}));

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleChange} aria-label="form tabs">
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
            <DoneIcon className={classes.success} />
          </Grid>
          <Grid item xs={11}>
            Has RPEQ's name been entered?
          </Grid>
          <Grid item xs={1}>
            <ClearIcon color="error" />
          </Grid>
          <Grid item xs={11}>
            Has RPEQ's position been entered?
          </Grid>
          <Grid item xs={1}>
            <ClearIcon color="error" />
          </Grid>
          <Grid item xs={11}>
            Has RPEQ's email address been entered?
          </Grid>
          <Grid item xs={1}>
            <ClearIcon color="error" />
          </Grid>
          <Grid item xs={11}>
            Has RPEQ's phone number been entered?
          </Grid>
          <Grid item xs={1}>
            <ClearIcon color="error" />
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={activeTab} index={1}>
        Item Two
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
