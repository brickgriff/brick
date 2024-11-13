//mouse.js
function move(event) {
  // ....
}
function zoom(event) {
  controls.zoom=event.deltaY>0?-0.5:event.deltaY<0?0.5:0;
  //console.log(controls.mouse.zoom);
  //controls.isZoomed=controls.mouse.zoom!==0;
}
function getMouse() {
  return controls.mouse;
}

window.addEventListener("mousedown", pushInput);
window.addEventListener("mouseup", dropInput);
window.addEventListener("mousemove", move);
window.addEventListener("wheel", zoom);

