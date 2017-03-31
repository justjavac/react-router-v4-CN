# context.router

React Router 使用 「context.router」来实现父 `<Router>` 与子 [`<Router>`](Route.md)，`<Router>`与[`<Link>`](../../../react-router-dom/docs/api/Link.md)，或是 `<Router>` 与 [`<Prompt>`](Prompt.md) 之间的信息传递。 

`context.router` 不应作为一个公开的API，因为 `context.router` 本身是一个实验性的API，并有可能在以后随着 React 的改变而发生改变，建议你在组件中尽可能少去直接使用 `this.context.router` 这种写法。而你通过 [`<Route>`](Route.md) 组件或是使用 [`withRouter`](withRouter.md) 来包裹的组件来传递变量，并且使用这些变量。
