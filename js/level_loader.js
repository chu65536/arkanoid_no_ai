import config from "./game_config.js";
import { Brick } from "./brick.js";

export class LevelLoader {
  static SymbolToType = {
    E: Brick.Type.NONE,
    W: Brick.Type.WHITE,
    O: Brick.Type.ORANGE,
    C: Brick.Type.CYAN,
    G: Brick.Type.GREEN,
    R: Brick.Type.RED,
    B: Brick.Type.BLUE,
    P: Brick.Type.PURPLE,
    Y: Brick.Type.YELLOW,
    S: Brick.Type.SILVER,
    g: Brick.Type.GOLDEN,
  };
  static async load() {
    const res = await fetch("./level.json");
    const data = await res.json();
    let i = 0,
      j = 0;
    let bricks = [];
    for (const row of data.level) {
      for (const elem of row) {
        const brick_type = LevelLoader.SymbolToType[elem] || Brick.Type.NONE;
        if (brick_type == Brick.Type.NONE) continue;

        const x =
          config.game.border + config.brick.width / 2 + j * config.brick.width;
        const y =
          config.game.border +
          config.brick.height / 2 +
          i * config.brick.height;
        bricks.push(new Brick(x, y, brick_type));

        j++;
      }
      j = 0;
      i++;
    }
    return bricks;
  }
}
