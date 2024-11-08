//mouse.js
function setMouse(event) {
  // ....
}
function getMouse() {
  return controls.mouse;
}

window.addEventListener("mousedown", pushInput);
window.addEventListener("mouseup", dropInput);
window.addEventListener("mousemove", setMouse);

