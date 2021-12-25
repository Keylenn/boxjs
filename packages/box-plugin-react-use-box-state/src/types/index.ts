import { Box, BoxDataType } from "@hobox/core"

export type Getter<T> = (d: BoxDataType<T>) => any

export type Dispatch<T extends Box> = T["commit"]
