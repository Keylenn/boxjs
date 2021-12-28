# 基础

## 📦 安装

```bash
yarn add @hobox/core
```

```bash
npm i @hobox/core
```

## ⚡快速开始

#### 1. 定义一个Box
```ts
import createBox from "@hobox/core"

const box = createBox(0)
```
#### 2. 定义Action修改数据
```ts
const inc = () => box.commit((draft) => void (draft.current += 1)
const dec = () => box.commit((draft) => void (draft.current -= 1)
```

## 📚API

### ```createBox(initialData)```
createBox作为工厂函数，接收初始数据`initialData`，返回一个[box对象](#box)

####  ```box```

#### ```box.getData()```
内置的action，用于获取当前box的数据

#### ```box.commit(updater)```
内置的action，用于修改当前box的数据
> 参数updater为函数，与immer中的[produce](https://immerjs.github.io/immer/produce)的第二个参数保持一致

#### ```box.tryToTrackEffect(hookOption)```
内置的action，用于为数据注入副作用，常用于[插件](/advanced?id=🔩-插件)开发

+ 接受[hookOption配置](#hookoption)作为参数，box内部会在合适时候触发对应钩子

+ 返回对应的清理函数等配置[TrackEffectReturnType](#trackeffectreturntype)



##### ```HookOption```

  | 属性 | 说明 | 类型`(T为box数据的类型)` | 是否必需 |
  | -- | -- | -- | -- |
  | `effectHook` | 数据变化时触发的副作用钩子 | (option: [TriggerOption](#triggeroption)<T>) => any | ✔ |
  | `trackHook` | 数据追踪的钩子，可用于针对具体数据注入副作用 | (trackedData: T) => void | ✖ |
  | `failHook` | 副作用追踪失败时触发 | (reason: any) => void | ✖ |

###### TriggerOption

  | 属性 | 说明 | 类型`(T为box数据的类型)` |
  | -- | -- | -- |
  | `changedPatches` | box的数据修改补丁，既对应数据的路径集合 | any[] |
  | `prev` | 修改前的box数据 | T |
  | `next` | 修改后的box数据 | T \| null |

##### ```TrackEffectReturnType```

| 属性 | 说明 | 类型`(T为box数据的类型)` |
| -- | -- | -- |
| `cleanUpEffect` | 清理当前注入的副作用，常用于优化 | () => void |

