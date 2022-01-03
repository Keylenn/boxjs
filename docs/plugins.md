# 插件列表

## 🛠useBoxState
> 一个支持在React中状态化box数据的插件，本质是一个[React Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html)

该插件默认会状态化box中所有的数据, 可以通过传入getter方法自定义筛选组合需要状态化的数据; 插件返回值与React内置的[useState](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)类似，返回state和对应的更新函数；不同的是，这里的更新函数是[box中内置的commit](/base?id=boxcommitupdater)方法，该方法基于[immer](https://immerjs.github.io/immer/)封装，修改数据更加高效。

💡 API

```const [state, commit] = useBoxState(...overloads)```

+ 状态化传入box中所有的数据，任意数据变化时直接更新
```js
const box = createBox(0)
const [count] = useBoxState(box)
```

+ 自定义筛选组合需要状态化的数据，box对应数据变化时才会触发更新，精准定位更新区间
```js
const box = createBox({
    name: 'Tony',
    age: 18,
})
const [name] = useBoxState(box, (data) => d.name)
```

🌰 示例

```js
  // 创建一个box
  const box = creteBox(0)

  // 基于commit自定义修改数据action
  const inc = () => box.commit((draft) => void (draft.current += 1)

  function Counter() {
    const [count, commit] = useBoxState(box)
    return (
      <div>
        count:{count}
        <button onClick={inc}>+</button>
        <button onClick={() => {commit((draft) => void (draft.current -= 1)}}>-</button>
      </div>
    )
  }
```

[💨 前往查看更多Box和React的故事~](/react)

## 🛠getSharedBox

> 一个hobox插件，让共享box更便捷

该插件常用于共享其他box实例，如果共享box失败使用回退方案。

💡 API

```const box = getSharedBox(option)```

### ```GetSharedBoxOption```

  | 属性 | 说明 | 类型`(T为待共享的box类型)` | 是否必需 |
  | -- | -- | -- | -- |
  | `source` | 共享的box来源 | T \| (() => T) | ✔ |
  | `fallback` | 共享失败的回退方案，如果传入的是box初始值，插件会自动生成新box；如果传入box生成器，则需要手动创建并返回新box | BoxDataType\<T\> \| (() => T) | ✔ |
  | `onFail` | 共享失败的回调 | (reason: any) => void | ✖ |

  🌰 示例

  ```js
  // top
  const counterBox = createBox(0)
  window.counterBox = counterBox

  const TopCounter = () => {
    const [count, setCount] = useBoxState(counterBox);
    const inc = () => setCount((draft) => void (draft.current += 1)
    return (
      <div onClick={inc}>
        top-count: {count}
      </div>
    )
  }

  // iframe
    const counterBox = getSharedBox({
      source: window.top?.counterBox,
      fallback: 0
    })

    const IframeCounter = () => {
      const [count, setCount] = useBoxState(counterBox);
      const inc = () => setCount((draft) => void (draft.current += 1)
      return (
        <div onClick={inc}>
          iframe-count: {count}
        </div>
      )
    }

  ```