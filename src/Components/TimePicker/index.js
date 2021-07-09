import * as React from 'react';
import List from '../List'; 
import Input from '../Input'
import Wrapper from '../Wrapper'

export default TimePicker = () => {
  return (
    <div>
      <Input />
      <Wrapper>
        <List />
      </Wrapper>
    </div>
  )
}