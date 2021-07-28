# TimePicker

A React TimePicker component based on [jquery-timepicker](https://github.com/jonthornton/jquery-timepicker)

## Peer Dependencies

- [React](https://reactjs.org/) (>= 16)
- react-dom (>= 16)

## Installation

```node
npm i timepicker-react
yarn add timepicker-react
```

## Usage

```javascript
import * as React from 'react';
import { TimePicker } from "@mash-a/timepicker-react";

const options = {
	disableTextInput: 'bool',
	step: 'integer',
	timeFormat: 'string',
	enableSelect: 'bool'
}

const Demo = () => (
	const [timeString, setTimeString] = React.useState('');

	const handleChange = value => {
		setTimeString(value);
		// …
	}

	return (
		<TimePicker
			value={timeString}
			onChange={handleChange} 
			options={options}
			/>
	)
);
```
## Options

- **disableTextInput**
Prevents the user from using the input and the dropdown. Primarily for displaying time.
*default: false*

- **step**  
The amount of time, in minutes, between each item in the dropdown.
*default: 30*

- **timeFormat**
Use [php's date formatting syntax](https://www.php.net/manual/en/function.date.php#example-2058)
*default: 'g:ia'*

