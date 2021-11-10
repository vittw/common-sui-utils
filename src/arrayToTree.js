import { cloneDeep } from 'lodash';

/**
 * 将传入的**扁平化**数组转换为**树形**数组<br>
 * 不改变原数组
 * 
 * @since 0.1.3
 * @param { Array } originArray  要转换的数组
 * @param { Object } [params={}]  数据`id`名和父级`id`名
 * @param { string } [params.id="id"]  数据id名
 * @param { string } [params.pid="parentId"]  父级id名
 * @return { Array } 树形结构数组
 * @example
 * 
 * const flatDataSource = [
 *   { id: '1', ... },
 *   { id: '11', name: 'aa_sub1', desc: '这是一个描述_sub1' },
 *   { id: '2', ... },
 *   { id: '22', ..., fatherId: '2' },
 *   { id: '23', ..., fatherId: '2' },
 *   { id: '233', ..., fatherId: '23' },
 *   { id: '2333', ..., fatherId: '233' },
 * ];
 * 
 * arrayToTree(flatDataSource, { pid: 'fatherId' });
 * // => 拼接好的树形结构
 * // [
 * //   {
 * //     "id": "1", ...,
 * //     "children": [
 * //       { "id": "11", "name": "aa_sub1", "desc": "这是一个描述_sub1", "fatherId": "1" }
 * //     ]
 * //   },
 * //   {
 * //     "id": "2", ...,
 * //     "children": [
 * //       { "id": "22", ..., "fatherId": "2" },
 * //       {
 * //         "id": "23",
 * //         ...,
 * //         "fatherId": "2",
 * //         "children": [
 * //           {
 * //             "id": "233",
 * //             ...,
 * //             "fatherId": "23",
 * //             "children": [
 * //               { "id": "2333", ... "fatherId": "233" },
 * //             ]
 * //           }
 * //         ]
 * //       }
 * //     ]
 * //   }
 * // ];
 */
export default function arrayToTree(originArray, params) {
  const { id = 'id', pid = 'parentId' } = params || {};
  const targetArray = [];

  if (!(originArray instanceof Array)) {
    return [];
  } else if (originArray.length < 2) {
    return originArray;
  }

  const toTree = (origin) => {
    origin.forEach((item) => {
      delete item.children;
    });
    let map = {};
    origin.forEach(function (item) {
      map[item[id]] = item;
    });
    origin.forEach(function (item) {
      let parent = map[item[pid]];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        targetArray.push(item);
      }
    });
    return targetArray;
  };

  return toTree(cloneDeep(originArray));
}
