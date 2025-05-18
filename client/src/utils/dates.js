// Finds date offset by a number of days.
// Use negative numbers to find dates before the startDate
export function findDateFrom(startDate, offset) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
}

// Finds date offset by a number of minutes.
// Use negative numbers to find times before the startDate
export function findMinutesFrom(startDate, offset) {
  const newDate = new Date(startDate);
  newDate.setMinutes(newDate.getMinutes() + offset);
  return newDate;
}

export function getMidnight(epochMs) {
  let date = new Date(epochMs);
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  return date;
}
