import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { Bodies } from 'matter-js'
import { physics } from '../main'

export function createCollider([x, y]: Vec, [w, h]: Vec) {
  const c = new PIXI.Graphics()

  c.beginFill(0xcccccc)
  c.drawRect(-w / 2, -w / 2, w, h)
  c.endFill()

  const body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
  })

  physics.sync(c, body)

  return c
}
