const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    ctx.beginPath();
    ctx.fillStyle="blue";
    if (state.inputs.isTouched) ctx.fillStyle="red";
    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();
  };

  // return the public api
  return api;
}());