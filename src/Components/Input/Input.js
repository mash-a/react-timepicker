import * as React from 'react';
import { _formatValue } from 'utils/main';
import { DEFAULT_SETTINGS } from 'utils/defaults';

const Input = ({ open, value, setTimeValue, setOpen }) => {

  const handleInput = ({ target: { value } }) => {
    setTimeValue(value);
  };

  const handleBlur = ({ target: { value } }) => {
    const { timeValue, errors } = _formatValue(value, DEFAULT_SETTINGS, {});
    setTimeValue(timeValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <input
      className="ui-timepicker-input"
      type="text"
      value={value}
      onBlur={handleBlur}
      onChange={handleInput}
      onClick={handleClick}/>
  );
};

export default Input;
