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

    ctx.lineWidth=2;

    drawCircle(state,ctx,[0,0,49,gray5]);
    ctx.clip();
    drawCircle(state,ctx,[0,0,50,gray5]);

    drawCircle(state,ctx,[0,0,5,gray3,"fill"]);
    ctx.save();
    ctx.setLineDash([0.02*2*Math.PI*10*state.minDim/100,
      0.03*2*Math.PI*10*state.minDim/100
    ]);
    drawCircle(state,ctx,[0,0,10,gray5]);
    ctx.restore();

    let argsList=[
      [0,40,5,gray5],
      [0,40,1,green4],
      [25,25,5,gray0,"fill"],
      [0,25,5,gray2,"fill"],
      [-25,25,5,gray4,"fill"],
      [-10,-30,1,gray0],
      [-10,-35,1,gray2],
      [-10,-40,1,gray4],
      [-10,-45,1,gray5],
    ];
    argsList.forEach(args => drawEntity(state,ctx,args));

    ctx.strokeStyle=grass;
    argsList=[
      [-15,-25],
      [-17,-26],
      [-15.5,-27],
    ];
    ctx.beginPath();
    argsList.forEach(args => drawGrass(state,ctx,...args));
    ctx.stroke();
    ctx.beginPath();
    argsList.forEach(args => drawRange(state,ctx,...args));
    ctx.stroke();

    ctx.strokeStyle=clover;
    ctx.fillStyle=clover;
    argsList=[
      [-14,-22],
      [-11,-20],
    ];
    ctx.beginPath();
    argsList.forEach(args => drawClover(state,ctx,...args,2));
    ctx.fill();
    ctx.beginPath();
    argsList.forEach(args => drawRange(state,ctx,...args,2));
    ctx.stroke();

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

  const gray0=shadow="#111111"; // shadow
  const gray1=background="#222222"; // background
  const gray2=inactive="#444444"; // inactive
  const gray3=player="#888888"; // player
  const gray4=active="#cccccc"; // active
  const gray5=light="#eeeeee"; // light

  const green4=grass="#00cc00";
  const spring4=clover="#88cc88";

  const _fill="fill",
    _stroke="stroke",
    _dot="dot",
    _jewel="jewel",
    _box="box",
    _ring="ring",
    _circle="Circle";

  const drawCircle=(state,ctx,args) => ((state,ctx,x,y,r,c,f="stroke") => {
    ctx.beginPath();
    f==="fill"? ctx.fillStyle=c : ctx.strokeStyle=c;
    circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);
    ctx[f](); // ctx."stroke"();
  })(state,ctx,...args);

  const drawEntity=(state,ctx,args) => ((state,ctx,x,y,r,c,f="stroke",g=drawCircle) => {
    g(state,ctx,[x,y,r,c,f]); // "drawCircle"(...args)
  })(state,ctx,...args);
    
  const drawTime=()=>{

  }; // orb

  const drawSpace=()=>{}; // box
  
  const drawEnergy=()=>{}; // gem
  
  const drawMatter=()=>{}; // dot
  
  const drawRange=(state,ctx,x,y,r=1)=>{
    circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);    
  };

  const drawGrass=(state,ctx,x,y,r=1) => {
    r/=2;
    ctx.moveTo(x*state.minDim/100,(y+r)*state.minDim/100);
    ctx.lineTo(x*state.minDim/100,(y-r)*state.minDim/100);
  };
  
  const drawClover=(state,ctx,x,y,r=1) => {
    r/=3;
    const angleList=[-Math.PI/2,30*Math.PI/180,150*Math.PI/180];
    angleList.forEach(angle=>{
      circle(
        ctx,
        x*state.minDim/100+((r)*state.minDim/100*Math.cos(angle)),
        y*state.minDim/100+((r)*state.minDim/100*Math.sin(angle)),
        (r-0.1)*state.minDim/100
      );
    });
  };


  // return the public api
  return api;
}());