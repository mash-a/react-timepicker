import * as React from 'react';
import List from '../List/List';
import Input from '../Input/Input';
import Wrapper from '../Wrapper/Wrapper';
import '../../static/jquery.timepicker.css';

const TimePicker = () => {
  const [timeStr, setTimeStr] = React.useState('');

  return (
    <div>
      <Input value={timeStr} setTimeStr={setTimeStr}/>
      <Wrapper>
        <List />
      </Wrapper>
    </div>
  );
};

export default TimePicker;
