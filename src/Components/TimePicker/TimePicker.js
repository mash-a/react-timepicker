import * as React from 'react';
import List from '../List/List'; 
import Input from '../Input/Input'
import Wrapper from '../Wrapper/Wrapper'

const TimePicker = () => {
  const [timeStr, setTimeStr] = React.useState('');

  return (
    <div>
      <Input value={timeStr}/>
      <Wrapper>
        <List />
      </Wrapper>
    </div>
  )
}

export default TimePicker;