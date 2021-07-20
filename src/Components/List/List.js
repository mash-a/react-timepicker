import * as React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({
  optionIdx,
  roundedValue,
  setTimeValue,
  timeOptions,
  setOptionIdx,
  focus,
  setFocus,
}) =>
  <ul className="ui-timepicker-list">
    {timeOptions.map(({ label, value, className }, idx) =>
      <ListItem
        key={value}
        meridiemClass={className}
        optionIdx={optionIdx}
        label={label}
        value={value}
        roundedValue={roundedValue}
        setTimeValue={setTimeValue}
        setOptionIdx={setOptionIdx}
        idx={idx}
        focus={focus}
        setFocus={setFocus}>
        {label}
      </ListItem>)}
  </ul>;

export default List;
