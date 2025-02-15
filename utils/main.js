/* eslint-disable no-param-reassign */
import { DEFAULT_LANG } from './defaults';
import { ONE_DAY } from './constants';
import { moduloSeconds, roundingFunction } from './rounding';

const anytime2int = (input, settings) => {
  if (typeof input === 'number') {
    return input;
  } else if (typeof input === 'string') {
    return time2int(input, settings);
  } else if (typeof input === 'object' && input instanceof Date) {
    return (
      input.getHours() * 3600 +
      input.getMinutes() * 60 +
      input.getSeconds()
    );
  } else if (typeof input === 'function') {
    return input();
  } else {
    return null;
  }
};

const time2int = (timeString, settings) => {
  if (timeString === '' || timeString == null || timeString === undefined) {
    return null;
  }

  if (timeString === 'now') {
    return anytime2int(new Date(), settings);
  }

  if (typeof timeString !== 'string') {
    return timeString;
  }

  // timestring without the empty space
  const trimmedTimeStr = timeString.toLowerCase().replace(/[\s.]/g, '');
  let meridiem = undefined;

  // if the last character is an "a" or "p", add the "m"
  if (trimmedTimeStr.slice(-1) === 'a' || trimmedTimeStr.slice(-1) === 'p') {
    meridiem = `${trimmedTimeStr.slice(-1)}m`;
  }

  const pattern = trimmedTimeStr.match(/\W/)
    ? /^(([^0-9]*))?([0-9]?[0-9])(\W+([0-5][0-9]?))?(\W+([0-5][0-9]))?(([^0-9]*))$/
    : /^(([^0-9]*))?([0-9]?[0-9])(([0-5][0-9]))?(([0-5][0-9]))?(([^0-9]*))$/;

  const time = trimmedTimeStr.match(pattern);
  if (!time) {
    return null;
  }

  const hour = parseInt(Number(time[3]), 10);
  let ampm = meridiem || time[8];
  let hours = hour;
  const minutes = Number(time[5]) || 0;
  const seconds = Number(time[7]) || 0;

  if (!ampm && time[3].length === 2 && time[3][0] === '0') {
    // preceding '0' implies AM
    ampm = 'am';
  }

  if (hour <= 12 && ampm) {
    ampm = ampm.trim();
    const isPm = ampm === settings.lang.pm || ampm === settings.lang.PM.toLowerCase();
    if (hour === 12) {
      hours = isPm ? 12 : 0;
    } else {
      hours = hour + (isPm ? 12 : 0);
    }
  } else {
    const t = hour * 3600 + minutes * 60 + seconds;
    if (t >= ONE_DAY + (settings.show2400 ? 1 : 0)) {
      if (settings.wrapHours === false) {
        return null;
      }

      hours = hour % 24;
    }
  }

  let timeInt = hours * 3600 + minutes * 60 + seconds;
  // if no am/pm provided, intelligently guess based on the scrollDefault
  if (
    hour < 12 &&
    !ampm &&
    settings._twelveHourTime &&
    settings.scrollDefault()
  ) {
    const delta = timeInt - settings.scrollDefault();
    if (delta < 0 && delta >= ONE_DAY / -2) {
      timeInt = (timeInt + ONE_DAY / 2) % ONE_DAY;
    }
  }

  return timeInt;
};

const intStringDateOrFunc2func = (input, settings) => {
  if (input == null) {
    return () => null;
  } else if (typeof input === 'function') {
    return () => anytime2int(input(), settings);
  } else {
    return () => anytime2int(input, settings);
  }
};

const parseSettings = (settings, defaultLang) => {
  const parsedSettings = { ...settings };

  parsedSettings.lang = { ...DEFAULT_LANG, ...parsedSettings.lang };

  // lang is used by other functions the rest of this depends on
  // todo: unwind circular dependency on lang
  // settings = settings;

  if (parsedSettings.listWidth) {
    parsedSettings.listWidth = anytime2int(parsedSettings.listWidth, parsedSettings);
  }

  parsedSettings.minTime = intStringDateOrFunc2func(parsedSettings.minTime, parsedSettings);
  parsedSettings.maxTime = intStringDateOrFunc2func(parsedSettings.maxTime, parsedSettings);
  // eslint-disable-next-line max-len
  parsedSettings.durationTime = intStringDateOrFunc2func(parsedSettings.durationTime, parsedSettings);

  if (parsedSettings.scrollDefault) {
    // eslint-disable-next-line max-len
    parsedSettings.scrollDefault = intStringDateOrFunc2func(parsedSettings.scrollDefault, parsedSettings);
  } else {
    parsedSettings.scrollDefault = parsedSettings.minTime;
  }

  if (
    typeof parsedSettings.timeFormat === 'string' &&
    parsedSettings.timeFormat.match(/[gh]/)
  ) {
    parsedSettings._twelveHourTime = true;
  }

  if (
    parsedSettings.showOnFocus === false &&
    parsedSettings.showOn.indexOf('focus') !== -1
  ) {
    parsedSettings.showOn.splice(parsedSettings.showOn.indexOf('focus'), 1);
  }

  if (typeof parsedSettings.step !== 'function') {
    const curryStep = parsedSettings.step;
    parsedSettings.step = function () {
      return curryStep;
    };
  }

  if (!parsedSettings.disableTimeRanges) {
    parsedSettings.disableTimeRanges = [];
  }

  if (parsedSettings.disableTimeRanges.length > 0) {
    // convert string times to integers
    for (const i in parsedSettings.disableTimeRanges) {
      parsedSettings.disableTimeRanges[i] = [
        anytime2int(parsedSettings.disableTimeRanges[i][0], parsedSettings),
        anytime2int(parsedSettings.disableTimeRanges[i][1], parsedSettings),
      ];
    }

    // sort by starting time
    parsedSettings.disableTimeRanges = parsedSettings.disableTimeRanges.sort((
      a,
      b,
    ) => a[0] - b[0]);

    // merge any overlapping ranges
    // eslint-disable-next-line no-plusplus
    for (let i = parsedSettings.disableTimeRanges.length - 1; i > 0; i--) {
      if (
        parsedSettings.disableTimeRanges[i][0] <=
        parsedSettings.disableTimeRanges[i - 1][1]
      ) {
        parsedSettings.disableTimeRanges[i - 1] = [
          Math.min(
            parsedSettings.disableTimeRanges[i][0],
            parsedSettings.disableTimeRanges[i - 1][0],
          ),
          Math.max(
            parsedSettings.disableTimeRanges[i][1],
            parsedSettings.disableTimeRanges[i - 1][1],
          ),
        ];
        parsedSettings.disableTimeRanges.splice(i, 1);
      }
    }
  }

  return parsedSettings;
};

const _int2duration = (seconds, step, settings) => {
  const absSeconds = Math.abs(seconds);

  const time = {
    minutes: Math.round(absSeconds / 60),
    duration: [],
    hours: '',
    mins: '',
  };

  if (time.minutes < 60) {
    // Only show (x mins) under 1 hour
    time.duration.push(time.minutes, settings.lang.mins);
  } else {
    time.hours = Math.floor(time.minutes / 60);
    time.mins = time.minutes % 60;

    // Show decimal notation (eg: 1.5 hrs) for 30 minute steps
    if (step === 30 && time.mins === 30) {
      time.hours += settings.lang.decimal + 5;
    }


    time.duration.push(time.hours);
    time.duration.push(
      time.hours === 1 ? settings.lang.hr : settings.lang.hrs,
    );

    // Show remainder minutes notation (eg: 1 hr 15 mins) for non-30 minute steps
    // and only if there are remainder minutes to show
    if (time.step !== 30 && time.mins) {
      time.duration.push(time.mins);
      time.duration.push(settings.lang.mins);
    }
  }

  return time.duration.join(' ');
};

const _roundAndFormatTime = (seconds, settings) => {
  const s = settings.roundingFunction(seconds, settings);
  if (s != null) {
    return _int2time(s, settings);
  }
};

const _int2time = (timeInt, settings) => {
  if (typeof timeInt !== 'number') {
    return null;
  }

  const seconds = parseInt(timeInt % 60, 10);
  const minutes = parseInt((timeInt / 60) % 60, 10);
  const hours = parseInt((timeInt / (60 * 60)) % 24, 10);

  const time = new Date(1970, 0, 2, hours, minutes, seconds, 0);

  if (isNaN(time.getTime())) {
    return null;
  }

  if (typeof settings.timeFormat === 'function') {
    return settings.timeFormat(time);
  }

  const formatTime = {
    a: () => time.getHours() > 11
      ? settings.lang.pm
      : settings.lang.am,
    A: () => time.getHours() > 11
      ? settings.lang.PM
      : settings.lang.AM,
    g: () => {
      const modHour = time.getHours() % 12;
      return modHour === 0 ? '12' : modHour;
    },
    G: () => {
      let modHour = time.getHours();
      if (timeInt === ONE_DAY) {
        modHour = settings.show2400 ? 24 : 0;
      }
      return modHour;
    },
    h: () => {
      let modHour = time.getHours() % 12;
      if (modHour !== 0 && modHour < 10) {
        modHour = `0${modHour}`;
      }
      return modHour === 0 ? '12' : modHour;
    },
    H: () => {
      let hour = time.getHours();
      if (timeInt === ONE_DAY) {
        hour = settings.show2400 ? 24 : 0;
      }
      return hour > 9 ? hour : `0${hour}`;
    },
    i: () => {
      const m = time.getMinutes();
      return m > 9 ? m : `0${m}`;
    },
    s: () => {
      const seconds = time.getSeconds();
      return seconds > 9 ? seconds : `0${seconds}`;
    },
    '\\': () => '',
  };

  const formattedOutput = settings.timeFormat.split('').reduce((output, code) =>
    formatTime[code]
      ? output + formatTime[code]()
      : output + code
  , '');

  return formattedOutput;
};

// origin refers to whether or not the input is a select or if it is text input
const _formatValue = (timeValue, settings, errors, origin) => {
  // do this in timepicker component
  // handleFormatValue
  // setTimeValue
  // if (timeValue === '') {
  //   setTimeValue(null, origin);
  //   return;
  // }

  // IE fires change event before blur
  // TODO figure this out
  // if (_isFocused(targetEl) && (!e || e.type !== 'change')) {
  //   return;
  // }
  const formatted = { errors, timeValue, origin };
  if (!timeValue) return formatted;

  let seconds = anytime2int(timeValue, settings);

  // input validation?
  if (seconds == null) {
    errors.timeFormatError = 'Invalid time.';
    return formatted;
  }

  let rangeError = false;
  // check that the time in within bounds
  if (
    settings.minTime != null &&
    settings.maxTime != null &&
    settings.minTime() != null &&
    settings.maxTime() != null &&
    (seconds < settings.minTime() || seconds > settings.maxTime())
  ) {
    rangeError = true;
  }

  // check that time isn't within disabled time ranges
  for (const range of settings.disableTimeRanges) {
    if (seconds >= range[0] && seconds < range[1]) {
      rangeError = true;
      break;
    }
  }

  if (settings.forceRoundTime) {
    const roundSeconds = settings.roundingFunction(seconds, settings);
    if (roundSeconds !== seconds) {
      seconds = roundSeconds;
      origin = null;
    }
  }

  formatted.timeValue = _int2time(seconds, settings);

  if (rangeError) {
    errors.timeRangeError = 'Invalid time range.';
  }

  return formatted;
};

const _getDropdownTimes = settings => {
  const start = settings?.minTime() ?? 0;
  let end = settings?.maxTime() ?? start + ONE_DAY - 1;

  if (end < start) {
    // make sure the end time is greater than start time, otherwise there will be no list to show
    end += ONE_DAY;
  }

  if (
    end === ONE_DAY - 1 &&
    typeof settings.timeFormat === 'string' &&
    settings.show2400
  ) {
    // show a 24:00 option when using military time
    end = ONE_DAY;
  }

  const dr = settings.disableTimeRanges;
  let drCur = 0;
  const output = [];

  // eslint-disable-next-line no-plusplus
  for (let i = start, j = 0; i <= end; j++, i += settings.step(j) * 60) {
    const timeInt = i;
    const timeString = _int2time(timeInt, settings);

    const className = timeInt % ONE_DAY < ONE_DAY / 2
          ? 'ui-timepicker-am'
          : 'ui-timepicker-pm';

    const item = {
      label: timeString,
      value: moduloSeconds(timeInt, settings),
      className: className,
    };

    if (
      (settings.minTime() != null || settings.durationTime() != null) &&
      settings.showDuration
    ) {
      const durStart = settings.durationTime() ?? settings.minTime();
      const durationString = _int2duration(i - durStart, settings.step());
      item.duration = durationString;
    }

    if (drCur < dr.length) {
      if (timeInt >= dr[drCur][1]) {
        drCur += 1;
      }

      if (dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1]) {
        item.disabled = true;
      }
    }

    output.push(item);
  }
  const outputIndexed = output.map((item, idx) => ({ ...item, index: idx }));
  return outputIndexed;
};

const _findOption = (value, settings, timeOptions) => {
  // check if there is a value in the first place
  // get the value
  // round the value using the provided function
  // setRoundedValue function that will only be used to display the selected li
  // if the parsed new value isNaN return
  // if the newValue is equal to the parsed value according to timeOptions.value
  // then setRoundedValue
  const seconds = anytime2int(value, settings);
  if (!seconds && seconds !== 0) {
    return;
  }
  const roundedSeconds = roundingFunction(seconds, settings);

  const filtered = timeOptions.filter(timeOption => {
    const parsed = parseInt(timeOption.value, 10);
    if (parsed === roundedSeconds) {
      return timeOption;
    }
  });

  const [option] = filtered;
  return option;
};

export {
  anytime2int,
  parseSettings,
  _findOption,
  _formatValue,
  _getDropdownTimes,
  _int2duration,
  _roundAndFormatTime,
};
