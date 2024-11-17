const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    ctx.reset();
    const cx=state.canvas.width/2,cy=state.canvas.height/2;
    //ctx.translate(cx,cy);
    //ctx.clearRect(0,0,state.canvas.width,state.canvas.height);
    //ctx.scale(state.zoom,state.zoom);
    //state.zoom=1;

    const gray0="#111111"; // shadow
    const gray1="#222222"; // background
    const gray2="#444444"; // inactive
    const gray3="#888888"; // player
    const gray4="#cccccc"; // active
    const gray5="#eeeeee"; // light

    const green="#00cc00";

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
    const r = state.radius*state.minDim/100;//*state.zoom;//Math.min(500,Math.max(1,state.radius*state.zoom));
    ctx.lineWidth=r/5;
    //console.log(state.radius,state.zoom);
    ctx.arc(0,0,r,0,2*Math.PI);
    ctx.fill();
    //ctx.moveTo(state.minDim/2,0);
    ctx.beginPath();
    ctx.strokeStyle=gray5;
    ctx.lineWidth=1;
    ctx.arc(0,0,state.minDim/2,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.fillStyle=gray0;
    ctx.moveTo(0.25*state.minDim+r,0.25*state.minDim);
    ctx.arc(0.25*state.minDim,0.25*state.minDim,r,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle=gray2;
    ctx.moveTo(r,0.25*state.minDim);
    ctx.arc(0,0.25*state.minDim,r,0,2*Math.PI);
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

    const fill="fill",stroke="stroke";
    const drawCircle=(args) => ((x,y,r,c,f) => {
      ctx.beginPath();
      f===fill?ctx.fillStyle=c:ctx.strokeStyle=c;
      circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);
      ctx[f]();
    })(...args);

    argsList=[
      [-15,-25,1,green,stroke],
      [-17,-26,1,green,stroke],
      [-16,-28,1,green,stroke],
      [-10,-30,1,gray0,stroke],
      [-10,-35,1,gray2,stroke],
      [-10,-40,1,gray4,stroke],
      [-10,-45,1,gray5,stroke],
    ];
    argsList.forEach(drawCircle);

    //ctx.beginPath();
    //ctx.lineWidth=5; // grass length
    //ctx.strokeStyle=green;
    //ctx.shadowOffsetX=5;
    //ctx.shadowOffsetY=5;
    //ctx.shadowColor=gray0;
    //let r1=10;
    //ctx.lineWidth=1; // grass size
    //let x=-100,y=-195;//,h=ctx.lineWidth;
    //ctx.setLineDash([1,(2*Math.PI*r1-10)/10]);
    //ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.stroke();
    //ctx.fill();
    //ctx.lineTo(x,y-h);
    ///x=-118,y=-212;
    //r1=ctx.lineWidth=7;
    //ctx.setLineDash([1,(2*Math.PI*r1-10)/10]);
    //ctx.beginPath();
    //ctx.strokeStyle=gray4;
    //ctx.lineWidth=10;
    //ctx.moveTo(x+r1,y);
    //ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.stroke();
    //ctx.fill();
    //ctx.lineTo(x,y-h);
    //x=-85,y=-220;
    //r1=ctx.lineWidth=10;
    //ctx.setLineDash([1,(2*Math.PI*r1-10)/10]);
    //ctx.beginPath();
    //ctx.strokeStyle=gray2;
    //ctx.lineWidth=15;
    //ctx.moveTo(x+r1,y);
    //ctx.arc(x,y,r1,0,2*Math.PI);
    //ctx.fill();
    //ctx.moveTo(x,y);
    //ctx.lineTo(x,y-h);
    //ctx.stroke();
    //ctx.restore();
    //ctx.lineWidth=2;

    // draw clover
    //ctx.save();
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.fillStyle=green;
    let r1=5,x=-110,y=-228;
    //ctx.arc(x,y,r1,0,2*Math.PI);
    let angle1=-Math.PI/2,angle2=30*Math.PI/180,angle3=150*Math.PI/180;
    ctx.arc(x+(r1*Math.cos(angle1)),y+(r1*Math.sin(angle1)),r1-1,0,2*Math.PI);
    ctx.moveTo(x+(r1*Math.cos(angle2))+r1-1,y+(r1*Math.sin(angle2)));
    ctx.arc(x+(r1*Math.cos(angle2)),y+(r1*Math.sin(angle2)),r1-1,0,2*Math.PI);
    ctx.moveTo(x+(r1*Math.cos(angle3))+r1-1,y+(r1*Math.sin(angle3)));
    ctx.arc(x+(r1*Math.cos(angle3)),y+(r1*Math.sin(angle3)),r1-1,0,2*Math.PI);

    x=-128,y=-235;
    ctx.arc(x+(r1*Math.cos(angle1)),y+(r1*Math.sin(angle1)),r1-1,0,2*Math.PI);
    ctx.moveTo(x+(r1*Math.cos(angle2))+r1-1,y+(r1*Math.sin(angle2)));
    ctx.arc(x+(r1*Math.cos(angle2)),y+(r1*Math.sin(angle2)),r1-1,0,2*Math.PI);
    ctx.moveTo(x+(r1*Math.cos(angle3))+r1-1,y+(r1*Math.sin(angle3)));
    ctx.arc(x+(r1*Math.cos(angle3)),y+(r1*Math.sin(angle3)),r1-1,0,2*Math.PI);

    ctx.fill();
    ctx.restore();

    // draw roses

    // draw mint/plantago

    // draw aster/umbel

    // draw ivy/bindweed

    // draw purslane

    // draw pokeweed/pigweed/burdock

  };

  const arc = (ctx,x,y,r,start,end) => {
    ctx.moveTo(x+r,y);
    ctx.arc(x,y,r,start,end);
  };
  const circle = (ctx,x,y,r) => {
    arc(ctx,x,y,r,0,2*Math.PI);
  };

  // return the public api
  return api;
}());