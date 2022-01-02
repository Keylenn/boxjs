import { Box, BoxDataType } from "@hobox/core"

export type BoxFallback<T extends Box> = BoxDataType<T> | (() => T)

export interface GetSharedBoxOption<T extends Box> {
  source: T | (() => T)
  fallback: BoxFallback<T>
  onFail?: (reason: any) => void
}
