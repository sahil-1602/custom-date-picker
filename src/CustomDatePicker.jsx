import React, { useState, useEffect } from 'react';
import './CustomDatePicker.css';

export default function CustomDatePicker() {
  const [isActiveDateContainer, setIsActiveDateContainer] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [currentDate, setCurrentDate] = useState({});

  // program to check leap year
  function checkLeapYear(year) {
    return new Date(year, 1, 29).getDate() === 29;
  }

  const handleToggleDateContainer = (e) => {
    setIsActiveDateContainer(!isActiveDateContainer);
  };

  const goToNextMonth = () => {
    let month = currentDate.month + 1;
    let year = currentDate.year;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    setCurrentDate({ ...currentDate, month, year });
  };

  const goToPrevMonth = () => {
    let month = currentDate.month - 1;
    let year = currentDate.year;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    setCurrentDate({ ...currentDate, month, year });
  };

  const changeDate = (day, e) => {
    const prevSelected = document.getElementsByClassName('day selected');
    prevSelected[0]?.classList?.remove('selected');
    setCurrentDate(() => ({ ...currentDate, day }));
    setSelectedDate(() => ({
      ...selectedDate,
      day,
      year: currentDate.year,
      month: currentDate.month,
    }));
    e.target.classList.add('selected');
  };

  const populateDates = () => {
    let totalDays;

    if (currentDate.month === 1) {
      if (checkLeapYear(currentDate.year)) totalDays = 29;
      else totalDays = 28;
    } else if (currentDate.month % 2 === 0 && currentDate.month < 7) {
      totalDays = 31;
    } else if (currentDate.month % 2 !== 0 && currentDate.month < 7) {
      totalDays = 30;
    } else if (currentDate.month >= 7) {
      if (currentDate.month % 2 !== 0) totalDays = 31;
      else if (currentDate.month % 2 === 0) totalDays = 30;
    }

    let days = [];
    for (let i = 0; i < totalDays; i++) {
      let classList = 'day';
      if (
        selectedDate.day === i + 1 &&
        selectedDate.year === currentDate.year &&
        selectedDate.month === currentDate.month
      ) {
        classList = classList.concat(' selected');
      }
      days.push(
        <div
          key={i + 1}
          onClick={(e) => changeDate(i + 1, e)}
          className={classList}>
          {i + 1}
        </div>
      );
    }
    return days;
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    setSelectedDate({ day, month, year });
    setCurrentDate({ day, month, year });
  }, []);

  return (
    <div className='date-picker-wrapper'>
      <div className='selected-date' onClick={handleToggleDateContainer}>
        {`${selectedDate.day} / ${selectedDate.month + 1} / ${
          selectedDate.year
        }`}
      </div>
      <div
        className={`date-container ${isActiveDateContainer ? 'active' : ''}`}>
        <div className='month'>
          <div className='arrows prev-month' onClick={goToPrevMonth}>
            &lt;
          </div>
          <div>{`${months[currentDate?.month]} ${currentDate?.year}`}</div>
          <div className='arrows next-month' onClick={goToNextMonth}>
            &gt;
          </div>
        </div>
        <div className='days-container'>{populateDates()}</div>
      </div>
    </div>
  );
}
