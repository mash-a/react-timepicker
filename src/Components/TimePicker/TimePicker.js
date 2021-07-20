import * as React from 'react';
import Input from 'Components/Input/Input';
import List from 'Components/List/List';
import Wrapper from 'Components/Wrapper/Wrapper';
import Select from 'Components/Select/Select';
import { DEFAULT_SETTINGS } from 'utils/defaults';
import {
  _getDropdownTimes,
  _findOption,
  _formatValue,
  parseSettings,
} from 'utils/main';
import './timepicker.css';

const initialState = DEFAULT_SETTINGS;
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'init':
      return { settings: { ...state.settings, ...payload } };
    default:
      throw new Error();
  }
};

const TimePicker = props => {
  const { onChange = () => {}, value = null } = props;
  const [{ settings }, dispatch] = React.useReducer(reducer, initialState);

  const [err, setErr] = React.useState({});
  const [focus, setFocus] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [roundedValue, setRoundedValue] = React.useState(null);
  const [optionIdx, setOptionIdx] = React.useState(0);
  const [showErr, setShowErr] = React.useState(false);
  const [timeOptions, setTimeOptions] = React.useState([]);
  const [timeValue, setTimeValue] = React.useState(value);

  React.useEffect(() => {
    dispatch({ type: 'init', payload: parseSettings(DEFAULT_SETTINGS) });
  }, []);

  // Dropdown Options
  React.useEffect(() => {
    if (settings) {
      const options = _getDropdownTimes(settings);
      setTimeOptions(options);
    }
  }, [settings]);

  React.useEffect(() => {
    const roundedOption = settings ? _findOption(timeValue, settings, timeOptions) : null;
    if (roundedOption) {
      setRoundedValue(roundedOption.value);
      setOptionIdx(roundedOption.optionIdx);
    }
  }, [timeValue, timeOptions]);

  React.useEffect(() => {
    if (!timeValue && !open) {
      setErr({});
      setShowErr(false);
    } else if (timeValue && !open && Object.values(err).length) {
      setShowErr(true);
    }
  }, [timeValue, open]);

  const handleMaskClick = () => {
    setOpen(false);
    formatTimeValue(timeValue);
  };

  const formatTimeValue = value => {
    const { timeValue, errors } = _formatValue(value, settings, {});
    setErr(errors);
    // eslint-disable-next-line no-negated-condition
    !timeValue ? handleSettingTime(null) : handleSettingTime(timeValue);
  };

  const handleSettingTime = value => {
    onChange(value);
    setTimeValue(value);
  };

  return (
    <div>
      <div className={`ui-list-mask ${open ? 'visible' : ''}`} onClick={handleMaskClick}></div>
      <div className="select-wrapper">
        <Select
          setTimeValue={setTimeValue}
          settings={settings}
          timeOptions={timeOptions}
          roundedValue={roundedValue}
        />
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
          setFocus={setFocus}
        />
        {open &&
          <Wrapper
            lastIndex={timeOptions.length - 1}
            optionIdx={optionIdx}
            setOptionIdx={setOptionIdx}
            timeOptions={timeOptions}
            setTimeValue={setTimeValue}
            setOpen={setOpen}
          >
            <List
              optionIdx={optionIdx}
              roundedValue={roundedValue}
              setTimeValue={setTimeValue}
              setOptionIdx={setOptionIdx}
              timeOptions={timeOptions}
              focus={focus}
              setFocus={setFocus}
            />
        </Wrapper>}
      </div>
    </div>
  );
};

export default TimePicker;
