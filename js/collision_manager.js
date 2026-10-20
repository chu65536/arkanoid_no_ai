import { Platform } from "./platform.js";
import { Brick } from "./brick.js";

export class CollisionManager {
  static CollisionSide = Object.freeze({
    NONE: -1,
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3,
  });

  static checkCollision(entity_1, entity_2) {
    const { x1, y1, x2, y2 } = this.#getBounds(entity_1);
    const { x1: x3, y1: y3, x2: x4, y2: y4 } = this.#getBounds(entity_2);

    const cx1 = (x1 + x2) / 2;
    const cy1 = (y1 + y2) / 2;
    const cx2 = (x3 + x4) / 2;
    const cy2 = (y3 + y4) / 2;
    const dist_x = cx1 - cx2;
    const dist_y = cy1 - cy2;
    const halfW = (entity_1.w + entity_2.w) / 2;
    const halfH = (entity_1.h + entity_2.h) / 2;
    const overlapX = halfW - Math.abs(dist_x);
    const overlapY = halfH - Math.abs(dist_y);

    if (overlapX <= 0 || overlapY <= 0) {
      return this.CollisionSide.NONE;
    }
    if (overlapX < overlapY) {
      return dist_x > 0 ? this.CollisionSide.LEFT : this.CollisionSide.RIGHT;
    } else {
      return dist_y > 0 ? this.CollisionSide.TOP : this.CollisionSide.BOTTOM;
    }
  }

  static checkForBallCollisions(ball, entities) {
    for (const entity of entities) {
      const collisionSide = this.checkCollision(ball, entity);
      if (entity.destroyed || collisionSide == this.CollisionSide.NONE)
        continue;
      this.#stuckProtection(ball, entity, collisionSide);
      switch (entity.constructor) {
        case Platform:
          const hitPos = (ball.x - entity.x) / (entity.w / 2);
          const clampedHitPos = Math.max(-1, Math.min(1, hitPos));
          const maxAngle = Math.PI / 3;
          const angle = clampedHitPos * maxAngle;
          const speed = Math.hypot(ball.dx, ball.dy);
          ball.dx = speed * Math.sin(angle);
          ball.dy = -speed * Math.cos(angle);
          break;
        case Brick:
          entity.collide();
          this.#changeBallDirection(ball, collisionSide);
          break;
        default:
          this.#changeBallDirection(ball, collisionSide);
          break;
      }
    }

    entities = entities.filter((entity) => !entity.destroyed);
  }

  static #stuckProtection(ball, entity, side) {
    const { x1, y1, x2, y2 } = this.#getBounds(entity);

    // sifting one pixel away from collided object to prevent loops
    switch (side) {
      case CollisionManager.CollisionSide.TOP:
        ball.moveTo(ball.x, y2 + ball.h / 2 + 1);
        break;
      case CollisionManager.CollisionSide.BOTTOM:
        ball.moveTo(ball.x, y1 - ball.h / 2 - 1);
        break;
      case CollisionManager.CollisionSide.LEFT:
        ball.moveTo(x2 + ball.w / 2 + 1, ball.y);
        break;
      case CollisionManager.CollisionSide.RIGHT:
        ball.moveTo(x1 - ball.w / 2 - 1, ball.y);
        break;
    }
  }

  static #getBounds(entity) {
    const x1 = entity.x - entity.w / 2;
    const x2 = entity.x + entity.w / 2;
    const y1 = entity.y - entity.h / 2;
    const y2 = entity.y + entity.h / 2;

    return { x1, y1, x2, y2 };
  }

  static #changeBallDirection(ball, collisionSide) {
    switch (collisionSide) {
      case CollisionManager.CollisionSide.BOTTOM:
      case CollisionManager.CollisionSide.TOP:
        ball.dy *= -1;
        break;
      case CollisionManager.CollisionSide.LEFT:
      case CollisionManager.CollisionSide.RIGHT:
        ball.dx *= -1;
        break;
    }
  }
}
