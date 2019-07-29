import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { populate, showCalendar } from './store';

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

function EnDFunForm({dispatch}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title : '',
    start : new Date(),
    end : new Date(),
    location : '',
    theme : '',
    comments : '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function logSuccessAndDispatch(response, dispatch)
  {
    var url = 'http://localhost:5000/api/EnDFunEvents';
    fetch(url,{
      method: 'GET', // or 'PUT'
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response =>dispatch(populate(response)))
    .catch(error => console.error('Error:', error));

    //dispatch(hideForm());
    dispatch(showCalendar())
    console.log(response);
  }

  const dismiss = function (dispatch)
  {
    //dispatch(hideForm());
    dispatch(showCalendar())
  }

  const createEvent = function (dispatch)
  {
    console.log(values);
    var url = 'http://localhost:5000/api/EnDFunEvents';
    var data =
        {
        title : values.title,
        start : values.start,
        end : values.end,
        location : values.location,
        theme : values.theme,
        comments : values.comments
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
        id="location"
        label="Location"
        className={classes.textField}
        value={values.location}
        onChange={handleChange('location')}
        margin="normal"
      />
      <br />
       <TextField
        id="theme"
        label="Theme"
        className={classes.textField}
        value={values.theme}
        onChange={handleChange('theme')}
        margin="normal"
      />

      <br />
       <TextField
        id="comments"
        label="Comments"
        className={classes.textField}
        multiline={true}
        rows={4}
        rowsMax={8}
        value={values.comments}
        onChange={handleChange('comments')}
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
  )(EnDFunForm);
