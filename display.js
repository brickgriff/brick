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

    const gray0="#101010"; // shadow
    const gray1="#202020"; // background
    const gray2="#404040"; // inactive
    const gray3="#808080"; // player
    const gray4="#c0c0c0"; // active
    const gray5="#e0e0e0"; // light

    const green="#00b000";

    ctx.beginPath();
    ctx.fillStyle=gray1;
    if (state.buffer && state.buffer.isTouched) ctx.fillStyle="red";
    if (state.buffer && state.buffer.isLooked) ctx.fillStyle="green";
    if (state.buffer && state.buffer.isReset) ctx.fillStyle="blue";

    //console.log(state.buffer);
    //if (state.buffer && state.buffer.zoom > 0) ctx.fillStyle="black";
    //if (state.buffer && state.buffer.zoom < 0) ctx.fillStyle="white";

    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();

    ctx.translate(cx,cy);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=gray3;
    //ctx.shadowOffsetX=5;
    //ctx.shadowOffsetY=5;
    //ctx.shadowColor=gray0;
    //ctx.strokeStyle="#050505";
    const r = state.radius;//*state.zoom;//Math.min(500,Math.max(1,state.radius*state.zoom));
    ctx.lineWidth=r/5;
    //console.log(state.radius,state.zoom);
    ctx.arc(0,0,r,0,2*Math.PI);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.fillStyle=gray0;
    ctx.moveTo(200+r,200);
    ctx.arc(200,200,r,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle=gray2;
    ctx.moveTo(r,200);
    ctx.arc(0,200,r,0,2*Math.PI);
    ctx.fill();

    //ctx.save();
    ctx.beginPath();
    //ctx.fillStyle="rgb(0,128,0,0.5)";
    ctx.strokeStyle=green;
    ctx.lineWidth=2;
    ctx.moveTo(r,250);
    //ctx.shadowColor="#00c000";
    //ctx.shadowBlur=50;
    ctx.arc(0,250,r,0,2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    //ctx.restore();

    ctx.beginPath();
    ctx.fillStyle=gray4;
    ctx.moveTo(-200+r,200);
    ctx.arc(-200,200,r,0,2*Math.PI);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    //ctx.lineWidth=5; // grass length
    ctx.strokeStyle=green;
    //ctx.shadowOffsetX=5;
    //ctx.shadowOffsetY=5;
    //ctx.shadowColor=gray0;
    ctx.setLineDash([1,5]);
    let r1=ctx.lineWidth=5; // grass size
    let x=-100,y=-195;//,h=ctx.lineWidth;
    ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.stroke();
    //ctx.fill();
    //ctx.lineTo(x,y-h);
    x=-118,y=-212;
    r1=ctx.lineWidth=7;
    //ctx.beginPath();
    //ctx.strokeStyle=gray4;
    //ctx.lineWidth=10;
    ctx.moveTo(x+r1,y);
    ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.stroke();
    //ctx.fill();
    //ctx.lineTo(x,y-h);
    x=-85,y=-220;
    r1=ctx.lineWidth=10;
    //ctx.beginPath();
    //ctx.strokeStyle=gray2;
    //ctx.lineWidth=15;
    ctx.moveTo(x+r1,y);
    ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.fill();
    //ctx.moveTo(x,y);
    //ctx.lineTo(x,y-h);
    ctx.stroke();
    ctx.restore();

    // draw clover

    // draw roses

    // draw mint/plantago

    // draw aster/umbel

    // draw ivy/bindweed

    // draw purslane

    // draw pokeweed/pigweed/burdock

    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.strokeStyle=gray0;
    ctx.moveTo(-100+r1,-300);
    ctx.arc(-100,-300,r1,0,2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    //ctx.lineWidth=1;
    ctx.strokeStyle=gray2;
    ctx.moveTo(-100+r1,-350);
    ctx.arc(-100,-350,r1,0,2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    //ctx.lineWidth=1;
    ctx.strokeStyle=gray4;
    ctx.moveTo(-100+r1,-400);
    ctx.arc(-100,-400,r1,0,2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    //ctx.lineWidth=1;
    ctx.strokeStyle=gray5;
    ctx.moveTo(-100+r1,-450);
    ctx.arc(-100,-450,r1,0,2*Math.PI);
    //ctx.fill();
    ctx.stroke();

  };

  // return the public api
  return api;
}());