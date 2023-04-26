import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { app } from '../main'

export function createSpawner(
  create: (pos: Vec) => PIXI.Container,
  [x, y]: Vec,
  [w, h]: Vec
) {
  const c = new PIXI.Container()

  c.x = x
  c.y = y
  c.width = w
  c.height = h

  app.ticker.add(() => {
    if (c.children.length === 0) {
      c.addChild(create([c.x, c.y]))
    }
  })

  return c
}
