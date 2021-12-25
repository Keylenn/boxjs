"use strict"

import createBox from "../src"

describe("createBox", () => {
  test("create a box", () => {
    const countBox = createBox(0)
    expect(countBox.getData()).toBe(0)
    countBox.commit((d) => {
      d.current += 1
    })
    expect(countBox.getData()).toBe(1)
    const inc = (step = 1) => {
      countBox.commit((d) => {
        d.current += step
      })
    }
    inc(10)
    expect(countBox.getData()).toBe(11)
  })
})
