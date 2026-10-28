import test from "node:test"
import assert from "node:assert/strict"
import {
  wrap,
  clamp,
  stringY,
  springStep,
  swingStep,
  nearestAt,
  pad2,
} from "../src/components/ui/polaroid-line-carousel"

test("wrap handles positive, negative, and zero values", () => {
  assert.equal(wrap(0, 5), 0)
  assert.equal(wrap(4, 5), 4)
  assert.equal(wrap(5, 5), 0)
  assert.equal(wrap(-1, 5), 4)
  assert.equal(wrap(0, 0), 0)
})

test("clamp keeps values within [a, b]", () => {
  assert.equal(clamp(5, 0, 10), 5)
  assert.equal(clamp(-5, 0, 10), 0)
  assert.equal(clamp(15, 0, 10), 10)
})

test("stringY: string is anchored at ends and sags in the center", () => {
  // At x = 0 (left anchor), y = y0
  assert.equal(stringY(0, 1000, 100, 40), 100)
  // At x = 1000 (right anchor), y = y0
  assert.equal(stringY(1000, 1000, 100, 40), 100)
  // In the exact middle (x = 500), y = y0 + sag
  assert.equal(stringY(500, 1000, 100, 40), 140)
  // Parabolic shape: at quarter points x = 250 and 750, y = 100 + 4 * 40 * 0.25 * 0.75 = 130
  assert.equal(stringY(250, 1000, 100, 40), 130)
  assert.equal(stringY(750, 1000, 100, 40), 130)
})

test("springStep: critically damped spring settles on target", () => {
  let x = 0
  let v = 0
  for (let i = 0; i < 120; i++) {
    ;[x, v] = springStep(x, v, 300, 1 / 60)
  }
  assert.ok(Math.abs(x - 300) < 1, `Expected x near 300, got ${x}`)
  assert.ok(Math.abs(v) < 5, `Expected v near 0, got ${v}`)
})

test("swingStep: physics for print swing lag and settling", () => {
  let a = 0
  let w = 0
  // Moving right (positive velocity) swings print clockwise (a > 0)
  for (let i = 0; i < 30; i++) {
    ;[a, w] = swingStep(a, w, 900, 1 / 60, 1)
  }
  assert.ok(a > 0, `Expected a > 0 when line moves right, got ${a}`)

  // Settles once line velocity becomes 0
  for (let i = 0; i < 300; i++) {
    ;[a, w] = swingStep(a, w, 0, 1 / 60, 1)
  }
  assert.ok(Math.abs(a) < 0.005, `Expected settled angle near 0, got ${a}`)

  // Swing clamp protects against extreme velocity
  let b = 0
  let bw = 0
  for (let i = 0; i < 60; i++) {
    ;[b, bw] = swingStep(b, bw, 99999, 1 / 60, 1)
  }
  assert.ok(Math.abs(b) <= 0.6, `Expected b clamped within 0.6 rad, got ${b}`)

  // When gain is 0, print remains still
  assert.deepEqual(swingStep(0, 0, 900, 1 / 60, 0), [0, 0])
})

test("nearestAt clamps to valid slide indices", () => {
  assert.equal(nearestAt(-500, 300, 6), 0)
  assert.equal(nearestAt(0, 300, 6), 0)
  assert.equal(nearestAt(760, 300, 6), 3) // 760 / 300 = 2.53 -> 3
  assert.equal(nearestAt(1e6, 300, 6), 5)
})

test("pad2 pads single-digit numbers with leading zero", () => {
  assert.equal(pad2(1), "01")
  assert.equal(pad2(9), "09")
  assert.equal(pad2(10), "10")
  assert.equal(pad2(42), "42")
})
