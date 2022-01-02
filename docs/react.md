# 集成React

## 💫状态化box数据

> box本身是独立于框架之外的，但是可以利用插件实现box实例和React的联动。[useBoxState](/plugins?id=🛠useboxstate)可以将box的数据状态化。

🎉 用法
```js
  import useBoxState from "@hobox/plugin-react-use-box-state";

  function App() {
    const [state, commit] = useBoxState(box)
    return (
      // ...ReactElement
    )
  }
```

🌰 示例-counter

<iframe src="https://codesandbox.io/embed/hobox-react-counter-3uxp4?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:110%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hobox-react-counter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


🌰 示例-todos
<iframe src="https://codesandbox.io/embed/hobox-react-todos-lklpv?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:110%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hobox-react-counter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

💡 技巧

+ 你可能不需要useBoxState

> 和React一直推荐的那样，hobox推崇尽量地将**状态内敛化**，因此你不一定需要使用useBoxState：
>+ 如果数据是组件本身的状态，请直接使用[useState](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)
>+ 如果是兄弟组件共享的状态，请直接把数据提升到共同父组件去状态化，通过props传递或使用[useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)
>+ 如果状态需要跨组件跨层级共享，这时候useBoxState才有登场的必要
>
> 简而言之，充分利用React内置的API将状态内敛到合适的层级，只在有必要的情况下，权衡场景后使用合适的状态管理工具~



