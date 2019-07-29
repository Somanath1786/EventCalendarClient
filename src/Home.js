import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import { Button, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles( theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
      },
      search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        position : 'relative',
        left : '38%'
      },
      input: {
        marginLeft: 8,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },

    }));

export default function Home() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
        <AppBar position="static" color="default" style = {{marginBottom : "20px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Events Calendar
          </Typography>
          <Button color="inherit" >
            <IconButton aria-label="new Event" color="inherit">
                <AddCircleIcon />
            </IconButton>
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
      <Paper className ={classes.search}>
        <InputBase
          className={classes.input}
          placeholder="Search Event Calendars"
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </div>
        <br />
        <Paper style = {{height : 600}}>
        <Button  disbaled="true" disableRipple="true">Favourite Calendars</Button>
        <br />
        <br />
        <Button variant="contained" color="inherit" style ={{marginLeft : "10px", marginRight : "10px"}}>
        <Link to="/FHLCalendar">FHL Calendar</Link>
        </Button>
        <Button variant="contained" color="inherit" style ={{marginLeft : "10px", marginRight : "10px"}}>
        <Link to="/EnDFunEvents">E+D Fun Events</Link>
        </Button>
        <Button variant="contained" color="inherit" style ={{marginLeft : "10px", marginRight : "10px"}}>
        <Link to="/SummerOfOne">Summer of One</Link>
        </Button>
        <Button variant="contained" color="inherit" style ={{marginLeft : "10px", marginRight : "10px"}}>
        <Link to="/GiveCalendar">Give Calendar</Link>
        </Button>
        </Paper>
        <AppBar position="fixed" color="default" style={{top:'auto', bottom: 0, height: '40px'}}>
            Please submit your feedback/questions/concerns to Soma (skrishna@microsoft.com)
        </AppBar>
        </div>
    )
}