import React from 'react';
import TimePicker from './TimePicker';

export default {
  title: 'TimePicker',
};

const optionsOne = {
  show2400: true,
  step: 60,
};

export const TestTimePicker = () => {
  const handleChange = value => console.log({ value });
  return (
    <div>
      <TimePicker onChange={handleChange} value={'9:00:00 AM'}/>
      <TimePicker onChange={handleChange} value={'dfgfdg'}/>
      <TimePicker onChange={handleChange} value={'15:32 PM'} options={{ step: 30 }}/>
      <TimePicker onChange={handleChange} value={''} options={optionsOne}/>
      <TimePicker onChange={handleChange} value={'01:12 AM'} options={{ disableTextInput: true }}/>
    </div>

  );

};
