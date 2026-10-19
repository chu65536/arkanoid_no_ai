import { KeyboardManager } from "./keyboard_manager.js";
import { Platform } from "./platform.js";
import config from "./game_config.js";

(async () => {
  const app = new PIXI.Application();
  PIXI.TextureSource.defaultOptions.scaleMode = "nearest";
  await app.init({
    background: "#000000",
    width: config.game.width,
    height: config.game.height,
    autoDensity: true,
  });
  await PIXI.Assets.load(["assets/sheets/platform.json"]);

  document.body.appendChild(app.canvas);

  const container = new PIXI.Container();
  app.stage.addChild(container);

  const backgroundSprite = await PIXI.Assets.load(
    "assets/sprites/background.png",
  );
  const background = new PIXI.Sprite(backgroundSprite);
  container.addChild(background);

  const platfrom = new Platform();
  container.addChild(platfrom.getSprite());

  const scale = Math.min(
    window.innerHeight / config.game.height,
    window.innerWidth / config.game.width,
  );
  container.scale.set(scale);
  app.renderer.resize(window.innerWidth, window.innerHeight);

  const keyboardManager = new KeyboardManager();
  // Listen for animate update
  app.ticker.add((time) => {
    if (keyboardManager.isPressed("ArrowLeft")) {
      platfrom.move(-config.platform.speed, 0);
    }
    if (keyboardManager.isPressed("ArrowRight")) {
      platfrom.move(config.platform.speed, 0);
    }
  });
})();
