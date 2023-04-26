import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { app } from '../main'

export function createSpawner(
  create: (pos: Vec) => PIXI.Container,
  [x, y]: Vec
) {
  const container = new PIXI.Container()

  app.ticker.add(() => {
    if (container.children.length === 0) {
      container.addChild(create([x, y]))
    }
  })

  return container
}
