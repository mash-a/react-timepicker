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
}) => {
  const refs = timeOptions.reduce((acc, { index }) => {
    acc[index] = React.useRef();
    return acc;
  }, {});

  const listRef = React.useRef(null);

  return (
    <ul className="ui-timepicker-list" role="listbox" ref={listRef}>
      {timeOptions.map(({ label, value, className }, idx) =>
        <ListItem
          ref={refs[idx]}
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
    </ul>
  );
};


export default List;
