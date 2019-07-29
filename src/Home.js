import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
      },
  });

export default function Home() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
        <AppBar position="static" color="default" style = {{marginBottom : "20px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Events Calendar
          </Typography>
        </Toolbar>
      </AppBar>
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
        <AppBar position="fixed" color="default" style={{top:'auto', bottom: 0, height: '40px'}}>
            Please submit your feedback/questions/concerns to Soma (skrishna@microsoft.com)
        </AppBar>
        </div>
    )
}