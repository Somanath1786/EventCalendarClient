import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar';
import * as dates from './dates'
import globalize from 'globalize'
import { connect } from 'react-redux';
import Header from './Header';
import EventForm from "./EventForm";
import {populate, showEventDetails} from './store'
import EventDetails from "./EventDetails";

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
  var url = 'http://localhost:5000/api/fhlEvents';
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

class FHLCalendar extends React.Component {


  componentDidMount()
  {
    getEventsFromServer(this.props.dispatch);
  }

  showDetails(event, dispatch)
  {
    dispatch(showEventDetails(event))
  }

  render()
  {
    const { itemToDisplay, events} = this.props;


    var displayItem;

    if (itemToDisplay === 'calendar')
    {
      displayItem = <Calendar
      style= {{height:"800px"}}
      events = {events}
      Views = {allViews}
      step = {60}
      showMultiDayTimes
      defaultDate={new Date(2019, 6, 1)}
      max={dates.add(dates.endOf(new Date(2020, 6, 1), 'day'), -1, 'hours')}
      onSelectEvent={event => this.showDetails(event, this.props.dispatch)}
      components={{
          timeSlotWrapper : ColoredDateCellWrapper
      }}
      localizer={localizer}
      />
    }

    if (itemToDisplay === 'form')
    {
      displayItem = <EventForm eventForm="fhl"/>
    }

    if (itemToDisplay === 'details')
    {
      displayItem = <EventDetails />
    }

    return (
        <div style= {{height:"800px"}}>
            <Header title="FHL July 2019"/>
            {displayItem}
        </div>
    );
  }
}

// Connect the redux store to react
function mapStateToProps(state) {
  return {
    itemToDisplay : state.itemToDisplay,
    events : state.events
  };
}

export default connect(
  mapStateToProps,
  null
)(FHLCalendar);