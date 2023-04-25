import * as PIXI from 'pixi.js'
import './style.css'
import { createStage } from './create/createStage'
import { Keys } from './util/keys'
import { Physics } from './util/physics'

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

export const keys = new Keys()
export const physics = new Physics()

createStage([
  '           ',
  '           ',
  '+         +',
  '=---   ---=',
  '           ',
  '     @     ',
  '   -----   ',
  '           ',
  '           ',
  '====   ====',
  '====   ====',
])
