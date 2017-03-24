# &lt;Prompt>

当用户离开当前页的时候做出提示. 当你的应用处在特定状态, 此状态不希望用户离开时(例如填写表格到一半), 你应该使用`<Prompt>`。

```js
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="你确定要离开吗？"
/>
```

## message: string


当用户尝试导航离开时，提示用户的消息。

```js
<Prompt message="你确定要离开吗？"/>
```

## message: func

会与用户试图前往下一个`地址`（location） 和 `action` 一起被调用。

函返回一个字符串用作向用户提示，或者返回`true`用作允许过渡。

```js
<Prompt message={location => (
  `你确定你要前往 ${location.pathname} 吗?`
)}/>
```

## when: bool

你可以随时渲染`<Prompt>`，而不是有条件地在警戒后面渲染它。

- 当`when={true}` 时，禁止导航
- 当`when={false}` 时，允许导航

```js
<Prompt when={formIsHalfFilledOut} message="确定吗？"/>
```
