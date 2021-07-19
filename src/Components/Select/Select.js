import * as React from 'react';
import { _roundAndFormatTime } from 'utils/main';

const Select = props => {
  const { timeOptions, setTimeValue, settings, roundedValue } = props;

  const handleSelectChange = ({ target: { value } }) =>
    setTimeValue(_roundAndFormatTime(value, settings));

  return (
    <select
      aria-label="timePicker"
      className="select-timepicker"
      value={roundedValue || ''}
      onChange={handleSelectChange}
    >
      {timeOptions.map(({ label, value }) =>
        <option key={value} value={value}>{label}</option>,
      )}
    </select>
  );
};

export default Select;
