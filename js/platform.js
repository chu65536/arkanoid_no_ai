import { Entity } from "./entity.js";
import config from "./game_config.js";

export class Platform extends Entity {
  constructor() {
    const x = config.game.width / 2;
    const y = config.game.height - config.game.border;
    const sheet = PIXI.Assets.get("assets/sheets/platform.json");

    const sprite = new PIXI.AnimatedSprite(sheet.animations["platform"]);
    super(x, y, config.platform.width, config.platform.height, sprite);

    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 1 / 6;
    this.sprite.position.set(x, y);
    this.sprite.play();
  }
}
