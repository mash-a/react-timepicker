import * as React from 'react';

const Input = ({ value, setTimeStr }) => {

  const handleInput = ({ target: { value } }) => {
    setTimeStr(value);
  };

  return (
    <input className="ui-timepicker-input" type="text" value={value} onChange={handleInput}/>
  );
};

export default Input;
