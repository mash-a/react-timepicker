import * as React from 'react'

export default ListItem = ({itemClass, children}) => 
  <li className={itemClass}>
    {children}
  </li>