import { DATE } from '../components/translation';

function isTypeOfDate(date) {
  return date instanceof Date && date.constructor === Date;
}

function getDayOfWeekShort(dayOfWeek, language) {
  return DATE.dayOfWeek[dayOfWeek] ? DATE.dayOfWeek[dayOfWeek].short[language] : null;
}

function getDayOfWeekFull(dayOfWeek, language) {
  return DATE.dayOfWeek[dayOfWeek] ? DATE.dayOfWeek[dayOfWeek].full[language] : null;
}

function getMonth(month, language) {
  return DATE.month[language][month];
}

function getTime(time, language) {
  if (isTypeOfDate(time)) {
    const minutes = time.getMinutes();
    return `${getDayOfWeekShort(time.getDay(), language)} ${time.getDate()} ${getMonth(time.getMonth(), language)}
     ${time.getHours()}:${minutes > 9 ? minutes : `0${minutes}`}`;
  }
  return null;
}

function getUpdatedTime(time, language) {
  if (isTypeOfDate(time)) {
    return `${getTime(time, language)}`;
  }
  return null;
}

function getCurrentTime(time, language) {
  if (isTypeOfDate(time)) {
    const seconds = time.getSeconds();
    return `${getTime(time, language)}:${seconds > 9 ? seconds : `0${seconds}`}`;
  }
  return null;
}

function getSeason(month) {
  switch (month) {
    case 1:
    case 2:
    case 3:
      return DATE.season.spring;
    case 4:
    case 5:
    case 6:
      return DATE.season.summer;
    case 7:
    case 8:
    case 9:
      return DATE.season.autumn;
    case 10:
    case 11:
    case 0:
      return DATE.season.winter;
    default:
      return null;
  }
}

function getTimeOfDay(hour) {
  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return DATE.timeOfDay.night;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return DATE.timeOfDay.morning;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return DATE.timeOfDay.day;
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      return DATE.timeOfDay.evening;
    default:
      return null;
  }
}

export {
  getDayOfWeekShort,
  getDayOfWeekFull,
  getMonth,
  getTime,
  getUpdatedTime,
  getCurrentTime,
  getSeason,
  getTimeOfDay,
};
