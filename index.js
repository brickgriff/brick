// brick.js

// canvas is created/configured programmatically now
//<!--canvas-->
//<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

/* SCREEN */
/* WINDOW */
/* CANVAS */
/* LIGHTS */
/* CAMERA */
/* ACTION */
/* PLAYER */
/* OBJECTS */
/* SCENES */

// handles for canvas and context (2D)
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// TODO: is 3D possible? let's keep learning then simulate later

// what are the window dimensions?
canvas.width=Math.floor((window.innerWidth-25)/100)*100;
canvas.height=Math.floor((window.innerHeight-25)/100)*100;
canvas.style="border:1px solid #000000; image-rendering: pixelated; image-rendering: crisp-edges;";
document.body.appendChild(canvas);

// this is the screen size
// we will build the world separately
// but it will be a useful layer between the world ("toon"/"character") and the mouse ("user"/"player")
// we should also have a position and size for the screen in terms of the world (which will be 3D soon)
const worldWidth=10000, worldHeight=10000;
const objects = [];
const player = {
  id: 0,
  size: 20,
  x: worldWidth/2,
  y: worldHeight/2,
  z: 20,
  color: "purple",
  outline: "black",
  type: "player"
};

objects.push(player);
/*
objects.push({
  size: 25,
  x: .29*(worldWidth/2),
  y: .29*(worldHeight/2),
  z: 25,
  color: "orange"
});
*/
const colors = ["red","blue","green","yellow","magenta","cyan"];
const shadow = "rgba(0,0,0,0.5)";
/*
 * Mouse Controls
 *
 * 0    1      2
 * Left Middle Right
 * Left - Move
 * Middle - Zoom
 * Right - Look
 */
// initial mouse (x,y), current mouse (x,y), current delta (x,y)
let firstX,firstY,mouseX,mouseY,deltaX=0,deltaY=0;
let yaw=0,pitch=Math.PI/4,zoom=0,deltaZoom=0;
let isMove=false,isReset=false,isLook=false,isMousePressed=false; 
// override right-click
canvas.addEventListener("contextmenu", (e)=>{e.preventDefault()});
canvas.addEventListener("mousedown",(e)=>{
  firstX=e.offsetX;
  firstY=e.offsetY;
  mouseX=firstX;
  mouseY=firstY;
  isMousePressed=true;
  if (e.button == 0) isMove=true;
  if (e.button == 1) isReset=true;
  if (e.button == 2) isLook=true;
});
canvas.addEventListener("mouseup", (e)=>{
  isMousePressed=false;
  isMove=false;
  if (isReset===true) {
    yaw=0;
    pitch=Math.PI/4;
    deltaZoom=0;
  }

  isReset=false;
  isLook=false;
  deltaX=0,deltaY=0;
  ctx.clearRect(0,0,worldWidth,worldHeight);
  drawWorld();
  drawObjects();
});
canvas.addEventListener("mousemove", (e) =>{
  if (isMousePressed===true) {
    ctx.clearRect(0,0,worldWidth,worldHeight);
    drawWorld();
    drawObjects();
    drawLine(ctx, firstX, firstY, mouseX, mouseY);
    if (isLook===true) {
      //updateWorld();
      //updateObjects();
      // limit look speed to avoid crashing through the floor
      // moving down 
      //let limit = 2; 
      deltaX=e.offsetX-mouseX;
      deltaY=e.offsetY-mouseY;
      //[deltaX,deltaY].forEach((d)=>{
      //  d=Math.sign(d)*Math.min(d,limit);
      //});
    }
    mouseX=e.offsetX;
    mouseY=e.offsetY;
  }
});
canvas.addEventListener("wheel", (e) =>{
  // -1 - zoom in
  // +1 - zoom out
  zoom = Math.sign(e.deltaY);
  //console.log(zoom == 1 ? "zoom out" : "zoom in");
  deltaZoom-=zoom;
  //console.log("dZoom:",deltaZoom);
  drawWorld();
  drawObjects();
});
canvas.addEventListener("touchstart",(e)=>{
  //if (e.targetTouches.length != 1) return;
  let touch = e.targetTouches[0];
  firstX=touch.clientX;
  firstY=touch.clientY;
  mouseX=firstX;
  mouseY=firstY;
  isMousePressed=true;
  isLook=true;
  //if (e.button == 2) isLook=true;
});
canvas.addEventListener("touchend", (e)=>{
  isMousePressed=false;
  isLook=false;
  deltaX=0,deltaY=0;
  ctx.clearRect(0,0,worldWidth,worldHeight);
  drawWorld();
  drawObjects();
});
canvas.addEventListener("touchmove", (e) =>{
  e.preventDefault();
  //if (e.targetTouches.length != 1) return;
  // show the number of target touches
  if (isMousePressed===true) {
    ctx.clearRect(0,0,worldWidth,worldHeight);
    drawWorld();
    drawObjects();
    if (isLook===true) {
      //updateWorld();
      //updateObjects();
      let touch = e.targetTouches[0];
      deltaX=(touch.clientX-mouseX);
      deltaY=(touch.clientY-mouseY);
      mouseX=touch.clientX;
      mouseY=touch.clientY;
    }
    drawLine(ctx, firstX, firstY, mouseX, mouseY);
    //console.log(deltaX,deltaY);
  }
});

/*
 * Keyboard Controls
 *
 * Tab Q W E R T
 * Caps A S D F G
 * Shift Z X C V
 * E - up
 * D - down
 * S - left
 * F - right
 * W - loose
 * R - tight
 */
//
 window.addEventListener("keydown", (e) =>{
  e.preventDefault();
  //console.log(e.code);
  let speed=5;
  if (e.code==="KeyE") player.y-=speed;
  if (e.code==="KeyD") player.y+=speed;
  if (e.code==="KeyS") player.x-=speed;
  if (e.code==="KeyF") player.x+=speed;
  if (e.code==="KeyW") yaw+=speed/100;
  if (e.code==="KeyR") yaw-=speed/100;
  ctx.clearRect(0,0,worldWidth,worldHeight);
  drawWorld();
  drawObjects();
});

/*
 * implement init() and update(dt)
 */
//
createObjects();
drawWorld();
drawObjects();

function drawWorld() {
  // build world as a chess board
  ctx.beginPath();
  ctx.fillStyle = "gray";
  ctx.fillRect(0,0,worldWidth,worldHeight);
  /*
  const cellWidth = worldWidth/8;
  for (let i = 0; i < 9; i++) {
    let x = i * cellWidth;
    let y = i * cellWidth;
    for (var j = 0; j < 4; j++) {
      let offset = i % 2 == 0 ? cellWidth : 0;
      let jx=2 * (j * cellWidth) + offset;
      let jy=cellWidth * i;
      ctx.moveTo(jx,jy);
      ctx.fillStyle = "limegreen";
      ctx.fillRect(jx,jy, cellWidth, cellWidth);
    }
    ctx.moveTo(x,0);
    ctx.lineTo(x,worldHeight);
    ctx.moveTo(0,y);
    ctx.lineTo(worldWidth,y);
  }
  ctx.stroke();
  */
}

function updateWorld() {
  
}

function createObjects() {
  // draw random circles
  for (let k=0; k<25; k++) {
    let size = rand(canvas.width/100,canvas.width/25);//Math.floor(Math.random() * 10)+10;
    let x = rand(-5+player.x-canvas.width/2,player.x+canvas.width/2+5);//Math.floor(Math.random() * (canvas.width+10))-5;
    let y = rand(-5+player.y-canvas.height/2,player.y+canvas.height/2+5);//Math.floor(Math.random() * (canvas.height+10))-5;
    let z = rand(size,100);//Math.floor(Math.random() * (100))+25;
    let colorIndex = rand(0,colors.length-1);//(Math.floor(Math.random() * colors.length));
    let color = colors[colorIndex];
    
    objects.push({
      id: objects.length,
      size: size,
      x: x,
      y: y,
      z: z,
      color: color,
      type: "tree"
    });
  }
}

function updateObjects() {
  //for (let i=0; i<objects.length; i++) {
    // use mouse deltas to change object position
  //}
}

function drawObjects() {
  //objects.sort((a,b) => a.y - b.y);
  ctx.beginPath();
  ctx.fillStyle=shadow;
  let scaleFactor = Math.sin(pitch);

  for (let k=0; k<objects.length; k++) {
    let object = objects[k];
    //if (object.id ==1) console.log("shadow");
    let screen = worldToScreen(object.x,object.y,0);
    //let dx = (worldWidth/2)-screen.x,dy=(worldHeight/2)-screen.y;
    // modify screen values so that zooming in spreads out objects
    object.screen = screen;
    let apparentSize = object.size+deltaZoom;
    if (apparentSize<0) apparentSize = 0;
    object.apparentSize = apparentSize;
    ctx.moveTo(screen.x+object.size, screen.y);
    ctx.save();
    ctx.scale(1,scaleFactor);
    ctx.arc(screen.x, screen.y/scaleFactor, apparentSize, 0, 2 * Math.PI);
    //object.screen.y-=(Math.cos(pitch)*object.z);
    ctx.restore();
  }
  ctx.fill();
  objects.sort((a,b) => (Math.sign(pitch)*(Math.cos(pitch)*a.screen.y)+(Math.sin(pitch)*a.z)) - (Math.sign(pitch)*(Math.cos(pitch)*b.screen.y)+(Math.sin(pitch)*b.z)));
  for (let l=0; l<objects.length; l++) {
    let object = objects[l];
    //if (object.id ==1) console.log("object");
    //let screen = worldToScreen(object.x,object.y,object.z);
    //let screen = object.screen;
    object.screen.y-=(Math.cos(pitch)*object.z);
    if (object.type == "tree" && object.apparentSize>5) {
      ctx.beginPath();
      let rootWidth = object.apparentSize/4;
      ctx.moveTo(object.screen.x+rootWidth/2,object.screen.y+Math.cos(pitch)*(object.z));
      ctx.save();
      ctx.fillStyle = "brown";
      ctx.scale(1,scaleFactor);
      ctx.arc(object.screen.x,(object.screen.y+Math.cos(pitch)*(object.z))/scaleFactor,rootWidth/2,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
       drawLine(ctx,object.screen.x,object.screen.y,object.screen.x,object.screen.y+Math.cos(pitch)*(object.z),"brown",rootWidth);
    }
    ctx.beginPath();
    ctx.fillStyle = object.color;
    ctx.moveTo(object.screen.x+object.apparentSize,object.screen.y);
    //console.log(object.id, object.color);
    ctx.arc(object.screen.x,object.screen.y, object.apparentSize, 0, 2 * Math.PI);
    ctx.fill();
    //if (object.outline) {
      ctx.lineWidth=2;
      ctx.strokeStyle="black";
      ctx.stroke();
    //}
  }
}

/*
 * draw a line
 * ctx: the canvas context to use
 * x1
 * y1
 * x2
 * y2
 * width
 * color
 */
function drawLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  if (!color) { ctx.strokeStyle="black"; }
  else { ctx.strokeStyle=color; }
  if (!width) {ctx.lineWidth=1; }
  else { ctx.lineWidth=width; }
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function rand(min, max, interval) {
  if(interval === undefined) interval = 1;
  return Math.round((Math.floor(Math.random() * (max - min + 1)) + min) / interval) *interval;
}

function randColor() {
  /*
  let r = (Math.floor(Math.random() * 2)*118+130).toString(16);
  let g = (Math.floor(Math.random() * 2)*118+130).toString(16);
  let b = (Math.floor(Math.random() * 2)*118+130).toString(16);
  //ctx.fillStyle = "#" + r + g + b;
  return "#" + r + g + b;
  */
}

function drawObject(object) {
  // calculate apparent position
  // draw shadow
  // draw object
  return worldToScreen(object.x,object.y,object.z);
}

function worldToScreen(x,y,z) {
  // look
  yaw+=(deltaX/10000);
  let view = angle(player.x,player.y,x,y) - yaw; // angle((0,0),(-0.71,0.71))
  //oldAngle = radToDeg(oldAngle);
  //newAngle = degToRad(newAngle);
  let distance = length(player.x,player.y,x,y);
  pitch+=(deltaY/10000);
  if (pitch<0) pitch = 0;
  if (pitch>Math.PI/2) pitch = Math.PI/2;
  let screenX=(Math.cos(view)*distance)+(canvas.width/2); 
  let screenY=(Math.sin(pitch)*Math.sin(view)*distance)+(canvas.height/2)-(Math.cos(pitch)*z); 
  let screenZ=0;
  return {x:screenX,y:screenY,z:screenZ};
} 

// angle in radians from center to endpoint
function angle(cx, cy, ex, ey) {
  let dx = ex - cx;
  let dy = ey - cy;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  //theta *= 180/ Math.PI; // range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range (0, 360]
  //if (theta < 0) theta += 2 * Math.PI;
  return theta;
}

function radToDeg(rad) {
  deg = rad * 180 / Math.PI;
  if (deg < 0) deg+=360;
  return deg;
}

function degToRad(deg) {
  if (deg > 180) deg-=360;
  rad = deg * Math.PI / 180;
  return rad;
}

// the distance from center to endpoint
function length(cx, cy, ex, ey) {
  return Math.hypot(ex-cx,ey-cy);
}

/*
// color pure red, draw a rect (upper-left, 150x75)
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
// move start and draw line
ctx.moveTo(58, 25);
ctx.lineTo(100, 50);
ctx.moveTo(142, 25);
ctx.lineTo(100, 50);
ctx.moveTo(100,100);
ctx.lineTo(100,50);
ctx.stroke();
// begin path and draw circle
ctx.beginPath();
ctx.arc(100, 50, 30, 0, 2 * Math.PI);
ctx.stroke();
// draw hex
ctx.beginPath();

ctx.moveTo(100,0);
ctx.lineTo(142,25);
ctx.lineTo(142,75);
ctx.lineTo(100,100);
ctx.lineTo(58,75);
ctx.lineTo(58,25);
ctx.lineTo(100,0);
ctx.stroke();
*/

