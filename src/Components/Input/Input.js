import * as React from 'react';
import { _inputKeyPressDown } from 'utils/keyEvents';

const Input = ({
  disabled,
  err,
  formatTimeValue,
  showErr,
  open,
  value,
  setTimeValue,
  setOpen,
  setFocus,
}) => {

  const handleInput = ({ target: { value } }) => {
    setTimeValue(value);
  };

  const handleClick = () =>
    !open && setOpen(true);

  const handleKeyDown = e => {
    _inputKeyPressDown(e, value, setOpen, formatTimeValue, setFocus);
  };

  // Select the input on fous
  const handleFocus = e => e.target.select();

  return (
    <div className={`
        input-control
        ${Object.values(err).length
        && ' error-visible'}`}>
      <input
        disabled={disabled}
        className={`
        ui-timepicker-input
        ${Object.values(err).length
        && 'time-input-err'}`}
        type="text"
        value={value || ''}
        onChange={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        />
      {showErr && Object.values(err).map((err, i) =>
        <span className="time-input-err-text" key={i}>
          {err}
        </span>)}
    </div>
  );
};

export default Input;
