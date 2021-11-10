import { cloneDeep } from 'lodash';

/**
 * 将**树形**数组转化为**扁平化**数组<br>
 * 不改变原数组
 * 
 * @since 0.1.3
 * @param { Array } originArray  待转换的数组
 * @return { Array } 扁平化数组
 * @example
 * 
 * const treeDataSource = [
 *   {
 *     "id": "1", ...,
 *     "children": [
 *       { "id": "11", "name": "aa_sub1", "desc": "这是一个描述_sub1", "parentId": "1" }
 *     ]
 *   },
 *   {
 *     "id": "2", ...,
 *     "children": [
 *       { "id": "22", ..., "parentId": "2" },
 *       {
 *         "id": "23",
 *         ...,
 *         "parentId": "2",
 *         "children": [
 *           {
 *             "id": "233",
 *             ...,
 *             "parentId": "23",
 *             "children": [
 *               { "id": "2333", ... "parentId": "233" },
 *             ]
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ];
 * 
 * treeToArray(treeDataSource);
 * // => 扁平化的数组
 * // [
 * //   { id: '1', ... },
 * //   { id: '11', name: 'aa_sub1', desc: '这是一个描述_sub1' },
 * //   { id: '2', ... },
 * //   { id: '22', ..., parentId: '2' },
 * //   { id: '23', ..., parentId: '2' },
 * //   { id: '233', ..., parentId: '23' },
 * //   { id: '2333', ..., parentId: '233' },
 * // ]
 */
export default function treeToArray(originArray) {
  let targetArray = [];

  if (!(originArray instanceof Array)) {
    return [];
  }

  const toFlat = (origin) => {
    origin.forEach((el) => {
      targetArray.push(el);

      el.children && el.children.length > 0 ? toFlat(el.children) : '';
    });

    targetArray.map((i) => i.children && delete i.children);

    return targetArray;
  };

  return toFlat(cloneDeep(originArray));
}
