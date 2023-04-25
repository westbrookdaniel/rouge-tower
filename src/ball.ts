import * as PIXI from 'pixi.js'
import { Vec } from './util'
import { app } from './main'

export function createBall(r: number, [x, y]: Vec, vel: Vec) {
  const c = new PIXI.Graphics()

  c.beginFill(0xffffff)
  c.drawCircle(r, r, r)
  c.endFill()

  c.x = x
  c.y = y

  function update(d: number) {
    c.x += vel[0] * d
    c.y += vel[1] * d

    if (c.x + c.width > app.screen.width || c.x < 0) {
      vel[0] *= -1
      c.x = Math.max(0, Math.min(app.screen.width - c.width, c.x))
    }

    if (c.y + c.width > app.screen.height || c.y < 0) {
      vel[1] *= -1
      c.y = Math.max(0, Math.min(app.screen.height - c.width, c.y))
    }
  }

  c.eventMode = 'dynamic'

  c.on('pointerdown', () => {
    c.destroy()
  })

  app.ticker.add(update)
  c.on('destroyed', () => {
    app.ticker.remove(update)
  })

  return c
}
