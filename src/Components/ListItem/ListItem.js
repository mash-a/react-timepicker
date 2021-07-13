import * as React from 'react';

const ListItem = ({ meridiemClass, selectedClass, children, setTimeValue, value }) => {
  const handleClick = () => {
    setTimeValue(value);
  };

  return (
    <li className={`${meridiemClass} ${selectedClass}`} onClick={handleClick}>
      {children}
    </li>
  );
};

export default ListItem;
