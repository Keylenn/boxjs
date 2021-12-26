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

#### ```box.initTrackEffect(effectHook)```
内置的action，用于为数据注入副作用，常用于[插件](/advanced?id=🔩-插件)开发

+ 接受[函数effectHook](#effecthook)作为参数，在数据变化时会触发对应的副作用钩子

+ 返回注入副作用的配置[DraftTrackEffectOption](#drafttrackeffectoption)



##### ```EffectHook```
```ts
type EffectHook<T> = (option: TriggerOption<T>) => void
```
+ TriggerOption

  | 属性 | 说明 | 类型`(T为box数据的类型)` |
  | -- | -- | -- |
  | `changedPatches` | box的数据修改补丁，既对应数据的路径集合 | any[] |
  | `prev` | 修改前的box数据 | T |
  | `next` | 修改后的box数据 | T \| null |

##### ```DraftTrackEffectOption```

| 属性 | 说明 | 类型`(T为box数据的类型)` |
| -- | -- | -- |
| `trackedData` | 当前box数据的临时代理(Proxy)；该数据非必须使用，常用于针对具体数据注入副作用 | T |
| `cleanUpEffect` | 清理当前注入的副作用；该方法非必须使用，常用于优化 | () => void |
| `finish` | 结束当前注入副作用；需要注意的是，该方法**必须**被调用 | () => void |

