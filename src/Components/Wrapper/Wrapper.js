import * as React from 'react';

const Wrapper = ({ children }) =>
    <div
      aria-hidden="true"
      className="ui-timepicker-wrapper ui-timepicker-positioned-top"
      tabIndex="-1">
      {children}
    </div>
  ;

export default Wrapper;
