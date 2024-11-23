//mouse.js
function move(event) {
  // ....
}
function zoom(event) {
  event.preventDefault()
  controls.zoom=event.deltaY>0?-0.5:event.deltaY<0?0.5:0;
  //console.log(controls.mouse.zoom);
  //controls.isZoomed=controls.zoom!==0;
}
var doubleClick = (e)=>{
  e.preventDefault()
};

function getMouse() {
  return controls.mouse;
}

window.addEventListener("mousedown", pushInput);
window.addEventListener("mouseup", dropInput);
window.addEventListener("mousemove", move);
window.addEventListener("wheel", zoom,{passive:false});
window.addEventListener("dblclick",doubleClick);

