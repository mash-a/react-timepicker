import * as React from 'react';
import ListItem from '../ListItem/ListItem';
import { _getDropdownTimes, _findOption } from 'utils/main';

const List = ({ setTimeValue, timeValue, settings }) => {
  const [timeOptions, setTimeOptions] = React.useState([]);
  const [roundedValue, setRoundedValue] = React.useState(null);

  // Dropdown Options
  React.useEffect(() => {
    const options = _getDropdownTimes(settings);
    setTimeOptions(options);
  }, []);

  React.useEffect(() => {
    const roundedOption = _findOption(timeValue, settings, timeOptions);
    if (roundedOption) {
      setRoundedValue(roundedOption.value);
    }
  }, [timeValue, timeOptions]);

  return (
    <ul className="ui-timepicker-list">
      {timeOptions.map(({ label, value, className }) =>
        <ListItem
          key={value}
          meridiemClass={className}
          label={label}
          value={value}
          roundedValue={roundedValue}
          setTimeValue={setTimeValue}>
          {label}
        </ListItem>)}
      </ul>
  );
};

export default List;
