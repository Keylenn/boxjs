import { Draft } from "immer"

export type DraftDataRef<T = any> = Draft<{ current: T }>

export type Updater<T = any> = (draftDataRef: DraftDataRef<T>) => void

export type AnyFn = (...args: any) => any

export type AnyObj = Record<string, any>

export interface PropEffect {
  trackId: number
  pathId?: number // track Proxy data like: data.xxxx ✔
  hasSubProp: boolean
  triggerHook: AnyFn
}

export type TargetMap = Map<PropertyKey, Set<PropEffect>>

interface PathIdItem {
  updateUpperPropEffectHasSubPropHook: () => void
}
export interface TrackIdItem {
  isDataRefCurrPropEffHasSubPropChanged: boolean
  pathIdMap: Map<number, Set<PathIdItem>>
  clearEffectSet: Set<() => void>
}

export type WrappedDataRef<T> = { current: T }

export type EffectHook<T> = (option: TriggerOption<T>) => void

interface TrackEffectReturnType {
  cleanUpEffect: () => void
}

export interface TriggerOption<T> {
  changedPatches: any[]
  prev: T
  next: T | null
}

export type BoxDataType<T> = T extends Base<infer R> ? R : never

export interface HookOption<T> {
  effectHook: EffectHook<T>
  trackHook?: (trackedData: T) => void
  failHook?: (reason: any) => void
}

export interface Base<T> {
  getData: () => T
  commit: (updater: Updater<T>) => T
  tryToTrackEffect: (hookOption: HookOption<T>) => TrackEffectReturnType | null
}

export type Box<T = any> = Base<T>
