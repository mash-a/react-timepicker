import * as React from 'react';

const ListItem = ({ itemClass, children, setSelected, setTimeValue, value }) => {
  const handleClick = () => {
    setSelected(value);
    setTimeValue(value);
  };

  return (
    <li className={itemClass} onClick={handleClick}>
      {children}
    </li>
  );
};

export default ListItem;
