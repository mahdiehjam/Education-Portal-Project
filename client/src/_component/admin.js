import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from "./adduser.index";

const Admin = withStyles({
  root: {
    borderBottom: '1px  solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const columns = [
    {name: 'username', label: 'UserName', type: 'text',required: true},
    {name: 'firstName', label: 'First Name', type: 'text',required: true},
    {name: 'lastName', label: 'Last Name', type: 'text'},
    {name: 'sex', label: 'Sex', type: 'bool', true: 'Male', false: 'Female', initValue: false},
    {name: 'age', label: 'Age', type: 'number'},
    {name: 'status', label: 'Status', type: 'list', options: [
      {value: '0', label: 'Active'},
      {value: '1', label: 'Deactive'},
      {value: '2', label: 'Suspend'},
    ],required: true}
  ]
  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        {/* <Admin value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Tab 1" />
          <AntTab label="Tab 2" />
          <AntTab label="Tab 3" />
        </Admin> */}
        {/* <Typography className={classes.padding} /> */}
      </div>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Users" />
          <StyledTab label="Courses" />
          <StyledTab label="Connections" />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
      <div>
      <Table columns={columns}/>
      </div>
    </div>
  );
}