/**
 * 解析URL search
 *
 * @private
 * @since 0.1.0
 * @param { string|boolean } [str = location.search] 要解析的字符串, 支持跳过直接传后续参数
 * @param { boolean } [isDecode = true] 是否需要解码
 * @return { Object }
 * @example
 *
 * parseURLParam('http://aone.stopaas.sto.cn/req?from=ak&akProjectId=690794#openTaskId=21297')
 * // => {
 *  akProjectId: "690794#openTaskId"
 *  from: "ak"
 *  http://aone.stopaas.sto.cn/req: undefined
 * }
 */
export default function parseURLParam(str = window.location.search, isDecode = true) {
  if (str === true) {
    str = window.location.search;
    isDecode = true;
  }
  const ary = str.split(/[?&]/), result = {};

  for (let i = 0, j = ary.length; i < j; i++) {
    const n = ary[i];
    if (!n) continue;
    const tmp = n.split('=');
    result[tmp[0]] = (isDecode && !!tmp[1]) ? decodeURIComponent(tmp[1]) : tmp[1];
  }

  return result;
}
