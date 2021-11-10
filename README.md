SUI-UTILS
===================
业务工具函数库, 提供常用的函数集合


## 安装

```bash
snpm install common-utils

# OR 设置 registry=http://snpm-registry.sto.cn
# use npm
npm i common-utils
# use yarn
yarn add common-utils
```

## 引入

### 全量引入

```js
import * as S from 'common-utils';

const { example, formatNumber } = S;
```

或者

```js
import { example, formatNumber } from 'common-utils';
```

即使利用解构赋值也会引入整个库，未用到的函数会占用额外的体积

### 按需引入

#### 1. 手动挑选函数

   ```js
   import example from 'common-utils/lib/example';
   import formatNumber from 'common-utils/lib/formatNumber';
   ```

   手动引入比较麻烦，建议使用下面的方法

#### 2. 推荐使用 babel-plugin-import 切分代码

   ```js
   import { example, formatNumber } from 'common-utils';
   ```

   经过打包前 babel 的编译，上面的代码会变为

   ```js
   import example from 'common-utils/lib/example';
   import formatNumber from 'common-utils/lib/formatNumber';
   ```

   对应 `babel` 配置：

   ```json
   {
     "plugins": [
       ["import",
         {
           "libraryName": "common-utils"
         }
       ]
     ],
   }
   ```

## 未来计划
- prettier
- typescript & d.ts 类型支持
- 添加测试用例
- 文档主题色替换
