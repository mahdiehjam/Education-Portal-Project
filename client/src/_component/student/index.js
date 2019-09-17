import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Student extends React.Component {

  constructor(props){
    super(props);
    const { children, value, index, ...other } = this.props;
  }
  

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }else{
        this.props.history.push('/');
        alert('not authenticated')
       
    }
} 
render(){
  const { children, value, index, ...other } = this.props;
  return (
    
    <Typography
      component="div"
      role="Student"
      hidden={value !== index}
      id={`scrollable-auto-Student-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
  
}

Student.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-Student-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
}));

export  function ScrollableTabsButtonAuto() {
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
          <Tab label="upload exercise" {...a11yProps(0)} />
          <Tab label="Item two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <Student value={value} index={0}>
        Item one
      </Student>
      <Student value={value} index={1}>
        Item two
      </Student>
      <Student value={value} index={2}>
        Item three
      </Student>
      <Student value={value} index={3} >
        Item Four
      </Student>
      <Student value={value} index={4}>
        Item Five
      </Student>
      <Student value={value} index={5}>
        Item Six
      </Student>
      <Student value={value} index={6}>
        Item Seven
      </Student>
    </div>
  );
}

 Student.propTypes = {
  //registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}; 

 const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
}); 

export default connect(mapStateToProps)(withRouter(Student))