const _inputKeyPressDown = (e, value, setOpen, formatTimeValue, setFocus) => {
  switch (e.keyCode) {
    case 27: // escape
    case 9: // tab
    case 13: // return
      setOpen(false);
      if (value) {
        // formatValue
        // hide list
        // basically same as when clicking on blur
        formatTimeValue(value);
      }
      break;
    // eslint-disable-next-line no-duplicate-case
    case 13:
      e.preventDefault();
      break;
    case 38: // up
      setOpen(true);
      setFocus(true);
      break;
    case 40: // down
      setOpen(true);
      setFocus(true);
      break;
    default:
      return true;
  }
};

const _wrapperKeyDown = (
  e,
  timeOptions,
  optionIdx,
  setOptionIdx,
  setTimeValue,
  lastIndex,
  setOpen,
// eslint-disable-next-line max-params
) => {
  switch (e.keyCode) {
    case 13: { // return
      const { label } = timeOptions[optionIdx];
      setTimeValue(label);
      setOpen(false);
      break;
    }
    case 38: { // up
      const newIndex = optionIdx - 1 >= 0 ? optionIdx - 1 : optionIdx;
      setOptionIdx(newIndex);
      break;
    }
    case 40: { // down
      const newIndex = optionIdx + 1 <= lastIndex ? optionIdx + 1 : optionIdx;
      setOptionIdx(newIndex);
      break;
    }
    case 27: { // esc
      setOptionIdx(0);
      setOpen(false);
    }
  }
};

export {
  _inputKeyPressDown,
  _wrapperKeyDown,
};
