/**
 * 获取 cookie 里的值
 * 
 * @since 0.1.0
 * @param { string } key 待获取值的key
 * @param { boolean } [needEscape = false] 是否需要解码
 * @return { string|null }
 * @example
 * 
 * 例如:
 * document.cookie
 * // => 'token=MDYzMjQ2MTUwOS0xODc2NDgxOTY5; userName=%u9B4F%u5A77%u5A77'
 * 
 * getCookie('userName');
 * // => '%u9B4F%u5A77%u5A77'
 * 
 * getCookie('userName', true);
 * // => '魏婷婷'
 */
export default function getCookie(key, needEscape) {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);

  if (arr) {
    if (needEscape) {
      return arr[2];
    } else {
      return unescape(arr[2]);
    }
  } else {
    return null;
  }
}
