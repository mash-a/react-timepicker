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
    case 96: // numpad numerals
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 48: // numerals
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57: {
      setOpen(true);
      break;
    }
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
  setSelectedOption,
  selectedOption,
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
      setOptionIdx(selectedOption.index);
      setOpen(false);
    }
  }
};

export {
  _inputKeyPressDown,
  _wrapperKeyDown,
};
