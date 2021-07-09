import * as React from 'react';
import List from '../List'; 

export default TimePicker = () => {
  return (
    <div>
      <input className="ui-timepicker-input" type="text" />
      <div class="ui-timepicker-wrapper ui-timepicker-positioned-top optional-custom-classname" tabindex="-1">
        <List />
      </div>
    </div>
  )
}