import Box from "./Box"
import { Base } from "../types"
import { produceWithPatches, enablePatches, setAutoFreeze } from "immer"

enablePatches()

setAutoFreeze(false)

export default function createBox<T>(initialData: T): Base<T>
export default function createBox(initialData: any) {
  const box = new Box(initialData)

  const base: Base<any> = {
    getData: () => box.wrappedDataRef.current,
    initTrackEffect: box.initTrackEffect,
    commit: (updater: any) => {
      try {
        const [nextWrappedDataRef, changedPatches] = produceWithPatches(
          box.wrappedDataRef,
          updater
        )

        box.addPendingEffectsByPatches(changedPatches, nextWrappedDataRef)
        box.wrappedDataRef = nextWrappedDataRef
        box.batchTriggerPendingEffects()

        return nextWrappedDataRef.current
      } catch (error) {
        console.error(`[Error in commit] | `, error)
        return box.wrappedDataRef
      }
    },
  }

  return base
}
