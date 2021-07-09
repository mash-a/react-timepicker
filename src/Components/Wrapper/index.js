import * as React from 'react'

export default Wrapper = ({children}) => {
  return (
    <div 
      className="ui-timepicker-wrapper ui-timepicker-positioned-top optional-custom-classname" 
      tabindex="-1">
      {children}
    </div>
  )
}