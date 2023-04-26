import * as PIXI from 'pixi.js'
import { Vec } from '../../types'
import { app, keys, physics } from '../../main'
import { Bodies } from 'matter-js'
import { random } from '../../util/random'

export function createSlime([x, y]: Vec, size: number) {
  const c = PIXI.Sprite.from('assets/slime.png', {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  })

  c.x = x
  c.y = y
  c.width = size
  c.height = size

  const body = Bodies.rectangle(x, y, size, size)
  body.frictionAir = 3
  body.friction = 0.1
  body.restitution = 0.1
  body.inertia = Infinity
  body.inverseInertia = 0
  body.mass = 1

  physics.sync(c, body)

  const vel = 1
  const jumpForce = -25

  let jumps = 1
  let lastJump = 0

  app.ticker.add(() => {
    // if (keys.isDown(['ArrowLeft', 'a', 'A'])) {
    //   body.force.x = -vel

    //   // when moving left flip the sprite
    //   c.scale.x = -Math.abs(c.scale.x)
    // } else {
    //   c.scale.x = Math.abs(c.scale.x)
    // }

    // if (keys.isDown(['ArrowRight', 'd', 'D'])) {
    body.force.x = vel
    // }

    // on colliding with something set isGrounded to true
    const collisions = physics.collides(body)
    if (collisions.length > 0) {
      jumps = 2
    }

    // up jump (can only jump if on ground)
    if (
      random(0, 100) < 1 && // 1% chance of jumping
      jumps > 0 &&
      app.ticker.lastTime - lastJump > 200
    ) {
      body.force.y = jumpForce
      jumps -= 1
      lastJump = app.ticker.lastTime
    }
  })

  return c
}
