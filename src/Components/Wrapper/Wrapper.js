import * as React from 'react';

const Wrapper = ({ children }) =>
    <div
      className="ui-timepicker-wrapper ui-timepicker-positioned-top"
      tabIndex="-1">
      {children}
    </div>
  ;

export default Wrapper;
