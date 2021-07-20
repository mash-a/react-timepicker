import * as React from 'react';
import { classNames } from 'utils/constants';

const ListItem = ({
  children,
  idx,
  label,
  meridiemClass,
  optionIdx,
  roundedValue,
  setTimeValue,
  setOptionIdx,
  value,
  focus,
  setFocus,
}) => {
  const ref = React.useRef(null);
  const [selected, setSelected] = React.useState('');

  React.useEffect(() => {
    if (focus && optionIdx === idx) {
      ref.current.focus();
      setFocus(false);
    }
  }, [focus]);

  React.useEffect(() => {
    if (roundedValue === value) {
      setSelected(classNames.selected);
      setTimeout(() => {
        ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
      }, 0);
    } else {
      setSelected('');
    }
  }, [roundedValue, value]);

  React.useEffect(() => {
    if (optionIdx === idx) {
      setSelected(classNames.selected);
      setTimeout(() => {
        ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
      }, 0);
    } else {
      setSelected('');
    }
  }, [optionIdx, idx]);

  const handleClick = () => {
    setTimeValue(label);
    setOptionIdx(idx);
  };

  return (
    <li
      ref={ref}
      className={`${meridiemClass} ${selected}`}
      onClick={handleClick}
      tabIndex="-1"
      role="option"
    >
      {children}
    </li>
  );
};

export default ListItem;
