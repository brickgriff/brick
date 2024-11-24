const World = (function (/*api*/) {
  var api = {};

  api.create = function (canvas) {
    var state = {
      canvas:canvas, // for resizing... anything else?
      //buffer:{}, // use the global game object?
      frame:0, // frame count
      zoom:5, // zoom factor (bigger is zoomed-in)
      pitch:1, // percent angle b/w 90deg and 0deg
      // player position
      //px:0,
      //py:0,
      speed:0.1,
      radius:5,
      length:0,
      angle:0,
      growth:0,
      growthRate:1,
      // center position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
      //minDim:0,
    };

    return state;
  };

  // update the state
  api.update = function (state, dt) {
    //console.log(`update(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);
    //console.log(`update(frame=${state.frame})`);
    //console.log("state:",state);
    state.frame++;

    //console.log(state.buffer.isResized);
     state.zoom=Math.min(5,Math.max(0.5,state.zoom+game.zoom));

    // if (game.isResized) {
    //   state.canvas.width=game.width;
    //   state.canvas.height=game.height;
    // }

    //state.minDim=Math.min(state.canvas.width,state.canvas.height);
    const list = game.buttons;
    if (list.includes("KeyE")||list.includes("KeyI")) {
      game.cy+=1;
    }
    if (list.includes("KeyD")||list.includes("KeyK")) {
      game.cy-=1;
    }
    if (list.includes("KeyS")||list.includes("KeyJ")) {
      game.cx+=1;
    }
    if (list.includes("KeyF")||list.includes("KeyL")) {
      game.cx-=1;
    }

    state.growth+=state.growthRate;

    // calculate movement vector
  };

  // return the public api
  return api;
}());