//mouse.js
function setMove(event) {
  // ....
}
function setWheel(event) {
  controls.mouse.zoom=event.deltaY;
  console.log(controls.mouse.zoom);
  //controls.isZoomed=controls.mouse.zoom!==0;
}
function getMouse() {
  return controls.mouse;
}

window.addEventListener("mousedown", pushInput);
window.addEventListener("mouseup", dropInput);
window.addEventListener("mousemove", setMove);
window.addEventListener("wheel", setWheel);

