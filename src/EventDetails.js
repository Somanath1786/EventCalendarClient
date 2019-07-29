import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { showCalendar } from './store';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function EventDetails({selectedEvent, dispatch}) {
  const classes = useStyles();

  const dismiss = function (dispatch)
  {
    dispatch(showCalendar())
  }

  const getEventDetails = function()
  {
      let details = [];
     for( let detail in selectedEvent)
     {
        if (detail !== '_id' && detail !== '__v' && detail !== 'created_at' && detail !== 'updated_at' && selectedEvent[detail] !== '')
        {
            details.push( (<Button>{detail.toString()} {selectedEvent[detail].toString()} <br/> </Button>) );
        }
     }

     return details;
  }

  var details = getEventDetails();


  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3" component="h2">
          {selectedEvent.title}
        </Typography>

       {details}
      </CardContent>
      <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}} onClick={()=> dismiss(dispatch)}>OK</Button>
      <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}}>Add to My Calendar</Button>

    </Card>
  );
}

function mapStateToProps(state) {
    return {
        selectedEvent : state.selectedEvent
    };
  }

export default connect(
    mapStateToProps,
    null
  )(EventDetails);