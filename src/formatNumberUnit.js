import NP from 'number-precision';

import toType from './internal/_toType';

const DEFAULT_RETAIN = 2;

/**
 * 数字格式化加单位<br>
 * 支持自定义规则, 若未命中自定义规则, 则按下述规则处理<br>
 * 默认规则(数字取绝对值后):<br>
 * * 0 ~ 1千 保留两位小数, eg: 265.245 -> '265.25'<br>
 * * 1千 ~ 1万 保留一位小数并加 **千** 后缀, eg: 28658.632 -> '2.9千'<br>
 * * 1万 ~ 1亿 保留一位小数并加 **万** 后缀, eg: 28658235.632 -> '286.6万'<br>
 * * 1亿 ~ 无穷大 保留一位小数并加 **亿** 后缀, eg: 62382658235.632 -> '62.4亿'<br>
 * 
 * @since 0.1.0
 * @param { number } number 待解析的数字
 * @param { number } [retain = 2] format后保留小数位数, 可不传跳过该参数
 * @param { Object|Object[] } [option] 自定义规则, 只有一项规则可直接传对象, 多条规则传数组
 * @param { number } [option[].min] 区间最小值
 * @param { number } [option[].max] 区间最大值
 * @param { Function } [option[].formatter] 区间格式化函数
 * @return { string } 格式化后的字符串
 * @example
 *
 * formatNumberUnit(962.532);
 * // => '962.53'
 * 
 * formatNumberUnit(1234567);
 * // => '123.46万'
 * 
 * formatNumberUnit(1234567, 1);
 * // => '123.5万'
 * 
 * formatNumberUnit(1234567890);
 * // => '12.35亿'
 * 
 * formatNumberUnit(1234567892, {
 *   min: 0, max: Infinity,
 *   formatter(value) {
 *     const handledNumber = (value / 1000).toFixed(1);
 *     const unit = '千';
 * 
 *     return `${handledNumber}${unit}`;
 *   },
 * });
 * // 命中自定义规则
 * // => '1234567.9千'
 * 
 * formatNumberUnit(1234567890, [
 *   {
 *     min: 0, max: 1000,
 *     formatter(value) {
 *       return 'xxxx';
 *     },
 *   },
 *   {
 *     min: 20000, max: 1000000,
 *     formatter(value) {
 *       return 'xxxxxx';
 *     }
 *   },
 * ]);
 * // 未命中自定义规则, 按内置规则处理
 * // => '12.35亿'
 */

function formatNumberUnit(number, retain = DEFAULT_RETAIN, option) {
  const abs = Math.abs(number);
  const prefix = number < 0 ? '-' : '';

  if (['object', 'array'].includes(toType(retain)) && !option) {
    option = retain;
    retain = DEFAULT_RETAIN;
  }
  if (toType(option) === 'object') option = [option];
  if (!option) option = [];

  const BASE_NUM = 10;
  const THOUSAND = Math.pow(BASE_NUM, 3); // 1千
  const TEN_THOUSAND = Math.pow(BASE_NUM, 4); // 1万
  const ONE_HUNDRED_BILLION = Math.pow(BASE_NUM, 8); // 1亿
  const rangeInterval = [
    ...option,
    ...[
      { min: THOUSAND, max: TEN_THOUSAND, base: THOUSAND, suffix: '千', retain }, // 1千 ~ 1万
      { min: TEN_THOUSAND, max: ONE_HUNDRED_BILLION, base: TEN_THOUSAND, suffix: '万', retain }, // 1万 ~ 1亿
      { min: 0, max: THOUSAND, suffix: '', base: 1, retain }, // 0 ~ 1千
      { min: ONE_HUNDRED_BILLION, base: ONE_HUNDRED_BILLION, suffix: '亿', retain } // 1亿 ~ 无穷大
    ],
  ];

  let current;
  let index = 0;

  while (current = rangeInterval[index++]) { // eslint-disable-line
    const { min, max, formatter } = current;

    if (!min && !max) {
      throw new Error('需要指定区间的最小值`min`或最大值`max`');
    }

    if (min && !max && abs >= min || !min && max && abs <= max || min && max && abs >= min && abs <= max) {
      if ((index - 1 < option.length)) {
        return typeof formatter === 'function' ? formatter(number) : number;
      } else {
        const { base, retain, suffix } = current;

        return `${prefix}${NP.round(NP.divide(abs, base), retain)}${suffix}`;
      }
    }
  }
}

export default formatNumberUnit;
