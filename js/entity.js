export class Entity {
  constructor(x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}
