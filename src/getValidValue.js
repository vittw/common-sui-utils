
/**
 * 移除对象中的无效值<br>
 * **注意** 此方法不改变原对象, 将返回一个新对象<br>
 * `undefined` `null` `""` `Invalid date` `NaN` 被认为是无效值<br>
 *
 * @since 0.1.0
 * @param { Object } obj 待检查的对象
 * @return { Object } 返回过滤掉无效值后的新对象
 * @example
 *
 * getValidValue({
 *  name: '张三',
 *  age: '',
 *  date: null,
 *  address: undefined,
 *  count: NaN,
 *  other: 'Invalid date',
 * });
 * // => { 'name': '张三' }
 */
export default function getValidValue(obj) {
  return fromEntries(
    Object.entries(obj).filter(el => !([null, undefined, '', NaN, 'Invalid date'].includes(el[1])))
  );
}

function fromEntries(arr) {
  return arr.reduce((obj, el) => {
    const [key, value] = el;

    obj[key] = value;

    return obj;
  }, {});
}
