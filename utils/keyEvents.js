const _keyPressDown = (e, value, setOpen, formatTimeValue) => {
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
      break;
      // var selected = list.find('.ui-timepicker-selected');

      // if (!selected.length) {
      //   list.find('li').each((i, obj) => {
      //     if ($(obj).position().top > 0) {
      //       selected = $(obj);
      //       return false;
      //     }
      //   });
      //   selected.addClass('ui-timepicker-selected');
      // } else if (!selected.is(':first-child')) {
      //   selected.removeClass('ui-timepicker-selected');
      //   selected.prev().addClass('ui-timepicker-selected');

      //   if (selected.prev().position().top < selected.outerHeight()) {
      //     list.scrollTop(list.scrollTop() - selected.outerHeight());
      //   }
      // }

      // return false;

    case 40: // down
      setOpen(true);
      break;
      // selected = list.find('.ui-timepicker-selected');

      // if (selected.length === 0) {
      //   list.find('li').each((i, obj) => {
      //     if ($(obj).position().top > 0) {
      //       selected = $(obj);
      //       return false;
      //     }
      //   });

      //   selected.addClass('ui-timepicker-selected');
      // } else if (!selected.is(':last-child')) {
      //   selected.removeClass('ui-timepicker-selected');
      //   selected.next().addClass('ui-timepicker-selected');

      //   if (
      //     selected.next().position().top + 2 * selected.outerHeight() >
      //     list.outerHeight()
      //   ) {
      //     list.scrollTop(list.scrollTop() + selected.outerHeight());
      //   }
      // }

      // return false;
    default:
      return true;
  }
};

export { _keyPressDown };
