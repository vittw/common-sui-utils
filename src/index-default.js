// Default Export
// ==============
// ```js
// // CommonJS
// var utils = require('com_utils');
//
// // AMD
// define(['com_utils'], function(S) {...});
//
// // UMD in the browser
// // S is available as a global variable
// ```
import * as allExports from './index.js';

function mixin (obj) {
  return Object.keys(obj).reduce((result, el) => {
    result[el] = obj[el];

    return result;
  }, {});
}

const utils = mixin(allExports);

// Export the Sui-Utils API.
export default utils;
