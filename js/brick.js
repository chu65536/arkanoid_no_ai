import { Entity } from "./entity.js";
import config from "./game_config.js";

export class Brick extends Entity {
  static Type = Object.freeze({
    WHITE: "white",
    ORANGE: "orange",
    CYAN: "cyan",
    GREEN: "green",
    RED: "red",
    BLUE: "blue",
    PURPLE: "purple",
    YELLOW: "yellow",
    SILVER: "silver",
    GOLDEN: "golden",
    NONE: "none",
  });

  constructor(x, y, type) {
    let sprite = null;
    let animated = false;
    let hp = 1;
    let sheet;
    switch (type) {
      case Brick.Type.WHITE:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/white_brick.png"),
        );
        break;
      case Brick.Type.ORANGE:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/orange_brick.png"),
        );
        break;
      case Brick.Type.CYAN:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/cyan_brick.png"),
        );
        break;
      case Brick.Type.GREEN:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/green_brick.png"),
        );
        break;
      case Brick.Type.RED:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/red_brick.png"),
        );
        break;
      case Brick.Type.BLUE:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/blue_brick.png"),
        );
        break;
      case Brick.Type.PURPLE:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/purple_brick.png"),
        );
        break;
      case Brick.Type.YELLOW:
        sprite = new PIXI.Sprite(
          PIXI.Assets.get("assets/sprites/yellow_brick.png"),
        );
        break;
      case Brick.Type.SILVER:
        sheet = PIXI.Assets.get("assets/sheets/silver_brick.json");
        sprite = new PIXI.AnimatedSprite(sheet.animations["silver_brick"]);
        sprite.loop = false;
        sprite.animationSpeed = 1 / 6;

        animated = true;
        hp = 2;
        break;
      case Brick.Type.GOLDEN:
        sheet = PIXI.Assets.get("assets/sheets/golden_brick.json");
        sprite = new PIXI.AnimatedSprite(sheet.animations["golden_brick"]);
        sprite.loop = false;
        sprite.animationSpeed = 1 / 6;

        animated = true;
        hp = 2;
        break;
    }

    super(x, y, config.brick.width, config.brick.height, sprite);

    this.hp = hp;
    this.animated = animated;
  }

  collide() {
    this.hp--;
    if (this.hp == 0) {
      this.sprite.destroy();
      this.destroyed = true;
    } else if (this.animated) {
      this.sprite.play();
    }
  }
}
