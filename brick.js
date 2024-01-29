// brick.js

// canvas is created/configured programmatically now
//<!--canvas-->
//<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

const _window = window;
/* SCREEN */
// size and resolution
/* WINDOW */
// size and scrollbar
// window
// Set event listener for window resize
window.addEventListener('resize', () => {
  resizeWindow();
  draw();
});
// Set event listener for device orientation change
window.addEventListener('orientationchange', () => {
  resizeWindow();
  draw();
});

/* CANVAS */
// size and pixelation
const _canvas = document.createElement("canvas");
const _ctx = _canvas.getContext("2d");
resizeWindow();
document.body.appendChild(_canvas);

function resizeWindow() {
  console.log("resize");
  _canvas.width = _window.innerWidth;
  _canvas.height = _window.innerHeight;
}

/* LIGHTS */
// colors and shadow
const colors = ["red","blue","green","yellow","magenta","cyan"];
const shadow = "rgba(0,0,0,0.5)";

/* CAMERA */
// view and effects

/* ACTION */
// controls and interface
function drawReticle() {

}

/* WORLD */
// objects and physics
function drawWorld() {
	_ctx.beginPath();
	_ctx.fillStyle = "gray";
	_ctx.fillRect(0,0,_canvas.width,_canvas.height);
}
/* SCENE */
// menus and rooms


/* LOOP */
function draw() {
  drawWorld();
  console.log(window.screenLeft);

}
draw();