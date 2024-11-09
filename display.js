const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    ctx.beginPath();
    ctx.fillStyle="gray";
    if (state.controls && state.controls.isTouched) ctx.fillStyle="red";
    if (state.controls && state.controls.isLooked) ctx.fillStyle="green";
    if (state.controls && state.controls.isReset) ctx.fillStyle="blue";
    if (state.controls && state.controls.mouse.zoom > 0) ctx.fillStyle="black";
    if (state.controls && state.controls.mouse.zoom < 0) ctx.fillStyle="white";
    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();
  };

  // return the public api
  return api;
}());