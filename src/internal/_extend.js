/**
 * 合并多个源对象可枚举属到第一个对象<br>
 * 如果出现相同的属性, 后出现的属性会覆盖前面的属性
 * 
 * @private
 * @param {...Object} args 待合并的对象
 * @returns {Object} 返回一个新对象
 * @example
 * 
 * _extend({ a: 1, b: 2}, { b: 3, c: 4 }, { b: 5, e: 6 });
 * // => { a: 1, b: 5, c: 4, e: 6 }
 */
export default function _extend(...args) {
  if (args.length < 2) return args[0];

  const target = args[0];

  for (let i = 1; i < args.length; i++) {
    const nextSource = args[i];

    if (nextSource != null) { // eslint-disable-line
      for (let nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          target[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return target;
}
