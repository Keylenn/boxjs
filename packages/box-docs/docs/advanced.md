# 基础

## 🔩 插件
  插件通常用来拓展为box(实例)对象的功能

### ❔ 如何开发一个插件
  插件基于[box对象](/base?id=box)提供的内置action进行开发

> 基本原理: 对box中的数据注入副作用，box内部会自动追踪，当box内的数据发生变化时，会触发对应的所有副作用钩子

1. 初始化

  调用box的initTrackEffect方法，传入对应的[副作用钩子](/base?id=effecthook)作为参数
```js
  const { trackedData, cleanUpEffect, finish } = box.
  initTrackEffect((option) => {
    // ...effect
  })
```

2. 增强插件功能

  通过初始化返回的[配置](/base?id=drafttrackeffectoption)对插件的功能进行进一步的增强
  
    + 追踪数据：通过box数据的临时代理对象（Proxy）追踪具体的数据注入副作用

    + 清理副作用：在适当的时候（如组件销毁时）提前清理对应的副作用

```js
  const { trackedData, cleanUpEffect, finish } = box.
  initTrackEffect(...)

  const trackedDataFn = (d) => {
    // ...track data
  }
  trackedDataFn?.(trackedData)

  // cleanup effect
  if(unmount) cleanUpEffect()
```

3. 完成

  插件开发完成后，调用初始化返回的finish方法
  
  ⚠ 由于该方法是用于销毁临时创建的代理对象，针对具体数据注入effectHook，因此**必须在最后**被调用
```js
  const { trackedData, cleanUpEffect, finish } = box.
  initTrackEffect(...)

  // ...enhance plugin

  finish()
```


### 🌰 插件示例

+ logger

```js
function loggerPlugin(box, logToMyService) {
  // init
  const { finish } = box.initTrackEffect((option) => {
    logToMyService(option)
  })

  // finish
  finish()
}
```

+ [useBoxState](https://github.com/Keylenn/boxjs/blob/box-plugin-react-use-box-state/packages/box-plugin-react-use-box-state/src/core/useBoxState.ts#L6)