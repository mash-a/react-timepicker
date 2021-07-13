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
    // '05',
    // '10',
    // '15',
    // '20',
    // '25',
    '30',
    // '35',
    // '40',
    // '45',
    // '50',
    // '55',
  ],
  meridiem: [
    'AM',
    'PM',
  ],
};

// const createList = () => times.meridiem.map(m => {
//     times.hours.map(hour => {
//       times.minutes.map(minute =>
//         <li>{hour}:{minute} {m}</li>,
//       );
//     });
//   });

const List = ({ step = '5', setTimeValue }) => {
  const [selected, setSelected] = React.useState('');

  return (
    <ul className="ui-timepicker-list">
      {times.meridiem.map(m =>
        times.hours.map(hour =>
          times.minutes.map((minute, idx) =>
            <ListItem
              key={idx}
              itemClass={`ui-timepicker-${m === 'AM' ? 'am' : 'pm'}`}
              setSelected={setSelected}
              value={`${hour}:${minute} ${m}`}
              setTimeValue={setTimeValue}>
              {hour}:{minute} {m}
            </ListItem>,
          ),
        ),
      )}
    </ul>
  );
};

export default List;
