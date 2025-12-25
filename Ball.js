const vel = 0.025;
const inc = 0.0001;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.setup();
  }

  setup() {
    this.x = 50;
    this.y = 50;

    this.direction = { x: 0, y: 0 };

    while (
      Math.abs(this.direction.x) <= 0.3 ||
      Math.abs(this.direction.x) >= 0.8
    ) {
      this.theta = Math.random() * Math.PI * 2;
      this.direction = { x: Math.cos(this.theta), y: Math.sin(this.theta) };
    }

    this.velocity = vel;
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  update(delta, paddleLeftRect, paddleRightRect) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += inc;

    let rect = this.rect();

    if (rect.y <= 0 || rect.y >= window.innerHeight) this.direction.y *= -1;

    if (
      paddleLeftRect.right >= rect.left &&
      paddleLeftRect.top <= rect.bottom &&
      paddleLeftRect.bottom >= rect.top
    )
      this.direction.x *= -1;
    if (
      paddleRightRect.left <= rect.right &&
      paddleRightRect.top <= rect.bottom &&
      paddleRightRect.bottom >= rect.top
    )
      this.direction.x *= -1;
  }
}
