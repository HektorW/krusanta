const rand = (min, max) => min + Math.random() * (max - min)

export default class Snowflake {
  constructor(manager) {
    this.manager = manager
    this.spawn()
  }

  spawn(anyY = false) {
    const { width, height } = this.manager
    this.x = rand(0, width)
    this.y = anyY === true
      ? rand(-50, height + 50)
      : rand(-50, -10)
    this.xVel = rand(-.05, .05)
    this.yVel = rand(.02, .1)
    this.size = rand(7, 12)
    this.sizeOsc = rand(.01, .5)
  }

  update(ctx, elapsed) {
    const { width, height } = this.manager
    const xForce = rand(-.001, .001)

    if (Math.abs(this.xVel + xForce) < .075) {
      this.xVel += xForce
    }

    this.x += this.xVel * elapsed
    this.y += this.yVel * elapsed

    if (
      this.y - this.size > height ||
      this.x + this.size < 0 ||
      this.x - this.size > width
    ) {
      this.spawn()
    }

    this.render(ctx)
  }

  render(ctx) {
    ctx.save()
    const { x, y, size } = this
    ctx.beginPath()
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
  }
}