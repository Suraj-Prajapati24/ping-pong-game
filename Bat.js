const speed = 0.02;

export default class Bat {
  constructor(batElem) {
    this.batElem = batElem;
    this.reset();
  }

  reset() {
    this.pos = 50;
  }

  rect() {
    return this.batElem.getBoundingClientRect();
  }

  get pos() {
    return parseFloat(
      getComputedStyle(this.batElem).getPropertyValue("--position")
    );
  }

  set pos(value) {
    this.batElem.style.setProperty("--position", value);
  }

  update(delta, ballHeight) {
    this.pos += speed * delta * (ballHeight - this.pos);
  }
}
