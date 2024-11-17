const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);

    ctx.reset();

    ctx.fillStyle=background;
    if (state.buffer && state.buffer.isTouched) ctx.fillStyle=red3;
    if (state.buffer && state.buffer.isLooked) ctx.fillStyle=green3;
    if (state.buffer && state.buffer.isReset) ctx.fillStyle=blue3;
    //if (state.buffer && state.buffer.zoom > 0) ctx.fillStyle="black";
    //if (state.buffer && state.buffer.zoom < 0) ctx.fillStyle="white";
    ctx.rect(0,0,state.canvas.width,state.canvas.height);
    ctx.fill();

    const cx=state.canvas.width/2,cy=state.canvas.height/2;
    ctx.translate(cx,cy);
    //ctx.clearRect(0,0,state.canvas.width,state.canvas.height);
    //ctx.scale(state.zoom,state.zoom);
    //state.zoom=1;
    ctx.lineWidth=2;

    drawCircle(state,ctx,0,0,49,gray5);
    ctx.clip();
    drawCircle(state,ctx,0,0,50,gray5);

    ctx.save();
    drawCircle(state,ctx,0,0,5,gray3,"fill");
    ctx.setLineDash([0.02*2*Math.PI*10*state.minDim/100,
      0.03*2*Math.PI*10*state.minDim/100
    ]);
    drawCircle(state,ctx,0,0,10,gray5);
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
    argsList.forEach(args => drawEntity(state,ctx,...args));

    ctx.strokeStyle=grass;
    argsList=[
      [-15,-25],
      [-17,-26],
      [-15,-27],
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
      [-10,-20],
    ];
    ctx.beginPath();
    argsList.forEach(args => drawClover(state,ctx,...args));
    ctx.fill();
    ctx.beginPath();
    argsList.forEach(args => drawRange(state,ctx,...args,2));
    ctx.stroke();

    ctx.strokeStyle=rose;
    ctx.fillStyle=rose;
    argsList=[
      [-24,-28],
      [-21,-18],
    ];
    ctx.beginPath();
    argsList.forEach(args => drawRose(state,ctx,...args));
    ctx.stroke();
    ctx.beginPath();
    argsList.forEach(args => drawRange(state,ctx,...args,5));
    ctx.stroke();
  };

  const gray0=shadow="#111111"; // shadow
  const gray1=background="#222222"; // background
  const gray2=inactive="#444444"; // inactive
  const gray3=player="#888888"; // player
  const gray4=active="#cccccc"; // active
  const gray5=light="#eeeeee"; // light

  const green4=grass="#00cc00";
  const red4=rose="#cc0000";
  const spring4=clover="#88cc88";
  const blue4="#0000cc";
  const green3="#008800";
  const red3="#880000";
  const blue3="#000088";

  const line = (ctx,x1,y1,x2,y2) => {
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
  };
  const arc = (ctx,x,y,r,a,b) => {
    ctx.moveTo(x+r,y);
    ctx.arc(x,y,r,a,b);
  };
  const circle = (ctx,x,y,r) => {
    arc(ctx,x,y,r,0,2*Math.PI);
  };

  const poly = (ctx,x,y,r,n,f,fr,fn,o) => {
    const angle=360/n,offset=o?o:90-angle/2,coef=Math.PI/180;
    for(let i=0; i<n; i++){
      let j=i+1;
      let x1=x+((r)*Math.cos((angle*i+offset)*coef)),
      y1=y+((r)*Math.sin((angle*i+offset)*coef)),
      x2=x+((r)*Math.cos((angle*j+offset)*coef)),
      y2=y+((r)*Math.sin((angle*j+offset)*coef));
      if (f) {

        move(ctx,x1,y1);
        f(ctx,x1,y1,fr,fn,null,null,null,angle*i+offset);
      } else {
      line(ctx,x1,y1,x2,y2);
      }
    }
  };

  const drawCircle=(state,ctx,x,y,r,c,f="stroke") => {
    ctx.beginPath();
    f==="fill"? ctx.fillStyle=c : ctx.strokeStyle=c;
    circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);
    ctx[f](); // ctx."stroke"();
  };

  const drawEntity=(state,ctx,x,y,r,c,f="stroke",g=drawCircle) => {
    g(state,ctx,x,y,r,c,f); // "drawCircle"(...args)
  };
    
  const drawTime=()=>{

  }; // orb

  const drawSpace=()=>{}; // box
  
  const drawEnergy=()=>{}; // gem
  
  const drawMatter=()=>{}; // dot
  
  const drawRange=(state,ctx,x,y,r=1)=>{
    circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);    
  };

  const drawGrass=(state,ctx,x,y,r=1) => {
    r*=1/2;
    ctx.moveTo(x*state.minDim/100,(y+r)*state.minDim/100);
    ctx.lineTo(x*state.minDim/100,(y-r)*state.minDim/100);
  };
  
  const drawClover=(state,ctx,x,y,r=1) => {
    r*=2/3;
    poly(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100,3,
      circle,(r-0.1)*state.minDim/100);

  };

  const drawRose=(state,ctx,x,y,r=1) => {
    r*=4/5;
    poly(ctx,x*state.minDim/100,y*state.minDim/100,(5.4)*state.minDim/100,5,
      poly,(r-0.1)*state.minDim/100,3);
  };


  // return the public api
  return api;
}());