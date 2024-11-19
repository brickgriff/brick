const World = (function (/*api*/) {
  var api = {};

  api.create = function (canvas) {
    var state = {
      canvas:canvas,
      buffer:{},
      frame:0,
      zoom:5,
      pitch:1,
      // player position
      px:0,
      py:0,
      speed:0.2,
      radius:5, // rot
      length:0, // sca
      angle:0, // tra
      // camera position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
      minDim:0,
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
    state.zoom=Math.min(5,Math.max(0.5,state.zoom+state.buffer.zoom));

    if (state.buffer.isResized) {
      state.canvas.width=state.buffer.width;
      state.canvas.height=state.buffer.height;
    }

    state.minDim=Math.min(state.canvas.width,state.canvas.height);

    // WASD
    if (state.buffer.buttons.includes("KeyE")||state.buffer.buttons.includes("KeyI")) {
      state.py+=state.speed;
    }
    if (state.buffer.buttons.includes("KeyD")||state.buffer.buttons.includes("KeyK")) {
      state.py-=state.speed;
    }
    if (state.buffer.buttons.includes("KeyS")||state.buffer.buttons.includes("KeyJ")) {
      state.px+=state.speed;
    }
    if (state.buffer.buttons.includes("KeyF")||state.buffer.buttons.includes("KeyL")) {
      state.px-=state.speed;
    }

    // calculate movement vector
  };

  // return the public api
  return api;
}());