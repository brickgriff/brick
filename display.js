const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    ctx.reset();
    const cx=state.canvas.width/2,cy=state.canvas.height/2;
    //ctx.translate(cx,cy);
    //ctx.clearRect(-cx,-cy,state.canvas.width,state.canvas.height);
    //ctx.scale(state.zoom,state.zoom);
    //state.zoom=1;

    ctx.beginPath();
    ctx.fillStyle="gray";
    if (state.buffer && state.buffer.isTouched) ctx.fillStyle="red";
    if (state.buffer && state.buffer.isLooked) ctx.fillStyle="green";
    if (state.buffer && state.buffer.isReset) ctx.fillStyle="blue";

    //console.log(state.buffer);
    //if (state.buffer && state.buffer.zoom > 0) ctx.fillStyle="black";
    //if (state.buffer && state.buffer.zoom < 0) ctx.fillStyle="white";

    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();

    ctx.beginPath();
    ctx.translate(cx,cy);
    ctx.fillStyle="lightgray";
    ctx.strokeStyle="dimgray";
    const r = state.radius;//*state.zoom;//Math.min(500,Math.max(1,state.radius*state.zoom));
    ctx.lineWidth=r/5;
    //console.log(state.radius,state.zoom);
    ctx.arc(0,0,r,0,2*Math.PI);
    ctx.moveTo(200+r,200);
    ctx.arc(200,200,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  // return the public api
  return api;
}());