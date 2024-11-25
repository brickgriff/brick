/*
  @Author: BrickGriff@GitHub.com
*/


// globals for I/O
const client = {
  // client inner dimensions
  // i.e. innerWidth, innerHeight
  width:0,
  height:0,

  // center offsets
  cx:0,
  cy:0,
  cr:0, // radial
  // ctx:null,

  // input keyboard
  buttons:[],
  // input mouse
  // zoom:1,
  speed:0.05, // move 5% of center radial offset (cr)
};

function loop(now,state,ctx) {
  const elapsed = (now - state.start) / 1000; // deltaTime in seconds
  const dt = elapsed > 1 ? 1 : elapsed; // cap deltaTime to 1s
  state.fps= Math.floor(1/dt);
  const minDim = Math.min(client.width,client.height); // one screen unit
  client.cr = minDim/2; // center radius

  //console.log(now,state.start);
  
  //console.log(`gameLoop(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);

  //testDraw();

  //World.update(state, dt); // update entities
  Display.draw(state, ctx); // draw entities
  //Buffer.flush(state); // reset buffer
  //console.log(state.canvas.width,state.canvas.height);

  // FIXME: the above may be unnecessary since state.ctx is inside state...
  // maybe Display is allowed to use other canvas contexts to draw
  // ... like maybe an offscreen canvas context

  if (client.isQuit) return console.log("quit");
  state.start=now;
  requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}

function testDraw() {
  let ctx = client.ctx;
  ctx.save();

  // normalize coordinates
  ctx.translate(client.width/2,client.height/2);

  //ctx.scale(1,0.5); 
  // TODO: scale manually to avoid distorting the line art

  const minDim = Math.min(client.width,client.height); // one screen unit
  const cr = client.cr = minDim/2; // center radius
  const TWO_PI = 2*Math.PI;

  // fill background
  ctx.fillStyle="gray";
  ctx.fillRect(-client.width/2,-client.height/2,client.width,client.height);

  // draw horizon ring
  ctx.beginPath();
  ctx.lineWidth=5;
  ctx.moveTo(0+cr,0);
  ctx.arc(0,0,cr,0,TWO_PI);
  ctx.stroke();

  ctx.clip();
  
  const polarGrids=5;
  const cartesianGrids=5;

  // draw nested rings
  for(let i=0; i<polarGrids; i++) {
    ctx.beginPath();
    const r = cr * i / polarGrids;
    ctx.lineWidth = 1 + i % 2;
    ctx.moveTo(0+r,0);
    ctx.arc(0,0,r,0,TWO_PI);
    ctx.stroke();
  }

  // draw nested crosses
  for(let j=0; j<cartesianGrids; j++) {
    ctx.beginPath();
    const breadth = minDim * j / cartesianGrids;
    ctx.lineWidth = 1 + j % 2;
    ctx.rect(-breadth/2,-cr,breadth,minDim); // tall boxes (x,Y,w,H)
    ctx.rect(-cr,-breadth/2,minDim,breadth); // wide boxes (X,y,W,h
    ctx.stroke();
  }

  // Create a linear gradient for the diagonals
  //const gradient1 = ctx.createLinearGradient(0,-cr,0,cr);
  const gradient1 = ctx.createRadialGradient(0,0,0,0,0,cr);
  gradient1.addColorStop(0, "white");
  gradient1.addColorStop(0.5, "rgba(125,125,125,0.0)");
  gradient1.addColorStop(1, "black");
  ctx.strokeStyle = gradient1; // Use gradient for stroke

  // draw diagonals
  ctx.lineWidth=1;
  ctx.moveTo(-cr,-cr);
  ctx.lineTo(cr,cr);
  ctx.moveTo(cr,-cr);
  ctx.lineTo(-cr,cr);
  ctx.stroke();

  //console.log(itemX,itemY,itemX+offsetX,itemY+offsetY);
  ctx.fillStyle="black";//client.abc%2===0?"black":"white";
  ctx.strokeStyle="white";

  const offsetX=client.offsetX=client.cx*client.speed*minDim;
  const offsetY=client.offsetY=client.cy*client.speed*minDim;

  const itemX=0.10*minDim+offsetX;
  const itemY=-0.30*minDim+offsetY;
  const itemR=0.05*cr;

  // draw item
  ctx.beginPath();
  ctx.rect(itemX-itemR,itemY-itemR,itemR*2,itemR*2);
  ctx.fill();
  ctx.stroke();

  const platformX=-0.25*minDim+offsetX;
  const platformY=-0.15*minDim+offsetY;
  const platformR=0.15*cr;

  const circumference = TWO_PI*platformR;
  const distance = 0.15*cr;
  const fraction = 1/24;

  // draw platform
  ctx.lineWidth=3;
  ctx.setLineDash([fraction*circumference]);
  ctx.lineDashOffset = fraction*circumference/2;

  // collision detection
  if (Math.abs(platformX)<=distance&&Math.abs(platformY)<=distance) {
    ctx.strokeStyle="pink";
    ctx.lineWidth=5;
  }

  ctx.beginPath();
  ctx.moveTo(platformX+platformR,platformY);
  ctx.arc(platformX,platformY,platformR,0,TWO_PI);
  ctx.stroke();

  const playerR = 0.1*cr;

  // draw player
  ctx.lineWidth=1;
  ctx.strokeStyle="white";
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(0+playerR,0);
  ctx.arc(0,0,playerR,0,TWO_PI);
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  ctx.fillStyle="dimgray";//client.abc%2===0?"black":"white";
  ctx.fillRect(0,0,client.width,(client.height-minDim)/2);
  ctx.fillRect(0,minDim+(client.height-minDim)/2,client.width,(client.height-minDim)/2);
  ctx.fillRect(0,0,(client.width-minDim)/2,client.height);
  ctx.fillRect(minDim+(client.width-minDim)/2,0,(client.width-minDim)/2,client.height);

  ctx.beginPath();
  ctx.lineWidth=5;
  ctx.strokeStyle="black";
  ctx.rect(0,0,client.width,client.height);
  ctx.stroke();

}

function main() {  
  // TODO: display factory/service to allow different output modes
  // 2D? 3D? 4D? 1D? ASCII? Voxel? 8-bit? 16-bit? 32-bit? 1-bit?
  const canvas = document.createElement("canvas"); // default canvas
  const ctx = client.ctx = canvas.getContext("2d", { willReadFrequently: true }); // now we can draw

  //canvas.style="border:1px solid #000000; image-rendering: pixelated; image-rendering: crisp-edges;";
  client.width=window.innerWidth;
  client.height=window.innerHeight;
  // make the canvas large enough to resize to fit large screens
  canvas.width=5000;
  canvas.height=5000;
  canvas.focus();

  const state = World.create(canvas); // initialize!

  document.body.appendChild(canvas); // add it to body
  requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}

window.onload = main;