const Buffer = (function (/*api*/) {
  var api = {};

  api.flush = function (dt) {

    return controls;
  };

  // return the public api
  return api;
}());

const controls = {
  buttons:[],
  mouse:{
    x_:0,
    y_:0,
    _x:0,
    _y:0,
    dragMin:10,
    dragMax:50,
  },
  isDragged:false,isClicked:false,
  isTouched:false,
  viewport:{
    isResized:false,
  },
};

function pushInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  if(input===0) controls.isTouched=true;

  if (!list.includes(input)) list.push(input);
}  
function dropInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  if (input===0) controls.isTouched=false;

  if (list.includes(input)) list.splice(list.indexOf(input),1);
}
function findInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  return (list.includes(input));
}
function resize(event) {
  // ....
}

function setMouse(event) {
  // ....
}
function getMouse() {
  return controls.mouse;
}

// CHECK BROWSER FEATURES //
// TODO: practice with offscreen canvas
//const ctxOffscreen = canvas.getContext("2d", { willReadFrequently: true });
// TODO: ensure the browser supports innerWidth or clientWidth
if (typeof window === "undefined") {
  console.log("no window");
  try {
    throw new Error("no window");
  } catch (e) {
    console.log(e.message);
  }
}

// HANDLE WINDOW EVENTS //
// suppress system right click menu
window.addEventListener("contextmenu", (e)=>{e.preventDefault()});
// trigger resize handler
window.addEventListener("resize", resize);
window.addEventListener("keydown", pushInput);
window.addEventListener("keyup", dropInput);
window.addEventListener("mousedown", pushInput);
window.addEventListener("mouseup", dropInput);
window.addEventListener("mousemove", setMouse);

/* 

  if (e.button===keybinds.mouseL) {
    inputs.mouse.x_=inputs.mouse._x=e.offsetX-document.body.clientWidth/2;
    inputs.mouse.y_=inputs.mouse._y=e.offsetY-document.body.clientHeight/2;
    
    inputs.mouse.isClicked=false;
    inputs.mouse.isDragged=false;
  }
*/


// FIXME: touch events

const ongoingTouches = [];

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1; // not found
}



var handleTouchStart = (e)=>{
  e.preventDefault()
    controls.isTouched=true;

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};
var handleTouchFinish = (e)=>{
  e.preventDefault()
    controls.isTouched=false;
  for(let i=0; i<e.changedTouches.length; i++) {
  }
};
var handleTouchMove = (e)=>{
  e.preventDefault()

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};

/*
(e)=>{
  e.preventDefault()
  for(let i=0; i<e.changedTouches.length; i++) {
    pushKey(state.keys,ongoingTouches.length);
    ongoingTouches.push(copyTouch(e.touches[i]));
  }

  if (ongoingTouches.length > keybinds.mouseL) return;

  inputs.mouse.x_=inputs.mouse.x=e.screenX;
  inputs.mouse.y_=inputs.mouse.y=e.screenY;
  inputs.mouse._x=inputs.mouse.x_;
  inputs.mouse._y=inputs.mouse.y_;
}

  e.preventDefault()
  for(let i=0; i<e.changedTouches.length; i++) {
    let index = ongoingTouchIndexById(e.changedTouches.identifier);
    //let touch=ongoingTouches[index];
    if (index===keybinds.mouseL) {
      inputs.mouse._x=e.offsetX;
      inputs.mouse._y=e.offsetY;

      let dist = Math.hypot(inputs.mouse._x-inputs.mouse.x_,inputs.mouse._y-inputs.mouse.y_);
      inputs.mouse.isDragged = (dist>=inputs.mouse.dragMin);
      //console.log(dist,inputs.mouse.isDragged);
    }

    dropKey(index,state.keys);
    ongoingTouches.splice(index,1);
  }

}
*/

window.addEventListener("touchstart",handleTouchStart);
window.addEventListener("touchend",handleTouchFinish);
window.addEventListener("touchcancel",handleTouchFinish);
window.addEventListener("touchmove",handleTouchMove);

// FIXME: how to switch bw WASD and ESDF
let isUsingWASD = true;
const  keybinds = {
  up: isUsingWASD ? "KeyW" : "KeyE",
  down: isUsingWASD ? "KeyS" : "KeyD",
  left: isUsingWASD ? "KeyA" : "KeyS",
  right: isUsingWASD ? "KeyD" : "KeyF",

  loosen: isUsingWASD ? "KeyQ" : "KeyW",
  tighten: isUsingWASD ? "KeyE" : "KeyR",
  tertiary: "ShiftLeft",
  secondary: "KeyF",
  primary: "Space",

  debug: "Backquote",
  menu: "Escape",

  mouseL: 0,
  mouseM: 1,
  mouseR: 2,

};
