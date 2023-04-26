import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { app } from '../main'

export function createSpawner(
  create: (pos: Vec) => PIXI.Container,
  [x, y]: Vec
) {
  const spawned = []

  app.ticker.add(() => {
    if (spawned.length === 0) {
      const c = create([x, y])
      spawned.push(c)
      app.stage.addChild(c)
    }
  })
}
