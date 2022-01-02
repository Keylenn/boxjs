import createBox, { Box, isBox } from "@hobox/core"
import { BoxFallback, GetSharedBoxOption } from "../types"

export default function getSharedBox<T extends Box>({
  source,
  fallback,
  onFail,
}: GetSharedBoxOption<T>) {
  try {
    const sharedBox = typeof source === "function" ? source() : source
    if (isBox(sharedBox)) return sharedBox

    return createFallbackBox(fallback)
  } catch (error) {
    onFail?.(error)
    return createFallbackBox(fallback)
  }
}

function createFallbackBox<T extends Box>(fallback: BoxFallback<T>) {
  const creator = (
    typeof fallback === "function" ? fallback : () => createBox(fallback)
  ) as () => T

  return creator()
}
