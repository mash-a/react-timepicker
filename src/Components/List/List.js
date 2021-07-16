import * as React from 'react';
import ListItem from '../ListItem/ListItem';
import { _getDropdownTimes } from 'utils/main';

const List = ({ setTimeValue, timeValue, settings }) => {
  const [timeOptions, setTimeOptions] = React.useState([]);
  // const findRow = (value, settings) => {
  // // check if there is a value in the first place
  // // perhaps this function should be in List component?
  // // get the value
  // // round the value using the provided function
  // // TODO setup settings state so that it can be customized
  // // create setSelected function that will only be used to display the selected li
  // // if the parsed new value isNaN return
  // // if the newValue is equal to the parsed value according to obj.dataset.time?
  // // is dataset an attribute on the li?
  // // then setSelected

  //   if (!value && value !== 0) {
  //     return false;
  //   }

  //   let out = false;
  //   var value = roundingFunction(value, settings);

  //   list.find('li').each((i, obj) => {
  //     const parsed = parseInt(obj.dataset.time, 10);

  //     if (isNaN(parsed)) {
  //       return;
  //     }

  //     if (parsed == value) {
  //       out = obj;
  //       return false;
  //     }
  //   });

  //   return out;
  // };
  React.useEffect(() => {
    setTimeOptions(_getDropdownTimes(settings));
  }, []);

  return (
    <ul className="ui-timepicker-list">
      {timeOptions.map(({ label, value, className }) =>
        <ListItem
          key={value}
          meridiemClass={className}
          selectedClass={`${timeValue === label && 'ui-timepicker-selected'}`}
          label={label}
          value={value}
          setTimeValue={setTimeValue}>
          {label}
        </ListItem>)}
      </ul>
  );
};

export default List;
