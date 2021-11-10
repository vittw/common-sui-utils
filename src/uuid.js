/**
 * 生成唯一 uuid
 * 
 * @since 0.1.0
 * @return { string }
 * @example
 * 
 * uuid();
 * // => '5C248E44-4C0D-4ABB-A0AA-865B5F76308E'
 */
export default function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16).toUpperCase();
  });
}
