# react-router

用于 [React](https://facebook.github.io/react) 的声明式路由管理

## 安装

使用 [npm](https://www.npmjs.com/)：

    $ npm install --save react-router

安装完成后可以使用[webpack](https://webpack.github.io/) 或其它模块打包工具：

```js
// 使用 ES6 modules
import { Router, Route, Switch } from 'react-router'

// 使用 CommonJS modules
var Router = require('react-router').Router
var Route = require('react-router').Route
var Switch = require('react-router').Switch
```

[unpkg](https://unpkg.com) 上有 UMD 的构建版，可用户浏览器：

```html
<script src="https://unpkg.com/react-router/umd/react-router.min.js"></script>
```

引入 react-router.min.js 库之后，可以通过 `window.ReactRouter` 使用 React Router。

## Issues

如果你发现了任何 React Router 的 bug，可以直接在 [ReactTraining/react-router 上提 issue](https://github.com/ReactTraining/react-router/issues)。

如果你发现了 React Router V4 文档翻译错误，可以在 [react-translate-team/react-router-CN 上提 issue](https://github.com/react-translate-team/react-router-CN/issues)。

## Credits

React Router 由 [React Training](https://reacttraining.com) 开发并维护。

React Router V4 中文文档由 [react-translate-team](https://github.com/react-translate-team) 翻译。
