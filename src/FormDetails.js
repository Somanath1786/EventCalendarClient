import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { showCalendar, populate } from './store';

const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

const useStyles = makeStyles(theme => ({
  container: {
    //display: 'flex',
    //flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function FormDetails({dispatch}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title : '',
    start : new Date(),
    end : new Date(),
    building : '',
    event_type : '',
    vp : '',
    city : '',
    designated_charity : '',
    registration_link : ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function logSuccessAndDispatch(response, dispatch)
  {
    //var url = 'http://localhost:5000/api/giveEvents';
    var url = `${BASE_URL}/api/giveEvents`
    fetch(url,{
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response =>dispatch(populate(response)))
    .catch(error => console.error('Error:', error));

    dispatch(showCalendar());
    console.log(response);
  }

  const dismiss = function (dispatch)
  {
    dispatch(showCalendar());
  }

  const createEvent = function (dispatch)
  {
    console.log(values);
    //var url = 'http://localhost:5000/api/giveEvents';
    var url = `${BASE_URL}/api/giveEvents`
    var data =
        {
        title : values.title,
        start : values.start,
        end : values.end,
        building : values.building,
        event_type : values.event_type,
        vp : values.vp,
        designated_charity : values.designated_charity
        };

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => logSuccessAndDispatch(response, dispatch))
  .catch(error => console.error('Error:', error));
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-title"
        label="Title"
        className={classes.textField}
        value={values.title}
        onChange={handleChange('title')}
        margin="normal"
      />
      <br />
      <TextField
        id="start"
        label="start"
        type="datetime-local"
        value={values.start}
        onChange={handleChange('start')}
        className={classes.textField}
      />
      <br />
      <TextField
        id="end"
        label="end"
        type="datetime-local"
        value={values.end}
        onChange={handleChange('end')}
        className={classes.textField}
      />
      <br />
       <TextField
        id="building"
        label="Building"
        className={classes.textField}
        value={values.building}
        onChange={handleChange('building')}
        margin="normal"
      />
      <br />
       <TextField
        id="event_type"
        label="Event Type"
        className={classes.textField}
        value={values.event_type}
        onChange={handleChange('event_type')}
        margin="normal"
      />
      <br />
       <TextField
        id="vp"
        label="VP"
        className={classes.textField}
        value={values.vp}
        onChange={handleChange('vp')}
        margin="normal"
      />
      <br />
       <TextField
        id="city"
        label="City"
        className={classes.textField}
        value={values.city}
        onChange={handleChange('city')}
        margin="normal"
      />
      <br />
       <TextField
        id="designated_charity"
        label="Designated Charity"
        className={classes.textField}
        value={values.designated_charity}
        onChange={handleChange('designated_charity')}
        margin="normal"
      />
      <br />
       <TextField
        id="registration_link"
        label="Registration Link"
        className={classes.textField}
        value={values.registration_link}
        onChange={handleChange('registration_link')}
        margin="normal"
      />
      <br />
      <br />
      <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}} onClick={()=> createEvent(dispatch)}>Create</Button>
      <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}} onClick={()=> dismiss(dispatch)}>Cancel</Button>
    </form>
  );
}

function mapStateToProps(state) {
    return {};
  }

export default connect(
    mapStateToProps,
    null
  )(FormDetails);
