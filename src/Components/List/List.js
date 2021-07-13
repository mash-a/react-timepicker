import * as React from 'react';
import ListItem from '../ListItem/ListItem';

const times = {
  hours: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  minutes: [
    '00',
    '30',
  ],
  meridiem: [
    'AM',
    'PM',
  ],
};

const List = ({ setTimeValue, timeValue }) =>
    <ul className="ui-timepicker-list">
      {times.meridiem.map(m =>
        times.hours.map(hour =>
          times.minutes.map((minute, idx) =>
            <ListItem
              key={idx}
              meridiemClass={`ui-timepicker-${m === 'AM' ? 'am' : 'pm'}`}
              // eslint-disable-next-line max-len
              selectedClass={`${timeValue === `${hour}:${minute} ${m}` && 'ui-timepicker-selected'}`}
              value={`${hour}:${minute} ${m}`}
              setTimeValue={setTimeValue}>
              {hour}:{minute} {m}
            </ListItem>,
          ),
        ),
      )}
    </ul>;

export default List;
