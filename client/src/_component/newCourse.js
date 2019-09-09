
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function NewCourse() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'NewCourse © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          NewCourse
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first name"
            label="first name"
            name="first name"
            autoComplete="first name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last name"
            label="last name"
            type="last name"
            id="last name"
            autoComplete="current-last name"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ID number"
            label="ID number"
            type="ID number"
            id="ID number"
            autoComplete="current-ID number"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="E-mail"
            label="E-mail"
            type="E-mail"
            id="E-mail"
            autoComplete="current-E-mail"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone number"
            label="phone number"
            type="phone number"
            id="phone number"
            autoComplete="current-phone number"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="address"
            type="address"
            id="address"
            autoComplete="current-address"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            NewCourse
          </Button>
  
        </form>
      </div>
      <Box mt={8}>
        <NewCourse />
      </Box>
    </Container>
  );
}