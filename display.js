const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    
    ctx.beginPath();
    ctx.fillStyle="gray";
    if (state.buffer && state.buffer.isTouched) ctx.fillStyle="red";
    if (state.buffer && state.buffer.isLooked) ctx.fillStyle="green";
    if (state.buffer && state.buffer.isReset) ctx.fillStyle="blue";

    //console.log(state.buffer.zoom);
    //if (state.buffer && state.buffer.zoom > 0) ctx.fillStyle="black";
    //if (state.buffer && state.buffer.zoom < 0) ctx.fillStyle="white";

    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();


    ctx.beginPath();
    ctx.fillStyle="lightgray";
    ctx.strokeStyle="dimgray";
    const r = Math.min(500,Math.max(1,state.radius*state.zoom));
    ctx.lineWidth=r/5;
    console.log(state.radius,state.zoom);
    ctx.arc(state.canvas.width/2,state.canvas.height/2,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

  };

  // return the public api
  return api;
}());