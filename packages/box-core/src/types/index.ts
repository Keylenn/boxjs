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

type EffectHook<T> = (option: TriggerOption<T>) => any

interface DraftTrackEffectOpt<T> {
  trackedData: T
  cleanUpEffect: () => void
  finish: () => void
}

export interface TriggerOption<T> {
  changedPatches: any[]
  prev: T
  next: T | null
}

export interface Base<T> {
  getData: () => T
  commit: (updater: Updater<T>) => T
  initTrackEffect: (effectHook: EffectHook<T>) => DraftTrackEffectOpt<T> | null
}

export type Box<T = any> = Base<T>

export type BoxDataType<T> = T extends Base<infer R> ? R : never
