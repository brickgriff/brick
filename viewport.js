//viewport.js

function resize(event) {
  // update global/system state
  game.width=window.innerWidth;
  game.height=window.innerHeight;
  //game.isResized=true;
  //console.log(controls.width,controls.height);

  //console.log(game);

  // var load_event = document.createEvent('Event');  
  // load_event.initEvent('load', false, false);  
  // window.dispatchEvent(load_event);

  //window.location.reload();
  //testDraw();
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

window.addEventListener("contextmenu", (e)=>{e.preventDefault()});
window.addEventListener("resize", resize);

