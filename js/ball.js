import config from "./game_config.js";
import { Entity } from "./entity.js";

export class Ball extends Entity {
  constructor() {
    const x = config.game.width / 2;
    const y =
      config.game.height -
      config.game.border -
      config.platform.height / 2 -
      config.ball.height / 2;

    const sprite = new PIXI.Sprite(PIXI.Assets.get("assets/sprites/ball.png"));
    super(x, y, config.ball.width, config.ball.height, sprite);

    this.dx = 0;
    this.dy = -1;
  }
  
}
