import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Form from './FormDetails';
import { blue } from '@material-ui/core/colors';
import FHLForm from './FHLForm';
import EnDFunForm from './EnDFunForm';
import SummerOfOneForm from './SummerOfOneForm';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth : 400,
    backgroundColor : blue[100]
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const getFormToDisplay = function(eventForm)
{
  if (eventForm === 'give')
  {
    return <Form />
  }
  if (eventForm === 'fhl')
  {
    return <FHLForm />
  }
  if (eventForm === 'end')
  {
    return <EnDFunForm />
  }
  if (eventForm === 'summerOfOne')
  {
    return <SummerOfOneForm />
  }

}

export default function EventForm({eventForm}) {
  const classes = useStyles();

  const form = getFormToDisplay(eventForm);

  return (
    <div style={{width: '23%', margin: '0 auto'}}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Please fill out the event details
        </Typography>
        {form}
      </CardContent>
    </Card>
    </div>
  );
}
