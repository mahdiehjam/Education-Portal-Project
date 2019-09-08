import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
         <FormControl className={classes.formControl} disabled>
        <InputLabel htmlFor="name-native-disabled">Id</InputLabel>
        <NativeSelect
          value={state.id}
          onChange={handleChange('name')}
          inputProps={{
            name: 'name',
            id: 'name-native-disabled',
          }}
        >
          <option value="" />
          <optgroup label="Author">
            <option value="hai">ID</option>
          </optgroup>
          <optgroup label="Contributors">
            <option value="olivier"></option>
            <option value="kevin"></option>
          </optgroup>
        </NativeSelect>
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-native-simple">Name</InputLabel>
        <Select
          native
          value={state.name}
          onChange={handleChange('name')}
          inputProps={{
            name: 'name',
            id: 'name-native-simple',
          }}
        >
          <option value="" />
          <optgroup label="Author">
            <option value="hai">Hai</option>
          </optgroup>
          <optgroup label="Contributors">
            <option value="olivier">Olivier</option>
            <option value="kevin">Kevin</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-native-simple">Family</InputLabel>
        <Select
          native
          value={state.name}
          onChange={handleChange('name')}
          inputProps={{
            name: 'name',
            id: 'name-native-simple',
          }}
        >
          <option value="" />
          <optgroup label="Author">
            <option value="hai">Hai</option>
          </optgroup>
          <optgroup label="Contributors">
            <option value="olivier">Olivier</option>
            <option value="kevin">Kevin</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Maktab</InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange('age')}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
        >
          <option value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.age}
          onChange={handleChange('age')}
          name="age"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
        >
          <option value="">None</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        <FormHelperText>With visually hidden label</FormHelperText>
      </FormControl>
     
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Age
        </InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange('age')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </div>
  );
}