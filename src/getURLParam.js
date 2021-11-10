import parseURLParam from './parseURLParam';

/**
 * 获取 URL 查询参数中的键值
 * 
 * @since 0.1.0
 * @param { string } key 获取指定的 `key` 值
 * @param { string | boolean } [str=location.search] 要解析的字符串, 支持跳过直接传后续参数
 * @param { boolean } [isDecode=true] 是否需要解码
 * @returns { string|Object } 返回指定 `key` 对应的 `value` 值, 不传 `key` 则返回查询参数解析后的全部值
 * @example
 * 
 * location.href
 * // => http://aone.stopaas.sto.cn/req?from=ak&akProjectId=%E7%94%B3%E9%80%9A
 * 
 * getURLParam('from');
 * // => 'ak'
 * 
 * getURLParam();
 * // => {
 *  from: 'ak',
 *  akProjectId: '%E7%94%B3%E9%80%9A',
 * }
 * 
 * getURLParam('akProjectId');
 * // => '%E7%94%B3%E9%80%9A'
 * 
 * getURLParam('akProjectId', true);
 * // => '申通'
 * 
 * getURLParam('to', 'from=ak&to=%E5%BF%AB%E9%80%92');
 * // => '%E5%BF%AB%E9%80%92'
 * 
 * getURLParam('to', 'from=ak&to=%E5%BF%AB%E9%80%92', true);
 * // => '快递'
 */
export default function getURLParam(key, ...rest) {
  const searchResult = parseURLParam(...rest);

  return key ? searchResult[key] : searchResult;
}
