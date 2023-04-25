import * as PIXI from 'pixi.js'
import { createCollider } from './createCollider'
import { app } from '../main'
import { createPlayer } from './createPlayer'

const STAGE_WIDTH = 11

/**
 * Creates a stage from a string array
 */
export function createStage(stage: string[]) {
  if (stage.every((s) => s.length !== STAGE_WIDTH))
    throw new Error('Invaild stage width')

  const container = new PIXI.Container()

  const SIZE = app.view.width / STAGE_WIDTH

  const h = stage.length
  const w = stage[0].length

  stage.map((row, y) => {
    row.split('').forEach((char, x) => {
      // if (char === '+') {
      //   const spawner = createSpawner([x * GRID_SIZE, y * GRID_SIZE])
      //   return container.addChild(spawner)
      // }
      if (char === '=') {
        const floor = createCollider([x * SIZE, y * SIZE], [SIZE, SIZE])
        return container.addChild(floor)
      }
      if (char === '@') {
        const player = createPlayer([x * SIZE, y * SIZE], SIZE)
        return container.addChild(player)
      }
    })
  })

  app.stage.addChild(container)
}
