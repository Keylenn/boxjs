import React from "react"
import { Box, BoxDataType } from "@hobox/core"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"
import { Dispatch, Getter } from "../types"

export default function useBoxState<T extends Box>(
  box: T
): [BoxDataType<T>, Dispatch<T>]
export default function useBoxState<T extends Box, U extends Getter<T>>(
  box: T,
  getter: U
): [ReturnType<U>, Dispatch<T>]
export default function useBoxState(box: any, getter?: any) {
  const [, forceRender] = React.useReducer((s) => s + 1, 0)
  useIsomorphicLayoutEffect(() => {
    // init
    const { trackedData, cleanUpEffect, finish } =
      box.initTrackEffect(forceRender)

    // start tarck effect
    getter?.(trackedData)

    // finish
    finish()
    return cleanUpEffect
  }, [])

  const data = box.getData()
  const state = typeof getter === "function" ? getter(data) : data
  return [state, box.commit] as const
}
