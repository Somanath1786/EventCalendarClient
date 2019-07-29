import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import { showCreateForm} from './store'

import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

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
    dispatch(showCreateForm())
}

function Header({dispatch, title}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Button variant="contained" color="inherit">
        <Link to="/">Home</Link>
        </Button>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={()=> showCreateEventForm(dispatch)}>
            <IconButton aria-label="new Event" color="inherit">
                <AddCircleIcon />
            </IconButton>
          </Button>
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
