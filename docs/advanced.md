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


## 🗳 共享box
由于hobox是框架无关的，[box对象](/base?id=box)本质上是个Javascript对象，因此box对象之间是可以相互共享的

> 共享方式也很简单，只需要一个提供者和一个消费者，提供者负责创建box对象并暴露，作为消费者只需要使用对应的box对象即可。

你可以用任意的方式实现共享，这里我们推荐使用[🛠插件getSharedBox](/plugins?id=🛠getsharedbox)

### 跨iframe共享

跨iframe共享，最简便的方式就是把box对象挂在上层的window下，下层iframe直接通过top进行消费

下面通过一个计数器Demo作为🌰看看如何实现跨iframe共享box

> 💡 由于iframe不能跨域，下面的Demo无法预览，项目跑起来后直接点击[Demo传送门🚪](https://github-wwgpip-wle66z--3001.local.webcontainer.io)进行预览


<iframe src="https://stackblitz.com/edit/github-wwgpip-wle66z?devtoolsheight=33&embed=1&file=app/src/App.js&terminal=start"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hobox-react-iframe"
></iframe>



### 跨应用共享

跨应用共享，目前推荐的方式就是通过webpack5的[Module Federation](https://webpack.docschina.org/concepts/module-federation/)共享box对象,
一个应用作为提供者，创建box对象并通过配置暴露出去，另一个应用作为消费者，直接引入远程共享的box对象并使用

下面通过一个计数器Demo作为🌰看看如何实现跨应用共享



<iframe src="https://stackblitz.com/edit/github-wwgpip?embed=1&file=app1/src/App.js&terminal=start"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hobox-react-apps"
></iframe>


