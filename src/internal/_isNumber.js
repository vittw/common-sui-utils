import toType from './_toType';

/**
 * 判断是否是数字(不包含字符串数字)
 * 
 * @private
 * @param {*} data 待判断的数据
 * @return {boolean}
 * @example
 * 
 * _isNumber(NaN);
 * // => false
 * 
 * _isNumber('123');
 * // => false
 * 
 * _isNumber(123);
 * // => true
 */
const _isNumber = data => !Number.isNaN(data) && toType(data) === 'number';

export default _isNumber;
