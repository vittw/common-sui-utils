# Contributing

* 基于 master 新建一个本地分支:
  $ git checkout -b <branch>

* 如果您要增添一个函数 `eg`, 在 `src/eg.js` 中定义它, 并在 `src/index.js` 导出,

* 为配合编译工具做代码分割, 文件名和导出函数名需保持一致

* 库私有方法请在 `src/internal/` 下添加, 并在注释中打上 `@private` 标识

* 项目文档注释遵循 [jsdoc](https://jsdoc.app/) 规范

* 暴露出去的方法, 必须有对应的 `@example` 使用示例, 私有方法不做要求

* rebase && squash 你的代码, 保持 git commit 历史记录的整洁性, 方便我们对您的代码 review

* 申坊权限不对外开放, 请在 gitlab 仓库新建 merge request 申请合并到主干
