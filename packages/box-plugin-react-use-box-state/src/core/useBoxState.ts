import React from "react"
import { Box, BoxDataType, isBox } from "@hobox/core"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"
import { Dispatch, Getter } from "../types"

export default function useBoxState<T extends Box>(
  box: T
): [BoxDataType<T>, Dispatch<T>]
export default function useBoxState<T extends Box, U extends Getter<T>>(
  box: T,
  getter: U
): [ReturnType<U>, Dispatch<T>]
export default function useBoxState(box: Box, getter?: any) {
  const [, forceRender] = React.useReducer((s) => s + 1, 0)

  useIsomorphicLayoutEffect(() => {
    const res = box?.tryToTrackEffect({
      effectHook: forceRender,
      trackHook: getter,
    })

    return res?.cleanUpEffect
  }, [])

  if (!isBox(box)) {
    throw new Error(
      "The box of the parameter is not a legal box, Please Check!"
    )
  }

  const data = box.getData()
  const state = typeof getter === "function" ? getter(data) : data
  return [state, box.commit] as const
}
