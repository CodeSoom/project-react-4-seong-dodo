import { v4 as uuid } from 'uuid';
import CalendarWeeks from './CalendarWeeks';

export default function CalendarMonth({ month, year, onClick }) {
  const lastOfPreviousMonth = {
    year: new Date(year, month - 1, 0).getFullYear(),
    month: new Date(year, month - 1, 0).getMonth() + 1,
    date: new Date(year, month - 1, 0).getDate(),
    day: new Date(year, month - 1, 0).getDay(),
  };

  const lastOfThisMonth = {
    year: new Date(year, month, 0).getFullYear(),
    month: new Date(year, month, 0).getMonth() + 1,
    date: new Date(year, month, 0).getDate(),
    day: new Date(year, month, 0).getDay(),
  };

  const startOfNextMonth = {
    year: new Date(year, month, 1).getFullYear(),
    month: new Date(year, month, 1).getMonth() + 1,
    date: new Date(year, month, 1).getDate(),
    day: new Date(year, month, 1).getDay(),
  };

  const getPreviousDates = () => {
    const previousDates = [];
    // eslint-disable-next-line no-plusplus
    for (let i = lastOfPreviousMonth.day; i >= 0; i--) {
      previousDates.push({
        year: lastOfPreviousMonth.year,
        month: lastOfPreviousMonth.month,
        date: lastOfPreviousMonth.date - i,
        day: lastOfPreviousMonth.day - i,
      });
    }
    return previousDates;
  };

  const getThisDates = () => {
    const thisDates = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= lastOfThisMonth.date; i++) {
      thisDates.push({
        year,
        month,
        date: i,
        day: new Date(`${year}-${month}-${i}`).getDay(),
      });
    }
    return thisDates;
  };

  const getNextDates = () => {
    const nextDates = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6 - lastOfThisMonth.day; i++) {
      nextDates.push({
        year: startOfNextMonth.year,
        month: startOfNextMonth.month,
        date: startOfNextMonth.date + i,
        day: startOfNextMonth.day + i,
      });
    }
    return nextDates;
  };

  const getWeeks = () => {
    const weeks = [];
    const dates = getPreviousDates().concat(getThisDates(), getNextDates());
    for (let i = 0; i <= 35; i += 7) {
      weeks.push([...dates].slice(i, i + 7));
    }
    return weeks;
  };

  return getWeeks().map((week) => (
    <CalendarWeeks
      key={uuid()}
      currentMonth={month}
      week={week}
      onClick={onClick}
    />
  ));
}
