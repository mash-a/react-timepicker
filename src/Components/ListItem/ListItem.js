import * as React from 'react';

const ListItem = ({ meridiemClass, selectedClass, children, setTimeValue, value, label }) => {
  const handleClick = () => {
    setTimeValue(label);
  };

  return (
    <li className={`${meridiemClass} ${selectedClass}`} onClick={handleClick}>
      {children}
    </li>
  );
};

export default ListItem;
