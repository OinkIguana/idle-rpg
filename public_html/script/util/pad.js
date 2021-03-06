// pad(str: string, len: number, padding: string = ' '): string
//    pads the given string str to ensure that its length is len. The string
//    used for padding can be specified.
'use strict';

function pad(str, len, padding = ' ') {
  while(str.length < len) {
    str += padding;
  }
  return str;
}

export default pad;
