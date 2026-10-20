export class Entity {
  constructor(x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    if (this.sprite) {
      this.sprite.anchor.set(0.5);
      this.sprite.position.set(x, y);
    }

    this.destroyed = false;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.#updateSprite();
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.#updateSprite();
  }

  getSprite() {
    return this.sprite;
  }

  #updateSprite() {
    if (this.sprite) {
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }
}
