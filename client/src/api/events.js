import { findDateFrom } from "../utils/dates";

export async function getEvents(date) {
  if (arguments.length === 2){
    return getEventsInTimeSpan(arguments[0], arguments[1]);
  } 
  
  // get events from a single day: 
  const apiRoute = `/api/events/${date.getMilliseconds()}/${findDateFrom(date, 1).getMilliseconds()}`;
  const events = await fetch(apiRoute);

  return events;
}

function getEventsInTimeSpan(startDatetime, endDatetime) {}
