import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar';
import * as dates from './dates'
import globalize from 'globalize'
import { connect } from 'react-redux';
import Header from './Header';
import EventForm from "./EventForm";
import { showEventDetails, populate } from './store'
import AppBar from '@material-ui/core/AppBar';
import EventDetails from "./EventDetails";
import Button from '@material-ui/core/Button';

const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

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
  console.log(REACT_APP_API_DOMAIN, BASE_URL)
  //var url = 'http://localhost:5000/api/giveEvents';
  var url = `${BASE_URL}/api/giveEvents`
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

function getFilteredEvents(dispatch)
{
  //var url = 'http://localhost:5000/api/giveEvents?event_type=Volunteering';
  var url = `${BASE_URL}/api/giveEvents?event_type=Volunteering`
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

function getFilteredEvents2(dispatch)
{
  //var url = 'http://localhost:5000/api/giveEvents?event_type=FundRaising';
  var url = `${BASE_URL}/api/giveEvents?event_type=FundRaising`
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

  showDetails(event, dispatch)
  {
    dispatch(showEventDetails(event))
  }

  filterVolunteering(dispatch)
  {
    getFilteredEvents(dispatch)
  }

  filterFund(dispatch)
  {
    getFilteredEvents2(dispatch)
  }

  render()
  {
    const {itemToDisplay, events} = this.props;
    var displayItem;
    if (itemToDisplay === 'form')
    {
      displayItem = <EventForm eventForm="give"/>
    }
    if(itemToDisplay === 'calendar')
    {
      displayItem = <Calendar
      style= {{height:"800px"}}
      events = {events}
      Views = {allViews}
      step = {60}
      showMultiDayTimes
      defaultDate={new Date(2019, 9, 1)}
      max={dates.add(dates.endOf(new Date(2020, 9, 1), 'day'), -1, 'hours')}
      onSelectEvent={event => this.showDetails(event, this.props.dispatch)}
      components={{
          timeSlotWrapper : ColoredDateCellWrapper
      }}
      localizer={localizer}
      />
    }

    if (itemToDisplay === 'details')
    {
      displayItem = <EventDetails />
    }

    return (
        <div style= {{height:"800px"}}>
            <Header title="Give Calendar 2019"/>
            <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}} onClick={()=> this.filterVolunteering(this.props.dispatch)}>Filter by Volunteering Events</Button>
            <Button variant=  "contained" color = "primary" style = {{marginLeft: '5px', marginRight : '5px'}} onClick={()=> this.filterFund(this.props.dispatch)}>Filter by Fund Raising Events</Button>
            {displayItem}
            <AppBar position="fixed" color="default" style={{top:'auto', bottom: 0, height: '40px'}}>
            Please submit your feedback/questions/concerns to Soma (skrishna@microsoft.com)
            </AppBar>
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
)(EventCalendar);