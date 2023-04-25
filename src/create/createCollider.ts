import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { Bodies } from 'matter-js'
import { physics } from '../main'

export function createCollider([x, y]: Vec, [w, h]: Vec, pivot?: Vec) {
  const c = new PIXI.Graphics()

  c.beginFill(0xcccccc)
  c.drawRect(0, 0, w, h)
  c.endFill()

  const body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
  })

  physics.sync(c, body, pivot)

  return c
}
