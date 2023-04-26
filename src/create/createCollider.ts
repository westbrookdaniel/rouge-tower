import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { Bodies } from 'matter-js'
import { physics } from '../main'

export function createCollider([x, y]: Vec, [w, h]: Vec, pivot?: Vec) {
  const c = PIXI.TilingSprite.from('assets/brick.png', {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
    width: w,
    height: h,
    resolution: 0.25,
    wrapMode: PIXI.WRAP_MODES.MIRRORED_REPEAT,
  })

  c.x = x
  c.y = y

  const body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
  })

  physics.sync(c, body, pivot)

  return c
}
