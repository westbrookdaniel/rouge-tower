import * as PIXI from 'pixi.js'
import { Vec } from '../types'
import { app, keys, physics } from '../main'
import { Bodies } from 'matter-js'

export function createPlayer([x, y]: Vec, size: number) {
  const c = PIXI.Sprite.from('assets/player.png', {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  })

  const body = Bodies.rectangle(x, y, size, size)
  body.frictionAir = 1
  body.friction = 0.1
  body.restitution = 0.1
  body.inertia = Infinity
  body.mass = 1

  physics.sync(c, body)

  c.x = x
  c.y = y
  c.width = size
  c.height = size

  const vel = 1
  const jumpForce = -40

  let isGrounded = true

  app.ticker.add(() => {
    if (keys.isDown(['ArrowLeft', 'a', 'A'])) {
      body.force.x = -vel
    }
    if (keys.isDown(['ArrowRight', 'd', 'D'])) {
      body.force.x = vel
    }

    // on colliding with something set isGrounded to true
    const collisions = physics.collides(body)
    if (collisions.length > 0) {
      isGrounded = true
    }

    // up jump (can only jump if on ground)
    if (
      keys.isDown(['ArrowUp', 'w', 'W']) &&
      body.velocity.y < 10 &&
      isGrounded
    ) {
      body.force.y = jumpForce
      isGrounded = false
    }
  })

  return c
}
