export class Keys {
  keyMap: Map<string, boolean>
  constructor() {
    this.keyMap = new Map()

    window.addEventListener('keydown', (e) => {
      this.keyMap.set(e.key, true)
    })

    window.addEventListener('keyup', (e) => {
      this.keyMap.set(e.key, false)
    })
  }

  isDown(key: string[]) {
    return key.some((k) => this.keyMap.get(k))
  }

  isUp(key: string[]) {
    return key.some((k) => !this.keyMap.get(k))
  }
}
