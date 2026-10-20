import { KeyboardManager } from "./keyboard_manager.js";
import { Platform } from "./platform.js";
import { Ball } from "./ball.js";
import config from "./game_config.js";
import { CollisionManager } from "./collision_manager.js";
import { Entity } from "./entity.js";
import { LevelLoader } from "./level_loader.js";

(async () => {
  const app = new PIXI.Application();
  PIXI.TextureSource.defaultOptions.scaleMode = "nearest";
  await app.init({
    background: "#000000",
    width: config.game.width,
    height: config.game.height,
    autoDensity: true,
  });
  await PIXI.Assets.load([
    "assets/sheets/platform.json",
    "assets/sheets/silver_brick.json",
    "assets/sheets/golden_brick.json",

    "assets/sprites/background.png",
    "assets/sprites/ball.png",

    "assets/sprites/white_brick.png",
    "assets/sprites/yellow_brick.png",
    "assets/sprites/red_brick.png",
    "assets/sprites/blue_brick.png",
    "assets/sprites/cyan_brick.png",
    "assets/sprites/green_brick.png",
    "assets/sprites/orange_brick.png",
    "assets/sprites/purple_brick.png",
  ]);

  document.body.appendChild(app.canvas);

  const container = new PIXI.Container();
  app.stage.addChild(container);

  const background = new PIXI.Sprite(
    PIXI.Assets.get("assets/sprites/background.png"),
  );
  container.addChild(background);

  const platfrom = new Platform();
  container.addChild(platfrom.getSprite());

  const ball = new Ball();
  container.addChild(ball.getSprite());

  const scale = Math.min(
    window.innerHeight / config.game.height,
    window.innerWidth / config.game.width,
  );
  container.scale.set(scale);
  app.renderer.resize(window.innerWidth, window.innerHeight);

  const keyboardManager = new KeyboardManager();

  const topWall = new Entity(
    config.game.width / 2,
    config.game.border / 2,
    config.game.width,
    config.game.border,
    null,
  );
  const leftWall = new Entity(
    config.game.border / 2,
    config.game.height / 2,
    config.game.border,
    config.game.height,
    null,
  );
  const rightWall = new Entity(
    config.game.width - config.game.border / 2,
    config.game.height / 2,
    config.game.border,
    config.game.height,
    null,
  );
  const bricks = await LevelLoader.load();
  for (const brick of bricks) {
    console.log(brick);
    container.addChild(brick.getSprite());
  }
  const collideableEntities = [
    platfrom,
    topWall,
    leftWall,
    rightWall,
    ...bricks,
  ];

  app.ticker.add((time) => {
    if (
      keyboardManager.isPressed("ArrowLeft") &&
      CollisionManager.checkCollision(leftWall, platfrom) ==
        CollisionManager.CollisionSide.NONE
    ) {
      platfrom.move(-config.platform.speed, 0);
    }
    if (
      keyboardManager.isPressed("ArrowRight") &&
      CollisionManager.checkCollision(rightWall, platfrom) ==
        CollisionManager.CollisionSide.NONE
    ) {
      platfrom.move(config.platform.speed, 0);
    }

    ball.move(ball.dx, ball.dy);
    CollisionManager.checkForBallCollisions(ball, collideableEntities);
  });
})();
