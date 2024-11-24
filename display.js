const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);

    //ctx.reset();
    ctx.save();
    ctx.translate(game.width/2,game.height/2);
    ctx.fillStyle=background;
    ctx.beginPath();
    ctx.rect(-game.cr,-game.cr,2*game.cr,2*game.cr);
    ctx.fill();

    circle(ctx,0,0,game.cr);
    ctx.save();
    ctx.clip();

    // centered on 0,0




    ctx.restore();

    // draw horizon ring
    ctx.lineWidth=2;
    ctx.strokeStyle=gray5;
    ctx.fillStyle=gray5;
    ctx.beginPath();
    circle(ctx,0,0,game.cr);
    circle(ctx,0,0,game.cr-10);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth=5;
    const level = Math.floor(Math.log10(state.growth));
    const limit = Math.pow(10,level+1);
    const middle=Math.PI/2;
    const grassCount = state.growth%limit;
    const grassOffset = grassCount/limit*Math.PI;
    const a = middle - grassOffset;
    const b = middle + grassOffset;

    arc(ctx,0,0,game.cr-5,a,b);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth=2;
    for (let i=0;i<level;i++) {

      arc(ctx,0,0,game.cr-14-i*4,0,2*Math.PI);

    }

    //draw player
    ctx.beginPath();
    circle(ctx,0,0,0.1*game.cr*state.zoom);
    ctx.fill();
    //ctx.setLineDash([0.02*2*Math.PI*10*state.minDim/100,
    //  0.03*2*Math.PI*10*state.minDim/100
    //]);
    //drawCircle(state,ctx,0,0,2*state.radius,gray5);
    //ctx.setLineDash([]);
    //ctx.strokeStyle=gray5;

    ctx.stroke();

    ctx.restore();

    // centered on width/2,height/2
  };

  const gray0=shadow="#111111"; // shadow
  const gray1=background="#222222"; // background
  const gray2=inactive="#444444"; // inactive
  const gray3=player="#888888"; // player
  const gray4=active="#cccccc"; // active
  const gray5=light="#eeeeee"; // light

  const green4=grass="#00cc00";
  const red4=thorns="#cc0000";
  const red5=flowers="#ee88cc";
  const spring4=clover="#88cc88";
  const lawn4=mint="#44ee44";
  const lime3=rose="#228822";
  const lime4=mallow="#44cc44";
  const blue4="#0000cc";
  const green3="#008800";
  const red3="#880000";
  const blue3="#000088";

  const move = (ctx,x,y) => {
    ctx.moveTo(x,y);
  };
  const line = (ctx,x,y) => {
    ctx.lineTo(x,y);
  };
  const arc = (ctx,x,y,r,a,b) => {

    move(ctx,x+r*Math.cos(a),y+r*Math.sin(a));
    ctx.arc(x,y,r,a,b);
  };
  const circle = (ctx,x,y,r) => {
    arc(ctx,x,y,r,0,2*Math.PI);
  };

  const poly = (ctx,x,y,r,n,o,f,fr,fn,fo) => {
    const angle=360/n,offset=(o)?o:90-angle/2,coef=Math.PI/180;
    let x1=x+((r)*Math.cos((offset)*coef)),
      y1=y+((r)*Math.sin((offset)*coef));
    move(ctx,x1,y1);
    for(let i=0; i<n; i++){
      let idx=i+1;
      
      let x2=x+((r)*Math.cos((angle*idx+offset)*coef)),
      y2=y+((r)*Math.sin((angle*idx+offset)*coef));
      if (f) {
        //move(ctx,x1,y1);
        f(ctx,x1,y1,fr,fn,angle*i+offset+(fo?fo:0));
      } else {
      line(ctx,x1,y1,x2,y2);
      }

      x1=x2,y1=y2;
    }
  };

  const drawCircle=(state,ctx,x,y,r,c,f="stroke") => {
    ctx.beginPath();
    f==="fill"? ctx.fillStyle=c : ctx.strokeStyle=c;
    circle(ctx,x*state.minDim/100,y*state.minDim/100,r*state.minDim/100);
    ctx[f](); // ctx."stroke"();
  };

  const drawEntity=(state,ctx,x,y,r,c,f="stroke",g=drawCircle) => {
    g(state,ctx,(x+state.px),(y+state.py),r,c,f); // "drawCircle"(...args)
  };
    
  const drawTime=()=>{

  }; // orb

  const drawSpace=()=>{}; // box
  
  const drawEnergy=()=>{}; // gem
  
  const drawMatter=()=>{}; // dot
  
  const drawRange=(state,ctx,x,y,r=1)=>{
    circle(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*state.minDim/100);    
  };
  const drawThorns=(state,ctx,x,y,r=1)=>{
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,5.5*state.minDim/100,8,
      45,poly,(r)*state.minDim/100,3);
  };

  const drawGrass=(state,ctx,x,y,r=1) => {
    //move(ctx,(x+state.px)*state.minDim/100,(y+r/2+state.py)*state.minDim/100);
    //line(ctx,(x+state.px)*state.minDim/100,(y-r/2+state.py)*state.minDim/100);
    circle(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.2*state.minDim/100);
  };
  
  const drawClover=(state,ctx,x,y,r=1) => {
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.8*state.minDim/100,3,
      null,circle,(r*0.7)*state.minDim/100);

  };

  const drawShrub=(state,ctx,x,y,r=1) => {
    //poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(3*r)*state.minDim/100,12,30);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(2*r)*state.minDim/100,15,null,
      circle,(r)*state.minDim/100);
    circle(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(r*2)*state.minDim/100);
  };

  const drawRose=(state,ctx,x,y,r=1) => {
    //circle(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(r-0.2)*state.minDim/100);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,2*r*state.minDim/100,5,
      90,circle,(r-0.2)*state.minDim/100);
  };

  const drawMallow=(state,ctx,x,y,r=1) => {
    //poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(0.5)*state.minDim/100,6,null,null,null);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.4*state.minDim/100,7,
      0,poly,(r*0.4)*state.minDim/100,5);
  };
  const drawNotch=(state,ctx,x,y,r=1) => {
    //poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(0.5)*state.minDim/100,6,null,null,null);
    //poly(ctx,(x+state.px)*state.minDim/100,(y+1.1+state.py)*state.minDim/100,r*state.minDim/100,3);
    move(ctx,(x+state.px)*state.minDim/100,(y+r*2+state.py)*state.minDim/100);
    line(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100);

  };

  const drawMint=(state,ctx,x,y,r=1) => {
    //poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(0.5)*state.minDim/100,6,null,null,null);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.8*state.minDim/100,4,
      null,poly,(r*0.4)*state.minDim/100,3);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.4*state.minDim/100,4,
      null,poly,(r*0.4)*state.minDim/100,3,180);
  };
  const drawSorrel=(state,ctx,x,y,r=1) => {
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,(0.5)*state.minDim/100,3,
      poly,r*state.minDim/100,3);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.9*state.minDim/100,4,
      null,poly,(r*0.5)*state.minDim/100,3);
    poly(ctx,(x+state.px)*state.minDim/100,(y+state.py)*state.minDim/100,r*0.4*state.minDim/100,4,
      null,poly,(r*0.5)*state.minDim/100,3,180);
  };


  // return the public api
  return api;
}());