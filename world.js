const World = (function (/*api*/) {
  var api = {};

  api.create = function (canvas) {
    var state = {
      canvas:canvas,
      buffer:{},
      frame:0,
      zoom:1,
      // player position
      px:0,
      py:0,
      radius:25, // rot
      length:0, // sca
      angle:0, // tra
      // camera position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
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
    //state.zoom=state.zoom+state.buffer.zoom;//Math.min(50,Math.max(0,state.zoom+state.buffer.zoom));

    if (state.buffer.isResized) {
      state.canvas.width=state.buffer.width;
      state.canvas.height=state.buffer.height;
    }
  };

  // return the public api
  return api;
}());