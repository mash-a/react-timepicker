import * as React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({ roundedValue, setTimeValue, timeOptions, setOptionIdx }) =>
  <ul className="ui-timepicker-list">
    {timeOptions.map(({ label, value, className }, idx) =>
      <ListItem
        key={value}
        meridiemClass={className}
        label={label}
        value={value}
        roundedValue={roundedValue}
        setTimeValue={setTimeValue}
        setOptionIdx={setOptionIdx}
        idx={idx}>
        {label}
      </ListItem>)}
  </ul>;

export default List;
