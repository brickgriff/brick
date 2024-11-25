const Display = (function (/*api*/) {
  var api = {};

  // public api is a function
  api.draw = function (state, ctx) {
    //console.log(`draw`);
    ctx.save();
    ctx.translate(client.width/2,client.height/2);
    
    const limit = Math.pow(10,client.level+1); // f(0)=10,f(1)=100,etc
    const count = Math.floor(state.growth%limit);
    const offset = count/limit*Math.PI;
    //const middle=Math.PI/2;
    //const a = middle - offset;
    //const b = middle + offset;
    const eMargin = 5;
    const lMargin = 2;
    const hMargin = 1;

    drawBackground(ctx);
    drawExperience(ctx,offset,eMargin);
    drawReset(ctx,state.progress*Math.PI);
    drawLevel(ctx,lMargin);
    clipHorizon(ctx,eMargin+lMargin*2*client.level+hMargin);
    drawEntities(ctx,state.entities);
    drawPlayer(ctx,state);
    ctx.restore();
    // centered on width/2,height/2
  };

  function drawBackground(ctx) {
    ctx.fillStyle=background;
    ctx.beginPath();
    ctx.rect(-client.cr,-client.cr,2*client.cr,2*client.cr);
    ctx.fill();
  }

  function clipHorizon(ctx,margin) {
    // clip out horizon
    //console.log(margin);
    ctx.beginPath();
    circle(ctx,0,0,client.cr-margin);
    ctx.clip();
  }

  function drawPlayer(ctx) {
    //draw player
    ctx.fillStyle=player;
    ctx.beginPath();
    circle(ctx,0,0,client.cr*client.scalingFactor);
    ctx.fill();
    //ctx.setLineDash([0.02*2*Math.PI*10*state.minDim/100,
    //  0.03*2*Math.PI*10*state.minDim/100
    //]);
    //drawCircle(state,ctx,0,0,2*state.radius,gray5);
    //ctx.setLineDash([]);
    //ctx.strokeStyle=gray5;
  }

  function drawLevel(ctx,margin) {
    ctx.strokeStyle=light;

    ctx.beginPath();
    ctx.lineWidth=margin;
    //circle(ctx,0,0,client.cr-5);
    //circle(ctx,0,0,client.cr);
    move(ctx,0,client.cr-margin*2);
    line(ctx,0,client.cr);

    for (let i=0;i<client.level;i++) {
      circle(ctx,0,0,client.cr-9-i*margin*2);
    }
    ctx.stroke();
  }

  function drawExperience(ctx,offset,margin) {
    const middle=Math.PI/2;
    const a = middle - offset;
    const b = middle + offset;

    ctx.strokeStyle=light;

    ctx.beginPath();
    ctx.lineWidth=margin;
    arc(ctx,0,0,client.cr-margin/2,a,b);
    ctx.stroke();
  }

  function drawReset(ctx,offset) {
    const middle=Math.PI/2;
    const a = middle - offset;
    const b = middle + offset;

    ctx.strokeStyle=thorns;

    ctx.beginPath();
    ctx.lineWidth=5;
    arc(ctx,0,0,client.cr-5/2,a,b);
    ctx.stroke();
  }

  function drawEntities(ctx, entities) {
    const cFraction=1/24;
    const radius = client.cr*client.scalingFactor;
    const circumference = 2 * Math.PI * radius;
    ctx.setLineDash([cFraction*circumference]);
    ctx.lineDashOffset=cFraction*circumference/2;
    
    ctx.beginPath();
    //ctx.lineWidth=1;
    ctx.strokeStyle=light;
    circle(ctx,client.offsetX,client.offsetY,radius);
    ctx.stroke();
    ctx.setLineDash([]);
    
    entities.forEach((entity,idx)=>{
      //if (idx!==2)return;
      if (!(entity.x!=null&&entity.y!=null&&entity.r!=null)) return;

      const entityX = entity.x*client.scalingFactor*client.cr+client.offsetX;
      const entityY = entity.y*client.scalingFactor*client.cr+client.offsetY;
      const entityR = entity.r*client.cr*client.scalingFactor;
      const eFraction = entity.fraction;
      //const alpha = Math.min(15,eFraction*16); // 0-15
      //const alphaHex = (alpha+alpha).toString(16);
      const avgColor=weightedAvg(active,inactive,eFraction);

      ctx.beginPath();
      ctx.strokeStyle=avgColor;
      //if (idx===2)console.log(eFraction, active, inactive, avgColor,ctx.strokeStyle);
      //console.log(ctx.strokeStyle,ctx.globalAlpha);
      circle(ctx,entityX,entityY,entityR);
      ctx.stroke();
    });
  }
     // ina act sub 1 spl 2 par 16 avg str 16 cat #
 function weightedAvg(hex1,hex2,weight) {
   const hex1List=hex1.substring(1).match(/.{1,2}/g);
   const hex2List=hex2.substring(1).match(/.{1,2}/g);
   //console.log(hex1List,hex2List, weight);
   //str.match(/.{1,n}/g); // Replace n with the size of the substring
   //yourNumber = parseInt(hexString, 16);
   //hexString = yourNumber.toString(16);
   const hexList=[];
   for ( let i=0; i<3;i++) {
    const h1 = parseInt(hex1List[i], 16);
    const h2 = parseInt(hex2List[i], 16);
    const h = (h1 - h2)*weight+h2;
    //console.log(h1,h2,h);
    hexList.push(h.toString(16).substring(0,2));
   }
   //console.log(hex1List,hex2List, weight,hexList);
   return hexList.reduce((acc,cur)=>{
     return acc + "" + cur;
   },"#");

 }
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