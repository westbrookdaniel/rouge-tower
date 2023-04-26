import * as PIXI from 'pixi.js'
import { createCollider } from './createCollider'
import { app } from '../main'
import { createPlayer } from './createPlayer'
import { createSpawner } from './createSpawner'
import { createSlime } from './enemies/createSlime'

const STAGE_WIDTH = 11

/**
 * Creates a stage from a string array
 */
export function createStage(stage: string[]) {
  if (stage.every((s) => s.length !== STAGE_WIDTH))
    throw new Error('Invaild stage width')

  const container = new PIXI.Container()

  const SIZE = app.view.width / STAGE_WIDTH

  stage.map((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '+') {
        return container.addChild(
          createSpawner((pos) => createSlime(pos, SIZE), [x * SIZE, y * SIZE])
        )
      }
      if (char === '-') {
        const floor = createCollider(
          [x * SIZE, y * SIZE - SIZE / 4],
          [SIZE, SIZE / 2],
          [SIZE / 2, 0]
        )
        return container.addChild(floor)
      }
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

  // right wall
  container.addChild(
    createCollider(
      // width, height (origin is top left)
      [STAGE_WIDTH * SIZE, (STAGE_WIDTH * SIZE) / 2 - SIZE / 2],
      // x, y
      [SIZE, STAGE_WIDTH * SIZE],
      // offset (origin is center)
      [SIZE / 2, STAGE_WIDTH * SIZE]
    )
  )

  // left wall
  container.addChild(
    createCollider(
      [-SIZE, (STAGE_WIDTH * SIZE) / 2 - SIZE / 2],
      [SIZE, STAGE_WIDTH * SIZE],
      [SIZE / 2, STAGE_WIDTH * SIZE]
    )
  )

  // top wall
  container.addChild(
    createCollider(
      [(STAGE_WIDTH * SIZE) / 2, -SIZE],
      [STAGE_WIDTH * SIZE, SIZE],
      [STAGE_WIDTH * SIZE, SIZE / 2]
    )
  )

  app.stage.addChild(container)
}
