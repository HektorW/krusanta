import Snowflake from './Snowflake'

export default class SnowManager {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.fillStyle = '#fff'

    this.snowflakes = []
    this.width = 0
    this.height = 0
    this.maxSnowflakes = 100
    this.rafId = null

    this.render = this.render.bind(this)
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
  }

  resize(width, height) {
    this.canvas.width = this.width = width
    this.canvas.height = this.height = height
    this.maxSnowflakes = Math.max(width / 12, 100)
  }

  start() {
    if (this.rafId !== null) {
      return
    }
    this.render(this.lastNow = performance.now())
  }

  pause() {
    cancelAnimationFrame(this.rafId)
    this.rafId = null
  }

  render(now) {
    this.rafId = requestAnimationFrame(this.render)

    const { ctx, lastNow, snowflakes, maxSnowflakes, width, height } = this
    const elapsed = now - lastNow
    
    if (snowflakes.length < maxSnowflakes) {
      snowflakes.push(new Snowflake(this))
    }

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fff'
    for (let i = 0; i < snowflakes.length; i++) {
      snowflakes[i].update(ctx, elapsed, now)
    }

    this.lastNow = now
  }
}