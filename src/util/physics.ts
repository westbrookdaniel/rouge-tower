import * as PIXI from 'pixi.js'
import { Query, Body, Engine, World } from 'matter-js'
import { app } from '../main'
import { Vec } from '../types'

function hasAnchor(
  c: PIXI.Container
): c is PIXI.Container & { anchor: PIXI.ObservablePoint<any> } {
  return 'anchor' in c
}

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
   * The pivot needs to be set so the size/rotation happens from the center
   */
  sync(c: PIXI.Container, body: Body, pivot?: Vec) {
    if (pivot) {
      c.pivot.set(...pivot)
    } else if (hasAnchor(c)) {
      c.anchor.set(0.5)
    } else {
      c.pivot.set(c.width / 2, c.height / 2)
    }

    const sync = () => {
      c.x = body.position.x + c.width / 2
      c.y = body.position.y + c.height / 2

      c.rotation = body.angle
    }

    c.on('added', () => {
      app.ticker.add(sync)
      World.addBody(this.engine.world, body)
    })

    c.on('removed', () => {
      app.ticker.remove(sync)
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
