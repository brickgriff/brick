const World = (function (/*api*/) {
  var api = {};

  api.create = function (canvas) {
    var state = {};

    return state;
  };

  // update the state
  api.update = function (state, dt) {
    //console.log(`update(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);
  };


  // return the public api
  return api;
}());