import * as React from 'react';
import List from 'Components/List/List';
import Input from 'Components/Input/Input';
import Wrapper from 'Components/Wrapper/Wrapper';
import { DEFAULT_SETTINGS } from 'utils/defaults';
import { _formatValue } from 'utils/main';
import './timepicker.css';

// const initialState = { ...DEFAULT_SETTINGS };
// const reducer = (state, action) => {
// };
// const [settings, dispatch] = React.useReducer(reducer, initialState);

const TimePicker = ({ onChange, value = null }) => {
  const [timeValue, setTimeValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [showErr, setShowErr] = React.useState(false);
  const [err, setErr] = React.useState({});

  React.useEffect(() => {
    onChange && onChange(timeValue);
  }, [timeValue]);

  const handleMaskClick = () => {
    setOpen(false);
    formatTimeValue(timeValue);
  };

  const formatTimeValue = value => {
    const { timeValue, errors } = _formatValue(value, DEFAULT_SETTINGS, {});
    !value && setErr(errors);
    // eslint-disable-next-line no-negated-condition
    !timeValue ? setTimeValue(null) : setTimeValue(timeValue);
  };

  return (
    <div>
      <Input
        open={open}
        value={timeValue}
        setTimeValue={setTimeValue}
        setOpen={setOpen}
        showErr={showErr}
        setShowErr={setShowErr}
        setErr={setErr}
        err={err}
        formatTimeValue={formatTimeValue}
        />
      <div className={`ui-list-mask ${open && 'visible'}`} onClick={handleMaskClick}></div>
      {open && <Wrapper>
        <List setTimeValue={setTimeValue} timeValue={timeValue}/>
      </Wrapper>}
    </div>
  );
};

export default TimePicker;
