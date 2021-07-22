import * as React from 'react';
import { _wrapperKeyDown } from 'utils/keyEvents';

const Wrapper = ({
  children,
  optionIdx,
  setOptionIdx,
  lastIndex,
  timeOptions,
  setTimeValue,
  setOpen,
  setSelectedOption,
  selectedOption,
}) => {
  const keyDown = e =>
    _wrapperKeyDown(
      e,
      timeOptions,
      optionIdx,
      setOptionIdx,
      setTimeValue,
      lastIndex,
      setOpen,
      setSelectedOption,
      selectedOption,
    );

  return (
    <div
      aria-hidden="true"
      className="ui-timepicker-wrapper ui-timepicker-positioned-top"
      tabIndex="-1"
      onKeyDown={keyDown}
    >
      {children}
    </div>
  );
}
  ;

export default Wrapper;
