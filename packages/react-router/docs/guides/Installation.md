# Installation | 安装

React Router 运行在可以运行在不同的环境中: 浏览器, 服务端, 源生, 甚至是 VR (运行在开发预览中!) 当许多组件都是共享的(比如 `Route` ) ,但是其它组件都是特定环境(如 `NativeRouter`). 而不是要求您安装两个软件包，您只需要为目标环境安装软件包。 环境之间的任何共享组件都从环境特定的包中重新导出。

## Web

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

所有封装模块都可以通过顶部导入:

```js
import {
  BrowserRouter as Router,
  StaticRouter, // for server rendering
  Route,
  Link
  // etc.
} from 'react-router-dom'
```
如果您要在网络上实现最小的捆绑包大小，则可以直接导入模块。 理论上，一个像 Webpack 这样令人振奋的捆绑包使得这不必要，但是我们还没有测试过。 我们欢迎你来！

```js
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
// etc.
```

## Native

我们仍然在为React Router的本机功能撰写伟大的文档。 现在我们推荐你[阅读源]（https://github.com/ReactTraining/react-router/tree/v4/packages/react-router-native）。

```bash
yarn add react-router-native
# 或者 如果你不使用 react-native cli
npm install react-router-native
```

所有封装模块都可以通过顶部导入:

```js
import {
  NativeRouter as Router,
  DeepLinking,
  AndroidBackButton,
  Link,
  Route
  // etc.
} from 'react-router-native'
```

## Who-knows-where

```bash
yarn add react-router
# 或者 如果你不使用 react-native cli
npm install react-router
```

所有封装模块都可以通过顶部导入:

```js
import {
  MemoryRouter as Router,
  Route
  // etc.
} from 'react-router'
```

您可以在运行React的任何地方使用React Router的导航，导航状态保存在内存路由器中。 您可以查看NativeRouter的实现来了解如何集成。
