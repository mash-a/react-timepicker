import * as React from 'react'

const ListItem = ({itemClass, children}) => 
  <li className={itemClass}>
    {children}
  </li>

export default ListItem;