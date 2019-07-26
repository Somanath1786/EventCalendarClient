import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {showForm} from './store'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom : '10px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const showCreateEventForm = function (dispatch)
{
    dispatch(showForm())
}

function Header({dispatch}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Give Calendar 2019
          </Typography>
          <Button color="inherit" onClick={()=> showCreateEventForm(dispatch)}>Create New Event</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


function mapStateToProps(state) {
    return {};
  }

export default connect(
    mapStateToProps,
    null
  )(Header);
