import { Vec } from '../types'

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randomVec(minVec: Vec, maxVec: Vec): Vec {
  return [random(minVec[0], maxVec[0]), random(minVec[1], maxVec[1])]
}
