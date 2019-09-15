import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Register from "./register";
import NewCourse from "./newCourse";
import Navbar from './navbar';
function Admin(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="Admin"
      hidden={value !== index}
      id={`scrollable-auto-Admin-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

Admin.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-Admin-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
 
  return (
    <div className={classes.root}>
      
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="add user" {...a11yProps(0)} />
          <Tab label="add course" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <Admin value={value} index={0}>
      <Register />
      </Admin>
      <Admin value={value} index={1}>
      <NewCourse/>
      </Admin>
      <Admin value={value} index={2}>
        Item Three
      </Admin>
      <Admin value={value} index={3} >
        Item Four
      </Admin>
      <Admin value={value} index={4}>
        Item Five
      </Admin>
      <Admin value={value} index={5}>
        Item Six
      </Admin>
      <Admin value={value} index={6}>
        Item Seven
      </Admin>
    </div>
  );
}