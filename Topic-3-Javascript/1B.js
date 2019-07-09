import { getTypeError } from './helpers.js';

// Takes a day and a number and returns the day after the given number of
// days have passed.
// INPUT:
// <-- day: String
// The day to use to calculate the day after.
// <-- daysAfter: Number ** integer **
// The number of days that have passed from the specified day.
// OUTPUT:
// --> String: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' |
//             'Friday' | 'Saturday'
// The function worked as expected.
// SIDE EFFECTS:
// - An alert is displayed when "day" parameter is not of type String.
// - An alert is displayed when "daysAfter" parameter is not of type Number and
// is not an integer.

export default function getDayAfter(day, daysAfter) {
  const dayType = typeof day;
  const daysAfterType = typeof daysAfter;
  // Check that "day" parameter is of type String...
  if (dayType !== 'string') {
    const error = getTypeError('day', dayType, 'string');
    alert(error.message);
    throw error;
  }
  // ...and not empty.
  else if (day.length === 0) {
    const error = new RangeError(`"day" parameter can't be an empty string.`);
    alert(error.message);
    throw error;
  }
  // Check that "daysAfter" parameter is of type Number and an integer.
  else if (
    daysAfterType !== 'number' ||
    daysAfter !== parseInt(daysAfter, 10) ||
    Number.isNaN(daysAfter)
  ) {
    const error = getTypeError('daysAfter', daysAfterType, 'integer');
    alert(error.message);
    throw error;
  }
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  // Capitalize "day" just in case it's valid.
  const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
  // Check that "day" is a valid day.
  if (!days.includes(capitalizedDay)) {
    const error = new RangeError('"day" parameter is not a valid day.');
    alert(error.message);
    throw error;
  }
  // Can work with negative numbers if index is computed as:
  // Math.abs(days.indexOf(capitalizedDay) + daysAfter + days.length))
  // % days.length;
  // when daysAfter < 0.
  return days[days.indexOf(capitalizedDay) + daysAfter];
}
