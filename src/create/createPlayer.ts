import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { app, keys, physics } from '../main'
import { Bodies } from 'matter-js'

export function createPlayer([x, y]: Vec, size: number) {
  const c = PIXI.Sprite.from('assets/player.png', {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  })

  c.x = x
  c.y = y
  c.width = size
  c.height = size
  c.anchor.set(0.5)

  const body = Bodies.rectangle(x, y, size, size)
  body.frictionAir = 1
  body.friction = 0.1
  body.restitution = 0.1
  body.inertia = Infinity
  body.inverseInertia = 0
  body.mass = 1

  physics.sync(c, body)

  const vel = 1
  const jumpForce = -25

  let jumps = 2
  let lastJump = 0

  app.ticker.add(() => {
    // left right movement
    if (keys.isDown(['ArrowLeft', 'a', 'A'])) {
      body.force.x = -vel

      // when moving left flip the sprite
      c.scale.x = -Math.abs(c.scale.x)
    } else {
      c.scale.x = Math.abs(c.scale.x)
    }

    if (keys.isDown(['ArrowRight', 'd', 'D'])) {
      body.force.x = vel
    }

    // on colliding with something set isGrounded to true
    const collisions = physics.collides(body)
    if (collisions.length > 0) {
      jumps = 2
    }

    // up jump (can only jump if on ground)
    if (
      keys.isDown(['ArrowUp', 'w', 'W']) &&
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
