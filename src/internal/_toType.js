/**
 * 判断类型，返回一个有效的、全小写字符串
 * 
 * @private
 * @param {*} data 待判断的数据
 * @return {string}
 * @example
 * 
 * _toType(123);
 * // => 'number'
 * 
 * _toType([12, 3]);
 * // => 'array'
 * 
 * _toType(null);
 * // => 'null'
 */
const _toType = data => Object.prototype.toString
  .call(data)
  .split(' ')[1]
  .slice(0, -1)
  .toLowerCase();

export default _toType;
