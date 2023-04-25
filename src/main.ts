import * as PIXI from 'pixi.js'
import './style.css'
import { ranVec } from './util'
import { createBall } from './ball'

export const app = new PIXI.Application<HTMLCanvasElement>({
  background: 'black',
  height: 800,
  width: 800,
})

// @ts-ignore
globalThis.__PIXI_APP__ = app

const root = document.querySelector<HTMLDivElement>('main')
if (!root) throw new Error('Root not found')
root.appendChild(app.view)

// -----------------------------------

const BALL_COUNT = 8

let balls: PIXI.Graphics[] = []

const scoreboard = new PIXI.Text('Score: 0', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xff1010,
  align: 'left',
})

scoreboard.x = 10
scoreboard.y = 10

let score = 0
let startTime = 0

function update() {
  const ballsLeft = balls.filter((ball) => !ball.destroyed)

  if (ballsLeft.length !== 0) {
    score = Math.round(
      (BALL_COUNT - ballsLeft.length) *
        (1000000 / (app.ticker.lastTime - startTime + 1))
    )
    scoreboard.text = `Score: ${score}`
  } else {
    const gameover = new PIXI.Text(`Score: ${score}`, {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xff1010,
      align: 'center',
    })

    gameover.x = app.screen.width / 2 - gameover.width / 2
    gameover.y = app.screen.height / 2 - gameover.height / 2

    app.stage.removeChild(scoreboard)
    app.stage.addChild(gameover)
  }
}

function startGame() {
  balls = new Array(BALL_COUNT).fill(null).map(() => {
    const pos = ranVec([0, 0], [app.screen.width, app.screen.height])
    const vel = ranVec([1, 1], [10, 10])
    return app.stage.addChild(createBall(30, pos, vel))
  })

  app.stage.addChild(scoreboard)

  app.ticker.add(update)
}

const menu = new PIXI.Text('Click all the balls to win\n\nClick to start', {
  fontFamily: 'Arial',
  fontSize: 48,
  fill: 0xff1010,
  align: 'center',
})

menu.x = app.screen.width / 2 - menu.width / 2
menu.y = app.screen.height / 2 - menu.height / 2

app.stage.addChild(menu)

menu.eventMode = 'dynamic'

menu.once('pointerdown', () => {
  app.stage.removeChild(menu)
  startTime = app.ticker.lastTime
  startGame()
})
