import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Form from './FormDetails';
import { blue } from '@material-ui/core/colors';

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

export default function EventForm() {
  const classes = useStyles();

  return (
    <div style={{width: '23%', margin: '0 auto'}}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Please fill out the event details
        </Typography>
        <Form />
      </CardContent>
    </Card>
    </div>
  );
}
