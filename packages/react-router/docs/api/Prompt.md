# &lt;Prompt>

用于在用户导航离开当前页面的时候作出提示。当你的应用程序进入了一个应该避免用户导航离开的状态（例如填写表格到一半），你应该使用`<Prompt>`。

```js
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="你确定要离开吗？"
/>
```

## message: string

The message to prompt the user with when they try to navigate away.

当用户尝试导航离开时，提示用户的消息。

```js
<Prompt message="你确定要离开吗？"/>
```

## message: func

函数被调用的时候，会带上用户正试图导航到的 `location`（地址） 和 `action`。

函数会返回一个字符串用作向用户提示，或者返回`true`用作允许过渡。

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
