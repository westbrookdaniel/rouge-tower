export type Vec = [number, number]

export function ran(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function ranVec(minVec: Vec, maxVec: Vec): Vec {
  return [ran(minVec[0], maxVec[0]), ran(minVec[1], maxVec[1])]
}
