import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar';
import * as dates from './dates'
import globalize from 'globalize'
import { connect } from 'react-redux';
import Header from './Header';
import EventForm from "./EventForm";
import {populate} from './store'

const localizer = globalizeLocalizer(globalize)

let allViews = Object.keys(Views).map(k => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

function getEventsFromServer(dispatch)
{
  var url = 'http://localhost:5000/api/giveEvents';
  fetch(url,{
    method: 'GET', // or 'PUT'
    mode: 'cors',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response =>dispatch(populate(response)))
  .catch(error => console.error('Error:', error));
}

class EventCalendar extends React.Component {

  componentDidMount()
  {
    getEventsFromServer(this.props.dispatch);
  }

  render()
  {
    const {show, events} = this.props;
    var displayItem;
    if (show === true)
    {
      displayItem = <EventForm />
    }
    else
    {
      displayItem = <Calendar
      style= {{height:"800px"}}
      events = {events}
      Views = {allViews}
      step = {60}
      showMultiDayTimes
      defaultDate={new Date(2019, 6, 1)}
      max={dates.add(dates.endOf(new Date(2020, 6, 1), 'day'), -1, 'hours')}
      onSelectEvent={event => alert(event.title)}
      components={{
          timeSlotWrapper : ColoredDateCellWrapper
      }}
      localizer={localizer}
      />
    }
    return (
        <div style= {{height:"800px"}}>
            <Header />
            {displayItem}
        </div>
    );
  }
}

// Connect the redux store to react
function mapStateToProps(state) {
  return {
    show : state.display,
    events : state.events
  };
}

export default connect(
  mapStateToProps,
  null
)(EventCalendar);