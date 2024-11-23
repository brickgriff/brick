/*
  @Author: BrickGriff@GitHub.com
*/

const game = {
  width:0,
  height:0,
  cx:0,
  cy:0,
  cr:0,
  //isResized:false,
  ctx:null,
  //main:main,
  buttons:[],
  speed:0.05,
  //abc:0,
};

function loop(now,state,ctx) {
  const elapsed = (now - state.start) / 1000; // deltaTime in seconds
  const dt = elapsed > 1 ? 1 : elapsed; // cap deltaTime @ 1s
  
  //console.log(`gameLoop(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);

  //World.update(state, dt); // update entities
  //Display.draw(state, ctx); // draw entities
  //Buffer.flush(state); // reset buffer
  //console.log(state.canvas.width,state.canvas.height);

  // FIXME: the above may be unnecessary since state.ctx is inside state...
  // maybe Display is allowed to use other canvas contexts to draw
  // ... like maybe an offscreen canvas context

  if (state.isQuit) return console.log("quit");

  requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}

function draw() {
  let ctx = game.ctx;
  ctx.save();

  // normalize coordinates
  ctx.translate(game.width/2,game.height/2);
  //ctx.scale(1,0.5); 
  // TODO: scale manually to avoid distorting the line art

  const minDim = Math.min(game.width,game.height); // one screen unit
  const cr = minDim/2; // center radius
  const TWO_PI = 2*Math.PI;
  game.cr = cr;

  ctx.fillStyle="gray";
  ctx.fillRect(-game.width/2,-game.height/2,game.width,game.height);

  ctx.beginPath();
  ctx.lineWidth=5;
  ctx.moveTo(0+cr,0);
  ctx.arc(0,0,cr,0,TWO_PI);
  ctx.stroke();

  ctx.clip();
  
  const polarGrids=5;
  const cartesianGrids=5;

  for(let i=0; i<polarGrids; i++) {
    ctx.beginPath();
    const r = cr * i / polarGrids;
    ctx.lineWidth = 1 + i % 2;
    ctx.moveTo(0+r,0);
    ctx.arc(0,0,r,0,TWO_PI);
    ctx.stroke();
  }

  for(let j=0; j<cartesianGrids; j++) {
    ctx.beginPath();
    const breadth = minDim * j / cartesianGrids;
    ctx.lineWidth = 1 + j % 2;
    ctx.rect(-breadth/2,-cr,breadth,minDim); // tall boxes (x,Y,w,H)
    ctx.rect(-cr,-breadth/2,minDim,breadth); // wide boxes (X,y,W,h
    ctx.stroke();
  }

  // Create a linear gradient for the root
  //const gradient1 = ctx.createLinearGradient(0,-cr,0,cr);
  const gradient1 = ctx.createRadialGradient(0,0,0,0,0,cr);
  gradient1.addColorStop(0, "black");
  gradient1.addColorStop(0.3, "rgba(0,0,0,0.0)");
  gradient1.addColorStop(0.5, "rgba(0,0,0,0.0)");
  gradient1.addColorStop(1, "black");

  ctx.strokeStyle = gradient1; // Use gradient for stroke

  ctx.lineWidth=1;
  ctx.moveTo(-cr,-cr);
  ctx.lineTo(cr,cr);
  ctx.moveTo(cr,-cr);
  ctx.lineTo(-cr,cr);
  ctx.stroke();

  //console.log(itemX,itemY,itemX+offsetX,itemY+offsetY);
  ctx.fillStyle="black";//game.abc%2===0?"black":"white";
  ctx.strokeStyle="white";

  const itemX=0.10*cr;
  const itemY=-0.5*cr;
  const itemSize=0.05*cr;
  const offsetX=game.cx*game.speed*cr;
  const offsetY=game.cy*game.speed*cr;
  const playerR = 0.1*cr;

  ctx.beginPath();
  ctx.rect(
    itemX-itemSize/2+offsetX,
    itemY-itemSize/2+offsetY,
    itemSize,
    itemSize);

  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0+playerR,0);
  ctx.arc(0,0,playerR,0,TWO_PI);

  ctx.fill();
  ctx.stroke();

  game.abc = game.abc!==undefined ? game.abc+1 : 0;
  //console.log(game.abc);
  ctx.restore();

}

game.draw = draw;

function main() {  
  // TODO: display factory/service to allow different output modes
  // 2D? 3D? 4D? 1D? ASCII? Voxel? 8-bit? 16-bit? 32-bit? 1-bit?
  const canvas = document.createElement("canvas"); // default canvas
  const ctx = canvas.getContext("2d", { willReadFrequently: true }); // now we can draw

  canvas.style="border:1px solid #000000; image-rendering: pixelated; image-rendering: crisp-edges;";
  game.width=window.innerWidth;
  game.height=window.innerHeight;
  canvas.width=5000;//game.width;
  canvas.height=5000;//game.height;

  game.ctx = ctx;
  draw();

  //const state = World.create(canvas); // initialize!
  //Buffer.attach(state); // attach input buffer

  //canvas.focus();
  document.body.appendChild(canvas); // add it to body
  //requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}

window.onload = main;
