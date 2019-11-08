import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="form tabs">
          <Tab label="Required Input Log" {...a11yProps(0)} />
          <Tab label="Nomination Details" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
