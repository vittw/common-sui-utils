import isNumber from './internal/_isNumber';
import NP from 'number-precision';

const DEFAULT_RETAIN = 2;

/**
 * @private
 * @enum { UNIT }
 */
const UNIT = {
  PERCENTAGE: '%',
  LOCAL_STRING: ',',
};

/**
 * 简单的数字处理, 可跳过第二个参数直接传后续参数
 * 
 * @since 0.1.0
 * @param { number } number 待处理数字
 * @param { number } [retain = 2] 保留小数位数, 可跳过该参数
 * @param { enum } [unit] 可选值: <br>
 *   '%': 格式化为百分比 <br>
 * 
 * @returns { string } 格式化后的字符串
 * @example
 * 
 * formatNumber(0.34521, 1, '%');
 * // => '34.5%'
 * 
 * formatNumber(0.34521, '%');
 * // => '34.52%'
 * 
 * formatNumber(3325.6289);
 * // => '3325.63'
 */
export default function formatNumber(number, retain = DEFAULT_RETAIN, unit) {
  if (!isNumber(number)) {
    throw new TypeError('Need a number to format!');
  }

  if (typeof retain === 'string' && !unit) {
    unit = retain;
    retain = DEFAULT_RETAIN;
  }

  if (unit === UNIT.PERCENTAGE) {
    return NP.round(
      NP.times(number, 100),
      retain,
    ) + '%';
  } else if (unit === UNIT.LOCAL_STRING) {
    return NP.round(number, retain).toLocaleString();
  } else {
    return NP.round(number, retain) + '';
  }
}
