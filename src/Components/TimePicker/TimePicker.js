import * as React from 'react';
import List from 'Components/List/List';
import Input from 'Components/Input/Input';
import Wrapper from 'Components/Wrapper/Wrapper';
import { DEFAULT_SETTINGS } from 'utils/defaults';
import 'static/timepicker.css';

const initialState = { ...DEFAULT_SETTINGS };

const reducer = (state, action) => {

};


const TimePicker = () => {
  const [timeValue, setTimeValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [settings, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <Input open={open} value={timeValue} setTimeValue={setTimeValue} setOpen={setOpen}/>
      {open && <Wrapper>
        <List setTimeValue={setTimeValue}/>
      </Wrapper>}
    </div>
  );
};

export default TimePicker;
