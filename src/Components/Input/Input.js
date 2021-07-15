import * as React from 'react';

const Input = ({
  err,
  formatTimeValue,
  showErr,
  open,
  value,
  setTimeValue,
  setOpen,
}) => {

  const handleInput = ({ target: { value } }) => {
    setTimeValue(value);
  };

  const handleBlur = ({ target: { value } }) => {
    formatTimeValue(value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={`
        input-control
        ${Object.values(err).length
        && ' error-visible'}`}>
      <input
        className={`
        ui-timepicker-input
        ${Object.values(err).length
        && 'time-input-err'}`}
        type="text"
        value={value || ''}
        onBlur={handleBlur}
        onChange={handleInput}
        onClick={handleClick}/>
      {showErr && Object.values(err).map((err, i) =>
        <span className="time-input-err-text" key={i}>
          {err}
        </span>)}
    </div>
  );
};

export default Input;
