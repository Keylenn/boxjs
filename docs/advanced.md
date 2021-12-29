# 高级

## 🛠 插件机制
  插件通常用来拓展为box(实例)对象的功能

### 如何开发一个插件
  插件基于[box对象](/base?id=box)提供的内置action进行开发

> 基本原理: 对box中的数据注入副作用，box内部会自动追踪，当box内的数据发生变化时，会触发对应的所有副作用钩子

1. 根据插件功能传入对应的钩子配置

  调用box的tryToTrackEffect方法，传入对应的[hookoption配置](/base?id=hookoption)作为参数
```js
  box.tryToTrackEffect({
    effectHook: () => {
      // 数据对应的副作用，必需，在数据变化时会触发
      // ...
    },
    trackHook: () => {
      // 通过box数据的临时代理对象（Proxy）追踪具体的数据注入副作用
      // ...
    },
    failHook: () => {
      // 副作用追踪失败时触发，常用于错误兼容处理
      // ...
    },
  })
```

2. 优化/增强插件功能

  通过上述方法返回的[配置](/base?id=trackeffectreturntype)对插件的功能进行进一步的优化/增强, 目前支持的操作：

    + 清理副作用：在适当的时候（如组件销毁时）提前清理对应的副作用

```js
  const res = box.tryToTrackEffect(hookOption)

  // cleanup effect
  if(unmount) res?.cleanUpEffect?.()
```

### 示例

+ logger

```js
function loggerPlugin(box, logToMyService) {
  box.tryToTrackEffect({
    effectHook: (option) => {
      logToMyService(option)
    }
  })
}
```

+ [useBoxState](https://github.com/Keylenn/boxjs/blob/box-plugin-react-use-box-state/packages/box-plugin-react-use-box-state/src/core/useBoxState.ts#L13)

☞ [更多插件详情](/plugins)