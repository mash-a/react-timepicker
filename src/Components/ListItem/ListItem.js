import * as React from 'react';
import { classNames } from 'utils/constants';

const ListItem = ({
  children,
  label,
  meridiemClass,
  roundedValue,
  setTimeValue,
  value,
}) => {
  const ref = React.useRef(null);
  const [selected, setSelected] = React.useState('');

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

  const handleClick = () => {
    setTimeValue(label);
  };

  return (
    <li
      ref={ref}
      className={`${meridiemClass} ${selected}`}
      onClick={handleClick}>
      {children}
    </li>
  );
};

export default ListItem;
