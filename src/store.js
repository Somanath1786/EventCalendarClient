import { createStore } from 'redux';

// Set up the initial state of the store.
// Add state incrementally and add them only when needed
const initState =
{
    itemToDisplay : 'calendar',
    events :[],
    selectedEvent : ''
}


// Set up a calendar reducer.
// Add action types as per need
export function calendarReducer(state = initState, action=[])
{
    switch(action.type)
    {
        case 'CALENDAR' :
        return Object.assign({}, state, {
            itemToDisplay : 'calendar',
        });

        case 'FORM' :
        return Object.assign({}, state, {
            itemToDisplay : 'form',
        });

        case 'DETAILS' :
        return Object.assign({}, state, {
            itemToDisplay : 'details',
            selectedEvent : action.eventData
        });

        case 'POPULATE' :
            return Object.assign({}, state, {
                events: action.eventData
            });

        default :
            return state;
    }
}

// Create a store
const store = createStore(calendarReducer);

export function showCalendar()
{
    return {
        type : 'CALENDAR'
    }
}

export function showCreateForm()
{
    return {
        type : 'FORM'
    }
}

export function showEventDetails(event)
{
    return {
        type : 'DETAILS',
        eventData : event
    }
}

export function populate(events)
{
    let response = events.response;
    for(let i = 0; i < response.length; i++)
    {
        response[i].start = new Date(response[i].start)
        response[i].end = new Date(response[i].end)
    }

    return {
        type : 'POPULATE',
        eventData : events.response
    }
}

// Export the store
export default store;