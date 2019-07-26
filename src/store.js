import { createStore } from 'redux';

// Set up the initial state of the store.
// Add state incrementally and add them only when needed
const initState =
{
    display : false,
    events :[]
}


// Set up a calendar reducer.
// Add action types as per need
export function calendarReducer(state = initState, action=[])
{
    switch(action.type)
    {
        case 'SHOW' :
        return Object.assign({}, state, {
            display : true,
        });

        case 'HIDE' :
        return Object.assign({}, state, {
            display: false,
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

export function showForm(date) {
    return {
        type: 'SHOW',
        };
}

export function hideForm() {
    return {
        type: 'HIDE',
    };
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