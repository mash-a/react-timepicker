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

const Demo = () => (
	const [timeString, setTimeString] = React.useState('');

	const handleChange = value => {
		// ...
	}

	return (
		<TimePicker
			value={timeString}
			onChange={handleChange} />
	)
);
```
