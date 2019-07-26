import React from "react";
import EventCalendar from './Calendar';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Button } from "@material-ui/core";


function Child({ match }) {
  var calendar;
  if (match.params.id === 'GiveCalendar')
  {
    calendar = <EventCalendar/>
  }
  return (
    <div>
      {calendar}
    </div>
  );
}

function ComponentWithRegex({ match }) {
  return (
    <div>
      <h3>Only asc/desc are allowed: {match.params.direction}</h3>
    </div>
  );
}

class MainPage extends React.Component {
  render()
  {
    return (
        // <div>
        //   <EventCalendar />
        // </div>
        <Router>
        <div>
          <h2>My Event Calendars</h2>
              <Button>
              <Link to="/GiveCalendar">Give Calendar</Link>
              </Button>
              <Button>
              <Link to="/FHLCalendar">FHL Calendar</Link>
              </Button>
              <Button>
              <Link to="/EnDFunEvents">E+D Fun Events</Link>
              </Button>
              <Button>
              <Link to="/SummerOfOne">Summer of One</Link>
              </Button>


          <Route path="/:id" component={Child} />

          {/*
             It's possible to use regular expressions to control what param values should be matched.
                * "/order/asc"  - matched
                * "/order/desc" - matched
                * "/order/foo"  - not matched
          */}
          <Route
            path="/order/:direction(asc|desc)"
            component={ComponentWithRegex}
          />
        </div>
      </Router>

    );
  }
}

function mapStateToProps(state)
{
  return{
    events : state.events
  };
}

// Connect the store to the MainPage
export default connect
(
  mapStateToProps,
  null
)(MainPage);