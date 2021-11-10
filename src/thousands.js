/**
 * 数字千分位格式化
 * 
 * @since 0.1.0
 * @param { number } number 待解析的数字
 * @return { string } 格式化后的字符串
 * @example
 *
 * thousands(1234567);
 * // => '123,456,7'
 */
export default function thousands(number) {
  if (number !== 0 && !number) {
    return '-';
  }

  let numStr = String(number);
  const index = numStr.indexOf('.');
  let numSuffix = '';

  if (index > 0) {
    numSuffix = numStr.substring(index);
    numStr = numStr.substring(0, index);
  }

  return numStr.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + numSuffix;
}
