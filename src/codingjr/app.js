// Composition root for the game: builds the `app` object by assembling models, UI, and rendering extensions.
import { createAppShell } from "./codingjr.model.game.js";
import { createDirections } from "./codingjr.model.directions.js";
import { createBox } from "./codingjr.model.box.js";
import { createLightBox } from "./codingjr.model.lightbox.js";
import { createBotInstructions } from "./codingjr.model.bot.instructions.js";
import { createBot } from "./codingjr.model.bot.js";
import { createMap } from "./codingjr.model.map.js";
import { createMapState } from "./codingjr.model.map.state.js";
import { createMedals } from "./codingjr.model.medals.js";
import { createAchievements } from "./codingjr.model.achievements.js";

import { Projection } from "./codingjr.view.canvas.projection.js";
import { extendMapView } from "./codingjr.view.canvas.map.js";
import { extendBoxView } from "./codingjr.view.canvas.box.js";
import { createBotAnimations } from "./codingjr.view.canvas.bot.animations.js";
import { extendBotView } from "./codingjr.view.canvas.bot.js";
import { extendMedalsView } from "./codingjr.view.canvas.medals.js";
import { extendAchievementsView } from "./codingjr.view.canvas.achievements.js";

import { createUi } from "./codingjr.view.canvas.ui.js";
import { createEditor } from "./codingjr.view.canvas.ui.editor.js";
import { createDialogs } from "./codingjr.view.canvas.ui.dialogs.js";
import { createMedia } from "./codingjr.view.canvas.ui.media.js";

export function createApp() {
  var app = createAppShell();

  app.directions = createDirections();

  app.Box = createBox();
  app.LightBox = createLightBox({ Box: app.Box });

  // Bot depends on map access, and map creation calls back into bot.init(). We break the cycle with `getMap()`.
  var botInstructions = createBotInstructions();
  var map = null;

  app.bot = createBot({
    directions: app.directions,
    getMap: function () { return map; },
    instructions: botInstructions,
    LightBox: app.LightBox,
  });

  map = createMap({ bot: app.bot, Box: app.Box, LightBox: app.LightBox });
  map.state = createMapState({ map: map, LightBox: app.LightBox });
  app.map = map;

  // Progress/meta systems (stored in localStorage).
  app.medals = createMedals({ bot: app.bot, map: app.map });
  app.achievements = createAchievements({ bot: app.bot, map: app.map, medals: app.medals });

  // Rendering: projection + canvas drawing extensions + bot animation tables.
  app.Projection = Projection;
  extendBoxView({ app: app, Box: app.Box, LightBox: app.LightBox });
  extendMapView(app.map);

  app.bot.animations = createBotAnimations();
  extendBotView({
    app: app,
    bot: app.bot,
    map: app.map,
    animations: app.bot.animations,
    instructions: botInstructions,
  });

  // UI: dialogs/media/editor are plain objects; createUi() wires them together and exposes screen functions.
  var dialogs = createDialogs();
  var media = createMedia();
  var editor = createEditor({ map: app.map, instructions: botInstructions });

  app.ui = createUi({
    bot: app.bot,
    map: app.map,
    medals: app.medals,
    achievements: app.achievements,
    media: media,
    editor: editor,
    dialogs: dialogs,
    speed: {
      get: function () { return app.speedMultiplier; },
      set: function (v) { app.speedMultiplier = v; },
    },
  });

  extendMedalsView({
    medals: app.medals,
    map: app.map,
    bot: app.bot,
    dialogs: dialogs,
  });

  extendAchievementsView({
    achievements: app.achievements,
    dialogs: dialogs,
  });

  return app;
}
