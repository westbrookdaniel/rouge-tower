import * as PIXI from 'pixi.js'
import { Query, Body, Engine, World } from 'matter-js'
import { app } from '../main'

export class Physics {
  engine = Engine.create({
    gravity: {
      scale: 1,
    },
  })

  constructor() {
    app.ticker.add((d) => {
      Engine.update(this.engine, d)
    })
  }

  /**
   * Syncs a PIXI.Container with a Matter.Body
   * It will be added / and removed from the world automatically
   *
   * Also has bonus optimization for static bodies
   */
  sync(c: PIXI.Container, body: Body) {
    const sync = () => {
      c.x = body.position.x
      c.y = body.position.y
      c.rotation = body.angle
    }

    c.on('added', () => {
      if (!body.isStatic) app.ticker.add(sync)
      World.addBody(this.engine.world, body)
    })

    c.on('removed', () => {
      if (!body.isStatic) app.ticker.remove(sync)
      World.remove(this.engine.world, body)
    })
  }

  /**
   * Gives you all the bodies that are colliding with the given body
   */
  collides(body: Body) {
    const otherBodies = this.engine.world.bodies.filter((b) => b !== body)
    return Query.collides(body, otherBodies)
  }
}
