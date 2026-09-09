// Canvas renderer + main simulation tick (60fps); drives `app.step()` and `app.draw()`.
export function canvasView(app, canvas) {
  var game = app;
  // set the rendering context
  game.ctx = canvas.getContext('2d');

  // refresh rate and rendering loop
  var fps = 60;
  var fpsDelay = 1000 / fps;
  var renderTimer = null;

  // distance between lowest point in the map and the bottom edge
  var offsetY = 100;

  // create projection
  game.projection = new game.Projection(canvas.height, canvas.width / 2, offsetY);

  // create canvas background pattern
  var bg = null;

  var tmp = new Image();
  tmp.src = 'img/pattern.png';
  tmp.onload = function() {
    bg = game.ctx.createPattern(tmp, 'repeat');
  };

  function update() {
    // check if we can execute the next bot instruction here?
    if (game.bot.isInExecutionMode() && game.bot.isReadyForNextInstruction() && game.bot.hasNextInstruction()) {
      var oldPos = Object.assign({}, game.bot.currentPos); // copy old position
      var instruction = game.bot.executeNextInstruction(); // execute the next instruction
      var newPos = game.bot.currentPos; // get the new position
      game.bot.animate(instruction, oldPos, newPos);
    }
    // check if map has been completed here
    if (game.map.ready() && game.map.state.allLightsOn()) {

      // stop the bot
      game.bot.clearExecutionQueue();

      // award medals
      var medal = game.medals.awardMedal();
      game.medals.display(medal); // show medal dialog

      // award achievements
      var achievements = game.achievements.awardAchievements();
      game.achievements.display(achievements);

      // set the map as complete
      game.map.complete();

      // return to map selection screen
    }
    game.step();
    game.draw();
  }

  function step() {
    game.bot.step();
    game.map.step();
  }

  function draw() {
    //clear main canvas
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    game.ctx.fillStyle = bg;
    game.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the map and the bot in the correct order
    switch (game.bot.direction) {
      case game.directions.se:
        for (var i = game.map.getLevelSize().x - 1; i >= 0; i--) {
          for (var j = game.map.getLevelSize().y - 1; j >= 0; j--) {
            game.map.getMapRef()[i][j].draw();
            if (game.bot.currentPos.x === i && game.bot.currentPos.y === j) {
              game.bot.draw();
            }
          }
        }
        break;
      case game.directions.nw:
        for (i = game.map.getLevelSize().x - 1; i >= 0; i--) {
          for (j = game.map.getLevelSize().y - 1; j >= 0; j--) {
            game.map.getMapRef()[i][j].draw();
            switch (game.bot.getAnimation().name) {
              case game.bot.animations.jumpUp.name:
              case game.bot.animations.jumpDown.name:
                if (game.bot.getMovement().dZ !== 0 && game.bot.getCurrentStep() / game.bot.getAnimation().duration <= 0.5) {
                  if (game.bot.currentPos.x === i && game.bot.currentPos.y === j+1) {
                    game.bot.draw();
                  }
                } else {
                  if (game.bot.currentPos.x === i && game.bot.currentPos.y === j) {
                    game.bot.draw();
                  }
                }
                break;
              case game.bot.animations.walk.name:
                if (game.bot.getMovement().dZ !== 0 && game.bot.currentPos.x === i && game.bot.currentPos.y === j+1) {
                  game.bot.draw();
                } else if (game.bot.currentPos.x === i && game.bot.currentPos.y === j) {
                  game.bot.draw();
                }
                break;
              default:
                if (game.bot.currentPos.x === i && game.bot.currentPos.y === j) {
                  game.bot.draw();
                }
                break;
            }
          }
        }
        break;
      case game.directions.ne:
        for (i = game.map.getLevelSize().y - 1; i >= 0; i--) {
          for (j = game.map.getLevelSize().x - 1; j >= 0; j--) {
            game.map.getMapRef()[j][i].draw();
            switch (game.bot.getAnimation().name) {
              case game.bot.animations.jumpUp.name:
              case game.bot.animations.jumpDown.name:
                if (game.bot.getMovement().dX !== 0 && game.bot.getCurrentStep() / game.bot.getAnimation().duration <= 0.5) {
                  if (game.bot.currentPos.x === j+1 && game.bot.currentPos.y === i) {
                    game.bot.draw();
                  }
                } else {
                  if (game.bot.currentPos.x === j && game.bot.currentPos.y === i) {
                    game.bot.draw();
                  }
                }
                break;
              case game.bot.animations.walk.name:
                if (game.bot.getMovement().dX !== 0 && game.bot.currentPos.x === j+1 && game.bot.currentPos.y === i) {
                  game.bot.draw();
                } else if (game.bot.currentPos.x === j && game.bot.currentPos.y === i) {
                  game.bot.draw();
                }
                break;
              default:
                if (game.bot.currentPos.x === j && game.bot.currentPos.y === i) {
                  game.bot.draw();
                }
                break;
            }
          }
        }
        break;
      case game.directions.sw:
        for (i = game.map.getLevelSize().y - 1; i >= 0; i--) {
          for (j = game.map.getLevelSize().x - 1; j >= 0; j--) {
            game.map.getMapRef()[j][i].draw();
            if (game.bot.currentPos.x === j && game.bot.currentPos.y === i) {
              game.bot.draw();
            }
          }
        }
        break;
      default:
        console.error('canvasView draw: unknown direction "' + game.bot.direction + '"');
        break;
    }

  }


  game.step = step;
  game.draw = draw;

  function stop() {
    if (renderTimer == null) return;
    window.clearInterval(renderTimer);
    renderTimer = null;
  }

  function start() {
    if (renderTimer != null) return;
    renderTimer = window.setInterval(update, fpsDelay);
  }

  return {
    stop: stop,
    start: start
  };
};
