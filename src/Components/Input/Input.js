import * as React from 'react';

const Input = ({
  err,
  formatTimeValue,
  setShowErr,
  setErr,
  showErr,
  open,
  value,
  setTimeValue,
  setOpen,
}) => {

  React.useEffect(() => {
    Object.values(err).length ? setShowErr(true) : setShowErr(false);
  }, [err]);

  React.useEffect(() => {
    !value && setErr({});
  }, [value]);

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
    <div className='input-control'>
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
        <span className={err} key={i}>
          {err}
        </span>)}
    </div>
  );
};

export default Input;
