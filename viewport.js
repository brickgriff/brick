//viewport.js

function resize(event) {
  controls.width=window.innerWidth;
  controls.height=window.innerHeight;
  controls.isResized=true;
  //console.log(controls.width,controls.height);
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

